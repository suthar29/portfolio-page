// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXZM4rY5XrsWwqPKKZrhzCJm7umoOsGRA",
  authDomain: "anupam-s-portfolio.firebaseapp.com",
  projectId: "anupam-s-portfolio",
  storageBucket: "anupam-s-portfolio.firebasestorage.app",
  messagingSenderId: "886849041281",
  appId: "1:886849041281:web:b02aa30634a6ae940aae80",
  measurementId: "G-PMYBEZHF7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


const form = document.getElementById('userForm');
const toast = document.getElementById('toast');

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000); // show for 3 seconds
}


// 💌 Brevo API Key — ⚠️ WARNING: Do NOT expose this in production!
const BREVO_API_KEY = "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";
const YOUR_EMAIL = "anupamsuthar329@gmail.com"; // Email to receive form notifications

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // prevent page reload

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const mobile_number = document.getElementById('number').value.trim();
  const description = document.getElementById('description').value.trim();



  if (!name || !email || !mobile_number ) {
    showToast("⚠️ Please fill in all fields.");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: name,
      email: email,
      timestamp: new Date(),
      contact: mobile_number,
      query: description
    });

    // Step 2: Prepare Emails
const notifyAdminEmail = {
  sender: { name: "Anupam Suthar", email: "anupamsuthar329@gmail.com" },
  to: [{ email: "anupamsuthar329@gmail.com", name: "Admin-Anupam" }],
  subject: "📩 New Contact Form Submission",
  htmlContent: `
    <h2>New Message</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Contact:</strong> ${mobile_number}</p>
    <p><strong>Message:</strong> ${description}</p>
  `,
};

const autoReplyEmail = {
  sender: { name: "Anupam Suthar", email: "anupamsuthar329@gmail.com" },
  to: [{ email: email, name: name }],
  subject: "🙌 Thanks for reaching out!",
  htmlContent: `
    <p>Hi ${name},</p>
    <p>Thanks for contacting us. We received your message and will get back to you soon.</p>
    <p>Best,<br>The Team</p>
  `,
};

// Step 3: Send via Brevo
try {
  const sendBrevo = async (payload) => {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": "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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Brevo error: ${res.status}`);
    return res.json();
  };

  await sendBrevo(notifyAdminEmail);
  await sendBrevo(autoReplyEmail);

  console.log("Message sent successfully!");
} catch (err) {
  console.log("Message saved, but email failed.");
  console.error(err);
}
    form.reset();
    showToast("✅ Submitted Successfully!");
    console.log("Doc ID:", docRef.id);
  } catch (err) {
    console.error("Error:", err);
    showToast("❌ Submission failed. Check console.");
  }
});

const projects = [
  {
    title: "Library Solutions",
    image: "assets/library.jpeg",
    description: "They streamline library operations and improve user experience.",
    github: "https://github.com/Anupam0329/Library",
    live: "https://anupam0329.github.io/Library/"
  },
  {
    title: "Tic Tac Toe Game",
    image: "assets/TTT.jpeg",
    description: "Tic Tac Toe is a simple two-player game where players take turns marking X or O on a 3×3 grid.",
    github: "https://github.com/Anupam0329/Tic-Tac-Toe",
    live: "https://anupam0329.github.io/Tic-Tac-Toe/"
  },
  {
    title: "Calculator",
    image: "assets/calc.jpeg",
    description: "It simplifies mathematical calculations, ranging from simple to complex, with user-friendly interfaces.",
    github: "https://github.com/Anupam0329/calculator",
    live: "https://anupam0329.github.io/calculator/"
  },
  {
    title: "Admin Dashboard",
    image: "assets/Admin Login Illustration.jpeg",
    description: "An admin page provides a central dashboard for managing and monitoring system activities and user data.",
    github: "https://github.com/Anupam0329/Admin-Dashboard",
    live: "https://anupam0329.github.io/Admin-Dashboard/"
  },
  {
    title: "Landing Page",
    image: "assets/landing-page.jpeg",
    description: "A landing page is a standalone web page designed to capture visitors’ attention and encourage specific actions.",
    github: "https://github.com/Anupam0329/landing-page",
    live: "https://anupam0329.github.io/landing-page/"
  },
  {
    title: "Etch-a-sketch",
    image: "assets/sketch.jpeg",
    description: "It offers a simple, fun way to sketch and erase designs, making it a timeless hands-on creative tool.",
    github: "https://github.com/Anupam0329/Etch-a-sketch",
    live: "https://anupam0329.github.io/Etch-a-sketch/"
  }
];

const container = document.getElementById("projects-container");

container.innerHTML = projects.map(project => `
  <div class="project-card">
    <img src="${project.image}" alt="Project" class="project-image" />
    <div class="project-info">
      <h3 class="project-title">${project.title}</h3>
      <p class="project-categories">${project.description}</p>
      <div class="repos">
        <a href="${project.github}" target="_blank"><img src="logos/github.png" class="social-logo"></a>
        <a href="${project.live}" target="_blank" class="live">LIVE LINK</a>
      </div> 
    </div>
  </div>
`);

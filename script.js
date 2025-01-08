const navLinks = document.querySelectorAll('.nav-list a');

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const username = 'KvtwetDev';
const projectList = document.getElementById('project-list');

async function fetchGitHubProjects() {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) throw new Error('Erro ao acessar a API do GitHub.');
    const repositories = await response.json();

    const projects = repositories.filter(repo => repo.name.startsWith('frontend-'));

    if (projects.length === 0) {
      projectList.innerHTML = `<p>Nenhum projeto encontrado.</p>`;
      return;
    }

    projects.forEach(repo => {
      const projectCard = createProjectCard(repo);
      projectList.appendChild(projectCard);
    });
  } catch (error) {
    console.error('Erro ao carregar os projetos do GitHub:', error);
    projectList.innerHTML = `<p>Não foi possível carregar os projetos no momento. Tente novamente mais tarde.</p>`;
  }
}

function capitalizeWords(name) {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function createProjectCard(repo) {
  const thumbnailUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/main/thumbnail.png`;
  const formattedName = capitalizeWords(
    repo.name
      .replace(/frontend/gi, '')
      .replace(/html/gi, '')
      .replace(/-/g, ' ')
      .trim()
  );

  const projectCard = document.createElement('div');
  projectCard.className = 'project-card';
  projectCard.innerHTML = `
    <a href="${repo.html_url}" target="_blank">
      <img src="${thumbnailUrl}" alt="${formattedName} Thumbnail" />
      <h3>${formattedName}</h3>
    </a>
  `;
  return projectCard;
}

fetchGitHubProjects();

function openWhatsapp() {
  var number = "5548933804333";
  var whatsappUrl = "https://wa.me/" + number;

  window.open(whatsappUrl, "_blank")


}

class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  handleLinkClick() {
    this.navList.classList.remove(this.activeClass);
    this.mobileMenu.classList.remove(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
    this.navLinks.forEach(link => {
      link.addEventListener("click", this.handleLinkClick);
    });
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li",
);
mobileNavbar.init();

document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();


  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;


  emailjs.init('Ca0HiHOTFLxA1lpdT');

  const templateParams = {
      email: email,
      message: message,
  };

  emailjs.send('service_ingo2zq', 'template_ocwhccm', templateParams)
      .then(function (response) {
          alert('E-mail enviado com sucesso!');
          document.getElementById('contact-form').reset();
          console.log('Sucesso:', response.status, response.text);
      }, function (error) {
          alert('Erro ao enviar e-mail, tente novamente.');
          console.error('Erro:', error);
      });
});


// Seleciona todos os links de navegação
const navLinks = document.querySelectorAll('.nav-list a');

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        // Previne o comportamento padrão do link
        event.preventDefault();

        // Pega o valor do data-target
        const targetId = link.getAttribute('data-target');

        // Seleciona o alvo com base no id
        const targetSection = document.getElementById(targetId);

        // Rola suavemente até a seção desejada
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


const username = 'kvtwet'; // Substitua pelo seu nome de usuário no GitHub.
const projectList = document.getElementById('project-list');

async function fetchGitHubProjects() {
  try {
    // Faz a requisição para obter os repositórios públicos
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repositories = await response.json();

    // Filtra somente os repositórios que possuem uma descrição (ou outra tag que você decida usar)
    const projects = repositories.filter(repo => repo.name.startsWith('Frontend-'));

    // Gera a interface para cada projeto
    projects.forEach(repo => {
      // Caminho da thumbnail (ajuste o caminho de acordo com o seu projeto no GitHub)
      const thumbnailUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/main/thumbnail.png`;

      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      
      projectCard.innerHTML = `
      <a href="${repo.html_url}" target="_blank">
          <img src="${thumbnailUrl}" alt="${repo.name.replace(/-/g, ' ')} Thumbnail" />
          <h3>${repo.name.replace(/-/g, ' ')}</h3>
          </a>
          `;
          
          projectList.appendChild(projectCard);
        });
      } catch (error) {
    console.error('Erro ao carregar os projetos do GitHub:', error);
  }
}

fetchGitHubProjects();

function openWhatsapp(){
  var number = "5541999306412";
  var whatsappUrl = "whatsapp://send?phone="+ number;
  
  window.location.href = whatsappUrl;

  setTimeout(function() {
    window.location.href = "https://wa.me/" + number;
    }, 1000);
}

class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this); // Método para fechar o menu ao clicar no link
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

  // Método para fechar o menu quando um link for clicado
  handleLinkClick() {
    this.navList.classList.remove(this.activeClass);
    this.mobileMenu.classList.remove(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
    
    // Adiciona um evento de clique em cada link para fechar o menu
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

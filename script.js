function scrollToElement(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

document.querySelectorAll('.pushable').forEach(button => {
    button.addEventListener('click', (event) => {
        const targetId = event.target.closest('.pushable').getAttribute('data-target');
        scrollToElement(targetId);
    });
});

const header = document.querySelector('header');
let isScrolled = false;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50 && !isScrolled) {
        header.classList.remove('unscrolled');
        header.classList.add('scrolled');
        isScrolled = true;
    } else if (window.scrollY <= 50 && isScrolled) {
        header.classList.remove('scrolled');
        header.classList.add('unscrolled');
        isScrolled = false;
    }
});

const username = 'kvtwet'; // Substitua pelo seu nome de usuário no GitHub.
const projectList = document.getElementById('project-list');

async function fetchGitHubProjects() {
  try {
    // Faz a requisição para obter os repositórios públicos
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repositories = await response.json();

    // Filtra somente os repositórios que possuem uma descrição (ou outra tag que você decida usar)
    const projects = repositories.filter(repo => repo.private === false);

    // Gera a interface para cada projeto
    projects.forEach(repo => {
      // Caminho da thumbnail (ajuste o caminho de acordo com o seu projeto no GitHub)
      const thumbnailUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/main/thumbnail.png`;

      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';

      projectCard.innerHTML = `
        <a href="${repo.html_url}" target="_blank">
          <img src="${thumbnailUrl}" alt="${repo.name} Thumbnail" />
          <h3>${repo.name}</h3>
        </a>
      `;

      projectList.appendChild(projectCard);
    });
  } catch (error) {
    console.error('Erro ao carregar os projetos do GitHub:', error);
  }
}

fetchGitHubProjects();


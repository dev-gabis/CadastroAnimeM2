class Anime {
    constructor(name, image, genre, year, episodes, status, link) {
        this.name = name;
        this.image = image;
        this.genre = genre;
        this.year = year;
        this.episodes = episodes;
        this.status = status;
        this.link = link;
    }
}

let animeList = [];

const form = document.getElementById('anime-form');
const animeNameInput = document.getElementById('anime-name');
const animeImageInput = document.getElementById('anime-image');
const animeGenreSelect = document.getElementById('anime-genre');
const animeYearInput = document.getElementById('anime-year');
const animeEpisodesInput = document.getElementById('anime-episodes');
const animeStatusSelect = document.getElementById('anime-status');
const animeLinkInput = document.getElementById('anime-link');
const animeListContainer = document.getElementById('anime-list');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = animeNameInput.value;
    const image = URL.createObjectURL(animeImageInput.files[0]);
    const genre = animeGenreSelect.value;
    const year = animeYearInput.value;
    const episodes = animeEpisodesInput.value;
    const status = animeStatusSelect.value;
    const link = animeLinkInput.value;
    

    if (name && genre && image) {
        if (isDuplicate(name)) {
            alert('Este anime já foi cadastrado.');
        } else {
            const newAnime = new Anime(name, image, genre, year, episodes, status, link);
            animeList.push(newAnime);
            saveAnimeList();
            displayAnimeList();
            form.reset();
            alert('Cadastro realizado com sucesso!');
        }
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
});

function isDuplicate(name) {
    return animeList.some(anime => anime.name.toLowerCase() === name.toLowerCase());
}

function saveAnimeList() {
    localStorage.setItem('animeList', JSON.stringify(animeList));
}

function loadAnimeList() {
    const storedAnimeList = localStorage.getItem('animeList');
    if (storedAnimeList) {
        animeList = JSON.parse(storedAnimeList);
    }
}

function displayAnimeList() {
    animeListContainer.innerHTML = '';
    
    animeList.forEach((anime, index) => {
        const div = document.createElement('div');
        div.classList.add('anime-card');
        div.innerHTML = `<h3>${anime.name}</h3>
                        <img src="${anime.image}" alt="${anime.name} Image">
                         <p>Gênero: ${anime.genre}</p>
                         <p>Ano de Lançamento: ${anime.year}</p>
                         <p>Número de Episódios: ${anime.episodes}</p>
                         <p>Status: ${anime.status}</p>
                         <p><a href="${anime.link}" target="_blank">Assistir aqui</a></p>
                         <button class="edit-btn" onclick="editAnime(${index})">Editar</button>
                         <button class="delete-btn" onclick="deleteAnime(${index})">Deletar</button>`;
        
        animeListContainer.appendChild(div);
    });
}

function editAnime(index) {
    const newName = prompt('Novo nome do anime:', animeList[index].name);
    const newGenre = prompt('Novo gênero do anime:', animeList[index].genre);
    const newYear = prompt('Novo ano de lançamento:', animeList[index].year);
    const newEpisodes = prompt('Novo número de episódios:', animeList[index].episodes);
    const newStatus = prompt('Novo status do anime:', animeList[index].status);
    const newLink = prompt('Novo link para assistir:', animeList[index].link);

    if (newName && newGenre && newYear && newEpisodes && newStatus && newLink) {
        animeList[index].name = newName;
        animeList[index].genre = newGenre;
        animeList[index].year = newYear;
        animeList[index].episodes = newEpisodes;
        animeList[index].status = newStatus;
        animeList[index].link = newLink;

        saveAnimeList();
        displayAnimeList();
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
}

function deleteAnime(index) {
    animeList.splice(index, 1);
    saveAnimeList();
    displayAnimeList();
}

loadAnimeList(); // Carrega a lista de animes ao carregar a página
displayAnimeList(); // Exibe a lista de animes

function downloadAnimeList() {
    const jsonContent = JSON.stringify(animeList);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'animeList.json';
    document.body.appendChild(a);
    a.click();
    
    URL.revokeObjectURL(url);
}
// Função para redirecionar para a página de Lista de Animes
function viewAnimeList() {
    window.location.href = 'lista_animes.html';
}

// Função para redirecionar para a página de Novo Cadastro
function newAnimeForm() {
    window.location.href = 'index.html';
}


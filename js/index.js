document.addEventListener("DOMContentLoaded", () => {
fetchMonsters();
});

const monsterContainer = document.getElementById('monster-container');
const form = document.getElementById('monster-form');
const loadMoreBtn = document.getElementById('load-more');

let page = 1;
const limit = 50;
const baseURL = 'http://localhost:3000/monsters';


function renderMonster(monster) {
    const div = document.createElement('div');
    div.innerHTML = `
    <h2>${monster.name}</h4>
    <h4>Age: ${monster.age}</h4>
    <p>${monster.description}</p>
    `;
    monsterContainer.appendChild(div);
}

function fetchMonsters() {
    fetch(`${baseURL}/?_limit=${limit}&_page=${page}`)
      .then(resp => resp.json())
      .then(monsters => {
        monsters.forEach(renderMonster);
      })
      .catch(error => console.error("Error fetching monsters:", error));
    }

form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').ariaValue;
    const age = parseFloat(document.getElementById('age').value);
    const description = document.getElementById('description').value;

    const newMonster = {name, age, description };
    
    fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMonster) 
    })
.then(resp => resp.json())
.then(data => {
    renderMonster(data);
    form.requestFullscreen();
});
});
 loadMoreBtn.addEventListener('click', () => {
    page++;
    fetchMonsters();
 });
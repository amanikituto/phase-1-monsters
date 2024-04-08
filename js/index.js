document.addEventListener('DOMContentLoaded', () => {
    const monsterForm = document.getElementById('monster-form');
    const monsterContainer = document.getElementById('monster-container');
    const loadMoreButton = document.getElementById('load-more');
  
    let currentPage = 1;
  
    // Function to fetch monsters from the API
    function fetchMonsters(page) {
      fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then(response => response.json())
        .then(monsters => {
          monsters.forEach(monster => renderMonster(monster));
        });
    }
  
    // Function to render a single monster
    function renderMonster(monster) {
      const monsterCard = document.createElement('div');
      monsterCard.innerHTML = `
        <h3>${monster.name}</h3>
        <p>Age: ${monster.age}</p>
        <p>Description: ${monster.description}</p>
      `;
      monsterContainer.appendChild(monsterCard);
    }
  
    // Function to handle form submission for creating a new monster
    monsterForm.addEventListener('submit', event => {
      event.preventDefault();
      
      const name = event.target.name.value;
      const age = parseInt(event.target.age.value);
      const description = event.target.description.value;
  
      const newMonster = {
        name: name,
        age: age,
        description: description
      };
  
      fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(newMonster)
      })
      .then(response => response.json())
      .then(monster => {
        renderMonster(monster);
        monsterForm.reset();
      });
    });
  
    // Function to handle click event for loading more monsters
    loadMoreButton.addEventListener('click', () => {
      currentPage++;
      fetchMonsters(currentPage);
    });
  
    // Initial fetch to load monsters on page load
    fetchMonsters(currentPage);
  });
  
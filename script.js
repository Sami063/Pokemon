const pokkemonContainer = document.querySelector('.pokemon-container');
const pokemonCard = document.querySelector('.pokemon-card');

const modal = document.querySelector('.modal'); // modal window 
const closeModal = document.querySelector('.close'); // close the modal 
const overlay = document.querySelector('.overlay');

const fetchPokemon = function(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(respons => respons.json())
    .then(data => {
        createNewPokemon(data);
    })
}
// fetchPokemon(); 

// for loop to go all over each pokemons 
function fetchSomePokemons(numbers) {
    for (let i = 1; i <= numbers; i++) {
        fetchPokemon(i)
    }
} 

// number of pokemons to be executed
fetchSomePokemons(100)

const createNewPokemon = function(pokemon) {
    const card = document.createElement('div')
    card.classList.add('pokemon-card')

    const spriteContainer = document.createElement('div')
    spriteContainer.classList.add('img-container') // Is a class

    const sprite = document.createElement('img')
    sprite.src = pokemon.sprites.front_default

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement('h1')
    name.classList.add('name');
    name.textContent = pokemon.name;

    
    card.appendChild(spriteContainer)
    card.appendChild(name);
    card.appendChild(number);
    
    pokkemonContainer.appendChild(card);
    
    // event listener for each pokemon card event
    // card.addEventListener('click', pokeModal)
    card.addEventListener('click', showModal);
    closeModal.addEventListener('click', closeModa);
}
// showing the modal window, when the card container is clicked 
const showModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
// the modal window will be closed when the closeModal || overlay is cliked
const closeModa = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

// Event listeners for Escape key events
// if the key Escape is pressed, modal will be closed
document.addEventListener('keydown', function(e) {

    if(e.key == 'Escape' || overlay && !modal.classList.contains('hidden')) {
        closeModal(); 
    }
});

// if the event is overlay modal will be closed
window.onclick = function(event) {
    if(event.target == overlay) {
        closeModa();
    }
}



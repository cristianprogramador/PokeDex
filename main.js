const URL = 'https://pokeapi.co/api/v2/pokemon/';

const searchInput = document.getElementById('search');
const pokedexContainer = document.getElementById('pokedex-display');
const btnSearch = document.getElementById('btn-search');
const imgPokeBlack = document.querySelector('img-container');

// Función para mostrar un mensaje de error
function showError(message) {
    pokedexContainer.innerHTML = `<p class="error">${message}</p>`;
}

async function searchPokemon() {
    // Cambia toda la busqueda a minusculas
    const searchdPokemon = searchInput.value.toLowerCase();   
    //Manejo de errores de busqueda
    try {
        const response = await fetch(URL + searchdPokemon);
        if (!response.ok) {
            // Si la respuesta no es exitosa, mostrar un mensaje de error
            showError(`No se encontró ningún Pokémon llamado "${searchdPokemon}" ${imgPokeBlack}`);
            return;
        }

        const data = await response.json();

        pokedexContainer.innerHTML = 
        `
            <h2>${data.name.toLowerCase()}</h2>
            <div class="containerPoke">
                <img class="imgPoke" src="${data.sprites.front_default}" alt="${data.name}">
                <div class="infoPoke">
                    <p>Id: ${data.id}</p>
                    <p>Altura: ${data.height / 10}m</p>
                    <p>Peso: ${data.weight / 10}kg</p>
                    <p>Tipo: ${data.types[0].type.name}</p>
                </div>
                <div>

                </div>
            </div>
        `;
    } catch (error) {
        showError('Ha ocurrido un error al buscar el Pokémon');
        console.error(error);
    }
}
//CLick al boton de búsqueda
btnSearch.addEventListener("click", searchPokemon);
//searchInput.addEventListener("keypress", searchPokemon);
searchInput.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      searchPokemon();
        }
  });




//IIFE array of pokemon objects
let pokemonRepository = (function(){
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  function getAll(){
    return pokemonList;
  }
  function addListItem(pokemon){
    let unorderedList = document.querySelector('.pokemon-list');
  
    let listItem = document.createElement('li');
  
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-list-button');
  
    listItem.appendChild(button);
    unorderedList.appendChild(listItem);

    addEventListenerOnClick(button, pokemon);
  }
  function showDetails(pokemon){
    console.log(pokemon.name);
  }
  function addEventListenerOnClick(button, pokemon){
    button.addEventListener('click', function(){
      showDetails(pokemon);
    })
  }
  return {
    getAll: getAll,
    addListItem: addListItem
  };
})()

//foreach loop to iterate over array of pokemon objects
pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
})
//IIFE array of pokemon objects
let pokemonRepository = (function(){
  let pokemonList = [
    {
      name : 'bulbasaur', 
      height : 7, 
      type : ['grass', 'poison']
    }, 
    {
      name : 'charmander', 
      height : 6, 
      type : ['fire']
    }, 
    {
      name : 'squirtle', 
      height : 5, 
      type : ['water']
    }
  ];
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
  }
  function showDetails(pokemon){
    console.log(pokemon);
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
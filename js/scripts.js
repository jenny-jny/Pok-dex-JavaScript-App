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
  function add(pokemon){
    pokemonList.push(pokemon);
  }
  function getAll(){
    return pokemonList;
  }
  return {
    add: add,
    getAll: getAll
  };
})()

//foreach loop to iterate over array of pokemon objects
pokemonRepository.getAll().forEach(function(pokemon){
  document.write('<p>' + 'Name: ' + pokemon.name + ', ' + 'height: ' + pokemon.height + ', ' + 'type: ' + pokemon.type + '</p>');
})
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
    //validate if the pokemon is an object
    if(typeof pokemon === 'object' && pokemon !== null){
      //validate if the parameters of pokemon has the correct keys
      let pokemonKeys = Object.keys(pokemon);
      if(pokemonKeys.length === 3 && pokemonKeys[0] === 'name' && pokemonKeys[1] === 'height' && pokemonKeys[2] === 'type'){     
        pokemonList.push(pokemon);
      }
    }
  }
  function getAll(){
    return pokemonList;
  }
  function filterByName(pokemon){
    return pokemonList.filter(pokemon1 => pokemon1.name === pokemon.name); //pokemon1 is an pokemon object in the pokemon array
  }
  return {
    add: add,
    getAll: getAll,
    filterByName: filterByName
  };
})()

//foreach loop to iterate over array of pokemon objects
pokemonRepository.getAll().forEach(function(pokemon){
  document.write('<p>' + 'Name: ' + pokemon.name + ', ' + 'height: ' + pokemon.height + ', ' + 'type: ' + pokemon.type + '</p>');
})

//add pokemon to array of pokemon objects
pokemonRepository.add({name: 'caterpie', height: 3, type: ['bug']});

//foreach loop to iterate over array of pokemon objects
pokemonRepository.getAll().forEach(function(pokemon){
  document.write('<p>' + 'Name: ' + pokemon.name + ', ' + 'height: ' + pokemon.height + ', ' + 'type: ' + pokemon.type + '</p>');
})

//filter by name from array of pokemon objects
let pokemonArray = pokemonRepository.filterByName({name: 'squirtle'});

pokemonArray.forEach(function(pokemon){
  document.write('<p>' + 'Name: ' + pokemon.name + ', ' + 'height: ' + pokemon.height + ', ' + 'type: ' + pokemon.type + '</p>');
})

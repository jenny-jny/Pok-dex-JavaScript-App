//array of pokemon objects
let pokemonList = [{name : 'bulbasaur', height : 7, type : ['grass', 'poison']}, {name : 'charmander', height : 6, type : ['fire']}, {name : 'squirtle', height : 5, type : ['water']}];

//iterate over array of pokemon objects
for(let i = 0; i < pokemonList.length; i++){
  //big pokemons have height above 6
  if(pokemonList[i].height > 6){
    document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Wow, that\'s big!' + '</p>');
  //average pokemons have height equal to 6
  }else if(pokemonList[i].height === 6){
    document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Wow, that\'s average!' + '</p>');
  //small pokemons have height below 6
  }else {
    document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Wow, that\'s small!' + '</p>');
  }
}
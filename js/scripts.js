let pokemonList = [{name : 'bulbasaur', height : 7, type : ['grass', 'poison']}, {name : 'charmander', height : 6, type : 'fire'}, {name : 'squirtle', height : 5, type : 'water'}];

for(let i = 0; i < pokemonList.length; i++){
  console.log(pokemonList[i].name + '(height: ' + pokemonList[i].height + ')');
}
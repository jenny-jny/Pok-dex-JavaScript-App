let pokemonList = [{name : Bulbasaur, height : 7, type : ['grass', 'poison']}, {name : Charmander, height : 6, type : 'fire'}, {name : squirtle, height : 5, type : water}];

for(let i = 0; i < pokemonList.length; i++){
  document.write(pokemonList[i].name + '(height: ' + pokemonList[i].height + ')');
}
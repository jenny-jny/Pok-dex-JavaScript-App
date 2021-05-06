//IIFE array of pokemon objects
let pokemonRepository = (function(){
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList
  };
})()

//foreach loop to iterate over array of pokemon objects
pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
})

//add pokemon to array of pokemon objects
pokemonRepository.add({name: 'caterpie', height: 3, type: ['bug']});
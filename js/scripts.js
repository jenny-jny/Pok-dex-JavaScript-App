//IIFE array of pokemon objects
let pokemonRepository = (function(){
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //add pokemon to pokemon list after passing validations
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

  //get all pokemons from pokemon list
  function getAll(){
    return pokemonList;
  }

  //add buttons to list items then add list items to unordered pokemon list; call event listener
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

  //print pokemon name to console
  function showDetails(pokemon){
    console.log(pokemon.name);
  }

  //add event listener (to print pokemon  name to console) on clicking the button and print pokemon name to console
  function addEventListenerOnClick(button, pokemon){
    button.addEventListener('click', function(){
      showDetails(pokemon);
    })
  }

  //promise function: load pokemon name and details URL from pokeapi and call add function (to add pokemon to pokemon list after passing validations)
  function loadList(){
    return fetch(apiURL).then(function (response){
      return response.json();
    }).then(function(json){
      json.results.forEach(function(item){ //json.results (key)
        let pokemon = {
          name: item.name, //json.results.name (key)
          detailsUrl: item.url //json.results.url (key)
        };
        add(pokemon);
      });
    }).catch(function(e){
      console.error(e);
    })
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList
  };
})()

//add pokemon to array of pokemon objects
// pokemonRepository.add({name: 'caterpie', height: 3, type: ['bug']});

//load pokemons 
pokemonRepository.loadList().then(function(){
  //Now the data is loaded!
  //foreach loop to iterate over array of pokemon objects and add pokemon to pokemon list item
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  })
})
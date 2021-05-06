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
      // if(pokemonKeys.length === 3 && pokemonKeys[0] === 'name' && pokemonKeys[1] === 'height' && pokemonKeys[2] === 'type'){     
      //   pokemonList.push(pokemon);
      // }
      if(pokemonKeys.length === 2 && pokemonKeys[0] === 'name' && pokemonKeys[1] === 'detailsUrl'){     
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

  //call load details function on pokemon and print pokemon name to console
  function showDetails(pokemon){
    loadDetails(pokemon).then(function(){ //promise function
      console.log(pokemon);
    });
  }

  //add event listener (to print pokemon  name to console) on clicking the button and print pokemon name to console
  function addEventListenerOnClick(button, pokemon){
    button.addEventListener('click', function(){
      showDetails(pokemon);
    })
  }

  //promise function: load pokemon name and details URL from pokeapi and call add function (to add pokemon to pokemon list after passing validations)
  function loadList(){
    showLoadingMessage();
    return fetch(apiURL).then(function (response){
      return response.json();
    }).then(function(json){
      hideLoadingMessage();
      json.results.forEach(function(item){ //json.results (key)
        let pokemon = {
          name: item.name, //json.results.name (key)
          detailsUrl: item.url //json.results.url (key)
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function(e){
      hideLoadingMessage();
      console.error(e);
    })
  }
  //promise function: load pokemon image, height, types from pokemon results detailsUrl 
  function loadDetails(item){
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function(response){
      return response.json();
    }).then(function(details){
      hideLoadingMessage();
      //Now we add the details to the item
      item.imageUrl = details.sprites.front_default; 
      item.height = details.height; 
      // item.types = details.types;
      item.types = []; 
      details.types.forEach(function(type){ //details.types array not interfere with item.types array
        item.types.push(type);
      })
    }).catch(function(e){
      hideLoadingMessage();
      console.error(e);
    });
  }

  function showLoadingMessage(){
    let div = document.createElement('div');
    let p = document.createElement('p');
    let body = document.querySelector('body');
    let unorderedList = document.querySelector('.pokemon-list');

    p.innerText = 'Loading...';
    div.appendChild(p);
    body.insertBefore(p, unorderedList);
  }

  function hideLoadingMessage(){
    //debugger;
    let p = document.querySelector('p');
    p.parentElement.removeChild(p);
    // if(p !== null){ //if add multiple hideLoadingMessage() in then blocks in loadDetails() function and interfere w/ each other (execution)
    //   p.parentElement.removeChild(p);
    // }
    //p && p.parentElement.removeChild(p); //JavaScript syntax: equivalent to if p !== null{ line 109 - 111 } 
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage
  };
})()

//load pokemons 
pokemonRepository.loadList().then(function(){
  //Now the data is loaded!
  //foreach loop to iterate over array of pokemon objects and add pokemon to pokemon list item
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
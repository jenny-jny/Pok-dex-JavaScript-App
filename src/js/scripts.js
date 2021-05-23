/*global $*/
//IIFE array of pokemon objects
let pokemonRepository = (function(){
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function showLoadingMessage(){
    let div = $('<div class="loading-message-container"></div>');
    let p = $('<p>Loading...</p>');
    let unorderedList = $('.pokemon-list');

    $(div).append(p).insertBefore('.modal');
    $(unorderedList).insertBefore('.modal');
  }

  function hideLoadingMessage(){
    let p = $('.loading-message-container');
    $(p).remove();
  }

  //promise function: show loading message, hide loading message, load pokemon name and details URL from pokeapi and call add function (to add pokemon to pokemon list after passing validations)
  function loadList(){
    showLoadingMessage();
    return fetch(apiURL).then(function (response){
      return response.json();
    }).then(function(json){
      hideLoadingMessage();
      json.results.forEach(function(pokemonItem){ //json.results (key)
        let pokemon = {
          name: pokemonItem.name, //json.results.name (key)
          detailsUrl: pokemonItem.url //json.results.url (key)
        };
        add(pokemon);
      });
    }).catch(function(e){
      hideLoadingMessage();
      console.error(e);
    })
  }

  //add pokemon to pokemon list after passing validations
  function add(pokemon){
    //validate if the pokemon is an object
    if(typeof pokemon === 'object' && pokemon !== null){
      //validate if the parameters of pokemon has the correct keys
      let pokemonKeys = Object.keys(pokemon);
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
  function addListItem(pokemon, div){
    let listItem = $('<li>');
    $(listItem).addClass('list-group-item col-lg-2 col-md-4 col-sm-12');

    let button = $('<button>' + pokemon.name + '</button>');
    $(button).addClass('pokemon-list-button btn');
    $(button).attr('data-toggle', 'modal');
    $(button).attr('data-target', '#pokemonModal');
  
    $(listItem).append(button);
    $(div).append(listItem);

    addEventListenerOnClick(button, pokemon);
  }

  //add event listener on clicking the button to show details of pokemon
  function addEventListenerOnClick(button, pokemon){
    $(button).on('click', function(){
      showDetails(pokemon);
    })
  }

  //call load details function on pokemon, show modal with pokemon name, height, and image, and print pokemon details to console
  function showDetails(pokemon){
    loadDetails(pokemon).then(function(){ //promise function
      showModal(pokemon); 
      console.log(pokemon);
    });
  }
      
  //promise function: load pokemon image, height, types from pokemon results detailsUrl 
  function loadDetails(pokemon){
    showLoadingMessage();
    let url = pokemon.detailsUrl;
    return fetch(url).then(function(response){
      return response.json();
    }).then(function(details){
      hideLoadingMessage();
      //Now we add the details to the pokemon
      pokemon.frontImageUrl = details.sprites.front_default; 
      pokemon.backImageUrl = details.sprites.back_default; 
      pokemon.height = details.height; 
      pokemon.weight = details.weight; 
      pokemon.types = []; 
      details.types.forEach(function(types){ //details.types array not interfere with pokemon.types array
        pokemon.types.push(types.type.name);
      })
      pokemon.abilities = []; 
      details.abilities.forEach(function(abilities){ //details.types array not interfere with pokemon.abilities array
        pokemon.abilities.push(abilities.ability.name);
      })
    }).catch(function(e){
      hideLoadingMessage();
      console.error(e);
    });
  }

  function showModal(pokemon){
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    //clear existing content of modal 
    modalTitle.empty();
    modalBody.empty();

    //create modal elements using jQuery
    let pokemonName = $('<h1>' + pokemon.name + '</h1>');
    let pokemonFrontImage = $('<img class="modal-img" style="width:30%">');
    pokemonFrontImage.attr('src', pokemon.frontImageUrl);
    let pokemonBackImage = $('<img class="modal-img" style="width:30%">');
    pokemonBackImage.attr('src', pokemon.backImageUrl);
    let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');
    let pokemonWeight = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');
    let pokemonTypes = $('<p>' + 'Types: ' + pokemon.types + '</p>');
    let pokemonAbilities = $('<p>' + 'Abilities: ' + pokemon.abilities + '</p>');

    modalTitle.append(pokemonName);
    modalBody.append(pokemonFrontImage);
    modalBody.append(pokemonBackImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonTypes);
    modalBody.append(pokemonAbilities);
  }

  //filter by name from array of pokemon objects
  function filterByName(pokemon){
    return pokemonList.filter(pokemon1 => pokemon1.name === pokemon.name); //pokemon1 is an pokemon object in the pokemon array
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    showModal: showModal,
    filterByName: filterByName
  };
})();

//load pokemons 
pokemonRepository.loadList().then(function(){
  //Now the data is loaded!
  //foreach loop to iterate over array of pokemon objects and add pokemon to pokemon list item
  let div = null;
  pokemonRepository.getAll().forEach(function(pokemon, index){
    let container = $('.pokemon-list');
    if(index === 0){
      div = $('<div class="row"></div>');
      container.append(div);
    }
    pokemonRepository.addListItem(pokemon, div);
  });
});

//filter by name from array of pokemon objects
let pokemonArray = pokemonRepository.filterByName({name: 'squirtle'});

pokemonArray.forEach(function(pokemon){
  console.log('<p>' + 'Name: ' + pokemon.name + ', ' + 'height: ' + pokemon.height + ', ' + 'type: ' + pokemon.type + '</p>');
});
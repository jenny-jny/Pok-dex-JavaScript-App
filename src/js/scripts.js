//IIFE array of pokemon objects
const pokemonRepository = (function(){
  const pokemonList = [];
  const apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function showLoadingMessage(){
    const div = document.createElement('div');
    div.classList.add('loading-message-container');

    const p = document.createElement('p');
    p.classList.add('loading-message');
    p.innerText = 'Loading...';

    const main = document.querySelector('main');
    const unorderedList = document.querySelector('.pokemon-list');

    div.appendChild(p);
    main.insertBefore(div, unorderedList);
  }

  function hideLoadingMessage(){
    const p = document.querySelector('.loading-message');
    p.parentElement.removeChild(p);
  }

  //promise function: show loading message, hide loading message, load pokemon name and details URL from pokeapi and call add function (to add pokemon to pokemon list after passing validations)
  function loadList(){
    showLoadingMessage();
    return fetch(apiURL).then(function (response){
      return response.json();
    }).then(function(json){
      hideLoadingMessage();
      json.results.forEach(function(pokemonItem){ //json.results (key)
        const pokemon = {
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
      const pokemonKeys = Object.keys(pokemon);
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
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'col-lg-2', 'col-md-4', 'col-sm-12');

    const button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-list-button', 'btn');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');

    listItem.appendChild(button);
    div.appendChild(listItem);

    addEventListenerOnClick(button, pokemon);
  }

  //add event listener on clicking the button to show details of pokemon
  function addEventListenerOnClick(button, pokemon){
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
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
    const url = pokemon.detailsUrl;
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
    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body');

    //clear existing content of modal 
    modalTitle.innerText = '';
    modalBody.innerText = '';

    //create modal elements
    const pokemonName = document.createElement('h1');
    pokemonName.innerText = pokemon.name;
    const pokemonFrontImage = document.createElement('img');
    pokemonFrontImage.classList.add('modal-img');
    pokemonFrontImage.setAttribute('src', pokemon.frontImageUrl);
    const pokemonBackImage = document.createElement('img');
    pokemonBackImage.classList.add('modal-img');
    pokemonBackImage.setAttribute('src', pokemon.backImageUrl);
    const pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = 'Height: ' + pokemon.height;
    const pokemonWeight = document.createElement('p');
    pokemonWeight.innerText = 'Weight: ' + pokemon.weight;
    const pokemonTypes = document.createElement('p');
    pokemonTypes.innerText = 'Types: ' + pokemon.types;
    const pokemonAbilities = document.createElement('p');
    pokemonAbilities.innerText = 'Abilities: ' + pokemon.abilities;

    modalTitle.appendChild(pokemonName);
    modalBody.appendChild(pokemonFrontImage);
    modalBody.appendChild(pokemonBackImage);
    modalBody.appendChild(pokemonHeight);
    modalBody.appendChild(pokemonWeight);
    modalBody.appendChild(pokemonTypes);
    modalBody.appendChild(pokemonAbilities);
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
  const div = document.createElement('div'); //???????????????????????????????????????????????????????????????????????????????
  pokemonRepository.getAll().forEach(function(pokemon, index){
    const container = document.querySelector('.pokemon-list');
    if(index === 0){
      div.classList.add('row');
      container.appendChild(div);
    }
    pokemonRepository.addListItem(pokemon, div);
  });
});
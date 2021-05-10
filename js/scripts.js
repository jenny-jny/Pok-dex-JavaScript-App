//IIFE array of pokemon objects
let pokemonRepository = (function(){
  let pokemonList = [];
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('.modal-container');

  function showLoadingMessage(){
    let div = document.createElement('div');

    let p = document.createElement('p');
    p.classList.add('loading-message')
    p.innerText = 'Loading...';

    let body = document.querySelector('body');
    let unorderedList = document.querySelector('.pokemon-list');

    div.appendChild(p);
    body.insertBefore(div, unorderedList);
  }

  function hideLoadingMessage(){
    let p = document.querySelector('.loading-message');
    p.parentElement.removeChild(p);
  }

  //promise function: show loading message, hide loading message, load pokemon name and details URL from pokeapi and call add function (to add pokemon to pokemon list after passing validations)
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

  //add event listener on clicking the button to show details of pokemon
  function addEventListenerOnClick(button, pokemon){
    button.addEventListener('click', function(){
      showDetails(pokemon);
    })
  }

  //call load details function on pokemon, show modal with pokemon name, height, and image, and print pokemon details to console
  function showDetails(pokemon){
    loadDetails(pokemon).then(function(){ //promise function
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl); 
      console.log(pokemon);
    });
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
      item.types = []; 
      details.types.forEach(function(type){ //details.types array not interfere with item.types array
        item.types.push(type);
      })
    }).catch(function(e){
      hideLoadingMessage();
      console.error(e);
    });
  }

  //show modal with pokemon name, height, and image
  function showModal(name, height, img){
    modalContainer.classList.add('is-visible');

    //clear all existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    //add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    let nameElement = document.createElement('h1');
    nameElement.innerText = name;

    let heightElement = document.createElement('p');
    heightElement.innerText = height;

    let imgContainer = document.createElement('div');
    let imgElement = document.createElement('img');
    imgElement.src = img;
    imgContainer.appendChild(imgElement);

    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(heightElement);
    modal.appendChild(imgContainer);
    modalContainer.appendChild(modal);
  }

  function hideModal(){
    modalContainer.classList.remove('is-visible');
  }

  //hide modal upon pressing esc
  window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
      hideModal();
    }
  });

  //hide modal upon clicking the modal overlay
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if(target === modalContainer){
      hideModal();
    }
  });

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
    hideModal: hideModal
  };
})();

//load pokemons 
pokemonRepository.loadList().then(function(){
  //Now the data is loaded!
  //foreach loop to iterate over array of pokemon objects and add pokemon to pokemon list item
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
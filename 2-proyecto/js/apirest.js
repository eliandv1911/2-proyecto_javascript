// Crear las referencias
const rowCards = document.querySelector('#rowCards');
const formData = document.querySelector('#formData');

// las peticiones al Api

// Todos los personajes
const getCharacters = async () => {
    try {
        const response = await fetch("https://rickandmortyapi.com/api/character");
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }    
};

// Buscando por nombre del personaje
const getCharacterName = async (nameCharacter) => {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${nameCharacter}`);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
    
};

//limpiar el row
const cleanRow = () => {
    rowCards.innerHTML = '';
  }
// funcion que sea el punto de arranque
const init = async () => {
    const characters = await getCharacters();
    // getCharacters().then(r => console.log(r)); // la linea anterior tambien se puede hacer de esta manera
    console.log(characters.results);
    // funcion para crear las primeras 20 cards
    createCards(characters.results);
};

init(); // llamada a la funcion que inicia la aplicacion

/* Fin de las peticiones */

// crear una tarjeta con boostrap (card)

cardCharacter = (character) => {
    // creamos los elementos html
    const cardBootstrap = document.createElement('div');
    const imgCard = document.createElement('img');
    const cardBody =document.createElement('div');
    const titleCharacter = document.createElement('h5');
    const btnByIdCharacter = document.createElement('a');

    // textos a los elementos
    const nameCharacter = document.createTextNode(character.name);
    const textButtonCharacter = document.createTextNode('Ir al personaje');

    // Añandir las clases a los elementos html
    cardBootstrap.classList.add('card', 'mt-4', 'col-sm-3', 'col.md-12'); // se añaden dos clases
    imgCard.classList.add('card-image-top', 'mt-2');
    cardBody.classList.add('card-body');
    titleCharacter.classList.add('card-title', 'text-center');
    btnByIdCharacter.classList.add('btn', 'btn-secondary', 'mb-2');

    // añadir el href
    btnByIdCharacter.href = `personaje.html?id=${character.id}`; //revisar

    // añadir los textos
    titleCharacter.appendChild(nameCharacter); // añade el nombre del personaje
    btnByIdCharacter.appendChild(textButtonCharacter); // añade ir al personaje
    imgCard.src = character.image; // añade la imagen

    // Terminar con el renderizado
    cardBootstrap.append(imgCard, cardBody, btnByIdCharacter); // se añade la imagen, cardbody y el boton
    cardBody.append(titleCharacter); // se añade el nombre (h5)
    rowCards.append(cardBootstrap);
};
/*
<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
*/

const createCards = (characters) => {
    characters.map(personaje => cardCharacter(personaje));
};

// formulario de busqueda de personaje

formData.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault(); // evitar el reload de la pagina al presionar el boton buscar
    console.log(this); // this es el formulario
    const form = new FormData(this);

    // limpieza de los 20 primeros personajes
    cleanRow();
    //console.log(form.get('character')); // obtener el texto del imput del formulario

    getCharacterName(form.get('character')).then( data => createCards(data.results)).catch(err => console.error(err));
}
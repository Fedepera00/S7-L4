const PEXELS_URL = "https://api.pexels.com/v1/search?query=";
const API_KEY = "O9ev9qascg5vL5DL1TUyP1tr8PTYVxws9cMWHBYZkZF6GrJWsiOHI6fy";

// Funzione per riempire l'immagine nel modale al clic del bottone "View"
const fillImageInModal = function (context) {
  // Trova la card più vicina e seleziona l'immagine al suo interno
  const card = context.closest(".card");
  const imgSrc = card.querySelector("img").src;

  let imgIntoModal = document.querySelector(".modal img");
  imgIntoModal.src = imgSrc;
};

// Funzione per nascondere una colonna (card) al clic del bottone "Hide"
const hideColumn = function (context) {
  // Trova la card più vicina e la rimuove
  const card = context.closest(".col-md-4");
  card.remove();
};

// Funzione per generare e visualizzare le card delle immagini
const renderCards = function (photos) {
  let row = document.querySelector(".album .container .row");
  row.innerHTML = ""; // Svuota il contenuto precedente della riga

  // Itera su ogni immagine ottenuta dalla risposta API
  photos.forEach((photo) => {
    // Template HTML per ogni immagine (card)
    let colTemplate = `
    <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
        <a href="./pexels-details.html?photoId=${photo.id}">
            <img src=${photo.src.small} style="width: 100%" />
        </a>
            <div class="card-body">
            <a href="./pexels-details.html?photoId=${photo.id}">
                <h5 class="card-title">Lorem Ipsum</h5>
            </a>
                <p class="card-text">This content is a little bit longer.</p>
                <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onclick="fillImageInModal(this)"
                    >
                        View
                    </button>
                    <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                    onclick="hideColumn(this)"
                    >
                    Hide
                    </button>
                </div>
                <small class="text-muted">${photo.id}</small>
                </div>
            </div>
        </div>
    </div>
    `;
    // Aggiunge ogni card generata alla riga
    row.innerHTML += colTemplate;
  });
};

// Funzione per fare una richiesta all'API di Pexels con una query specifica
const getImages = function (query) {
  fetch(PEXELS_URL + query, {
    headers: {
      authorization: API_KEY
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json(); // Converte la risposta in formato JSON
      } else {
        throw new Error("Error getting the images");
      }
    })
    .then((data) => {
      console.log(data); // Stampa i dati ottenuti nella console per il debug
      renderCards(data.photos); // Passa le immagini alla funzione renderCards
    })
    .catch((err) => {
      console.log(err);
    });
};

window.onload = function () {
  let primaryButton = document.querySelector(".btn-primary");
  primaryButton.addEventListener("click", () => {
    getImages("urus");
  });

  let secondaryButton = document.querySelector(".btn-secondary");
  secondaryButton.addEventListener("click", () => {
    getImages("ferrari");
  });

  // Seleziona il campo di input e il bottone di ricerca
  let customInputField = document.querySelector(".input-group .form-control");
  let customSearchButton = document.querySelector(".input-group .btn-outline-secondary");

  // Event listener per il bottone di ricerca
  customSearchButton.addEventListener("click", () => {
    console.log(customInputField.value);
    getImages(customInputField.value);
  });
};

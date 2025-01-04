const APILINK =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=968824c7f13799c77c13cf43251e75fe&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=968824c7f13799c77c13cf43251e75fe&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

// Diplays all movies when page is first opened
returnMovies(APILINK);

// Function to create movie cards based on url
function returnMovies(url) {
  // Gets data from url
  fetch(url)
    // Converts data to JSON
    .then((res) => res.json())
    .then(function (data) {
      data.results.forEach((element) => {
        // Creates HTML elements and assigns attributes
        const div_card = document.createElement("div");
        div_card.setAttribute("class", "card");

        const div_row = document.createElement("div");
        div_row.setAttribute("class", "row");

        const div_column = document.createElement("div");
        div_column.setAttribute("class", "column");

        const image = document.createElement("img");
        image.setAttribute("class", "thumbnail");
        image.setAttribute("id", "image");

        const title = document.createElement("h3");
        title.setAttribute("id", "title");

        const center = document.createElement("center");

        // Set movie title and thumbnail to elements
        title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`;
        image.src = IMG_PATH + element.poster_path;

        // Moves elements to proper level
        center.appendChild(image);
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);
        main.appendChild(div_row);
      });
    });
}

// Checks if user submits search
form.addEventListener("submit", (e) => {
  // Prevents form from submitting (allows for custom form handling)
  e.preventDefault();

  // Clears all current movies showing
  main.innerHTML = "";

  // Assigns input from search bar
  const searchItem = search.value;

  // If valid search, show searched movies and clear search bar
  if (searchItem) {
    returnMovies(SEARCH_API + searchItem);
    search.value = "";
  }
});

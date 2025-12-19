const API_KEY = "bf8b0f0";
const search = document.getElementById("search-input");
const form = document.getElementById("search-bar");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search.value}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      MovieDisplay(data.Search);
    });
});

function MovieDisplay(array) {
  const main_movies = document.getElementById("movies");
  main_movies.innerHTML = "";

  for (let movies of array) {
    main_movies.innerHTML += `
      <div class="movie-card">
        <img
          class="movie-poster"
          src="${movies.Poster}"
          alt="${movies.Title}"
        />

        <div class="movie-info">
          <div class="movie-header">
            <h3 class="movie-title">${movies.Title}</h3>
            <span class="movie-rating">⭐ N/A</span>
          </div>

          <p class="movie-meta">${movies.Year}</p>

          <p class="movie-plot">
            Movie description not loaded yet.
          </p>

          <button class="watchlist-btn">+ Watchlist</button>
        </div>
      </div>
    `;
  }
}

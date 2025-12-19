const API_KEY = "bf8b0f0";
const search = document.getElementById("search-input");
const form = document.getElementById("search-bar");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search.value}`)
    .then((response) => response.json())
    .then((data) => {
      MovieDisplay(data.Search);
    });
});

function MovieDisplay(array) {
  const main_movies = document.getElementById("movies");
  main_movies.innerHTML = "";

  for (let movies of array) {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movies.imdbID}`)
      .then((response) => response.json())
      .then((details) => {
        main_movies.innerHTML += `
          <div data-card="${movies.imdbID}">
            <img
              data-poster
              src="${movies.Poster}"
              alt="${movies.Title}"
            />

            <div data-info>
              <div data-header>
                <h3 data-title>${movies.Title}</h3>
                <span data-rating>⭐ ${details.imdbRating}</span>
                <button data-watchlist="${movies.imdbID}">
                  + Watchlist
                </button>
              </div>

              <p data-meta>
                ${details.Runtime} · ${details.Genre}
              </p>

              <p data-plot>
                ${details.Plot}
              </p>
            </div>
          </div>
        `;
      });
  }
}

document.getElementById("movies").addEventListener("click", function (e) {
  if (e.target.dataset.watchlist) {
    const imdbID = e.target.dataset.watchlist;

    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    if (!watchlist.includes(imdbID)) {
      watchlist.push(imdbID);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }

    // 👇 UI FEEDBACK (this is new)
    e.target.textContent = "✓ Added";
    e.target.setAttribute("data-added", "true");
    e.target.disabled = true;
  }
});

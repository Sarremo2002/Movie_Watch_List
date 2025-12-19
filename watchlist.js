const API_KEY = "bf8b0f0";

const list = document.getElementById("watchlist-movies");
const empty = document.getElementById("empty-state");

const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

if (watchlist.length === 0) {
  empty.style.display = "flex";
} else {
  document.getElementById("empty-state").style.display = "none";
  Showlist();
}

function Showlist() {
  list.innerHTML = "";

  for (let imdbID of watchlist) {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`)
      .then((response) => response.json())
      .then((details) => {
        list.innerHTML += `
          <div data-card="${imdbID}">
            <img
              data-poster
              src="${details.Poster}"
              alt="${details.Title}"
            />

            <div data-info>
              <div data-header>
                <h3 data-title>${details.Title}</h3>
                <span data-rating>⭐ ${details.imdbRating}</span>
                <button data-remove="${imdbID}">
                  − Remove
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

list.addEventListener("click", function (e) {
  if (e.target.dataset.remove) {
    const idToRemove = e.target.dataset.remove;

    const updatedWatchlist = watchlist.filter((id) => id !== idToRemove);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));

    location.reload();
  }
});

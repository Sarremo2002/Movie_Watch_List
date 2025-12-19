const API_KEY = "bf8b0f0";
const search = document.getElementById("search-input");
const form = document.getElementById("search-bar");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});

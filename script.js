const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(searchInput);
});

// ? GENERATE THE MOVIES BY SEARCH
function generateMovieDetails() {
  try {
    fetch("http://www.omdbapi.com/?apikey=2e18f3c6&s=god+of+war")
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          data.Search.forEach((movie) => {
            getIdmbID(movie.imdbID);
          });
        }
      });
  } catch (err) {
    console.log("No movie found", data.Error);
  }
}

generateMovieDetails();

// ? GET THE DETAILS OF THE MOVIE WITH THEIR IDMBID
function getIdmbID(idmbId) {
  try {
    fetch(`http://www.omdbapi.com/?apikey=2e18f3c6&i=${idmbId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  } catch (err) {
    console.log(err);
  }
}

// ? DISPLAY THE GENERATED MOVIES TO THE DOM
function displayMovies(movies) {
  let html = "";

  if(movies.Poster === 'N/A') {
    html = `
    <div class="main-image">
            <img
              src="${}"
              alt=""
            />
          </div>
    `
  }
}

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const mainSectionEl = document.getElementById("main-section");
const startExploring = document.getElementById("start-exploring");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchValue = searchInput.value;
  mainSectionEl.innerHTML = "";
  startExploring.style.display = "none";
  generateMovieDetails(searchValue);
  searchInput.value = "";
});

// ? GENERATE THE MOVIES BY SEARCH
function generateMovieDetails(searchedMovie) {
  try {
    fetch(`http://www.omdbapi.com/?apikey=2e18f3c6&s=${searchedMovie}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          data.Search.forEach((movie) => {
            getIdmbID(movie.imdbID);
          });
        } else {
          console.log();
        }
      });
  } catch (err) {
    console.log("No movie found", data.Error);
  }
}

// ? GET THE DETAILS OF THE MOVIE WITH THEIR IDMBID
function getIdmbID(idmbId) {
  try {
    fetch(`http://www.omdbapi.com/?apikey=2e18f3c6&i=${idmbId}`)
      .then((res) => res.json())
      .then((data) => {
        displayMovies(data);
      });
  } catch (err) {
    console.log(err);
  }
}

// ? DISPLAY THE GENERATED MOVIES TO THE DOM
function displayMovies(movies) {
  let html = "";

  if (movies.Poster === "N/A") {
    html = `
    <div class="main-image">
            <img
              src="${"./imgs/defaultImage.jpg"}"
              alt="No poster for this movie"
            />
          </div>
    `;
  } else {
    html = `
    <div class="main-image">
            <img
              src="${movies.Poster}"
              alt="An artwork for ${movies.Poster}"
            />
          </div>
    `;
  }

  mainSectionEl.innerHTML += `
  <div class="box">
    ${html}

    <div class="texts">
              <div class="text-header">
                <h2>${movies.Title}</h2>
                <small>${movies.Year}</small>

                <div class="ratings">
                  <i class="bx bxs-star"></i>
                  <p>${movies.imdbRating}</p>
                </div>
              </div>

              <div class="text-sub-heading">
                <p>${movies.Runtime}</p>
                <small>${movies.Genre}</small>

                <div class="watchlist">
                  <i class="bx bxs-plus-circle"></i>
                  <h4>Watchlist</h4>
                </div>
              </div>

              <div class="text-plot">
                <p>
                ${movies.Plot}
                </p>
              </div>
            </div>
            </div>
    `;
}

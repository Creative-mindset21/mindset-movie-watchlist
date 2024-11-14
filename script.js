const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const mainSectionEl = document.getElementById("main-section");
const startExploring = document.getElementById("start-exploring");
const errorMessageEl = document.getElementById("error-message");
const themeBtnEl = document.getElementById("theme-btn");
const bodyEl = document.querySelector("body");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchValue = searchInput.value;
  mainSectionEl.innerHTML = "";
  searchInput.value = "";

  startExploring.style.display = "none";
  errorMessageEl.style.display = "none";

  generateMovieDetails(searchValue);
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
          errorMessageEl.style.display = "block";
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

// ? CHANGE THE THEME OF THE WEBSITE
themeBtnEl.addEventListener("click", () => {
  bodyEl.classList.toggle("dark");

  if (bodyEl.classList.contains("dark")) {
    themeBtnEl.innerHTML = `<i class="bx bxs-sun"></i>`;
    localStorage.setItem("currentTheme", "dark");
  } else {
    themeBtnEl.innerHTML = `<i class="bx bxs-moon"></i>`;
    localStorage.setItem("currentTheme", "light");
  }
});

bodyEl.className = localStorage.getItem("currentTheme");

if (bodyEl.classList.contains("dark")) {
  themeBtnEl.innerHTML = `<i class="bx bxs-sun"></i>`;
  localStorage.setItem("currentTheme", "dark");
} else {
  themeBtnEl.innerHTML = `<i class="bx bxs-moon"></i>`;
  localStorage.setItem("currentTheme", "light");
}

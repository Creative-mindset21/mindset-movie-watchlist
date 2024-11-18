const displayMessageEl = document.getElementById("display-message");

//! DISPLAY MOVIES FROM LOCAL STORAGE
function displayWatchlist() {
  const watchlistContainer = document.getElementById("main-section");
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  watchlistContainer.innerHTML = "";

  //? Check if the watchlist is empty
  if (watchlist.length === 0) {
    displayMessageEl.style.display = "flex";
    return;
  }

  // Loop through each movie and create HTML elements
  watchlist.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("box");

    movieElement.innerHTML = `
            <div class="main-image">
                <img src="${movie.poster}" alt="An artwork for ${movie.title}" />
            </div>
            <div class="texts">
                <div class="text-header">
                    <h2>${movie.title}</h2>
                    <small>${movie.year}</small>
                    <div class="ratings">
                        <i class="bx bxs-star"></i>
                        <p>${movie.rating}</p>
                    </div>
                </div>

                <div class="text-sub-heading">
                        <p>${movie.runtime}</p>
                        <small>${movie.genre}</small>

                        <div class="remove" data-imdb-id="${movie.imdbID}">
                            <i class='bx bxs-minus-circle'></i>
                            <h4>Remove</h4>
                        </div>
                </div>

                <div class="text-plot">
                    <p>${movie.plot}</p>
                </div>
            </div>
        `;

    const removeButton = movieElement.querySelector(".remove");
    removeButton.addEventListener("click", () =>
      removeFromWatchlist(movie.imdbID)
    );

    watchlistContainer.appendChild(movieElement);
  });
}

// Function to remove a movie from the watchlist
function removeFromWatchlist(imdbID) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const updatedWatchlist = watchlist.filter((movie) => movie.imdbID !== imdbID);

  // Update local storage
  localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));

  // Refresh the display
  displayWatchlist();
}

// Call the function to display the watchlist on page load
document.addEventListener("DOMContentLoaded", displayWatchlist);

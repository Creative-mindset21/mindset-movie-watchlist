const displayMessageEl = document.getElementById("display-message");

// Function to display movies from local storage
function displayWatchlist() {
  const watchlistContainer = document.getElementById("main-section");
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  // Check if the watchlist is empty
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

                        <div class="watchlist">
                            <i class='bx bxs-minus-circle'></i>
                            <h4>Remove</h4>
                        </div>
                </div>

                <div class="text-plot">
                    <p>${movie.plot}</p>
                </div>
            </div>

            
           
        `;

    watchlistContainer.appendChild(movieElement);
  });
}

// Call the function to display the watchlist on page load
document.addEventListener("DOMContentLoaded", displayWatchlist);

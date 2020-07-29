import { elements } from "./base";

export const renderMovie = (movie) => {
  const markup = `
        <figure class="movie__fig">
            <img src="${movie.poster}" alt="poster" class="movie__img">
            <div class="movie__data">
                <h1 class="movie__title">${movie.title}</h1>
                <span><b>Country</b>: ${movie.country}</span>
                <span><b>Year</b>: ${movie.year}</span>
                <span><b>Genre</b>: ${movie.genre}</span>
                <span><b>Director</b>: ${movie.director}</span>
                <span><b>Actors</b>: ${movie.actors}</span>
                <div class ="ratings">
                    <span><b>IMDB:</b> <span style="color:${movie.imdbRating[1]}"><b>${movie.imdbRating[0]}</b></span></span>
                    <span><b>Rotten Tomatoes</b>: <span style="color:${movie.RTRating[1]}"><b>${movie.RTRating[0]}</b></span></span>
                    <span><b>Metascore</b>: <span style="color:${movie.MSRating[1]}"><b>${movie.MSRating[0]}</b></span></span>
                </div>
                
            </div>
        </figure>
        <div class="movie__details">
            <span class="movie__info"><i>${movie.plot}</i></span>
        </div>
        <button class="movie__love"> + Add to watchlist</button>
    `;

  elements.movie.insertAdjacentHTML("afterbegin", markup);
};

export const clearMovie = () => {
  elements.movie.innerHTML = "";
};

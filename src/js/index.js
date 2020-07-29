import Search from "./models/Search";
import Movie from "./models/Movie";
import * as searchView from "./views/searchView";
import * as movieView from "./views/movieView";
import * as watchlist from "./views/watchlistView";
import { elements, renderLoader, clearLoader } from "./views/base";

const state = { sortBy: "rating" };

// SEARCH CONTROLLER

const controlSearch = async () => {
  // 1. Get title from view
  const title = searchView.getInput();

  if (title) {
    state.search = new Search(title);
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResult);

    await state.search.getResults();
    const data = state.search.data;
    if (data) searchView.renderResults(state.search.data);
    else searchView.showMessage("Nothing has been found");
    clearLoader();
  }
};

elements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click", (event) => {
  const btn = event.target.closest(".btn-inline");

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.data, goToPage);
  }
});

// MOVIE CONTROLLER

const controlMovie = async () => {
  // Get ID from URL
  const id = window.location.hash.replace("#", "");

  if (id) {
    // Prepare UI for changes
    movieView.clearMovie();
    renderLoader(elements.movie);

    // Creare new movie object
    state.movie = new Movie(id);

    try {
      // Get movie data
      await state.movie.getMovie();
      clearLoader();
      // Render movie
      movieView.renderMovie(state.movie);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
};

elements.movie.addEventListener("click", (event) => {
  if (!event.target.closest(".movie__love")) return;
  watchlist.add(state.movie);
  state.sortBy === "rating"
    ? watchlist.sortByRating(state.sortBy)
    : watchlist.sortByYear(state.sortBy);
});

// WATCHLIST CONTROLLER

const initWatchlist = () => {
  if (watchlist.watchlist.length === 0) return;
  watchlist.sortByRating(state.sortBy);
};

elements.watchlistBtnContainer.addEventListener("click", (event) => {
  const btn = event.target.closest(".btn-inline");

  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    watchlist.clearResults();
    watchlist.renderResults(watchlist.watchlist, goToPage);
  }
});

elements.watchlist.addEventListener("click", (event) => {
  const btn = event.target.closest(".delete__btn");

  if (btn) {
    let movieID = btn.parentElement.href.match(/tt\d{7}/)[0];
    watchlist.deleteMovie(movieID);
    event.preventDefault();
  }
});

// sort
elements.yearSortBtn.addEventListener("click", () => {
  watchlist.sortByYear();
  state.sortBy = "year";
});

elements.ratingSortBtn.addEventListener("click", () => {
  watchlist.sortByRating();
  state.sortBy = "rating";
});

window.addEventListener("hashchange", controlMovie);
window.addEventListener("load", () => {
  controlMovie();
  initWatchlist();
});
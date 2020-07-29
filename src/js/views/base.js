export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchResultList: document.querySelector(".results__list"),
  searchResult: document.querySelector(".results"),
  searchResPages: document.querySelector(".results__pages"),
  movie: document.querySelector(".movie"),
  watchlist: document.querySelector(".watchlist__list"),
  watchlistBtnContainer: document.querySelectorAll(".results__pages")[1],
  yearSortBtn: document.getElementById("year"),
  ratingSortBtn: document.getElementById("rating"),
};

export const elementStrings = {
  loader: "loader",
};

export const renderLoader = (parrent) => {
  const loader = `<div class="${elementStrings.loader}">Loading...</div>`;
  parrent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};

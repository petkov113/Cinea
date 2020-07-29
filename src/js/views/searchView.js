import { elements } from "./base";

export const getInput = () => elements.searchInput.value;
export const clearInput = () => (elements.searchInput.value = "");
export const clearResults = () => {
  elements.searchResultList.innerHTML = "";
  elements.searchResPages.innerHTML = "";
};

const renderMovie = (movie) => {
  const markup = `
    <li>
    <a class="results__link results__link--active" href="#${movie.imdbID}">
        <figure class="results__fig">
            <img src="${movie.Poster}" alt="Poster">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${movie.Title}</h4>
            <p class="results__info">${movie.Year}</p>
            <p class="results__info">${movie.Type}</p>
        </div>
    </a>
    </li>
    `;
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

// 'next' or 'prev'
const createButton = (page, type) => {
  return `
    <button class="btn-inline results__btn--${type}" data-goto=${
    type === "prev" ? page - 1 : page + 1
  }>
        <span> Page ${type === "prev" ? page - 1 : page + 1}</span>
        <svg class="search__icon"> 
            <use href="img/icons.svg#icon-triangle-${
              type === "prev" ? "left" : "right"
            }"></use>
        </svg>
    </button>
    `;
};

// pagination buttons
const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;

  if (page === 1 && pages > 1) {
    button = createButton(page, "next");
  } else if (page < pages) {
    button = `
             ${createButton(page, "next")}
             ${createButton(page, "prev")}`;
  } else if (page === pages && pages > 1) {
    button = createButton(page, "prev");
  }
  if (!button) return;
  elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

// resuts field
export const renderResults = (movies, page = 1, resPerPage = 4) => {
  // trimm the array
  const trimStart = (page - 1) * resPerPage;
  const trimEnd = page * resPerPage;

  let trimmedData = movies.slice(trimStart, trimEnd);
  trimmedData.forEach(renderMovie);

  // pagination buttons call
  renderButtons(page, movies.length, resPerPage);
};

export const showMessage = (message) => {
  elements.searchResultList.innerHTML = `<span>${message}</span>`;
};

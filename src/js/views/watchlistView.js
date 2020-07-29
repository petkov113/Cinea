import { elements } from './base'

export const watchlist = localStorage.getItem('watchList')
  ? JSON.parse(localStorage.getItem('watchList'))
  : []

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${
  type === 'prev' ? page - 1 : page + 1
}>
        <span> Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon"> 
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
    `

// pagination buttons
const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage)
  let button

  if (page === 1 && pages > 1) {
    button = createButton(page, 'next')
  } else if (page < pages) {
    button = `
             ${createButton(page, 'next')}
             ${createButton(page, 'prev')}`
  } else if (page === pages && pages > 1) {
    button = createButton(page, 'prev')
  }
  if (!button) return
  elements.watchlistBtnContainer.insertAdjacentHTML('beforeend', button)
}

// resuts field
export const renderResults = (movies, page = 1, resPerPage = 4) => {
  // trimm the array
  const trimStart = (page - 1) * resPerPage
  const trimEnd = page * resPerPage

  let trimmedData = movies.slice(trimStart, trimEnd)
  trimmedData.forEach((movie) => returnMarkup(movie))

  // pagination buttons call
  renderButtons(page, movies.length, resPerPage)
}

export const clearResults = () => {
  elements.watchlist.innerHTML = ''
  elements.watchlistBtnContainer.innerHTML = ''
}

export const returnMarkup = (movie) => {
  const markup = `
    <li>
    <a class="results__link results__link--active" href="#${movie.id}">
         <input type=button class="delete__btn" value="x"></input>
        <figure class="results__fig">
            <img src="${movie.poster}" alt="Poster">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${movie.title}</h4>
            <p class="results__author">${movie.year}</p>
            <p class="results__author" style="color: ${movie.imdbRating[1]}"> ${movie.imdbRating[0]}</p>
        </div>
    </a>
    </li>
`
  elements.watchlist.insertAdjacentHTML('beforeend', markup)
}

export const add = (movie) => {
  if (watchlist.some((el) => el.id === movie.id)) return

  watchlist.push(movie)
  clearResults()
  renderResults(watchlist)
  localStorage.setItem('watchList', JSON.stringify(watchlist))
}

export const deleteMovie = (ID) => {
  let itemIndex = watchlist.indexOf(watchlist.find((movie) => movie.id === ID))
  watchlist.splice(itemIndex, 1)
  localStorage.setItem('watchList', JSON.stringify(watchlist))
  clearResults()
  renderResults(watchlist)
}

export const sortByYear = () => {
  if (watchlist.length <= 1) return
  watchlist.sort((a, b) => b.year - a.year)
  clearResults()
  renderResults(watchlist)
}

export const sortByRating = () => {
  watchlist.sort((a, b) => b.imdbRating[0] - a.imdbRating[0])
  clearResults()
  renderResults(watchlist)
}

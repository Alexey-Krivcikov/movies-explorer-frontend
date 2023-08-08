import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useLocation } from 'react-router-dom';
import { NO_MOVIES_FOUND, SHOW_MORE } from '../../utils/config/constants';

function MoviesCardList({ isUserSearch, handleDeleteMovie, handleSaveMovie, visibleCards, handleShowMore, moviesCards, isMovieLoading }) {
  const { pathname } = useLocation();
  const savedMoviesFromStorage = JSON.parse(localStorage.getItem('savedMovies'))

  const moviesCardsItems = moviesCards.map(movieCard => {
    return (
      <li className='movie-card' key={movieCard?.id || movieCard._id}>
        <MoviesCard
          handleDeleteMovie={handleDeleteMovie}
          handleSaveMovie={handleSaveMovie}
          movieCard={movieCard}
          isSaved={savedMoviesFromStorage.some((savedMovie) => savedMovie.movieId === movieCard.id)}
        />
      </li>
    )
  })
  console.log(isUserSearch)

  return (
    <>
      <section className='movies-cards'>
        {pathname === '/movies' && (
          isUserSearch ? (
            isMovieLoading ?
              (<Preloader />) : (moviesCardsItems.length !== 0 ?
                (<ul className='movies-cards__list'>{moviesCardsItems.slice(0, visibleCards)}</ul>)
                : (<p className='movies-cards__not-found'>{NO_MOVIES_FOUND}</p>))
          ) : (null)
        )}
        {pathname === '/saved-movies' && (
          savedMoviesFromStorage.length !== 0 ? (
            moviesCardsItems.length !== 0 ?
              (<ul className='movies-cards__list'>{moviesCardsItems.slice(0, visibleCards)}</ul>)
              : (<p className='movies-cards__not-found'>{NO_MOVIES_FOUND}</p>)
          ) : (null)

        )}
      </section>
      {(moviesCards.length > visibleCards &&
        <button onClick={handleShowMore} className='movies__btn' type='button'>
          {SHOW_MORE}
        </button>
      )}
    </>

  )
}

export default MoviesCardList;
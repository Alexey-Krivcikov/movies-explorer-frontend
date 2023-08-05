import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ isUserSearchSuccess, savedMovies, handleDeleteMovie, handleSaveMovie, visibleCards, handleShowMore, moviesCards, isMovieLoading }) {
  const moviesCardsItems = moviesCards.map(movieCard => {
    return (
      <li className='movie-card' key={movieCard?.id || movieCard._id}>
        <MoviesCard
          handleDeleteMovie={handleDeleteMovie}
          handleSaveMovie={handleSaveMovie}
          movieCard={movieCard}
          isSaved={savedMovies.some((savedMovie) => savedMovie.movieId === movieCard.id)}
        />
      </li>
    )
  })

  return (
    <>
      <section className='movies-cards'>
        {isMovieLoading ? (
          <Preloader />
        ) : isUserSearchSuccess ? (
          <ul className='movies-cards__list'>{moviesCardsItems.slice(0, visibleCards)}</ul>
        ) : (
          <p className='movies-cards__not-found'>Фильмы не найдены</p>
        )}
      </section>
      {(moviesCards.length > visibleCards &&
        <button onClick={handleShowMore} className='movies__btn' type='button'>
          Ещё
        </button>
      )}
    </>

  )
}

export default MoviesCardList;
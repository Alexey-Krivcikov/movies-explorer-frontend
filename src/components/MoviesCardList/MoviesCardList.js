import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ visibleCards, handleShowMore, moviesCards, isMovieLoading }) {
  const moviesCardsItems = moviesCards.map(movieCard => {
    return (
      <li className='movie-card' key={movieCard.id}>
        <MoviesCard
          movieCard={movieCard} />
      </li>
    )
  })

  return (
    <>
      <section className='movies-cards'>
        {isMovieLoading ? (
          <Preloader />
        ) : moviesCards.length === 0 ? (
          <p className='movies-cards__not-found'>Фильмы не найдены</p>
        ) : (
          <ul className='movies-cards__list'>{moviesCardsItems.slice(0, visibleCards)}</ul>
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
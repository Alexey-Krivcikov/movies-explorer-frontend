import './MoviesCardList.css';
import { useLocation } from "react-router-dom";

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ moviesCards }) {
  const { pathname } = useLocation();
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
        {!moviesCards ?
          (<p className='movies-cards__not-found'>Фильмы не найдены</p>) :
          (<ul className='movies-card__list'>{moviesCardsItems}</ul>)
        }
      </section>
      {pathname === '/movies' && (<button className='movies__btn' type='button'>Ещё</button>)}
    </>

  )
}

export default MoviesCardList;
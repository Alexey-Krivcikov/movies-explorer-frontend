import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function MoviesCard({ movieCard }) {
  const { pathname } = useLocation();
  const [isLiked, setIsLiked] = useState(false);

  const savedMoviesPathName = pathname === '/saved-movies';
  const imageUrl = `https://api.nomoreparties.co/${movieCard.image.url}`;

  function handleCardLike() {
    setIsLiked(!isLiked);
  }

  function getTimeFromMins(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  };

  return (
    <>
      <a href={movieCard.trailerLink} target='_blank' rel="noreferrer">
        <img className='movie-card__image' src={imageUrl} alt={movieCard.nameRU}></img>
      </a>
      <div className='movie-card__container'>
        <h2 className='movie-card__title'>{movieCard.nameRU}</h2>
        {savedMoviesPathName ?
          <button className='movie-card__btn movie-card__btn_type_delete'></button> :
          <button onClick={handleCardLike} className={`movie-card__btn ${isLiked ? 'movie-card__btn_type_liked' : ''}`}></button>}

      </div>
      <p className='movie-card__duration'>{getTimeFromMins(movieCard.duration)}</p>
    </>
  )
}

export default MoviesCard;
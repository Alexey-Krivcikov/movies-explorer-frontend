import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BEAT_FILM_URL, MOVIE_HOUR, LOCAL_STORAGE_KEYS } from '../../utils/config/constants';

function MoviesCard({ isSaved, handleDeleteMovie, handleSaveMovie, movieCard }) {
  const { pathname } = useLocation();
  const [isSavedFilm, setSetSavedFilm] = useState(!!isSaved);
  const [movieId, setMovieId] = useState('');
  const savedMovies = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.SAVED_MOVIES));
  const savedMoviesPathName = pathname === '/saved-movies';

  const movie = {
    ...movieCard,
    image: savedMoviesPathName ? movieCard.image : `${BEAT_FILM_URL}${movieCard.image.url}`,
    thumbnail: movieCard.thumbnail || `${BEAT_FILM_URL}${movieCard.image.formats.thumbnail.url}`,
    movieId: movieCard.id,
  };

  function getTimeFromMins(mins) {
    const hours = Math.trunc(mins / MOVIE_HOUR);
    const minutes = mins % MOVIE_HOUR;
    return `${hours}ч ${minutes}м`;
  };

  function handleSaveFilm() {
    handleSaveMovie(movie);
    setSetSavedFilm(true)
  }

  function handleDeleteFilm() {
    handleDeleteMovie(movieId || movie._id);
    setSetSavedFilm(false)
  }

  useEffect(() => {
    const savedMovie = savedMovies.find(savedFilm => savedFilm?.movieId === movieCard.id)
    setMovieId(savedMovie?._id || '');
  }, [savedMovies, movieCard.id])

  return (
    <>
      <a href={movieCard.trailerLink} target='_blank' rel="noreferrer">
        <img className='movie-card__image' src={movie.image} alt={movieCard.nameRU}></img>
      </a>
      <div className='movie-card__container'>
        <h2 className='movie-card__title'>{movieCard.nameRU}</h2>
        {savedMoviesPathName ?
          <button
            onClick={handleDeleteFilm}
            type='button'
            className='movie-card__btn movie-card__btn_type_delete'
          ></button> :
          <button
            type='button'
            onClick={isSavedFilm ? handleDeleteFilm : handleSaveFilm}
            className={`movie-card__btn ${isSavedFilm ? 'movie-card__btn_type_liked' : ''}`}
          ></button>}

      </div>
      <p className='movie-card__duration'>{getTimeFromMins(movieCard.duration)}</p>
    </>
  )
}

export default MoviesCard;
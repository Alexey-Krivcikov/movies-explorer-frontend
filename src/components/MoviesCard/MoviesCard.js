import './MoviesCard.css';

function MoviesCard({ movieCard, isLiked, handleMovieLike }) {
  const imageUrl = `https://api.nomoreparties.co/${movieCard.image.url}`;


  function getTimeFromMins(mins) {
    const hours = Math.trunc(mins / 60);
    const minutes = mins % 60;
    return `${hours}ч${minutes}м`;
  };

  return (
    <>
      <a href={movieCard.trailerLink} target='_blank' rel="noreferrer">
        <img className='movie-card__image' src={imageUrl} alt={movieCard.nameRU}></img>
      </a>
      <div className='movie-card__container'>
        <h2 className='movie-card__title'>{movieCard.nameRU}</h2>
        <button onClick={handleMovieLike} className={`movie-card__button ${!isLiked ? '' : 'movie-card__button_liked'}`}></button>
      </div>
      <p className='movie-card__duration'>{getTimeFromMins(movieCard.duration)}</p>
    </>
  )
}

export default MoviesCard;
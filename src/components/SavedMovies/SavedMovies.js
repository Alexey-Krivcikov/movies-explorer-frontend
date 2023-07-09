import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies({ moviesCards, isLoading, isLiked, handleMovieLike }) {
  return (
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList
        moviesCards={moviesCards} buttonType='delete' place='saved-movies'
        isLiked={isLiked}
        handleMovieLike={handleMovieLike} />
    </main>
  );
}

export default SavedMovies;
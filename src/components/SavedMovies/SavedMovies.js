import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies({ handleSearchSavedMovies, handleFilterSavedCheckbox, handleDeleteMovie, isUserSearchSuccess, savedMovies, moviesCards, handleMovieLike }) {
  return (
    <main className='saved-movies'>
      <SearchForm
        handleSearchSavedMovies={handleSearchSavedMovies}
        handleFilterSavedCheckbox={handleFilterSavedCheckbox}
        isUserSearchSuccess={isUserSearchSuccess} />
      <MoviesCardList
        moviesCards={moviesCards}
        handleMovieLike={handleMovieLike}
        savedMovies={savedMovies}
        handleDeleteMovie={handleDeleteMovie}
      />

    </main>
  );
}

export default SavedMovies;
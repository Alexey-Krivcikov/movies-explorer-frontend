import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

function SavedMovies({ moviesCards, isMovieSearchSuccess, isMovieLoading, isShortFilm, handleShowMore, visibleCards, handleSearchSavedMovies, handleDeleteMovie, savedMovies }) {
  return (
    <main className='saved-movies'>
      <SearchForm
        isShortFilm={isShortFilm}
        onSearchMovies={handleSearchSavedMovies}
        isMovieSearchSuccess={isMovieSearchSuccess} />
      <MoviesCardList
        isMovieLoading={isMovieLoading}
        visibleCards={visibleCards}
        moviesCards={moviesCards}
        handleDeleteMovie={handleDeleteMovie}
        handleShowMore={handleShowMore}
      />

    </main>
  );
}

export default SavedMovies;
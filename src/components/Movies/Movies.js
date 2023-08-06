import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ isUserSearch, isMovieSearchSuccess, onSearchMovies, isShortFilm, savedMovies, handleDeleteMovie, handleSaveMovie, visibleCards, handleShowMore, moviesCards, isMovieLoading }) {
  return (
    <main className='movies'>
      <SearchForm
        isShortFilm={isShortFilm}
        onSearchMovies={onSearchMovies}
        isMovieSearchSuccess={isMovieSearchSuccess} />
      <MoviesCardList
        isUserSearch={isUserSearch}
        savedMovies={savedMovies}
        handleDeleteMovie={handleDeleteMovie}
        handleSaveMovie={handleSaveMovie}
        visibleCards={visibleCards}
        handleShowMore={handleShowMore}
        isMovieLoading={isMovieLoading}
        moviesCards={moviesCards}
      />
    </main>

  )
}

export default Movies;
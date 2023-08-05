import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ isShortFilm, onFilterMoviesByDuration, savedMovies, handleDeleteMovie, handleSaveMovie, visibleCards, handleShowMore, moviesCards, onSearchSubmit, isUserSearchSuccess, isMovieLoading }) {
  return (
    <main className='movies'>
      <SearchForm
        isShortFilm={isShortFilm}
        onFilterMoviesByDuration={onFilterMoviesByDuration}
        isUserSearchSuccess={isUserSearchSuccess}
        onSearchSubmit={onSearchSubmit} />
      <MoviesCardList
        isUserSearchSuccess={isUserSearchSuccess}
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
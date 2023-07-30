import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ savedMovies, handleDeleteMovie, handleSaveMovie, handleFilterCheckbox, visibleCards, handleShowMore, moviesCards, onSearchSubmit, isUserSearchSuccess, isMovieLoading }) {
  return (
    <main className='movies'>
      <SearchForm
        handleFilterCheckbox={handleFilterCheckbox}
        isUserSearchSuccess={isUserSearchSuccess}
        onSearchSubmit={onSearchSubmit} />
      <MoviesCardList
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
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ handleFilterCheckbox, visibleCards, handleShowMore, moviesCards, onSearchSubmit, isUserSearchSuccess, isMovieLoading }) {
  return (
    <main className='movies'>
      <SearchForm
        handleFilterCheckbox={handleFilterCheckbox}
        isUserSearchSuccess={isUserSearchSuccess}
        onSearchSubmit={onSearchSubmit}></SearchForm>
      <MoviesCardList
        visibleCards={visibleCards}
        handleShowMore={handleShowMore}
        isMovieLoading={isMovieLoading}
        moviesCards={moviesCards}

      ></MoviesCardList>

    </main>

  )
}

export default Movies;
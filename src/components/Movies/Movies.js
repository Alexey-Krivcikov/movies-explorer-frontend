import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ moviesCards, onSearchSubmit, isUserSearchSuccess, isMovieLoading }) {
  return (
    <main className='movies'>
      <SearchForm
        isUserSearchSuccess={isUserSearchSuccess}
        onSearchSubmit={onSearchSubmit}></SearchForm>
      <MoviesCardList
        isMovieLoading={isMovieLoading}
        moviesCards={moviesCards}
      ></MoviesCardList>

    </main>

  )
}

export default Movies;
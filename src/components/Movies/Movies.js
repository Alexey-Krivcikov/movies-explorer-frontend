import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ moviesCards }) {
  return (
    <main className='movies'>
      <SearchForm></SearchForm>
      <MoviesCardList
        moviesCards={moviesCards}
      ></MoviesCardList>

    </main>

  )
}

export default Movies;
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ moviesCards, isLiked, handleMovieLike }) {
  return (
    <main className='movies'>
      <SearchForm></SearchForm>
      <MoviesCardList
        moviesCards={moviesCards}
        isLiked={isLiked}
        handleMovieLike={handleMovieLike}
      ></MoviesCardList>

    </main>

  )
}

export default Movies;
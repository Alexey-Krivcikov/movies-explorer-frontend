import Checkbox from '../Checkbox/Checkbox.js';
import './SearchForm.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { USER_SEARCH_ERROR, LOCAL_STORAGE_KEYS, ERROR_SEARCH } from '../../utils/config/constants';

function SearchForm({ getSavedMoviesError, isShortFilm, onSearchMovies, isMovieSearchSuccess }) {
  const { pathname } = useLocation();
  const moviesPath = pathname === '/movies';
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    const lastSearchQuery = localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_QUERY);
    if (moviesPath) {
      setSearchQuery(lastSearchQuery);
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setError(true)
    } else {
      setError(false)
      onSearchMovies(searchQuery, isShortFilm);
    }
  }

  const handleChangeSearchQuery = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <section className='search'>
      <form className='search-form' name='search-form' onSubmit={handleSubmit}>
        <div className='search-form__container'>
          <label className='search-form__input-label'>
            <input
              onChange={handleChangeSearchQuery}
              value={searchQuery || ''}
              placeholder='Фильм'
              className='search-form__input'
              type='text'
              name='search'
              id='search'
              autoComplete='off'
            />
          </label>
          <button
            className='search-form__submit-button'
            type='submit'>
            Поиск
          </button>
        </div>
        <span className='search-form__error'>{(error && ERROR_SEARCH) || (!isMovieSearchSuccess && USER_SEARCH_ERROR)}</span>
        {pathname === '/saved-movies' && <span>{getSavedMoviesError}</span>}
        <Checkbox
          isChecked={isShortFilm}
          onFilterCheckboxChange={onSearchMovies}
          searchQuery={searchQuery} />
      </form>
    </section>
  )
};

export default SearchForm;
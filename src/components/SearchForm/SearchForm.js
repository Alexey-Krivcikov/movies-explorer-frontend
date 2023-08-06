import Checkbox from '../Checkbox/Checkbox.js';
import './SearchForm.css';
import { USER_SEARCH_ERROR } from '../../utils/config/constants'
import { useState } from 'react';

function SearchForm({ isShortFilm, onSearchMovies, isMovieSearchSuccess }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const errorSearch = 'Нужно ввести ключевое слово.'

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
        <span className='search-form__error'>{(error && errorSearch) || (!isMovieSearchSuccess && USER_SEARCH_ERROR)}</span>
        <Checkbox
          isChecked={isShortFilm}
          onFilterCheckboxChange={onSearchMovies}
          searchQuery={searchQuery} />
      </form>
    </section>
  )
};

export default SearchForm;
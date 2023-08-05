import Checkbox from '../Checkbox/Checkbox.js';
import './SearchForm.css';
import { useFormWithValidation } from '../../hooks/useForm';
import { USER_SEARCH_ERROR } from '../../utils/config/constants'
import { useEffect, useState } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';

function SearchForm({ isShortFilm, onFilterMoviesByDuration, handleSearchSavedMovies, onSearchSubmit, isUserSearchSuccess }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { pathname } = useLocation();

  const { values, handleChange, errors, isValid } = useFormWithValidation();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (pathname === '/movies') {
      onSearchSubmit(searchQuery, isShortFilm);
    } else {
      handleSearchSavedMovies(values.search)
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
              required
            />
          </label>
          <button
            // disabled={!isValid}
            className='search-form__submit-button'
            type='submit'>
            Поиск
          </button>
        </div>
        <span className='search-form__error'>{errors.search || (!isUserSearchSuccess && USER_SEARCH_ERROR)}</span>
        <Checkbox
          isChecked={isShortFilm}
          onFilterCheckboxChange={onSearchSubmit}
          searchQuery={searchQuery} />
      </form>
    </section>
  )
};

export default SearchForm;
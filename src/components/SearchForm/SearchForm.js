import './SearchForm.css';
import { useFormWithValidation } from '../../hooks/useForm';
import { USER_SEARCH_ERROR } from '../../utils/config/constants'
import { useEffect } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';

function SearchForm({ handleSearchSavedMovies, handleFilterSavedCheckbox, handleFilterCheckbox, onSearchSubmit, isUserSearchSuccess }) {
  const { pathname } = useLocation();
  const moviesPath = pathname === 'movies';
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pathname === '/movies') {
      onSearchSubmit(values.search);
    } else {
      handleSearchSavedMovies(values.search)
    }
  }
  const handleCheckBox = () => {
    console.log(pathname)
    if (pathname === '/movies') {
      handleFilterCheckbox()
    } else {
      handleFilterSavedCheckbox()
    }
  }

  useEffect(() => {
    localStorage.setItem('isShortFilm', JSON.stringify(values.isShortFilm) || 'false');
  }, [values.isShortFilm]);

  return (
    <section className='search'>
      <form className='search-form' name='search-form' onSubmit={handleSubmit}>
        <div className='search-form__container'>
          <label className='search-form__input-label'>
            <input
              onChange={handleChange}
              value={values.search || ''}
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
            disabled={!isValid}
            className='search-form__submit-button'
            type='submit'>
            Поиск
          </button>
        </div>
        <span className='search-form__error'>{errors.search || (!isUserSearchSuccess && USER_SEARCH_ERROR)}</span>
        <div className='search__filter'>
          <label className='search__filter-input-label'>
            <input
              onClick={handleCheckBox}
              value={values.isShortFilm}
              onChange={handleChange}
              name='isShortFilm'
              type='checkbox'
              className='search__filter-invisible-checkbox' />
            <span className='search__filter-visible-checkbox search__filter-visible-checkbox_type_checked'></span>
          </label>
          <p className='search__filter-text'>Короткометражки</p>
        </div>
      </form>
    </section>
  )
};

export default SearchForm;
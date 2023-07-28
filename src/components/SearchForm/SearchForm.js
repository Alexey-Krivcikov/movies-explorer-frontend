import './SearchForm.css';
import { useFormWithValidation } from '../../hooks/useForm';
import { USER_SEARCH_ERROR } from '../../utils/config/constants'
import { useEffect } from 'react';

function SearchForm({ handleFilterCheckbox, onSearchSubmit, isUserSearchSuccess }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(values.search);
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
        <span className='search-form__error'>{errors.search || (!isUserSearchSuccess && USER_SEARCH_ERROR) || false}</span>
        <div className='search__filter'>
          <label className='search__filter-input-label'>
            <input
              onClick={handleFilterCheckbox}
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
import './SearchForm.css';

function SearchForm() {
  return (
    <section className='search'>
      <form className='search-form' name='search-form'>
        <div className='search-form__container'>
          <label className='search-form__input-label'>
            <input
              className='search-form__input'
              type='text'
              name='search'
              id='search'
              placeholder='Фильм'
              autoComplete='off'
              required
            />
          </label>
          <button className='search-form__submit-button' type='submit'>
            Поиск
          </button>
        </div>
        <div className='search__filter'>
          <label className='search__filter-input-label'>
            <input type='checkbox' className='search__filter-invisible-checkbox' />
            <span className='search__filter-visible-checkbox search__filter-visible-checkbox_type_checked'></span>
          </label>
          <p className='search__filter-text'>Короткометражки</p>
        </div>
      </form>
    </section>
  )
};

export default SearchForm;
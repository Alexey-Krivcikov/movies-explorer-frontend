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
        <div className='filter'>
          <p className='filter__text'>Короткометражки</p>
          <label className='filter__input-label'>
            <input type='checkbox' className='filter__invisible-checkbox' />
            <span className='filter__visible-checkbox filter__visible-checkbox_type_checked'></span>
          </label>
        </div>
      </form>
    </section>
  )
};

export default SearchForm;
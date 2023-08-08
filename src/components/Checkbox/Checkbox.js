import './Checkbox.css';

function Checkbox({ isChecked, searchQuery, onFilterCheckboxChange }) {

  const handleCheckboxChange = () => {
    const updatedValue = !isChecked;
    onFilterCheckboxChange(searchQuery, updatedValue);
  }

  return (
    <div className='filter'>
      <label className='filter-input-label'>
        <input
          checked={isChecked}
          onChange={handleCheckboxChange}
          name='isShortFilm'
          type='checkbox'
          className='filter-invisible-checkbox' />
        <span className='filter-visible-checkbox filter-visible-checkbox_type_checked'></span>
      </label>
      <p className='filter-text'>Короткометражки</p>
    </div>
  )
}

export default Checkbox;
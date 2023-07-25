import './Form.css';
import { useLocation } from 'react-router-dom';

function Form({ values, onSubmit, name, children, btnText, isProfileEdit, isFormValid }) {
  const { pathname } = useLocation();
  const pathWithAuth = pathname === '/signin' || pathname === '/signup';
  function handleSubmit(e) {
    e.preventDefault()

    onSubmit(values)
  }

  return (
    <form
      onSubmit={e => handleSubmit(e)}
      className={`form ${name === 'profile' ? 'form_type_profile' : ''}`}
      name={name}
      action='#'
      noValidate
    >
      {children}
      {(pathWithAuth || isProfileEdit) && (
        <button
          type='submit'
          className={`form__submit-btn ${!isFormValid ? 'form__submit-btn_disabled' : ''}
          ${name === 'profile' ? 'form__submit-btn_type_profile' : ''}`}
          disabled={!isFormValid}
        >
          {btnText}
        </button>
      )}
    </form>
  )
}

export default Form;
import './Form.css';
import { useLocation } from 'react-router-dom';

function Form({ onLogin, onSubmit, name, children, btnText, isProfileEdit, isFormValid }) {
  const { pathname } = useLocation();
  const pathWithAuth = pathname === '/signin' || pathname === '/signup';
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${name === 'profile' ? 'form_type_profile' : ''}`}
      name={name}
      action='#'
    >
      {children}
      {(pathWithAuth || isProfileEdit) && (
        <button
          type='submit'
          className={`form__submit-btn ${!isFormValid ? 'form__submit-btn_disabled' : ''}
          ${name === 'profile' ? 'form__submit-btn_type_profile' : ''}`}
          disabled={!isFormValid}
          onClick={onLogin}
        >
          {btnText}
        </button>
      )}
    </form>
  )
}

export default Form;
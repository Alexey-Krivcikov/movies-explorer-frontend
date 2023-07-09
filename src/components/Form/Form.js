import './Form.css';

function Form({ type, name, children, btnText, onSubmit, isProfileEdit = true, isFormValid, onLogin }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${type === 'profile' ? 'form_type_profile' : ''}`}
      name={name}
      action='#'
    >
      {children}
      {isProfileEdit && (
        <button
          type='submit'
          className={`form__submit-btn ${!isFormValid ? 'form__submit-btn_disabled' : ''}
          ${type === 'profile' ? 'form__submit-btn_type_profile' : ''}`}
          disabled={!isFormValid && true}
          onClick={onLogin}
        >
          {btnText}
        </button>
      )}
    </form>
  )
}

export default Form;
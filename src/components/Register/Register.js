import './Register.css';
import Auth from '../Auth/Auth';
import { useFormWithValidation } from '../../hooks/useForm';
import { FORM_LABELS, LOGIN_BUTTON_TEXT, REGISTER_BUTTON_TEXT, REGISTER_PARAGRAPH_TEXT, REGISTER_TITLE } from '../../utils/config/constants';


function Register({ registerError, onSubmit, onNavigateToMain }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation()

  return (
    <main className='register'>
      <Auth
        values={values}
        titleText={REGISTER_TITLE}
        btnText={REGISTER_BUTTON_TEXT}
        paragraphText={REGISTER_PARAGRAPH_TEXT}
        url='/signin'
        linkText={LOGIN_BUTTON_TEXT}
        name='register'
        onSubmit={onSubmit}
        isFormValid={isValid}
        onNavigateToMain={onNavigateToMain}
      >
        <label htmlFor='name' className='register__input-label'>
          {FORM_LABELS.name}
        </label>
        <input
          onChange={handleChange}
          value={values.name || ''}
          placeholder={FORM_LABELS.name}
          className={`register__input ${errors.name && 'register__input_is_not-valid'}`}
          type='text'
          name='name'
          id='name'
          minLength='2'
          maxLength='20'
          required
        />
        <span className='register__error'>{errors.name}</span>
        <label htmlFor='email' className='register__input-label'>
          {FORM_LABELS.email}
        </label>
        <input
          onChange={handleChange}
          value={values.email || ''}
          placeholder={FORM_LABELS.email}
          type='email'
          className={`register__input ${errors.email && 'register__input_is_not-valid'}`}
          name='email'
          id='email'
          minLength='8'
          maxLength='30'
          required
        />
        <span className='register__error'>{errors.email}</span>
        <label htmlFor='password' className='register__input-label'>
          {FORM_LABELS.password}
        </label>
        <input
          onChange={handleChange}
          value={values.password || ''}
          placeholder={FORM_LABELS.password}
          type='password'
          className={`register__input ${errors.password && 'register__input_is_not-valid'}`}
          name='password'
          id='password'
          required
        />
        <span className='register__error'>{errors.password}</span>
        {registerError && <span className='register__error'>{registerError}</span>}
      </Auth>
    </main>

  )
}

export default Register;
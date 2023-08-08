import { useFormWithValidation } from '../../hooks/useForm';
import Auth from '../Auth/Auth';
import './Login.css';
import * as constants from '../../utils/config/constants';

function Login({ authError, onSubmit, onNavigateToMain }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  return (
    <main className='login'>
      <Auth
        values={values}
        titleText={constants.LOGIN_TITLE}
        btnText={constants.LOGIN_BUTTON_TEXT}
        paragraphText={constants.LOGIN_PARAGRAPH_TEXT}
        url='/signup'
        linkText={constants.LOGIN_LINK_TEXT}
        name='login'
        onSubmit={onSubmit}
        isFormValid={isValid}
        onNavigateToMain={onNavigateToMain}
      >
        <label htmlFor='email' className='login__input-label'>
          E-mail
        </label>
        <input
          value={values.email || ''}
          onChange={handleChange}
          placeholder='E-mail'
          type='email'
          className='login__input'
          name='email'
          id='email'
          required
        />
        <span className='login__error'>{errors.email}</span>
        <label htmlFor='password' className='login__input-label'>
          Пароль
        </label>
        <input
          value={values.password || ''}
          onChange={handleChange}
          placeholder='Пароль'
          type='password'
          className='login__input'
          name='password'
          id='password'
          required
        />
        <span className='login__error'>{errors.password}</span>
        {authError && <span className='login__error'>{authError}</span>}
      </Auth>
    </main>
  );
}

export default Login;

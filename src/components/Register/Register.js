import './Register.css';
import Auth from '../Auth/Auth';
import { useFormWithValidation } from '../../hooks/useForm';


function Register({ authError, onSubmit, onNavigateToMain }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation()

  return (
    <main className='register'>
      <Auth
        values={values}
        titleText='Добро пожаловать!'
        btnText='Зарегистрироваться'
        paragraphText='Уже'
        url='/signin'
        linkText='Войти'
        name='register'
        onSubmit={onSubmit}
        isFormValid={isValid}
        onNavigateToMain={onNavigateToMain}
      >
        <label htmlFor='name' className='register__input-label'>
          Имя
        </label>
        <input
          onChange={handleChange}
          value={values.name || ''}
          placeholder='Имя'
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
          E-mail
        </label>
        <input
          onChange={handleChange}
          value={values.email || ''}
          placeholder='E-mail'
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
          Пароль
        </label>
        <input
          onChange={handleChange}
          value={values.password || ''}
          placeholder='Пароль'
          type='password'
          className={`register__input ${errors.password && 'register__input_is_not-valid'}`}
          name='password'
          id='password'
          required
        />
        <span className='register__error'>{errors.password || authError}</span>
        {authError && <span className='register__error'>{authError}</span>}
      </Auth>
    </main>

  )
}

export default Register;
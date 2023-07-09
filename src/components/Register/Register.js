import './Register.css';
import Auth from '../Auth/Auth';


function Register({ onSubmit, isFormValid, onNavigateToMain, onLogin }) {
  return (
    <main className='register'>
      <Auth
        titleText='Добро пожаловать!'
        btnText='Зарегистрироваться'
        paragraphText='Уже'
        url='/signin'
        linkText='Войти'
        name='register'
        onSubmit={onSubmit}
        isFormValid={isFormValid}
        onNavigateToMain={onNavigateToMain}
        onLogin={onLogin}
      >
        <label htmlFor='name' className='register__input-label'>
          Имя
        </label>
        <input
          className='register__input'
          type='text'
          name='name'
          id='name'
          placeholder='Имя'
          minLength='2'
          maxLength='20'
          defaultValue='Алексей'
          required
        />
        <span className='register__error'></span>
        <label htmlFor='email' className='register__input-label'>
          E-mail
        </label>
        <input
          type='email'
          className='register__input'
          name='email'
          id='email'
          placeholder='E-mail'
          minLength='8'
          maxLength='30'
          defaultValue='yourMail@gmail.com'
          required
        />
        <span className='register__error'></span>
        <label htmlFor='password' className='register__input-label'>
          Пароль
        </label>
        <input
          type='password'
          className='register__input register__input_is_not-valid'
          name='password'
          id='password'
          placeholder='Пароль'
          minLength='6'
          maxLength='30'
          defaultValue='qwerty'
          required
        />
        <span className='register__error'>Что-то пошло не так...</span>
      </Auth>
    </main>

  )
}

export default Register;
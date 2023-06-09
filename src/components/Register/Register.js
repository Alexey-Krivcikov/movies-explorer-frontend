import './Register.css';
import Auth from '../Auth/Auth';


function Register({ onSubmit, onNavigateToMain, onLogin, isFormValid }) {
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
          placeholder='Имя'
          className='register__input'
          type='text'
          name='name'
          id='name'
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
          placeholder='E-mail'
          type='email'
          className='register__input'
          name='email'
          id='email'
          minLength='8'
          maxLength='30'
          defaultValue='pochta@yandex.ru'
          required
        />
        <span className='register__error'></span>
        <label htmlFor='password' className='register__input-label'>
          Пароль
        </label>
        <input
          placeholder='Пароль'
          type='password'
          className='register__input register__input_is_not-valid'
          name='password'
          id='password'
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
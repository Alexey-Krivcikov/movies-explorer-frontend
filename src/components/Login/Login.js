import Auth from '../Auth/Auth';
import './Login.css';

function Login({ onSubmit, onNavigateToMain, onLogin, isFormValid }) {
  return (
    <main className='login'>
      <Auth
        titleText='Рады видеть!'
        btnText='Войти'
        paragraphText='Ещё не'
        url='/signup'
        linkText='Регистрация'
        name='login'
        onSubmit={onSubmit}
        isFormValid={isFormValid}
        onNavigateToMain={onNavigateToMain}
        onLogin={onLogin}
      >
        <label htmlFor='email' className='login__input-label'>
          E-mail
        </label>
        <input
          type='email'
          className='login__input'
          name='email'
          id='email'
          placeholder='E-mail'
          defaultValue='pochta@yandex.ru'
          required
        />
        <span className='login__error'></span>
        <label htmlFor='password' className='login__input-label'>
          Пароль
        </label>
        <input
          type='password'
          className='login__input'
          name='password'
          id='password'
          minLength='6'
          maxLength='30'
          required
        />
        <span className='login__error'></span>
      </Auth>
    </main>
  )
}

export default Login;
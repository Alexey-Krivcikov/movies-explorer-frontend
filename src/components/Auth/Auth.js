import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Form from '../Form/Form';
import FormTitle from '../FormTitle/FormTitle';
import './Auth.css';

function Auth({ children, titleText, btnText, paragraphText, linkText, url, name, onSubmit, isFormValid, onNavigateToMain, onLogin }) {
  return (
    <section className='auth'>
      <Logo onNavigateToMain={onNavigateToMain} />
      <FormTitle titleText={titleText} />
      <Form btnText={btnText}
        type={name}
        name={name}
        onSubmit={onSubmit}
        isFormValid={isFormValid}
        onLogin={onLogin}>
        {children}
      </Form>
      <div className='auth__container'>
        <p className='auth__text'>{`${paragraphText} зарегистрированы?`}</p>
        <Link className='auth__link' to={url}>
          {linkText}
        </Link>
      </div>
    </section>
  )
}

export default Auth;
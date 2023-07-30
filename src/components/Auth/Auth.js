import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Form from '../Form/Form';
import FormTitle from '../FormTitle/FormTitle';
import './Auth.css';

function Auth({ values, children, titleText, btnText, paragraphText, linkText, url, name, onSubmit, isFormValid, onNavigateToMain }) {
  return (
    <section className='auth'>
      <Logo onNavigateToMain={onNavigateToMain} />
      <FormTitle titleText={titleText} />
      <Form
        btnText={btnText}
        values={values}
        type={name}
        name={name}
        onSubmit={onSubmit}
        isFormValid={isFormValid}>
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
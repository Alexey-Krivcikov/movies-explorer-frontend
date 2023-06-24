import './Logo.css';
import logo from '../../images/logo.svg';

function Logo() {
  return (
    <img className='logo' src={logo} alt='Логотип'></img>
  )
}

export default Logo;
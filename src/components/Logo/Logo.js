import './Logo.css';
import logo from '../../images/logo.svg';

function Logo({ onNavigateToMain }) {
  return (
    <img className='logo' src={logo} alt='Логотип' onClick={onNavigateToMain}></img>
  )
}

export default Logo;
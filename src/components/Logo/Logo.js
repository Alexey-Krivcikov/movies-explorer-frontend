import './Logo.css';
import logo from '../../images/logo.svg';
import { LOGO_ALT } from '../../utils/config/constants';

function Logo({ onNavigateToMain }) {
  return (
    <img className='logo' src={logo} alt={LOGO_ALT} onClick={onNavigateToMain}></img>
  )
}

export default Logo;
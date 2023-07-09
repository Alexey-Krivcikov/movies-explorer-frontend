import './BurgerMenuBtn.css';
import { useLocation } from 'react-router-dom';

function BurgerMenuBtn({ isLoggedIn, onBurgerMenuOpen }) {
  const { pathname } = useLocation();
  const mainPath = pathname === '/';
  return (
    <button
      type='button'
      className={`burger-menu-btn ${mainPath ? 'burger-menu-btn_type_main' : ''}  ${(!isLoggedIn) ? 'burger-menu-btn_is_hidden' : ''}`}
      onClick={onBurgerMenuOpen}
    ></button>
  )
}

export default BurgerMenuBtn;
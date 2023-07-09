import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useLocation } from "react-router-dom";
import BurgerMenuBtn from '../BurgerMenuBtn/BurgerMenuBtn';

function Header({ isLoggedIn, onNavigateToProfile, onNavigateToMain, isBurgerMenuOpen, onBurgerMenuOpen, onBurgerMenuClose }) {
  const { pathname } = useLocation();
  const mainMenuPath = pathname === '/';
  return (
    <header className={`header ${!mainMenuPath && 'header_type_login'}`}>
      <Logo onNavigateToMain={onNavigateToMain} />
      <Navigation isLoggedIn={isLoggedIn} onNavigateToProfile={onNavigateToProfile}></Navigation>
      <BurgerMenuBtn isLoggedIn={isLoggedIn} onBurgerMenuOpen={onBurgerMenuOpen}></BurgerMenuBtn>
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onBurgerMenuClose} onNavigateToProfile={onNavigateToProfile}></BurgerMenu>
    </header>
  )
}


export default Header;
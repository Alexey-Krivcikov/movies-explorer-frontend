import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import BurgerMenuBtn from '../BurgerMenuBtn/BurgerMenuBtn';

function Header({ onNavigateToProfile, onNavigateToMain, onNavigateToSignIn, onNavigateToSignUp, isBurgerMenuOpen, onBurgerMenuOpen, onBurgerMenuClose, isLoggedIn }) {
  return (
    <header className='header'>
      <Logo onNavigateToMain={onNavigateToMain} />
      <Navigation
        isLoggedIn={isLoggedIn}
        onNavigateToProfile={onNavigateToProfile}
        onNavigateToSignIn={onNavigateToSignIn}
        onNavigateToSignUp={onNavigateToSignUp}
      ></Navigation>
      <BurgerMenuBtn isLoggedIn={isLoggedIn} onBurgerMenuOpen={onBurgerMenuOpen}></BurgerMenuBtn>
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onBurgerMenuClose} onNavigateToProfile={onNavigateToProfile}></BurgerMenu>
    </header>
  )
}


export default Header;
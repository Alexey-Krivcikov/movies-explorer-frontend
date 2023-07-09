import './Navigation.css';
import { useLocation, Link, NavLink } from 'react-router-dom';
import ProfileBtn from '../ProfileBtn/ProfileBtn';

function Navigation({ isLoggedIn, onNavigateToProfile }) {
  const { pathname } = useLocation();
  const mainMenuPath = pathname === '/';
  const navLinkClassName = ({ isActive }) =>
    `navigation__login-link ${isActive ? "navigation__login-link_active" : ""}`
    ;
  return (
    <nav className={`navigation ${(isLoggedIn) ? 'navigation_type_login' : ''}`}>
      {!isLoggedIn && (
        <ul className='navigation__main-links'>
          <li>
            <Link to='signup' className='navigation__main-link'>Регистрация</Link>
          </li>
          <li>
            <Link to='signin' className='navigation__main-link navigation__main-link_type_sign-in'>Войти</Link>
          </li>
        </ul>
      )}
      {isLoggedIn && (
        <>
          <ul className={`navigation__login-links ${(mainMenuPath && isLoggedIn) ? 'navigation__login-links_type_main' : ''}`}>
            <li>
              <NavLink className={navLinkClassName} to='/movies'>Фильмы</NavLink>
            </li>
            <li>
              <NavLink className={navLinkClassName} to='/saved-movies'>Сохранённые фильмы</NavLink>
            </li>
          </ul>
          <ProfileBtn onNavigateToProfile={onNavigateToProfile}></ProfileBtn>
        </>
      )}
    </nav>
  )
}

export default Navigation;
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import ProfileBtn from '../ProfileBtn/ProfileBtn';
import { MOVIES_NAVIGATION, SAVED_MOVIES_NAVIGATION, LOGIN_BUTTON_TEXT, LOGIN_LINK_TEXT } from '../../utils/config/constants';

function Navigation({ onNavigateToSignUp, onNavigateToSignIn, onNavigateToProfile, isLoggedIn }) {
  const navLinkClassName = ({ isActive }) =>
    `navigation__login-link ${isActive ? "navigation__login-link_active" : ""}`
    ;
  return (
    <nav className={`navigation ${(isLoggedIn) ? 'navigation_type_login' : ''}`}>
      {!isLoggedIn && (
        <ul className='navigation__main-links'>
          <li>
            <button
              type='button'
              className='navigation__main-link'
              onClick={onNavigateToSignUp}
            >{LOGIN_LINK_TEXT}</button>
          </li>
          <li>
            <button
              type='button'
              className='navigation__main-link navigation__main-link_type_sign-in'
              onClick={onNavigateToSignIn}
            >{LOGIN_BUTTON_TEXT}</button>
          </li>
        </ul>
      )}
      {isLoggedIn && (
        <>
          <ul className='navigation__login-links'>
            <li>
              <NavLink className={navLinkClassName} to='/movies'>{MOVIES_NAVIGATION}</NavLink>
            </li>
            <li>
              <NavLink className={navLinkClassName} to='/saved-movies'>{SAVED_MOVIES_NAVIGATION}</NavLink>
            </li>
          </ul>
          <ProfileBtn onNavigateToProfile={onNavigateToProfile}></ProfileBtn>
        </>
      )}
    </nav>
  )
}

export default Navigation;
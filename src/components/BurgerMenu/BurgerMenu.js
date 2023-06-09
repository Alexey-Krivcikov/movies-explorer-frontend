import './BurgerMenu.css';
import Popup from '../Popup/Popup';
import { NavLink } from 'react-router-dom';
import ProfileBtn from '../ProfileBtn/ProfileBtn';


function BurgerMenu({ onNavigateToProfile, isOpen, onClose }) {
  const burgerMenuNavLink = ({ isActive }) =>
    `burger-menu__link ${isActive ? 'burger-menu__link_active' : ''}`;
  return (
    <Popup isOpen={isOpen}>
      <aside className={`burger-menu ${isOpen ? 'burger-menu_is-open' : ''}`}>
        <button type='button' onClick={onClose} className='burger-menu__close-btn'></button>
        <ul className='burger-menu__nav'>
          <li className='burger-menu__nav-item'>
            <ul className='burger-menu__links-list'>
              <li className='burger-menu__link-item'>
                <NavLink className={burgerMenuNavLink} onClick={onClose} to='/'>Главная</NavLink>
              </li>
              <li className='burger-menu__link-item'>
                <NavLink className={burgerMenuNavLink} onClick={onClose} to='/movies'>Фильмы</NavLink>
              </li>
              <li className='burger-menu__link-item'>
                <NavLink className={burgerMenuNavLink} onClick={onClose} to='/saved-movies'>Сохранённые фильмы</NavLink>
              </li>
            </ul>
          </li>
          <li className='burger-menu__nav-item'>
            <ProfileBtn onNavigateToProfile={onNavigateToProfile}></ProfileBtn>
          </li>
        </ul>
      </aside>
    </Popup>
  )
}

export default BurgerMenu;
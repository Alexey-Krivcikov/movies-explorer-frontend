import './ProfileBtn.css';
import profileBtn from '../../images/profile_btn.svg';
import profileBtnTypeMain from '../../images/profile_btn_type_main.svg';
import { useLocation } from 'react-router-dom';

function ProfileBtn({ isOpen, onNavigateToProfile }) {
  const { pathname } = useLocation();
  const mainPath = pathname === '/';
  return (
    <button className={`profile-btn ${(mainPath && !isOpen) ? 'profile-btn_type_main' : ''}`}
      type='button'
      onClick={onNavigateToProfile}>
      Аккаунт
      <img className={`profile-btn__img ${(mainPath && !isOpen) ? 'profile-btn__img_type_main' : ''}`} src={(mainPath && !isOpen) ? profileBtnTypeMain : profileBtn} alt='кнопка профиля' />
    </button>
  )
}

export default ProfileBtn;
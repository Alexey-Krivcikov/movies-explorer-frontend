import './ProfileBtn.css';
import profileBtn from '../../images/profile_btn.svg';

function ProfileBtn({ onNavigateToProfile }) {
  return (
    <button
      className='profile-btn'
      type='button'
      onClick={onNavigateToProfile}
    >Аккаунт
      <img className='profile-btn__img' src={profileBtn} alt='кнопка профиля' />
    </button>
  )
}

export default ProfileBtn;
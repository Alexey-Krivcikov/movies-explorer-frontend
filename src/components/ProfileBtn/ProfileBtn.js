import './ProfileBtn.css';
import profileBtn from '../../images/profile_btn.svg';
import { PROFILE_BUTTONS_TEXT, PROFILE_BTN_ALT } from '../../utils/config/constants';

function ProfileBtn({ onNavigateToProfile }) {
  return (
    <button
      className='profile-btn'
      type='button'
      onClick={onNavigateToProfile}
    >{PROFILE_BUTTONS_TEXT.account}
      <img className='profile-btn__img' src={profileBtn} alt={PROFILE_BTN_ALT} />
    </button>
  )
}

export default ProfileBtn;
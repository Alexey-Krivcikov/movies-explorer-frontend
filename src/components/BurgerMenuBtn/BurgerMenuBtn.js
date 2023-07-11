import './BurgerMenuBtn.css';

function BurgerMenuBtn({ isLoggedIn, onBurgerMenuOpen }) {
  return (
    <button
      type='button'
      className={`burger-menu-btn ${(!isLoggedIn) ? 'burger-menu-btn_is-hidden' : ''}`}
      onClick={onBurgerMenuOpen}
    ></button>
  )
}

export default BurgerMenuBtn;
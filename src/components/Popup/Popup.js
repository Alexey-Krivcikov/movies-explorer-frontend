import './Popup.css';

function Popup({ children, isOpen, onClose }) {
  return (
    <section className={`popup ${isOpen ? 'popup_is_opened' : ''}`}>
      {children}
    </section>
  )
}

export default Popup;
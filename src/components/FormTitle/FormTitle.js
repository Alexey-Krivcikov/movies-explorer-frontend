import './FormTitle.css';
import { useLocation } from 'react-router-dom';

function FormTitle({ titleText }) {
  const { pathname } = useLocation();
  return (
    <h1 className={`form-title ${pathname === '/profile' ? 'form-title_place_profile' : ''}`}>{titleText}</h1>
  )
}

export default FormTitle;
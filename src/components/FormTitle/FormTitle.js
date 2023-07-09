import './FormTitle.css';

function FormTitle({ titleText, place }) {
  return <h1 className={`form-title ${place === 'profile' ? 'form-title_place_profile' : ''}`}>{titleText}</h1>;
}

export default FormTitle;
import { TECHS, TECHS_MAIN_TITLE, TECHS_DESCRIPTION, TECHS_LIST } from '../../utils/config/constants';
import SectionTitle from '../SectionTitle/SectionTitle';
import './Techs.css'

function Techs() {
  return (
    <section id='techs' className='techs'>
      <div className='techs__container'>
        <SectionTitle text={TECHS} />
        <h3 className='techs__title'>{TECHS_MAIN_TITLE}</h3>
        <p className='techs__description'>{TECHS_DESCRIPTION}</p>
        <ul className='techs__list'>
          {TECHS_LIST.map((tech, index) => (
            <li className='techs__list-item' key={index}>{tech}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Techs;

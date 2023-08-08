import './AboutProject.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import * as constants from '../../utils/config/constants';

function AboutProject() {
  return (
    <section id='aboutProject' className='aboutProject'>
      <div className='aboutProject__container'>
        <SectionTitle text={constants.PROJECT_TITLE} />
        <ul className='aboutProject__description'>
          <li className='aboutProject__description-item'>
            <h3 className='aboutProject__description-title'>{constants.PROJECT_STAGES[0].title}</h3>
            <p className='aboutProject__description-text'>{constants.PROJECT_STAGES[0].text}</p>
          </li>
          <li className='aboutProject__description-item'>
            <h3 className='aboutProject__description-title'>{constants.PROJECT_STAGES[1].title}</h3>
            <p className='aboutProject__description-text'>{constants.PROJECT_STAGES[1].text}</p>
          </li>
        </ul>
        <ul className='aboutProject__schedule'>
          <li className='aboutProject__schedule-item'>
            <h4 className='aboutProject__schedule-title'>{constants.SCHEDULE[0].week}</h4>
            <p className='aboutProject__schedule-text'>{constants.SCHEDULE[0].text}</p>
          </li>
          <li className='aboutProject__schedule-item aboutProject__schedule-item_type_wide'>
            <h4 className='aboutProject__schedule-title aboutProject__schedule-title_type_wide'>{constants.SCHEDULE[1].week}</h4>
            <p className='aboutProject__schedule-text'>{constants.SCHEDULE[1].text}</p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default AboutProject;
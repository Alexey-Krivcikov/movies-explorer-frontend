import './AboutProject.css';
import SectionTitle from '../SectionTitle/SectionTitle';

function AboutProject() {
  return (
    <section id='aboutProject' className='aboutProject'>
      <div className='aboutProject__container'>
        <SectionTitle text={'О проекте'} />
        <ul className='aboutProject__description'>
          <li className='aboutProject__description-item'>
            <h3 className='aboutProject__description-title'>Дипломный проект включал 5 этапов</h3>
            <p className='aboutProject__description-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li className='aboutProject__description-item'>
            <h3 className='aboutProject__description-title'>На выполнение диплома ушло 5 недель</h3>
            <p className='aboutProject__description-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <ul className='aboutProject__schedule'>
          <li className='aboutProject__schedule-item'>
            <h4 className='aboutProject__schedule-title'>1&nbsp;неделя</h4>
            <p className='aboutProject__schedule-text'>Back-end</p>
          </li>
          <li className='aboutProject__schedule-item aboutProject__schedule-item_type_wide'>
            <h4 className='aboutProject__schedule-title aboutProject__schedule-title_type_wide'>4 недели</h4>
            <p className='aboutProject__schedule-text'>Front-end</p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default AboutProject;
import './Portfolio.css';
import { PORTFOLIO_ITEMS, PORTFOLIO_TITLE } from '../../utils/config/constants';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h4 className='portfolio__title'>{PORTFOLIO_TITLE}</h4>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href={PORTFOLIO_ITEMS[0].link}
            target='_blank' rel="noreferrer">
            {PORTFOLIO_ITEMS[0].title}
            <span className='portfolio__arrow'>&#8599;</span>
          </a>
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href={PORTFOLIO_ITEMS[1].link}
            target='_blank' rel="noreferrer">
            {PORTFOLIO_ITEMS[1].title}
            <span className='portfolio__arrow'>&#8599;</span>
          </a>
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href={PORTFOLIO_ITEMS[2].link}
            target='_blank' rel="noreferrer">
            {PORTFOLIO_ITEMS[2].title}
            <span className='portfolio__arrow'>&#8599;</span>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='#'
            target='_blank'>
            Статичный сайт
          </a>
          <span className='porfolio__arrow'>&#8599;</span>
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='#'
            target='_blank'>
            Адаптивный сайт
          </a>
          <span className='porfolio__arrow'>&#8599;</span>
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='#'
            target='_blank'>
            Одностраничное приложение
          </a>
          <span className='porfolio__arrow'>&#8599;</span>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
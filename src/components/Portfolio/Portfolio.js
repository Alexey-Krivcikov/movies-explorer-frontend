import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='https://alexey-krivcikov.github.io/how-to-learn/'
            target='_blank' rel="noreferrer">
            Статичный сайт
            <span className='porfolio__arrow'>&#8599;</span>
          </a>
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='https://alexey-krivcikov.github.io/russian-travel/'
            target='_blank' rel="noreferrer">
            Адаптивный сайт
            <span className='porfolio__arrow'>&#8599;</span>
          </a>
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='https://alexey-krivcikov.github.io/mesto-react/'
            target='_blank' rel="noreferrer">
            Одностраничное приложение
            <span className='porfolio__arrow'>&#8599;</span>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
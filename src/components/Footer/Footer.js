import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <h5 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h5>
      <nav className='footer__container'>
        <p className='footer__date'>&copy; {new Date().getFullYear()}</p>
        <ul className='footer__list'>
          <li className='footer__item'>
            <a className='footer__link' href='https://practicum.yandex.ru/' target='_blank' rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li className='footer__item'>
            <a className='footer__link' href='https://github.com/Alexey-Krivcikov/movies-explorer-frontend' target='_blank' rel="noreferrer">Github</a>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Footer;
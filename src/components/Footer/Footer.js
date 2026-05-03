import './Footer.css';
import * as constants from '../../utils/config/constants'

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__title'>{constants.FOOTER_TITLE}</p>
      <nav className='footer__container'>
        <p className='footer__date'>&copy; {new Date().getFullYear()}</p>
        <ul className='footer__list'>
          <li className='footer__item'>
            <a className='footer__link' href={constants.YANDEX_PRACTICUM_LINK} target='_blank' rel="noreferrer">{constants.YANDEX_PRACTICUM_NAME}</a>
          </li>
          <li className='footer__item'>
            <a className='footer__link' href={constants.GITHUB_LINK_PROJECT} target='_blank' rel="noreferrer">{constants.GITHUB_NAME}</a>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Footer;
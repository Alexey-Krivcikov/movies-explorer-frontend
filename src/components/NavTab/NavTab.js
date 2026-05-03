import './NavTab.css'
import { TITLE, PROJECT_TITLE, TECHS } from '../../utils/config/constants';
function NavTab() {
  return (
    <nav className='navTab'>
      <ul className='navTab__list'>
        <li><a className='navTab__link' href='#aboutProject'>{PROJECT_TITLE}</a></li>
        <li><a className='navTab__link' href='#techs'>{TECHS}</a></li>
        <li><a className='navTab__link' href='#about-me'>{TITLE}</a></li>
      </ul>
    </nav>
  )
}

export default NavTab;
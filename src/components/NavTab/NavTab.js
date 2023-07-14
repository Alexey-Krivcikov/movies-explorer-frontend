import './NavTab.css'

function NavTab() {
  return (
    <nav className='navTab'>
      <ul className='navTab__list'>
        <li><a className='navTab__link' href='#aboutProject'>О&nbsp;проекте</a></li>
        <li><a className='navTab__link' href='#techs'>Технологии</a></li>
        <li><a className='navTab__link' href='#about-me'>Студент</a></li>
      </ul>
    </nav>
  )
}

export default NavTab;
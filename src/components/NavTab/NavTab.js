import './NavTab.css'

function NavTab() {
  return (
    <nav className='navTab'>
      <ul className='navTab__list'>
        <li className='navTab__link'>О проекте</li>
        <li className='navTab__link'>Технологии</li>
        <li className='navTab__link'>Студент</li>
      </ul>
    </nav>
  )
}

export default NavTab;
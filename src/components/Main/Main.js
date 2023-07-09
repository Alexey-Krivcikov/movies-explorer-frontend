import './Main.css';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import NavTab from '../NavTab/NavTab';

function Main() {
  return (
    <main className='main'>
      <Promo />
      <NavTab></NavTab>
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>
  )
}

export default Main;
import './App.css';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab'
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function App() {
  return (
    <div className='page'>
      <div className='page__container'>
        <Header></Header>
        <Promo></Promo>
        <NavTab></NavTab>
        <AboutProject></AboutProject>
        <Techs></Techs>
        <AboutMe></AboutMe>
      </div>
    </div>
  );
}

export default App;

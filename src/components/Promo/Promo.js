import './Promo.css';
import NavTab from '../NavTab/NavTab';
import { PROJECT } from '../../utils/config/constants'

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__container'>
        <h1 className='promo__title'>{PROJECT}</h1>
        <NavTab></NavTab>
      </div>
    </section>
  )
}

export default Promo;
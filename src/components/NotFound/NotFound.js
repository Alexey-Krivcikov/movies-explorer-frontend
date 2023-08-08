import './NotFound.css';
import { NOT_FOUND, NOT_FOUND_404, BACK } from '../../utils/config/constants';

function NotFound({ onNavigateToMain }) {
  return (
    <main className='not-found'>
      <section className='not-found__container'>
        <h1 className='not-found__title'>{NOT_FOUND_404}</h1>
        <p className='not-found__text'>{NOT_FOUND}</p>
        <button type='button' className='not-found__btn' onClick={onNavigateToMain}>
          {BACK}
        </button>
      </section>
    </main>
  );
}

export default NotFound;
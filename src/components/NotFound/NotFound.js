import './NotFound.css';

function NotFound({ onNavigateToMain }) {
  return (
    <main className='not-found'>
      <section className='not-found__container'>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__text'>Страница не найдена</p>
        <button type='button' className='not-found__btn' onClick={onNavigateToMain}>
          Назад
        </button>
      </section>
    </main>
  );
}

export default NotFound;
import './AboutMe.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import Portfolio from '../Portfolio/Portfolio';
import photo from '../../images/my-photo.jpg';

function AboutMe() {
  return (
    <section className='about-me' id='about-me'>
      <div className='about-me__container'>
        <SectionTitle text={'Студент'} />
        <article className='about-me-info'>
          <h3 className='about-me-info__title'>Алексей</h3>
          <p className='about-me-info__description'>Фронтенд-разработчик, 28 лет</p>
          <p className='about-me-info__my-bio'>
            Я родился в Белгороде и живу в Сочи, учился на факультете химической-технологии БГТУ им.Шухова. У меня есть жена.
            Я люблю слушать музыку и играть на гитаре, а ещё хожу в тренажерный зал. Недавно начал кодить. С 2020 года работаю в компании «Макдональдс». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами.
          </p>
          <a className='about-me-info__github' href='https://github.com/Alexey-Krivcikov' target='_blank' rel="noreferrer" >Github</a>
          <img className='about-me-info__photo' src={photo} alt='Фото студента'></img>
        </article>
        <Portfolio />
      </div>
    </section>
  )
}

export default AboutMe;
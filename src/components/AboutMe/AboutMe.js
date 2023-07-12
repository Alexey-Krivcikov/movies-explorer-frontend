import './AboutMe.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import Portfolio from '../Portfolio/Portfolio';
import photo from '../../images/photo.png';

function AboutMe() {
  return (
    <section className='about-me'>
      <div className='about-me__container'>
        <SectionTitle text={'Студент'} />
        <article className='about-me-info'>
          <h3 className='about-me-info__title'>Алексей</h3>
          <p className='about-me-info__description'>Фронтенд-разработчик, 28 лет</p>
          <p className='about-me-info__my-bio'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
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
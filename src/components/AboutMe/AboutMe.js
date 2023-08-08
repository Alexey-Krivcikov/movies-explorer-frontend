import './AboutMe.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import Portfolio from '../Portfolio/Portfolio';
import photo from '../../images/my-photo.jpg';
import * as constants from '../../utils/config/constants';

function AboutMe() {
  return (
    <section className='about-me' id='about-me'>
      <div className='about-me__container'>
        <SectionTitle text={constants.TITLE} />
        <article className='about-me-info'>
          <h3 className='about-me-info__title'>{constants.NAME}</h3>
          <p className='about-me-info__description'>{constants.DESCRIPTION}</p>
          <p className='about-me-info__my-bio'>{constants.BIOGRAPHY}</p>
          <a className='about-me-info__github' href={constants.GITHUB_LINK} target='_blank' rel="noreferrer" >{constants.GITHUB_NAME}</a>
          <img className='about-me-info__photo' src={photo} alt={constants.PHOTO_ALT}></img>
        </article>
        <Portfolio />
      </div>
    </section>
  )
}

export default AboutMe;

import './Profile.css';

import FormTitle from '../FormTitle/FormTitle';
import Form from '../Form/Form';
import { useFormWithValidation } from '../../hooks/useForm';
import { useContext, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext'

function Profile({ onSubmit, onEditProfile, onSignOut, isEdit }) {
  const [submitted, setSubmitted] = useState(false);
  const { values, handleChange, errors, isValid } = useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);

  const handleSubmit = () => {
    setSubmitted(true); // Показываем ошибку только после отправки формы
    if (isValid) {
      onSubmit(); // Если форма валидна, вызываем onSubmit
    }
  };

  const handleEditProfile = () => {
    setSubmitted(false); // Сбрасываем флаг при нажатии на кнопку "Редактировать"
    onEditProfile();
  };

  return (
    <main className='profile'>
      <section className='profile__container'>
        <FormTitle titleText={`Привет, ${currentUser.name}!`}></FormTitle>
        <Form
          name='profile'
          btnText='Сохранить'
          isProfileEdit={isEdit}
          onSubmit={handleSubmit}
          isFormValid={isValid}
        >
          <label htmlFor='name' className='profile__input-label'>
            Имя
          </label>
          <input
            value={values.name}
            onChange={handleChange}
            placeholder='Имя'
            className='profile__input'
            type='text'
            name='name'
            id='name'
            defaultValue={currentUser.name}
            minLength='2'
            maxLength='20'
            required
          ></input>
          <label htmlFor='email' className='profile__input-label profile__input-label_type_e-mail'>
            E-mail
          </label>
          <input
            value={values.email}
            onChange={handleChange}
            placeholder='E-mail'
            className='profile__input profile__input_type_e-mail'
            type='email'
            name='email'
            id='email'
            defaultValue={currentUser.email}
            required
          />
          {<span className='profile__error'>{errors.name || errors.email}</span>}
          {(isEdit && submitted && !isValid) ?
            <span className='profile__error'>При обновлении профиля произошла ошибка.</span> :
            <span className='profile__error'></span>}
        </Form>
        {!isEdit && (
          <div className='profile__btns'>
            <button className='profile__btn' type='button' onClick={handleEditProfile}>
              Редактировать
            </button>
            <button className='profile__btn profile__btn_type_logout' type='button' onClick={onSignOut}>
              Выйти из аккаунта
            </button>
          </div>
        )}
      </section>
    </main>
  )

}

export default Profile;
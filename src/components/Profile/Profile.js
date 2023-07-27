import './Profile.css';

import FormTitle from '../FormTitle/FormTitle';
import Form from '../Form/Form';
import { useFormWithValidation } from '../../hooks/useForm';
import { useContext, useState, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext'

function Profile({ profileMessage, onSubmit, onEditProfile, onSignOut, isEdit }) {
  const [submitted, setSubmitted] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  useEffect(() => {
    resetForm({ name: currentUser.name, email: currentUser.email }, {});
  }, [currentUser, resetForm]);

  const handleEditProfile = () => {
    setSubmitted(false); // Сбрасываем флаг при нажатии на кнопку "Редактировать"
    onEditProfile();
  };

  return (
    <main className='profile'>
      <section className='profile__container'>
        <FormTitle titleText={`Привет, ${currentUser.name}!`}></FormTitle>
        <Form
          setSubmitted={setSubmitted}
          name='profile'
          btnText='Сохранить'
          isProfileEdit={isEdit}
          onSubmit={onSubmit}
          isFormValid={isValid}
          values={values}
        >
          <label htmlFor='name' className='profile__input-label'>
            Имя
          </label>
          <input
            value={values.name || currentUser.name}
            onChange={handleChange}
            placeholder='Имя'
            className='profile__input'
            type='text'
            name='name'
            id='name'
            minLength='2'
            maxLength='20'
            required
            disabled={!isEdit}
          ></input>
          <label htmlFor='email' className='profile__input-label profile__input-label_type_e-mail'>
            E-mail
          </label>
          <input
            value={values.email || currentUser.email}
            onChange={handleChange}
            placeholder='E-mail'
            className='profile__input profile__input_type_e-mail'
            type='email'
            name='email'
            id='email'
            required
            disabled={!isEdit}
          />
          {<span className='profile__error'>{errors.name || errors.email}</span>}
          {(isEdit && submitted && !isValid) ?
            <span className='profile__error'>При обновлении профиля произошла ошибка.</span> :
            <span className='profile__error'></span>}
          {<span className='profile__message'>{profileMessage}</span>}
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
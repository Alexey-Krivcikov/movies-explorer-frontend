import './Profile.css';

import FormTitle from '../FormTitle/FormTitle';
import Form from '../Form/Form';

function Profile({ onSubmit, onEditProfile, onSignOut, user, isEdit, isFormValid }) {
  return (
    <main className='profile'>
      <section className='profile__container'>
        <FormTitle titleText={`Привет, ${user.name}!`}></FormTitle>
        <Form
          name='profile'
          btnText='Сохранить'
          isProfileEdit={isEdit}
          onSubmit={onSubmit}
          isFormValid={isFormValid}
        >
          <label htmlFor='name' className='profile__input-label'>
            Имя
          </label>
          <input
            placeholder='Имя'
            className='profile__input'
            type='text'
            name='name'
            id='name'
            defaultValue={user.name}
            disabled={!isEdit}
            minLength='2'
            maxLength='20'
            required
          ></input>
          <label htmlFor='email' className='profile__input-label profile__input-label_type_e-mail'>
            E-mail
          </label>
          <input
            placeholder='E-mail'
            className='profile__input profile__input_type_e-mail'
            type='email'
            name='email'
            id='email'
            defaultValue={user.email}
            disabled={!isEdit}
            required
          />
          {(isEdit && !isFormValid) ?
            <span className='profile__error'>При обновлении профиля произошла ошибка.</span> :
            <span className='profile__error'></span>}
        </Form>
        {!isEdit && (
          <div className='profile__btns'>
            <button className='profile__btn' type='button' onClick={onEditProfile}>
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
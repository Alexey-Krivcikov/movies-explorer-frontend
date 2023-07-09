import './Profile.css';

import FormTitle from '../FormTitle/FormTitle';
import Form from '../Form/Form';

function Profile({ user, isEdit, isFormValid, onSubmit, onEditProfile, onSignOut }) {
  return (
    <main className='profile'>
      <section className='profile__container'>
        <FormTitle titleText={`Привет, ${user.name}!`} place='profile'></FormTitle>
        <Form
          type='profile'
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
            className='profile__input'
            type='text'
            name='name'
            id='name'
            placeholder='Имя'
            defaultValue={user.name}
            disabled={!isEdit && true}
            minLength='2'
            maxLength='20'
            required
          ></input>
          <label htmlFor='email' className='profile__input-label profile__input-label_type_e-mail'>
            E-mail
          </label>
          <input
            className='profile__input profile__input_type_e-mail'
            type='email'
            name='email'
            id='email'
            placeholder='E-mail'
            defaultValue={user.email}
            disabled={!isEdit && true}
            required
          />
          {(isEdit && !isFormValid) && <span className='profile__error'>При обновлении профиля произошла ошибка.</span>}
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
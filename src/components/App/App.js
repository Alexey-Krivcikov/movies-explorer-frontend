import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";

import moviesApi from '../../utils/MoviesApi';



function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathWithHeader = pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' || pathname === '/';
  const pathWithFooter = pathname === '/movies' || pathname === '/saved-movies' || pathname === '/';
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFormValid] = useState(true);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [user] = useState({ name: 'Алексей', email: 'yourMail@gmail.com' });
  const [isLiked, setIsLiked] = useState(false);

  // Авторизация 
  function handleLogin() {
    setIsLoggedIn(true)
  }

  // Профиль
  function handleEditProfile() {
    setIsProfileEdit(true);
  }

  function hadleProfileSubmit() {
    setIsProfileEdit(false);
  }
  // Навигация
  function handleSignOut() {
    setIsLoggedIn(false);
    navigate('/', { replace: true });
  }

  function handleSignUp() {
    navigate('/signin', { replace: true });
  }

  function handleSignIn() {
    setIsLoggedIn(true);
    navigate('/movies', { replace: true });
  }

  function handleNavigateToProfile() {
    navigate('/profile', { replace: true });
    handleCloseBurgerMenu();

  }

  function handleNavigateToMain() {
    navigate('/');
  }
  // Бургер меню
  function handleOpenBurgerMenu() {
    setIsBurgerMenuOpen(true);
  }

  function handleCloseBurgerMenu() {
    setIsBurgerMenuOpen(false);
  }

  // Кнопка Лайка 
  function handleMovieLike() {
    setIsLiked(!isLiked);
  }

  useEffect(() => {
    moviesApi.getMovies().then((movies) => {
      setInitialMovies(movies);
    });
  }, []);

  return (
    <div className='page'>
      <div className='page__container'>
        {pathWithHeader && (
          <Header
            isLoggedIn={isLoggedIn}
            onNavigateToMain={handleNavigateToMain}
            onNavigateToProfile={handleNavigateToProfile}
            isBurgerMenuOpen={isBurgerMenuOpen}
            onBurgerMenuOpen={handleOpenBurgerMenu}
            onBurgerMenuClose={handleCloseBurgerMenu}
          ></Header>
        )}
        <Routes>
          <Route path='/' element={<Main />} />
          <Route
            path='/movies'
            element={<Movies
              moviesCards={initialMovies.slice(0, 12)}
              isLiked={isLiked}
              handleMovieLike={handleMovieLike}
            />}
          />

          <Route
            path='/saved-movies'
            element={<SavedMovies
              moviesCards={initialMovies.slice(0, 3)}
              isLiked={isLiked}
              handleMovieLike={handleMovieLike} />}

          />
          <Route
            path='/profile'
            element={
              <Profile
                user={user}
                isEdit={isProfileEdit}
                isFormValid={isFormValid}
                onSubmit={hadleProfileSubmit}
                onEditProfile={handleEditProfile}
                onSignOut={handleSignOut}
              />
            }
          />
          <Route path='/signin' element={<Login onLogin={handleLogin} onSubmit={handleSignIn} isFormValid={isFormValid} onNavigateToMain={handleNavigateToMain} />} />
          <Route path='/signup' element={<Register onLogin={handleLogin} onSubmit={handleSignUp} isFormValid={isFormValid} onNavigateToMain={handleNavigateToMain} />} />
          <Route path='*' element={<NotFound onNavigateToMain={handleNavigateToMain} />} />
        </Routes>
        {pathWithFooter && (
          <Footer></Footer>
        )}
      </div>
    </div>
  );
}

export default App;

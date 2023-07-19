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
import Preloader from "../Preloader/Preloader";
import CurrentUserContext from '../../contexts/CurrentUserContext';

import moviesApi from '../../utils/MoviesApi';
import mainApi from "../../utils/MainApi";


function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathWithHeader = pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' || pathname === '/';
  const pathWithFooter = pathname === '/movies' || pathname === '/saved-movies' || pathname === '/';

  const [currentUser, setCurrentUser] = useState({});
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [user] = useState({ name: 'Алексей', email: 'pochta@yandex.ru' });

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

  function handleNavigateToSignUp() {
    navigate('/signup', { replace: true });
  }

  function handleNavigateToSignIn() {
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
    navigate('/', { replace: true });
  }
  // Бургер меню
  function handleOpenBurgerMenu() {
    setIsBurgerMenuOpen(true);
  }

  function handleCloseBurgerMenu() {
    setIsBurgerMenuOpen(false);
  }

  useEffect(() => {
    moviesApi.getMovies().then((movies) => {
      setInitialMovies(movies);
    });
  }, []);

  // регистрация


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='page__container'>
          {pathWithHeader && (
            <Header
              isLoggedIn={isLoggedIn}
              onNavigateToMain={handleNavigateToMain}
              onNavigateToProfile={handleNavigateToProfile}
              onNavigateToSignIn={handleNavigateToSignIn}
              onNavigateToSignUp={handleNavigateToSignUp}
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
              />}
            />

            <Route
              path='/saved-movies'
              element={<SavedMovies
                moviesCards={initialMovies.slice(0, 3)} />}

            />
            <Route
              path='/profile'
              element={
                <Profile
                  user={user}
                  isEdit={isProfileEdit}
                  onSubmit={hadleProfileSubmit}
                  onEditProfile={handleEditProfile}
                  onSignOut={handleSignOut}
                />
              }
            />
            <Route path='/signin' element={<Login onLogin={handleLogin} onSubmit={handleSignIn} onNavigateToMain={handleNavigateToMain} />} />
            <Route path='/signup' element={<Register onLogin={handleLogin} onSubmit={handleNavigateToSignIn} onNavigateToMain={handleNavigateToMain} />} />
            <Route path='*' element={<NotFound onNavigateToMain={handleNavigateToMain} />} />
          </Routes>
          {pathWithFooter && (
            <Footer></Footer>
          )}
        </div>
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;

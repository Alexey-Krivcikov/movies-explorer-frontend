import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import './App.css';
import Cookies from "js-cookie";
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
import GuestRoute from "../GuestRoute/GuestRoute";

import moviesApi from '../../utils/MoviesApi';
import mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import * as constants from '../../utils/config/constants';


function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathWithHeader = pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' || pathname === '/';
  const pathWithFooter = pathname === '/movies' || pathname === '/saved-movies' || pathname === '/';

  // Фильмы
  const [foundMovies, setFoundMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [visibleCards, setVisibleCards] = useState(0);
  const [isShortFilm, setIsShortFilm] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopup] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [authError, setAuthError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isMovieLoading, setIsMoviesLoading] = useState(false);

  const [isMovieSearchSuccess, setIsMovieSearchSuccess] = useState(true);

  const [isUserSearch, setIsUserSearch] = useState(false);

  const [lastVisitedPage, setLastVisitedPage] = useState(pathname);

  useEffect(() => {
    // Сохраняем текущий URL в состояние
    setLastVisitedPage(pathname);
    handleGetSavedMovies();
  }, [pathname]);

  // управление количеством отображаемых карточек 
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // получаем значение чекбокса при перезагрузке страницы
  useEffect(() => {
    const savedCheckboxValue = JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE_KEYS.IS_SHORT_FILM));
    if (savedCheckboxValue === null) {
      setIsShortFilm(false)
    }
    setIsShortFilm(savedCheckboxValue);
  }, [])

  // Отображение предыдущего поиска при перезагрузке страницы
  useEffect(() => {
    const foundMoviesFromStorage = JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE_KEYS.FOUND_MOVIES));
    if (foundMoviesFromStorage) {
      setFoundMovies(foundMoviesFromStorage)
    } else {
      setFoundMovies([])
    }
  }, [isLoggedIn])

  // Проверяем, есть ли JWT токен в куках
  useEffect(() => {
    const token = Cookies.get('jwt');
    if (token) {
      setIsLoading(true);
      // Если токен есть, делаем запрос на сервер для получения данных пользователя
      mainApi.getUserInfo()
        .then((data) => {
          setCurrentUser(data); // Сохраняем данные пользователя в состояние
          setIsLoggedIn(true)
          setIsUserSearch(true);
          navigate(lastVisitedPage, { replace: true });
        })
        .catch((err) => {
          // Обработка ошибки
          console.log(err)
          Cookies.remove('jwt');
          setCurrentUser({});
          setIsLoggedIn(false);
        })
        .finally(() => { setIsLoading(false) })
    } else {
      setIsLoading(false)
    }
  }, []);



  // Поиск фильмов
  function handleSearchMovies(searchQuery, isChecked) {
    setIsUserSearch(true);
    !isMovieSearchSuccess && setIsMovieSearchSuccess(true);
    setIsMoviesLoading(true);

    let moviesFromApi = JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE_KEYS.MOVIES));

    if (!moviesFromApi) {
      moviesApi.getMovies()
        .then((movies) => {
          moviesFromApi = movies;
          localStorage.setItem(constants.LOCAL_STORAGE_KEYS.MOVIES, JSON.stringify(moviesFromApi));
          handleFilterMoviesByDuration(isChecked, searchQuery, moviesFromApi);
        })
        .catch(err => {
          console.log(err);
          setIsMovieSearchSuccess(false);
        })
        .finally(() => {
          setIsMoviesLoading(false);
        });
    } else {
      handleFilterMoviesByDuration(isChecked, searchQuery, moviesFromApi);
      setIsMoviesLoading(false);

    }
  }

  // new filter
  const handleFilterMoviesByDuration = (isChecked, searchQuery, moviesFromApi) => {
    setIsShortFilm(isChecked)
    localStorage.setItem(constants.LOCAL_STORAGE_KEYS.IS_SHORT_FILM, isChecked);
    if (searchQuery === null) {
      setIsUserSearch(false);
      return
    } else {
      const foundMovies = moviesFromApi.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (isChecked === true) {
        const filteredFoundMovies = foundMovies.filter(
          (movie) => movie.duration <= constants.SHORT_FILM_DURATION
        );
        setFoundMovies(filteredFoundMovies);
        localStorage.setItem(constants.LOCAL_STORAGE_KEYS.FOUND_MOVIES, JSON.stringify(filteredFoundMovies));
      } else {
        setFoundMovies(foundMovies);
        localStorage.setItem(constants.LOCAL_STORAGE_KEYS.FOUND_MOVIES, JSON.stringify(foundMovies));
      }
      localStorage.setItem(constants.LOCAL_STORAGE_KEYS.SEARCH_QUERY, searchQuery);
    }
  }


  // фильтр сохраненных фильмов
  function handleSearchSavedMovies(searchQuery, isChecked) {
    const allSavedMovies = JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE_KEYS.SAVED_MOVIES));
    const foundSavedMovies = allSavedMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (isChecked === true) {
      const filteredFoundMovies = foundSavedMovies.filter((movie) =>
        movie.duration <= constants.SHORT_FILM_DURATION);
      setSavedMovies(filteredFoundMovies);
    } else {
      setSavedMovies(foundSavedMovies);
    }

  }

  // количество карточек в зависимости от ширины экрана
  function handleResize() {
    const screenWidth = window.innerWidth;

    setVisibleCards(
      screenWidth >= constants.VISIBLE_CARDS_SCREEN_WIDTH.LARGE
        ? 4
        : screenWidth >= constants.VISIBLE_CARDS_SCREEN_WIDTH.MEDIUM
          ? 3
          : screenWidth >= constants.VISIBLE_CARDS_SCREEN_WIDTH.SMALL
            ? 2
            : 5
    )
  }

  // Показать больше карточек
  function handleShowMore() {
    const screenWidth = window.innerWidth;
    let additionalCards = 0;

    if (screenWidth >= constants.VISIBLE_CARDS_SCREEN_WIDTH.LARGE) {
      additionalCards = 4;
    } else if (screenWidth >= constants.VISIBLE_CARDS_SCREEN_WIDTH.MEDIUM) {
      additionalCards = 3;
    } else if (screenWidth >= constants.VISIBLE_CARDS_SCREEN_WIDTH.SMALL) {
      additionalCards = 2;
    } else if (screenWidth >= constants.VISIBLE_CARDS_SCREEN_WIDTH.MOBILE) {
      additionalCards = 2;
    }

    setVisibleCards((prevVisibleCards) => prevVisibleCards + additionalCards);
  }

  // получение сохраненных фильмов
  function handleGetSavedMovies() {
    mainApi.getMovies()
      .then(movies => {
        setSavedMovies(movies);
        localStorage.setItem(constants.LOCAL_STORAGE_KEYS.SAVED_MOVIES, JSON.stringify(movies));
      })
      .catch(err => {
        console.log(err)
      })
  }

  // сохранение фильма
  function handleSaveMovie(movie) {
    const isMovieSaved = savedMovies.some((savedMovie) => {
      return savedMovie.movieId === movie.movieId;
    });
    if (!isMovieSaved) {
      mainApi.saveMovie(movie)
        .then(savedMovie => {
          const updatedSavedMovies = [...savedMovies, savedMovie];
          setSavedMovies(updatedSavedMovies);
          localStorage.setItem(constants.LOCAL_STORAGE_KEYS.SAVED_MOVIES, JSON.stringify(updatedSavedMovies));
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  // удаление фильма
  function handleDeleteMovie(movieId) {
    mainApi.deleteMovie(movieId)
      .then(res => {
        const updatedSavedMovies = savedMovies.filter(savedMovie => savedMovie._id !== movieId);
        setSavedMovies(updatedSavedMovies);
        localStorage.setItem(constants.LOCAL_STORAGE_KEYS.SAVED_MOVIES, JSON.stringify(updatedSavedMovies));
      })
      .catch(err => {
        console.log(err)
      })
  }

  // Очистка хранилища
  function clearLocalStorage() {
    localStorage.removeItem(constants.LOCAL_STORAGE_KEYS.SEARCH_QUERY)
    localStorage.removeItem(constants.LOCAL_STORAGE_KEYS.SAVED_MOVIES);
    localStorage.removeItem(constants.LOCAL_STORAGE_KEYS.FOUND_MOVIES);
    localStorage.removeItem(constants.LOCAL_STORAGE_KEYS.IS_SHORT_FILM);
    localStorage.removeItem(constants.LOCAL_STORAGE_KEYS.MOVIES);
  }

  // Профиль
  function handleProfileSubmit(values) {
    setIsLoading(true)
    const { email, name } = values;
    mainApi.setUserInfo({ email, name })
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        setProfileMessage(constants.PROFILE_UPDATE_MESSAGE)
        handleOpenProfilePopup()
      })
      .catch(err => {
        setProfileMessage(constants.PROFILE_UPDATE_ERROR_MESSAGE);
        console.log(err)
        handleOpenProfilePopup();
      })
      .finally(() => {
        setIsLoading(false)
        setIsProfileEdit(false)
      })
  }

  function hadleProfileEdit() {
    setIsProfileEdit(true);
  }
  // Навигация
  function handleNavigateToSignUp() {
    navigate('/signup', { replace: true });
  }

  function handleNavigateToSignIn() {
    navigate('/signin', { replace: true });
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

  // Попап Профиля
  function handleOpenProfilePopup() {
    setIsProfilePopup(true);
  }

  function handleCloseProfilePopup() {
    setIsProfilePopup(false);
  }

  // регистрация
  function handleRegisterSubmit(values) {
    setIsLoading(true)
    const { name, email, password } = values;
    mainApi.register({ name, email, password })
      .then(() => {
        handleLogin({ email, password });
        setRegisterError('');
      })
      .catch(err => {
        console.log(err)
        setRegisterError(constants.AUTH_ERROR_MESSAGE)
      })
      .finally(() => setIsLoading(false))

  }

  // Авторизация 
  function handleLogin(values) {
    setIsLoading(true)
    const { email, password } = values;
    mainApi.authorize({ email, password })
      .then(data => {
        setIsLoggedIn(true);
        Cookies.set("jwt", data.token, {
          expires: 7
        })
        mainApi.getUserInfo()
          .then(userData => {
            setCurrentUser(userData)
          })
          .catch(err => {
            console.log(err)
          });
        navigate(lastVisitedPage, { replace: true });
        setAuthError('');
      })
      .catch(err => {
        console.log(err)
        setAuthError(constants.AUTH_ERROR_MESSAGE)
      })
      .finally(() => setIsLoading(false))
  }

  // Функция для выхода из аккаунта
  const handleLogout = () => {
    setIsLoading(true)
    mainApi.signout()
      .then(() => {
        Cookies.remove('jwt');
        setCurrentUser({});
        clearLocalStorage();
        handleNavigateToMain();
        setFoundMovies([])
        setIsLoggedIn(false);
        setIsUserSearch(false);
        setIsShortFilm(false);
        setAuthError('');
        setRegisterError('');
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setIsLoading(false))
  };



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='page__container'>
          {isLoading ? (
            <Preloader />
          ) : (
            <>
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
                  element={<ProtectedRoute
                    isUserSearch={isUserSearch}
                    isShortFilm={isShortFilm}
                    onSearchMovies={handleSearchMovies}
                    savedMovies={savedMovies}
                    handleDeleteMovie={handleDeleteMovie}
                    handleSaveMovie={handleSaveMovie}
                    loggedIn={isLoggedIn}
                    element={Movies}
                    visibleCards={visibleCards}
                    handleShowMore={handleShowMore}
                    isMovieLoading={isMovieLoading}
                    isMovieSearchSuccess={isMovieSearchSuccess}
                    moviesCards={foundMovies}
                  />}
                />

                <Route
                  path='/saved-movies'
                  element={
                    <ProtectedRoute
                      isMovieLoading={isMovieLoading}
                      handleShowMore={handleShowMore}
                      handleSearchSavedMovies={handleSearchSavedMovies}
                      handleDeleteMovie={handleDeleteMovie}
                      moviesCards={savedMovies}
                      loggedIn={isLoggedIn}
                      element={SavedMovies}
                      isMovieSearchSuccess={isMovieSearchSuccess}
                      visibleCards={visibleCards}
                    />}
                />

                <Route
                  path='/profile'
                  element={
                    <ProtectedRoute
                      setIsProfileEdit={setIsProfileEdit}
                      isProfilePopupOpen={isProfilePopupOpen}
                      handleCloseProfilePopup={handleCloseProfilePopup}
                      profileMessage={profileMessage}
                      loggedIn={isLoggedIn}
                      element={Profile}
                      isEdit={isProfileEdit}
                      onSubmit={handleProfileSubmit}
                      onEditProfile={hadleProfileEdit}
                      onSignOut={handleLogout}
                    />
                  }
                />
                <Route
                  path='/signin'
                  element={
                    <GuestRoute
                      onSubmit={handleLogin}
                      onNavigateToMain={handleNavigateToMain}
                      authError={authError}
                      isLoggedIn={isLoggedIn}
                      lastVisitedPage={lastVisitedPage}
                      element={Login}
                    />}

                />
                <Route
                  path='/signup'
                  element={
                    <GuestRoute
                      isLoggedIn={isLoggedIn}
                      lastVisitedPage={lastVisitedPage}
                      element={Register}
                      registerError={registerError}
                      onSubmit={handleRegisterSubmit}
                      onNavigateToMain={handleNavigateToMain}
                    />}
                />
                <Route path='*' element={<NotFound onNavigateToMain={handleNavigateToMain} />} />
              </Routes>
              {pathWithFooter && (
                <Footer></Footer>
              )}
            </>
          )}
        </div>
      </div>

    </CurrentUserContext.Provider>

  );
}

export default App;

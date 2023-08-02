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

import moviesApi from '../../utils/MoviesApi';
import mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";


function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathWithHeader = pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' || pathname === '/';
  const pathWithFooter = pathname === '/movies' || pathname === '/saved-movies' || pathname === '/';

  // Фильмы
  const [foundMovies, setFoundMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [visibleCards, setVisibleCards] = useState(0);

  const [currentUser, setCurrentUser] = useState({});
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopup] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authError, setAuthError] = useState('');

  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isMovieLoading, setIsMoviesLoading] = useState(false);
  const [isUserSearchSuccess, setUserSearchSuccess] = useState(true);

  // управление количеством отображаемых карточек 
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('foundMovies'));
    if (savedMovies) {
      setFoundMovies(savedMovies)
    } else {
      handleGetSavedMovies();
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
  function handleSearchMovies(searchQuery) {
    setIsMoviesLoading(true);

    !isUserSearchSuccess && setUserSearchSuccess(true);

    let moviesFromApi = JSON.parse(localStorage.getItem('movies'));
    let storedVisibleCards = JSON.parse(localStorage.getItem("visibleCards"));

    if (moviesFromApi) {
      setFoundMovies(moviesFromApi);
    }

    if (storedVisibleCards) {
      setVisibleCards(storedVisibleCards);
    }

    if (!moviesFromApi) {
      moviesApi.getMovies()
        .then((movies) => {
          moviesFromApi = movies;
          localStorage.setItem('movies', JSON.stringify(moviesFromApi));
          handleFilterMovies(searchQuery, moviesFromApi);
        })
        .catch(err => {
          console.log(err);
          setUserSearchSuccess(false);
        })
        .finally(() => {
          setIsMoviesLoading(false);
        });
    } else {
      handleFilterMovies(searchQuery, moviesFromApi);
      setIsMoviesLoading(false);

    }


    // Фильтрация фильмов
    function handleFilterMovies(searchQuery, moviesFromApi) {
      localStorage.setItem('searchQuery', searchQuery);
      const foundMovies = moviesFromApi.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const checkboxState = localStorage.getItem('isShortFilm');
      if (checkboxState === 'true') {
        const filteredFoundMovies = foundMovies.filter((movie) =>
          movie.duration <= 40);
        setFoundMovies(filteredFoundMovies);
        localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
      } else {
        setFoundMovies(foundMovies);
        localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
      }
    }
  }

  // Поиск в сохраненных фильмах фильмов
  function handleSearchSavedMovies(searchQuery) {
    if (savedMovies.length > 0) {
      handleFilterSavedMovies(searchQuery, savedMovies)
    }
  }

  // фильтр сохраненных фильмов
  function handleFilterSavedMovies(searchQuery, savedMovies) {
    localStorage.setItem('searchQuery', searchQuery);
    const foundSavedMovies = savedMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const checkboxState = localStorage.getItem('isShortFilm');
    if (checkboxState === 'true') {
      const filteredFoundMovies = savedMovies.filter((movie) =>
        movie.duration <= 40);
      setSavedMovies(filteredFoundMovies);
    } else {
      setSavedMovies(foundSavedMovies);
    }
  }


  // фильтр по чекбоксу 
  function handleFilterCheckbox() {
    const checkboxState = localStorage.getItem('isShortFilm');
    if (!(checkboxState === 'true')) {
      const filteredFoundMovies = foundMovies.filter((movie) =>
        movie.duration <= 40);
      setFoundMovies(filteredFoundMovies);
    } else {
      setFoundMovies(JSON.parse(localStorage.getItem('foundMovies')))
    }
  }

  //  фильтр по чекбоксу в сохраненных фильмах  
  function handleFilterSavedCheckbox() {
    const checkboxState = localStorage.getItem('isShortFilm');
    if (!(checkboxState === 'true')) {
      const filteredFoundMovies = savedMovies.filter((movie) =>
        movie.duration <= 40);
      setSavedMovies(filteredFoundMovies);
    } else {
      setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')))
    }
  }
  // количество карточек в зависимости от ширины экрана
  function handleResize() {
    const screenWidth = window.innerWidth;

    setVisibleCards(
      screenWidth >= 1280
        ? 4
        : screenWidth >= 990
          ? 3
          : screenWidth >= 768
            ? 2
            : 5
    )
  }

  // Показать больше карточек
  function handleShowMore() {
    const screenWidth = window.innerWidth;
    let additionalCards = 0;

    if (screenWidth >= 1280) {
      additionalCards = 4;
    } else if (screenWidth >= 990) {
      additionalCards = 3;
    } else if (screenWidth >= 768) {
      additionalCards = 2;
    } else if (screenWidth >= 320) {
      additionalCards = 2;
    }

    setVisibleCards((prevVisibleCards) => prevVisibleCards + additionalCards);
  }

  // получение сохраненных фильмов
  function handleGetSavedMovies() {
    mainApi.getMovies()
      .then(movies => {
        setSavedMovies(movies);
        localStorage.setItem('savedMovies', JSON.stringify(movies));
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
          localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
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
        localStorage.setItem('savedMovies', JSON.stringify(updatedSavedMovies));
      })
      .catch(err => {
        console.log(err)
      })
  }

  // Очистка хранилища
  function clearLocalStorage() {
    localStorage.removeItem("searchQuery")
    localStorage.removeItem("foundSavedMovies");
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('foundMovies');
    localStorage.removeItem('isShortFilm');
  }

  // Профиль
  function handleProfileSubmit(values) {
    setIsLoading(true)
    const { email, name } = values;
    mainApi.setUserInfo({ email, name })
      .then(updatedUser => {
        setCurrentUser(updatedUser);
        setProfileMessage('Профиль успешно обновлён')
        setIsProfileEdit(false);
        handleOpenProfilePopup()
      })
      .catch(err => {
        setProfileMessage('Ошибка при обновлении профиля.');
        console.log(err)
        handleOpenProfilePopup();
      })
      .finally(() => setIsLoading(false))
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
      })
      .catch(err => {
        console.log(err)
        setAuthError('Неправильный логин или пароль')
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
        navigate('/movies', { replace: true });
      })
      .catch(err => {
        console.log(err)
        setAuthError('Неправильный логин или пароль')
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

      })
      .catch((error) => {
        console.error("Ошибка выхода из аккаунта:", error);
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
                    savedMovies={savedMovies}
                    handleDeleteMovie={handleDeleteMovie}
                    handleSaveMovie={handleSaveMovie}
                    loggedIn={isLoggedIn}
                    element={Movies}
                    visibleCards={visibleCards}
                    handleShowMore={handleShowMore}
                    isMovieLoading={isMovieLoading}
                    isUserSearchSuccess={isUserSearchSuccess}
                    onSearchSubmit={handleSearchMovies}
                    moviesCards={foundMovies}
                    handleFilterCheckbox={handleFilterCheckbox}
                  />}
                />

                <Route
                  path='/saved-movies'
                  element={
                    <ProtectedRoute
                      handleFilterSavedCheckbox={handleFilterSavedCheckbox}
                      handleSearchSavedMovies={handleSearchSavedMovies}
                      handleDeleteMovie={handleDeleteMovie}
                      savedMovies={savedMovies}
                      loggedIn={isLoggedIn}
                      element={SavedMovies}
                      moviesCards={savedMovies}
                      isUserSearchSuccess={isUserSearchSuccess}
                    />}
                />

                <Route
                  path='/profile'
                  element={
                    <ProtectedRoute
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
                    <Login
                      onSubmit={handleLogin}
                      onNavigateToMain={handleNavigateToMain}
                      authError={authError}
                    />}
                />
                <Route
                  path='/signup'
                  element={
                    <Register
                      registerError={authError}
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

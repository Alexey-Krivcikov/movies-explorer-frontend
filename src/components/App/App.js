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


function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathWithHeader = pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' || pathname === '/';
  const pathWithFooter = pathname === '/movies' || pathname === '/saved-movies' || pathname === '/';

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
    }
  }, [])

  // Фильмы
  const [movies, setMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserSearch, setUserSearch] = useState(false);
  const [visibleCards, setVisibleCards] = useState(0);

  const [currentUser, setCurrentUser] = useState({});
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [user, setUser] = useState({});

  const [isMovieLoading, setIsMoviesLoading] = useState(false);
  const [isUserSearchSuccess, setUserSearchSuccess] = useState(true);

  // Проверяем, есть ли JWT токен в куках
  useEffect(() => {

    const token = Cookies.get('jwt');
    if (token) {
      // Если токен есть, делаем запрос на сервер для получения данных пользователя
      mainApi.getUserInfo()
        .then((data) => {
          setUser(data); // Сохраняем данные пользователя в состояние
        })
        .catch((err) => {
          // Обработка ошибки
          console.log(err)
        });
    }
  }, []);

  // Поиск фильмов
  function handleSearchMovies(searchQuery) {
    setIsMoviesLoading(true);
    !isUserSearch && setUserSearch(true);

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
          setSearchQuery(searchQuery);
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
      localStorage.setItem('userSearchQuery', searchQuery);
      const foundMovies = moviesFromApi.filter((movie) =>
        movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase())
      );

      localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
      setFoundMovies(foundMovies);

      const checkboxState = localStorage.getItem('isShortFilm');
      if (checkboxState === 'true') {
        const filteredFoundMovies = foundMovies.filter((movie) =>
          movie.duration <= 40);
        setMovies(filteredFoundMovies);
      } else {
        setMovies(foundMovies);
      }
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

  // Очистка хранилища
  function clearLocalStorage() {
    localStorage.removeItem("searchQuery");
    localStorage.removeItem('movies');
    localStorage.removeItem('foundMovies');
    localStorage.removeItem('isShortFilm');
  }



  // Профиль
  function handleEditProfile() {
    setIsProfileEdit(true);
  }

  function hadleProfileSubmit() {
    setIsProfileEdit(false);
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

  // регистрация
  function handleRegisterSubmit(values) {
    const { name, email, password } = values;
    mainApi.register({ name, email, password })
      .then(() => {
        handleLogin({ email, password });
      })
      .catch(err => {
        console.log(err)
      })
  }

  // Авторизация 
  function handleLogin(values) {
    const { email, password } = values;

    mainApi.authorize({ email, password })
      .then(data => {
        setIsLoggedIn(true);
        Cookies.set('jwt', data.token);
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
      })
  }

  // Функция для выхода из аккаунта
  const handleLogout = () => {
    mainApi.signout()
    // Очищаем куку с JWT токеном
    Cookies.remove('jwt');
    // Удаляем данные пользователя из состояния
    setUser(null);
    clearLocalStorage();
    handleNavigateToMain();
    setIsLoggedIn(false);
  };

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
                visibleCards={visibleCards}
                handleShowMore={handleShowMore}
                isMovieLoading={isMovieLoading}
                isUserSearchSuccess={isUserSearchSuccess}
                onSearchSubmit={handleSearchMovies}
                moviesCards={foundMovies}
              />}
            />

            <Route
              path='/saved-movies'
              element={<SavedMovies
                moviesCards={foundMovies.slice(0, 3)} />}

            />
            <Route
              path='/profile'
              element={
                <Profile
                  isEdit={isProfileEdit}
                  onSubmit={hadleProfileSubmit}
                  onEditProfile={handleEditProfile}
                  onSignOut={handleLogout}
                />
              }
            />
            <Route path='/signin' element={<Login onSubmit={handleLogin} onNavigateToMain={handleNavigateToMain} />} />
            <Route path='/signup' element={<Register onSubmit={handleRegisterSubmit} onNavigateToMain={handleNavigateToMain} />} />
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

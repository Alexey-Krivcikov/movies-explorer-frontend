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

  // управление количеством отображаемых карточек 
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    console.log(visibleCards)
    console.log(foundMovies.slice(0, visibleCards))
    return () => {
      window.removeEventListener('resize', handleResize)
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
  const [user] = useState({ name: 'Алексей', email: 'pochta@yandex.ru' });

  const [isMovieLoading, setIsMoviesLoading] = useState(false);
  const [isUserSearchSuccess, setUserSearchSuccess] = useState(true);


  // Поиск фильмов
  function handleSearchMovies(searchQuery) {
    setIsMoviesLoading(true);
    !isUserSearch && setUserSearch(true);

    let moviesFromApi = JSON.parse(localStorage.getItem('movies'));

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

      const checkboxState = localStorage.getItem('checkboxState');
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

    if (screenWidth >= 1280) {
      setVisibleCards(4)
    } else if (screenWidth >= 990 && screenWidth <= 1280) {
      setVisibleCards(3)
    } else if (screenWidth >= 768 && screenWidth <= 988) {
      setVisibleCards(2)
    } else if (screenWidth >= 320 && screenWidth <= 767) {
      setVisibleCards(1)
    }
  }

  // Показать больше карточек
  function handleShowMore() {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1280) {
      setVisibleCards(prevVisibleCards => prevVisibleCards + 4)
    } else if (screenWidth >= 990 && screenWidth <= 1280) {
      setVisibleCards(prevVisibleCards => prevVisibleCards + 3)
    } else if (screenWidth >= 768 && screenWidth <= 988) {
      setVisibleCards(prevVisibleCards => prevVisibleCards + 2)
    } else if (screenWidth >= 320 && screenWidth <= 767) {
      setVisibleCards(prevVisibleCards => prevVisibleCards + 1)
    }
  }

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

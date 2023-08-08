export const MOVIES_API_BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const API_BASE_URL_LOCALHOST = 'http://localhost:3000';
export const API_BASE_URL = 'http://localhost:3000';

export const HEADERS = {
  'Content-Type': 'application/json',
};

export const CREDENTIALS = 'include';

export const NAME_REGEX = /^[A-Za-zА-Яа-я\s-]+$/;
export const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const PASSWORD_REGEX = /.+/;
export const SEARCH_REGEX = /.+/;

export const ERROR_MESSAGES = {
  name: 'Имя должно содержать только латиницу, кириллицу, пробел или дефис.',
  email: 'Введите корректный email.',
  password: 'Пароль обязателен.',
  search: 'Нужно ввести ключевое слово.',
};

export const USER_SEARCH_ERROR = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
export const AUTH_ERROR_MESSAGE = 'Неправильный логин или пароль';
export const REGISTER_ERROR_MESSAGE = 'Ошибка при регистрации';
export const PROFILE_UPDATE_ERROR_MESSAGE = 'Ошибка при обновлении профиля';
export const PROFILE_UPDATE_MESSAGE = 'Профиль успешно обновлён';
export const ERROR_SEARCH = 'Нужно ввести ключевое слово.'

export const SHORT_FILM_DURATION = 40;

export const VISIBLE_CARDS_SCREEN_WIDTH = {
  LARGE: 1280,
  MEDIUM: 990,
  SMALL: 768,
  MOBILE: 320,
};

export const LOCAL_STORAGE_KEYS = {
  MOVIES: 'movies',
  SAVED_MOVIES: 'savedMovies',
  FOUND_MOVIES: 'foundMovies',
  IS_SHORT_FILM: 'isShortFilm',
  SEARCH_QUERY: 'searchQuery',
};

export const FORM_LABELS = {
  name: 'Имя',
  email: 'E-mail',
  password: 'Пароль',
};

// About Me
export const PROJECT = 'Учебный проект студента факультета Веб-разработки.';
export const TITLE = 'Студент';
export const NAME = 'Алексей';
export const DESCRIPTION = 'Фронтенд-разработчик, 28 лет';
export const BIOGRAPHY = `Я родился в Белгороде и живу в Сочи, учился на факультете химической-технологии БГТУ им.Шухова.
  У меня есть жена. Я люблю слушать музыку и играть на гитаре, а ещё хожу в тренажерный зал.
  Недавно начал кодить. С 2020 года работаю в компании «Макдональдс». После того, как прошёл курс по веб-разработке,
  начал заниматься фриланс-заказами.`;
export const GITHUB_LINK = 'https://github.com/Alexey-Krivcikov';
export const PHOTO_ALT = 'Фото студента';


// About Project
export const PROJECT_TITLE = 'О проекте';

export const PROJECT_STAGES = [
  {
    title: 'Дипломный проект включал 5 этапов',
    text: 'Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.',
  },
  {
    title: 'На выполнение диплома ушло 5 недель',
    text: 'У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.',
  },
];

export const SCHEDULE = [
  {
    week: '1 неделя',
    text: 'Back-end',
  },
  {
    week: '4 недели',
    text: 'Front-end',
  },
];

// Auth
export const AUTH_PARAGRAPH_SUFFIX = 'зарегистрированы?';

// BurgerMenu
export const MAIN_NAVIGATION = 'Главная';
export const MOVIES_NAVIGATION = 'Фильмы';
export const SAVED_MOVIES_NAVIGATION = 'Сохранённые фильмы';

// Checkbox
export const CHECKBOX_SHORT_FILM = 'Короткометражки';

// Footer
export const YANDEX_PRACTICUM_LINK = 'https://practicum.yandex.ru/';
export const GITHUB_LINK_PROJECT = 'https://github.com/Alexey-Krivcikov/movies-explorer-frontend';
export const YANDEX_PRACTICUM_NAME = 'Яндекс.Практикум';
export const GITHUB_NAME = 'Github';
export const FOOTER_TITLE = 'Учебный проект Яндекс.Практикум х BeatFilm.';

// Login
export const REGISTER_TITLE = 'Добро пожаловать!';
export const LOGIN_TITLE = 'Рады видеть!';
export const LOGIN_BUTTON_TEXT = 'Войти';
export const REGISTER_BUTTON_TEXT = 'Зарегистрироваться';

export const REGISTER_PARAGRAPH_TEXT = 'Уже';
export const LOGIN_PARAGRAPH_TEXT = 'Ещё не';
export const LOGIN_LINK_TEXT = 'Регистрация';

// Logo
export const LOGO_ALT = 'Логотип';

// MoviesCards
export const BEAT_FILM_URL = 'https://api.nomoreparties.co';
export const MOVIE_HOUR = 60;

// MoviesCardList 
export const NO_MOVIES_FOUND = 'Фильмы не найдены';
export const SHOW_MORE = 'Ещё';

// NavTab
export const TECHS = 'Технологии';

// Not Found
export const NOT_FOUND_404 = '404';
export const NOT_FOUND = 'Страница не найдена';
export const BACK = 'Назад';

// Portfolio
export const PORTFOLIO_TITLE = 'Портфолио';
export const PORTFOLIO_ITEMS = [
  {
    title: 'Статичный сайт',
    link: 'https://alexey-krivcikov.github.io/how-to-learn/',
  },
  {
    title: 'Адаптивный сайт',
    link: 'https://alexey-krivcikov.github.io/russian-travel/',
  },
  {
    title: 'Одностраничное приложение',
    link: 'https://alexey-krivcikov.github.io/mesto-react/',
  },
];

export const PROFILE_BUTTONS_TEXT = {
  edit: 'Редактировать',
  logout: 'Выйти из аккаунта',
  account: 'Аккаунт'
};

export const PROFILE_BTN_ALT = 'кнопка профиля';

export const TECHS_MAIN_TITLE = '7 технологий';
export const TECHS_DESCRIPTION = 'На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.';
export const TECHS_LIST = [
  'HTML',
  'CSS',
  'JS',
  'React',
  'Git',
  'Express.js',
  'mongoDB',
];


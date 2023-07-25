class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._credentials = options.credentials;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(this._checkResponse);
  }

  // users
  getUserInfo() {
    return this._request('/users/me', {
      method: 'GET',
      headers: this._headers,
      credentials: this._credentials,
    })
  }

  setUserInfo({ name, email }) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name,
        email,
      }),
    });
  }

  register({ name, email, password }) {
    return this._request('/signup', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
        password,
      })
    })
  }

  authorize({ email, password }) {
    return this._request('/signin', {
      method: 'POST',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      })
    })
  }

  signout() {
    return this._request('/signout', {
      method: 'GET',
      headers: this._headers,
      credentials: this._credentials,
    })
  }

  // movies
  getMovies() {
    return this._request('/movies', {
      method: 'GET',
      credentials: this._credentials,
      headers: this._headers,
    });
  }

  saveMovie({
    nameRU,
    nameEN,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId, }) {
    return this._request('/movies', {
      method: 'POST',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        nameRU,
        nameEN,
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        thumbnail,
        movieId,
      })
    })
  }

  deleteMovie(movieId) {
    return this._request(`/movies/${movieId}`, {
      method: "DELETE",
      credentials: this._credentials,
      headers: this._headers,
    });
  }
}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3000',
  headers: {
    "Content-Type": "application/json",
  },
  credentials: 'include',
})

export default mainApi;
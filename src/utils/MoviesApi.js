import { MOVIES_API_BASE_URL, HEADERS } from "./config/constants";

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(endpoint, options) {
    return fetch(`${this._baseUrl}${endpoint}`, options).then(this._checkResponse);
  }

  getMovies() {
    return this._request('/', {
      headers: this._headers,
    });
  }
}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_API_BASE_URL,
  headers: HEADERS,
});

export default moviesApi;
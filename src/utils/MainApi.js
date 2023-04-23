const BASE_URL = "https://api.movieforyou.nomoredomains.work";
const MOVIEBASE_URL = "https://api.nomoreparties.co/beatfilm-movies";
const IMAGES_URL = "https://api.nomoreparties.co";

function checkRes(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({ name, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, email: email, password: password }),
  })
    .then(checkRes)
    .then((res) => {
      return res;
    });
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then(checkRes)
    .then((res) => {
      return res;
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkRes)
    .then((res) => {
      return res;
    });
};

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkRes)
    .then((res) => {
      return res;
    });
};

export const updateProfile = ({ token, username, email }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${/* localStorage.getItem("jwt") */ token}`, // or token ???
    },
    body: JSON.stringify({ name: username, email: email }),
  }).then(checkRes);
};

export const getSavedMovies = (token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${/* localStorage.getItem("jwt") */ token}`,
    },
  })
    .then(checkRes)
    .then((res) => {
      return res;
    });
};

export const saveMovie = (token, movie) => {
  return fetch(`${BASE_URL}/movies/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${/* localStorage.getItem("jwt") */ token}`,
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
    }),
  })
    .then(checkRes)
    .then((res) => {
      return res;
    });
};

export const deleteMovie = (token, movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {  // or ${id}
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(this._getResponse)
};


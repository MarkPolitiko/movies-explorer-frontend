import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import "./App.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as mainApi from "../../utils/MainApi";
import { getMovies } from "../../utils/MoviesApi";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const [loginErrMessage, setLoginErrMessage] = useState("");
  const [regErrMessage, setRegErrMessage] = useState("");

  const [profileMessage, setProfileMessage] = useState("");

  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isShortsChecked, setIsShortsChecked] = useState(false);
  const [notFound, setNotFound] = useState(false);

  function eraseErrMessages() {
    setRegErrMessage("");
    setLoginErrMessage("");
  }

  function handleLogin(password, email) {
    setIsLoading(true);
    setRegErrMessage("");

    mainApi
      .login(password, email)
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          localStorage.setItem("jwt", data.token);
          setLoginErrMessage("");

          mainApi
            .getUserInfo(data.token)
            .then((userInfo) => {
              setCurrentUser(userInfo);
            })
            .catch((res) => {
              setLoginErrMessage(`Что-то пошло не так. Ошибка ${res.status}`);
            });
          navigate("/movies");
        }
      })
      .catch((res) => {
        if (res.statusText === "Bad Request") {
          setLoginErrMessage("Были введены неверные данные");
        } else if (res.status === 409) {
          setLoginErrMessage("Такая электронная почта уже существует");
        } else {
          setLoginErrMessage(`Что-то пошло не так. Ошибка ${res.status}`);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegister(name, password, email) {
    setIsLoading(true);
    setRegErrMessage("");

    mainApi
      .register(name, password, email)
      .then((res) => {
        if (res.user) {
          setRegErrMessage("");
          handleLogin(password, email);
        }
      })
      .catch((res) => {
        if (res.statusText === "Bad Request") {
          setRegErrMessage("Были введены неверные данные");
        } else if (res.status === 409) {
          setRegErrMessage("Такая электронная почта уже существует");
        } else {
          setRegErrMessage(`Что-то пошло не так. Ошибка ${res.status}`);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUserProfile(username, email) {
    const token = localStorage.getItem("jwt");

    mainApi
      .updateProfile(token, username, email)
      .then((newProfile) => {
        if (newProfile) {
          setCurrentUser(newProfile.user);
          setIsSuccess(true);
          setProfileMessage("Профиль обновлен");
        }
      })
      .catch((res) => {
        setIsSuccess(false);
        if (res.statusText === "Bad Request") {
          setProfileMessage("Были введены неверные данные");
        } else if (res.status === 409) {
          setProfileMessage("Такая электронная почта уже существует");
        } else {
          setProfileMessage(`Что-то пошло не так. Ошибка ${res.status}`);
        }
      });
  }

  function handleShortsChecked(evt) {
    setIsShortsChecked(evt.target.checked);
  }

  function handleMoviesSearch(movies, word) {
    const regExp = new RegExp(word, "gi");

    return movies.filter((movie) => {
      if (isShortsChecked) {
        return movie.duration <= 40 && regExp.test(movie.nameRU);
      } else {
        return regExp.test(movie.nameRU);
      }
    });
  }

  function handleMoviesSave(movie) {
    const token = localStorage.getItem("jwt");
    mainApi
      .saveMovie(token, movie)
      .then((savedMovie) => {
        const films = [...savedMovies, savedMovie];
        localStorage.setItem("savedMovies", JSON.stringify(films));
        setSavedMovies((prevState) => [...prevState, savedMovie]);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}, попробуйте еще раз`);
      });
  }

  function handleMoviesDelete(movieId) {
    const token = localStorage.getItem("jwt");

    mainApi
      .deleteMovie(token, movieId)
      .then(() => {
        const newMovie = savedMovies.filter((deletedMovie) => {
          return deletedMovie._id !== movieId;
        });
        setSavedMovies(newMovie);
        localStorage.setItem("savedMovies", JSON.stringify(newMovie));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}, попробуйте еще раз`);
      });
  }

  function searchMovies(params) {
    setIsLoading(true);
    setMovies([]);
    setNotFound(false);

    if (allMovies.length === 0) {
      getMovies()
        .then((movies) => {
          setAllMovies(movies);
          const searchResult = handleMoviesSearch(movies, params);

          if (searchResult.length === 0) {
            setNotFound(true);
            setMovies([]);
          } else {
            localStorage.setItem("movies", JSON.stringify(searchResult));
            setMovies(JSON.parse(localStorage.getItem("movies")));
            setNotFound(false);
          }
        })
        .catch((err) => {
          console.log(`Ошибка ${err}, попробуйте еще раз`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      const searchResult = handleMoviesSearch(allMovies, params);

      if (searchResult.length === 0) {
        setNotFound(true);
        setMovies([]);
        setIsLoading(false);
      } else if (searchResult.length !== 0) {
        localStorage.setItem("movies", JSON.stringify(searchResult));
        setMovies(JSON.parse(localStorage.getItem("movies")));
        setIsLoading(false);
        setNotFound(false);
      }
    }
  }

  function searchSavedMovies(params) {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    const searchSaveRes = handleMoviesSearch(savedMovies, params);

    if (searchSaveRes.length === 0) {
      setIsLoading(false);
      setSavedMovies([]);
      setNotFound(true);
    } else {
      setIsLoading(false);
      setSavedMovies(searchSaveRes);
      setNotFound(false);
    }
  }

  function handleLogOut() {
    setIsLoggedIn(false);
    setMovies([]);
    setAllMovies([]);
    setSavedMovies([]);
    setNotFound(false);
    setCurrentUser("");
    navigate("/");
    localStorage.clear();
  }

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      const token = localStorage.getItem("jwt");
      setProfileMessage("");
      setIsSuccess(true);
      mainApi
        .getSavedMovies(token)
        .then((movies) => {
          setSavedMovies(movies);
        })
        .catch((err) => {
          console.log(`Ошибка ${err}, попробуйте позднее`);
        });
    }
  }, [location]);

  React.useEffect(() => {
    if (location.pathname === "/movies") {
      const token = localStorage.getItem("jwt");
      const searchedMovies = JSON.parse(localStorage.getItem("movies"));

      Promise.all([mainApi.getUserInfo(token), mainApi.getSavedMovies(token)])
        .then(([userData, movies]) => {
          setCurrentUser(userData);
          localStorage.setItem("savedMovies", JSON.stringify(movies));
          setSavedMovies(movies);
          setMovies(searchedMovies);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.log(`Ошибка ${err}, попробуйте позднее`);
        });
    }
  }, [navigate, location.pathname, isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route exact path="/" element={<Main />} />

          <Route
            path="/movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Movies
                  /* component={Movies} */
                  movies={movies}
                  onSearchMovies={searchMovies}
                  onMoviesDelete={handleMoviesDelete}
                  onMovieSave={handleMoviesSave}
                  notFound={notFound}
                  isLoading={isLoading}
                  onShortsCheck={handleShortsChecked}
                  isShortsChecked={isShortsChecked}
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedMovies
                  /* component={SavedMovies} */
                  movies={savedMovies}
                  onMoviesDelete={handleMoviesDelete}
                  onSearchSavedMovies={searchSavedMovies}
                  notFound={notFound}
                  onShortsCheck={handleShortsChecked}
                  isShortsChecked={isShortsChecked}
                  isLoading={isLoading}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                component={Profile}
                onLogOut={handleLogOut}
                isLoading={isLoading}
                onUserProfile={handleUserProfile}
                profileMessage={profileMessage}
                isSuccess={isSuccess}
                isLoggedIn={isLoggedIn}
              />
            }
          />

          <Route
            path="/signup"
            element={
              <Register
                onRegister={handleRegister}
                errorMessage={regErrMessage}
                isLoading={isLoading}
                onErase={eraseErrMessages}
              />
            }
          />

          <Route
            path="/signin"
            element={
              <Login
                onLogin={handleLogin}
                errorMessage={loginErrMessage}
                isLoading={isLoading}
                onErase={eraseErrMessages}
              />
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

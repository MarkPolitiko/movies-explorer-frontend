import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  useLocation,
  useHistory,
  Redirect,
} from "react-router-dom";

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
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import { WINDOW_WIDTH, CARD_AMOUNT, ADDED_CARDS, SHORTS_DURATION } from "../../utils/config";

function App() {
  const location = useLocation();
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isRegSuccess, setIsRegSuccess] = useState(false);
  const [loginErr, setLoginErr] = useState(false);
  const [loginErrMessage, setLoginErrMessage] = useState("");
  const [regErrMessage, setRegErrMessage] = useState("");
  const [resMessage, setResMessage] = useState("");

  const [profileMessage, setProfileMessage] = useState("");
  const [profileErrMessage, setProfileErrMessage] = useState("");
  const [isProfileRefreshSuccess, setIsProfileRefreshSuccess] = useState(false);

  const [showMovies, setShowMovies] = useState([]);
  const [previousMovieSearch, setPreviousMovieSearch] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [notFound, setNotFound] = useState(false);

  const [shortsSearch, setShortsSearch] = useState(false);
  const [savedShortsSearch, setSavedShortsSearch] = useState(false);
  const [isShortsChecked, setIsShortsChecked] = useState(false);
  const [savedShortsCheck, setSavedShortsCheck] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [moviesAmount, setMoviesAmount] = useState(() => {
    // const windowWidth = window.innerWidth;
    if (windowWidth <= WINDOW_WIDTH.MOBILE) {
      return CARD_AMOUNT.MIN;
    } else if (windowWidth <= WINDOW_WIDTH.TABLET) {
      return CARD_AMOUNT.MID;
    } else if (windowWidth > WINDOW_WIDTH.TABLET) {
      return CARD_AMOUNT.MAX;
    }
  });

  const [addedCards, setAddedCards] = useState(() => {
    // const windowWidth = window.innerWidth;
    if (windowWidth <= WINDOW_WIDTH.TABLET) {
      return ADDED_CARDS.MIN;
    } else if (windowWidth > WINDOW_WIDTH.TABLET) {
      return ADDED_CARDS.MAX;
    }
  });

  const [moreMovies, setIsMoreMovies] = useState(false);

  const widthHandler = () => {
    // const windowWidth = window.innerWidth;
    if (windowWidth < 480) {
      setMoviesAmount(5);
      setAddedCards(2);
    } else if (windowWidth <= 768) {
      setMoviesAmount(8);
      setAddedCards(2);
    } else if (windowWidth > 768) {
      setMoviesAmount(12);
      setAddedCards(3);
    }
  };

  function handleMoviesRender(movies, moviesToShow) {
    if (movies) {
      if (movies.length > moviesToShow) {
        setIsMoreMovies(true);
        setShowMovies(movies.slice(0, moviesAmount));
      } else {
        setIsMoreMovies(false);
        setShowMovies(movies);
      }
    }
  }

  const handleMoviesAddition = () => {
    // let newLimit;
    if (moviesAmount + addedCards < filteredMovies.length) {
      let newAmount = moviesAmount + addedCards;
      handleMoviesRender(filteredMovies.slice(0, newAmount));
      setMoviesAmount(newAmount);
      setIsMoreMovies(true);
    } else if (moviesAmount + addedCards >= filteredMovies.length) {
      let newAmount = filteredMovies.length;
      handleMoviesRender(filteredMovies, newAmount);
      setIsMoreMovies(false);
    }
  };

  useEffect(() => {
    setMoviesAmount(widthHandler);
  }, [windowWidth]);

  useEffect(() => {
    handleMoviesRender(filteredMovies, moviesAmount);
  }, [moviesAmount]);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setTimeout(() => {
        windowCounter();
      }, 1000)
    );
  }, []);

  const windowCounter = () => {
    setWindowWidth(window.innerWidth);
  };

  function handleLogin(data) {
    if (!data.email || !data.password) {
      return;
    }
    setIsLoading(true);
    mainApi
      .login(data)
      .then((res) => {
        if (!res) throw new Error("Неправильные имя пользователя или пароль");
        else {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setLoginErrMessage("Что-то пошло не так. Проверьте введенные данные");
        setIsLoading(false);
        setLoginErr(true);
        console.log(err);
      });
  }

  useEffect(() => {
    if(isLoggedIn) {
      setIsLoading(true);
      Promise.all([
        mainApi.getUserInfo(localStorage.getItem("jwt")),
        mainApi.getMovies(),
      ])
        .then(([user, movies]) => {
          setCurrentUser(user);
          const userMovies = movies.filter((movie) => movie.owner === user._id);
          localStorage.setItem("savedMovies", JSON.stringify(userMovies));
          setSavedMovies(userMovies);
          history.push("/movies");
          setTimeout(() => setIsLoading(false), 1000);
        })
        .catch((err) => console.log(err));
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    // let previousMovieSearch;
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            // if (localStorage.movieSearch) {
            //   const previousMovieSearch = JSON.parse(
            //     localStorage.getItem("movieSearch")
            //   );
            //   setPreviousMovieSearch(previousMovieSearch);
            //   searchMovies(previousMovieSearch);
            //   // if (localStorage.isShortsChecked) {
            //   //   //setShortsSearch(true);
            //   // }
            // }
          }
          localStorage.removeItem("isShortsChecked");
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function handleRegister(regData) {

    mainApi
      .register(regData)
      .then((res) => {
        if (res.status !== 400) {
          setTimeout(() => handleLogin(regData), 1000);
          setCurrentUser(res);
          setIsRegSuccess(true);
          setProfileMessage("Вы успешно зарегистрированы!");
          setIsLoading(false);
          setTimeout(() => setProfileErrMessage(""), 1000);
        }
      })
      .catch(() => {
          setIsLoading(false);
          setProfileErrMessage("Что-то пошло не так. Проверьте введенные данные");
          setTimeout(() => setProfileErrMessage(""), 3000);
      });
  }

  function handleUserProfile(userData) {
    // const token = localStorage.getItem("jwt");
    setProfileMessage("");
    setProfileErrMessage("");
    setIsLoading(true);

    mainApi
      .updateProfile(userData)
      .then((res) => {
        setCurrentUser(/* res */{ name: res.name, email: res.email, _id: res._id });
        setIsProfileRefreshSuccess(true);
        setProfileMessage("Профиль обновлен");
        setIsLoading(false);
        setTimeout(() => setProfileMessage(""), 3000);
      })
      .catch((err) => {
          setIsProfileRefreshSuccess(false);
          setProfileErrMessage(
            "Что-то пошло не так. Проверьте введенные данные"
          );
          setIsLoading(false);
          setTimeout(() => setProfileErrMessage(""), 3000);
      });
  }

  function handleMoviesSave(movie) {
    // const token = localStorage.getItem("jwt");
    mainApi
      .createMovie(movie)
      .then((savedMovie) => {
        const filmsSaveUpdate = [...savedMovies, savedMovie];
        setSavedMovies(filmsSaveUpdate);
        localStorage.setItem("savedMovies", JSON.stringify(filmsSaveUpdate));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function searchMovies(params) {
    setIsShortsChecked(false); ///////////////////////////////////////
    // setMovies([]);
    setNotFound(false);
    setIsLoading(true);
    localStorage.setItem("movieSearch", JSON.stringify(params));
    let searchResult;

    let previousMovieSearch = JSON.parse(
      localStorage.getItem("movieSearch")
    );
    setPreviousMovieSearch(previousMovieSearch);
    //searchMovies(previousMovieSearch);

    if (/* allMovies.length === 0 */ !localStorage.movies) {
      moviesApi
        .getMovies()
        .then((/* movies */ res) => {
          // setAllMovies(movies);
          // const searchResult = handleMoviesSearch(movies, params);
          localStorage.setItem("movies", JSON.stringify(/* movies */ res));
          searchResult = res.filter((movie) => {
            return movie.nameRU
              .toLowerCase()
              .includes(params.trim().toLowerCase());
          });
          setMoviesAmount(widthHandler);
          setTimeout(() => setIsLoading(false), 500);
          if (shortsSearch) {
            setIsShortsChecked(true);
            const shorts = searchResult.filter((movie) => movie.duration <= SHORTS_DURATION);
            setFilteredMovies(shorts);
            if (shorts.length === 0) {
              setNotFound(true);
            }
          } else {
            setIsShortsChecked(false);
            setFilteredMovies(searchResult);
            if (searchResult.length === 0) {
              setNotFound(true);
            }
          }
          handleMoviesRender(searchResult, moviesAmount);
          localStorage.setItem("filteredMovies", JSON.stringify(searchResult));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      searchResult = JSON.parse(localStorage.getItem("movies")).filter(
        (movie) => {
          return movie.nameRU
            .toLowerCase()
            .includes(params.trim().toLowerCase());
        }
      );
      setMoviesAmount(widthHandler);
      setTimeout(() => setIsLoading(false), 500);
      if (shortsSearch) {
        const shorts = searchResult.filter((movie) => movie.duration <= SHORTS_DURATION);
        setFilteredMovies(shorts);
        if (shorts.length === 0) {
          setNotFound(true);
        }
      } else {
        setFilteredMovies(searchResult);
        if (searchResult.length === 0) {
          setNotFound(true);
        }
      }
      handleMoviesRender(searchResult, moviesAmount);
      localStorage.setItem("filteredMovies", JSON.stringify(searchResult));
    }
  }

  function searchSavedMovies(params) {
    setSavedShortsCheck(false); ///////////////////////////////////////////////////
    setNotFound(false);
    setIsLoading(true);
    const filterResults = JSON.parse(
      localStorage.getItem("savedMovies")
    ).filter((movie) => {
      return movie.nameRU.toLowerCase().includes(params.trim().toLowerCase());
    });
    setSavedMovies(filterResults);
    if (filterResults.length === 0) {
      setNotFound(true);
    }
    setTimeout(() => setIsLoading(false), 300);
  }

  const shortsSwitchCheck = () => {
    setShortsSearch(!shortsSearch);
  }

  useEffect(() => {
    shortsProvider();
  }, [shortsSearch]);

  function shortsProvider() {
    setNotFound(false);
    if (shortsSearch) {
      setIsShortsChecked(true);
      localStorage.setItem("isShortsChecked", "true");
      const shorts = filteredMovies.filter((movie) => movie.duration <= SHORTS_DURATION);
      handleMoviesRender(shorts, moviesAmount);
      if (shorts.length === 0) {
        setNotFound(true);
      }
    } else {
      const allFilteredMovies = JSON.parse(
        localStorage.getItem("filteredMovies")
      );
      handleMoviesRender(allFilteredMovies, moviesAmount);
      setIsShortsChecked(false);
      localStorage.setItem("isShortsChecked", "false");///////////////////
    }
  }

  function savedShortsCheckClick() {
    setSavedShortsSearch(!savedShortsSearch);
  }

  useEffect(() => {
    savedShortsProvider();
  }, [savedShortsSearch]);

  function savedShortsProvider() {
    setNotFound(false);
    if (savedShortsSearch) {
      setSavedShortsCheck(true);
      localStorage.setItem("savedShortsCheck", "true"); /////////////////////////////
      const savedShorts = (savedMovies || []).filter(
        (movie) => movie.duration <= SHORTS_DURATION
      );
      setSavedMovies(savedShorts);
      if (savedShorts.length === 0) {
        setNotFound(true);

      }
    } else {
      const savedFilms = JSON.parse(localStorage.getItem("savedMovies"));
      setSavedMovies(savedFilms);
      setSavedShortsCheck(false);
      localStorage.setItem("savedShortsCheck", "false"); ///////////////////////////////////
    }
  }

  function handleIdCheck(movie) {
    if (!movie._id) {
      const thisMovie = savedMovies.find(
        (savedMovie) => savedMovie.movieId === movie.id
      );
      return thisMovie._id;
    } else {
      return movie._id;
    }
  }

  function handleDeleteMovie(movieItem) {
    const checkId = handleIdCheck(movieItem);
    mainApi
      .deleteMovie(checkId)
      .then(() => {
        let updatedSavedMovies;
        if (location.pathname === "/movies") {
          updatedSavedMovies = savedMovies.filter(
            (movie) => movie.movieId !== movieItem.id
          );
        } else {
          updatedSavedMovies = savedMovies.filter(
            (movie) => movie._id !== movieItem._id
          );
        }
        localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
        setSavedMovies(updatedSavedMovies);
      })
      .catch((err) => console.log(err));
  }

  function handleLogOut() {
    localStorage.clear();
    setCurrentUser({});
    setIsLoggedIn(false);
    setFilteredMovies([]);
    setShowMovies([]);
    setLoginErrMessage("");
    setRegErrMessage("");
    setPreviousMovieSearch("");
    setIsShortsChecked(false);
    setIsMoreMovies(false);
    history.push("/");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main isLoggedIn={isLoggedIn} />
          </Route>

          <ProtectedRoute
            exact
            path="/movies"
            isLoggedIn={isLoggedIn}
            component={Movies}
            movies={showMovies}
            isNotFound={notFound}
            onSearchMovies={searchMovies}
            onDeleteMovie={handleDeleteMovie}
            onMovieSave={handleMoviesSave}
            isLoading={isLoading}
            showMore={handleMoviesAddition}
            savedMovies={savedMovies}
            onShortsSwitch={shortsSwitchCheck}
            isChecked={isShortsChecked}
            previousMovieSearch={previousMovieSearch}
            moreMovies={moreMovies}
          />

          <ProtectedRoute
            exact
            path="/saved-movies"
            isLoggedIn={isLoggedIn}
            component={SavedMovies}
            movies={savedMovies}
            onSearchMovies={searchSavedMovies}
            onDeleteMovie={handleDeleteMovie}
            isLoading={isLoading}
            isNotFound={notFound}
            savedMovies={savedMovies}
            movieSearch={shortsSearch}
            onShortsSwitch={savedShortsCheckClick}
            savedIsChecked={savedShortsCheck}
          />

          <ProtectedRoute
            exact
            path="/profile"
            component={Profile}
            handleLogOut={handleLogOut}
            isLoading={isLoading}
            onUpdateProfile={handleUserProfile}
            profileMessage={profileMessage}
            isProfileRefreshSuccess={isProfileRefreshSuccess}
            profileErrMessage={profileErrMessage}
            isLoggedIn={isLoggedIn}
          />

          <Route path="/signup">
            {isLoggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Register
                onRegister={handleRegister}
                regErrMessage={regErrMessage}
                isLoading={isLoading}
                resMessage={resMessage}
                isRegSuccess={isRegSuccess}

                profileMessage={profileMessage} //
                profileErrMessage={profileErrMessage} //
              />
            )}
          </Route>

          <Route path="/signin">
            <Login
              onLogin={handleLogin}
              loginErrMessage={loginErrMessage}
              isLoading={isLoading}
              loginErr={loginErr}
            />
          </Route>

          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

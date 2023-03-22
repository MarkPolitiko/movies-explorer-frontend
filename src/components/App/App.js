import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function App() {
  const [menuOpened, setMenuOpened] = useState(false)
  const closeMenuPopup = () => {
    setMenuOpened(false)
  }

  return (
    <BrowserRouter>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main />}>
            <Route element={<Main />} />
          </Route>

          <Route
            path="/movies"
            element={
              <Movies
              menuOpened={menuOpened}
              menuClosed={closeMenuPopup}
              setMenuOpened={setMenuOpened}
              />
            }
          />

          <Route
            path="/saved-movies"
            element={
              <SavedMovies
              menuOpened={menuOpened}
              menuClosed={closeMenuPopup}
              setMenuOpened={setMenuOpened}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <Profile
              menuOpened={menuOpened}
              menuClosed={closeMenuPopup}
              setMenuOpened={setMenuOpened}
              />
            }
          />

          <Route path="/signup" element={<Register />} />

          <Route path="/signin" element={<Login />} />

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

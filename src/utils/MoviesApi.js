const IMAGES_URL = "https://api.nomoreparties.co";

function checkRes(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const getMovies = () => {
  return fetch(`${IMAGES_URL}/beatfilm-movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(checkRes);
};
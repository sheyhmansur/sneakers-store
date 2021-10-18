import React from "react";
import Card from "../components/Card";
import AppContext from "../context";
import { useHistory } from "react-router-dom";

function Favorites() {
  const { favorites, onAddToFavorite } = React.useContext(AppContext);
  {
    console.log(favorites);
  }

  let history = useHistory();

  function handleClick() {
    history.push("./");
  }

  return (
    <>
      {favorites.length > 0 ? (
        <div className="content p-40">
          <div className="d-flex align-center justify-between mb-40">
            <h1>Мои закладки</h1>
          </div>

          <div className="d-flex flex-wrap">
            {favorites.map((item, index) => (
              <Card
                key={index}
                favorited={true}
                onFavorite={onAddToFavorite}
                {...item}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="content p-50">
          <div className="status_item">
            <img src="/img/emoji.png" alt="emoji" />
            <h2>Закладок нет :(</h2>
            <p>Вы ничего не добавляли в закладки</p>
            <button onClick={() => handleClick()} className="greenButton">
              Вернуться назад
              <img src="/img/arrow.svg" alt="Arrow" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Favorites;

import React from "react";
import Card from "../components/Card";
import axios from "axios";
import AppContext from "../context";
import { useHistory } from "react-router-dom";

function Orders() {
  const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://6114dc14aec65d0017e9dba6.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));

        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе заказов!");
        console.error(error);
      }
    })();
  }, []);

  let history = useHistory();

  function handleClick() {
    history.push("./");
  }

  return (
    <>
      {isLoading ? (
        <div className="wrapper-loading">
          <h2 className="loading">Идет загрузка...</h2>
        </div>
      ) : orders.length > 0 ? (
        <div className="content p-40">
          <div className="d-flex align-center justify-between mb-40">
            <h1>Мои заказы</h1>
          </div>

          <div className="orders-wrapper d-flex flex-wrap">
            {(isLoading ? [...Array(8)] : orders).map((item, index) => (
              <Card key={index} loading={isLoading} {...item} />
            ))}
          </div>
        </div>
      ) : (
        <div className="content p-50">
          <div className="status_item">
            <img src="/img/emoji2.png" alt="emoji" />
            <h2>У вас нет заказов</h2>
            <p>Оформите хотя бы один заказ</p>
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

export default Orders;

import React from "react";
import Card from "../components/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

SwiperCore.use([Navigation, Pagination, Autoplay]);

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
    );

    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <>
      <Swiper
        className="mt-45"
        spaceBetween={50}
        navigation
        pagination
        autoplay={{ delay: 4000 }}
        loop={true}
        slidesPerView={1}
      >
        <SwiperSlide>
          <img src="/img/slide-2.jpg" alt="Слайдер" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/slide-3.jpg" alt="Слайдер" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/slide-4.jpg" alt="Слайдер" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/slide-1.jpg" alt="Слайдер" />
        </SwiperSlide>
      </Swiper>
      <div className="content p-40">
        <div className="title d-flex align-center justify-between mb-40">
          <h1 className="mb-40">
            {searchValue
              ? `Поиск по запросу: "${searchValue}"`
              : "Все кроссовки"}
          </h1>

          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Seacrh" />
            {searchValue && (
              <img
                onClick={() => setSearchValue("")}
                className="clear cu-p "
                src="/img/btn-remove.svg"
                alt="Clear"
              />
            )}
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Поиск..."
            />
          </div>
        </div>
        <div className="card-wrapper d-flex flex-wrap">{renderItems()}</div>
      </div>
    </>
  );
}

export default Home;

import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiFillCaretLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import "swiper/css";
import "./style/swipe.css";
const Swipe = (props) => {
  const { selectImg } = props;
  return (
    <div className="swipeBrock">
      <Swiper
        className="swiper"
        //　propsとして渡す
        spaceBetween={5}
        modules={[Navigation, Pagination]}
        navigation={{
          // パラメータを設定
          prevEl: "#button_prev",
          nextEl: "#button_next",
        }}
        pagination={{ clickable: true }}
      >
        <SwiperSlide className="slide">
          <img
            src={
              selectImg.item_img[0]
                ? selectImg.item_img[0]
                : "http://placehold.jp/700x400.png?text=1"
            }
            alt=""
            className="itemImage"
          />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <img
            src={
              selectImg.item_img[1]
                ? selectImg.item_img[1]
                : "http://placehold.jp/700x400.png?text=2"
            }
            alt=""
            className="itemImage"
          />
        </SwiperSlide>
        <SwiperSlide className="slide">
          <img
            src={
              selectImg.item_img[2]
                ? selectImg.item_img[2]
                : "http://placehold.jp/700x400.png?text=3"
            }
            alt=""
            className="itemImage"
          />
        </SwiperSlide>
      </Swiper>
      <div id="button_prev" className="swiper-button-prev">
        <AiFillCaretLeft className="leftAllow" />
      </div>
      <div id="button_next" className="swiper-button-next">
        <AiFillCaretRight className="rightAllow" />
      </div>
    </div>
  );
};

export default Swipe;

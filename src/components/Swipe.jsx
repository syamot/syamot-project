import React from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiFillCaretLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import "swiper/css";
import "./style/swipe.css";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

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
        {selectImg.item_img.map((img, index) => {
        {selectImg.item_img.map((img, index) => {
          return (
            <div>
              <SwiperSlide className="slide" key={`swipe_${index}`}>
                <Zoom>
                  <img
                    src={
                      img ? img : process.env.PUBLIC_URL + "/photo/noImage.png"
                    }
                    alt=""
                    className="itemImage"
                  />
                </Zoom>
              </SwiperSlide>
            </div>
          );
        })}
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

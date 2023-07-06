import React from "react";
import "./style/favorite.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";

const Favorite = (props) => {
  const { oneUser, items, setSelectFlag, setSelectImg, setBeforeFlag } = props;

  const clickImg = (e) => {
    console.log(e.target);
    if (e.target.tagName === "polyline" || e.target.tagName === "path") return;
    let item;
    let numTargetId = Number(e.target.id);
    items.forEach((elem) => {
      if (elem.id === numTargetId) {
        item = elem;
      }
    });
    setSelectImg(item);
    setBeforeFlag("favorite");
    setSelectFlag("card");
  };

  return (
    <div className="favorite-list-box">
      <div className="favorite-piece">
        <IoIosArrowBack
          className="favorite-navi-icon"
          onClick={() => setSelectFlag("myPage")}
        />
        <div className="favorite-title-box">
          <h2 className="favorite-title">お気に入り</h2>
          <AiOutlineHeart className="favorite-title-icon" />
        </div>
        <div className="favorite-position-adjustment"></div>
      </div>
      <ul className="favorite-image-list">
        {oneUser.favorite.length !== 0 &&
          oneUser.favorite.map((idNum) => {
            const item = items.filter((elem) => elem.id === idNum)[0];

            return (
              <li key={`favorite_${idNum}`} className="favorite-image-item">
                <div className="favorite-image-box">
                  <div className="favorite-imgBlock">
                    <img src={item.item_img[0]} alt={item.item_name}></img>
                    <div className="favorite-info">
                      <p>商品名:{item.item_name}</p>
                      <p>期限:{item.item_deadline.split("T")[0]}</p>
                      <p>商品の状態:{item.item_status}</p>
                    </div>
                  </div>
                  <IoIosArrowForward
                    className="favorite-contents-icon"
                    id={idNum}
                    onClick={(e) => {
                      clickImg(e);
                    }}
                  />
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Favorite;

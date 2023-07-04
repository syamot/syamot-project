import React from "react";
import "./style/favorite.css";
import { GrNext } from "react-icons/gr";

const Favorite = (props) => {
  const { oneUser, items, setSelectFlag, setSelectImg } = props;

  const clickImg = (e) => {
    console.log(e.target);
    if (e.target.tagName === "polyline") return;
    let item;
    let numTargetId = Number(e.target.id);
    items.forEach((elem) => {
      if (elem.id === numTargetId) {
        item = elem;
      }
    });
    setSelectImg(item);
    setSelectFlag("card");
  };

  return (
    <div className="favorite-list-box">
      <div className="favorite-piece">
        <h2 className="favorite-title">お気に入り</h2>
      </div>
      <div>
        <ul className="favorite-image-list">
          {oneUser.favorite.length !== 0 &&
            oneUser.favorite.map((idNum) => {
              const item = items.filter((elem) => elem.id === idNum)[0];

              return (
                <li key={idNum} className="favorite-image-item">
                  <div className="favorite-image-box">
                    <div className="favorite-imgBlock">
                      <img src={item.item_img[0]} alt={item.item_name}></img>
                    </div>
                    <div className="favorite-info">
                      <p>商品名:{item.item_name}</p>
                      <p>期限:{item.item_deadline.split("T")[0]}</p>
                      <p>商品の状態:{item.item_status}</p>
                    </div>
                    <GrNext
                      className="favorite-nextIcon"
                      id={item.id}
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
    </div>
  );
};

export default Favorite;

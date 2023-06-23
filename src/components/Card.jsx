import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import "./style/card.css";
import Swipe from "./Swipe";

const Card = (props) => {
  const { setSelectFlag, selectImg, users } = props;
  // 日付までを取得
  const dateString = selectImg.item_deadline;
  const date = new Date(dateString);
  const formattedDate = date.toISOString().split("T")[0];
  console.log(users);
  const sellerUser = users.filter((el) => el.id === selectImg.item_seller);
  console.log(sellerUser);
  return (
    <>
      <div className="mainBrock">
        <h2 className="cardTitle">{selectImg.item_name}</h2>
        <div className="imageBrock">
          <AiFillHeart className="goodIcon" />
          {/* <img src={data.img} alt="product" className="itemImage" /> */}
          <Swipe etSelectFlag={setSelectFlag} selectImg={selectImg} />
        </div>
        <div className="cardItemBrock">
          <p className="cardItem">カテゴリ: {selectImg.item_category}</p>
          <p className="cardItem">ステータス: {selectImg.item_status}</p>
          <p className="cardItem">個数: {selectImg.item_num}</p>
          {/* <p className="cardItem">重さ: {data.weight}</p> */}
          <p className="cardItem">期限: {formattedDate}</p>
          <p className="cardItem">販売者: {sellerUser[0].user_name}</p>
          {/* チャット表示ここに記載 */}
        </div>
        <div className="buyBrock">
          <button
            className="buyBtn"
            onClick={() => setSelectFlag("transaction")}
          >
            Buy (buy後取引チャット)
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;

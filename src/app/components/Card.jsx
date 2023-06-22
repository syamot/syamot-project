import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import "./style/card.css";

const Card = (props) => {
  const { setSelectFlag } = props;
  const [itemTitle, setItemTitle] = useState("");
  const TitleChange = (target) => {
    setItemTitle(target);
  };
  const data = {
    img: "https://webdesignmagazine.net/wp-content/uploads/2022/10/design-refrigerator9.jpg",
    title: "冷蔵庫",
    category: "家電",
    status: "販売中",
    num: 1,
    weight: 50,
    Deadline: "2023-06-21",
    seller: "はぎぃ",
  };

  useEffect(() => {
    TitleChange(data.title);
  }, []);

  return (
    <>
      <div className="mainBrock">
        <h2 className="title">title: {itemTitle}</h2>
        <div className="imageBrock">
          <AiFillHeart className="goodIcon" />
          <img src={data.img} alt="product" className="itemImage" />
        </div>
        <div className="cardItemBrock">
          <p className="cardItem">カテゴリ: {data.category}</p>
          <p className="cardItem">ステータス: {data.status}</p>
          <p className="cardItem">個数: {data.num}</p>
          <p className="cardItem">重さ: {data.weight}</p>
          <p className="cardItem">期限: {data.Deadline}</p>
          <p className="cardItem">販売者: {data.seller}</p>
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

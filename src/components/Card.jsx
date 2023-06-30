import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import "./style/card.css";
import Swipe from "./Swipe";

//詳細情報ページ
const Card = (props) => {
  const { setSelectFlag, selectImg, users, oneUser, setOneUser, URL } = props;
  // 日付までを取得
  const dateString = selectImg.item_deadline;
  const date = new Date(dateString);
  const formattedDate = date.toISOString().split("T")[0];
  const sellerUser = users.filter((el) => el.id === selectImg.item_seller);

  const changeHeart = () => {
    console.log("ハートが押されました。");

    const objOneUser = oneUser;
    console.log("objOneUser", objOneUser);
    if (oneUser.favorite.includes(selectImg.id)) {
      setOneUser((prevState) => ({
        ...prevState,
        favorite: prevState.favorite.filter((item) => item !== selectImg.id),
      }));
      objOneUser.favorite = objOneUser.favorite.filter((elem) => {
        console.log("elem", elem);
        console.log("elem", typeof elem);
        console.log("selectImg.id", selectImg.id);
        console.log("selectImg.id", typeof selectImg.id);
        return elem !== selectImg.id;
      });
    } else {
      setOneUser((prevState) => ({
        ...prevState,
        favorite: [...prevState.favorite, selectImg.id],
      }));
      objOneUser.favorite.push(selectImg.id);
    }
    console.log(objOneUser);
    const postUpDataItem = async () => {
      await fetch(URL + "/favoriteItems", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objOneUser),
      });
    };
    postUpDataItem();
  };

  return (
    <>
      <div className="mainBrock">
        <h2 className="cardTitle">{selectImg.item_name}</h2>
        <div className="imageBrock">
          {oneUser.favorite.includes(selectImg.id) ? (
            <AiFillHeart
              className="goodIcon"
              onClick={() => {
                changeHeart();
              }}
            />
          ) : (
            <AiOutlineHeart
              className="goodIcon"
              onClick={() => {
                changeHeart();
              }}
            />
          )}

          {/* <img src={data.img} alt="product" className="itemImage" /> */}
          <Swipe etSelectFlag={setSelectFlag} selectImg={selectImg} />
        </div>
        <div className="cardItemBrock">
          <p className="cardItem">説明</p>
          <textarea
            className="cardItemTxtarea"
            defaultValue={selectImg.item_explanation}
          ></textarea>
          <p className="cardItem">取引状況: {selectImg.item_status}</p>
          <p className="cardItem">カテゴリ: {selectImg.item_category}</p>
          <p className="cardItem">ステータス: {selectImg.item_condition}</p>
          <p className="cardItem">個数: {selectImg.item_num}</p>
          <p className="cardItem">期限: {formattedDate}</p>
          <p className="cardItem">販売者: {sellerUser[0].user_name}</p>
          <p className="cardItem">メール: {sellerUser[0].tmc_e_mail}</p>
        </div>
        <div className="buyBrock">
          <button
            className="buyBtn"
            onClick={() => {
              setSelectFlag("transaction");
              // changeStatus();
            }}
          >
            取引き
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;

import React from "react";
import { AiFillHeart } from "react-icons/ai";
import "./style/card.css";
import Swipe from "./Swipe";

//詳細情報ページ
const Card = (props) => {
  const { setSelectFlag, selectImg, users, userData, oneUser } = props;
  // 日付までを取得
  const dateString = selectImg.item_deadline;
  const date = new Date(dateString);
  const formattedDate = date.toISOString().split("T")[0];
  const sellerUser = users.filter((el) => el.id === selectImg.item_seller);
  console.log(sellerUser[0]);
  return (
    <>
      <div className="mainBrock">
        <h2 className="cardTitle">{selectImg.item_name}</h2>
        <div className="imageBrock">
          <AiFillHeart className="goodIcon" />
          {/* <img src={data.img} alt="product" className="itemImage" /> */}
          <Swipe setSelectFlag={setSelectFlag} selectImg={selectImg} />
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
              console.log("oneuser.id:", oneUser.id);
              console.log("selectImg.item_seller", selectImg.item_seller);
              console.log("sellerUser:", sellerUser);

              // 購入者であれば連絡リストに遷移
              if (oneUser.id === sellerUser[0].id) {
                console.log("contact");
                setSelectFlag("contactList");

              } else {
                console.log("transaction");
                setSelectFlag("transaction");
              }


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

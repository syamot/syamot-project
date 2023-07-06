import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import "./style/card.css";
import Swipe from "./Swipe";
import { IoIosArrowBack } from "react-icons/io";
import { BiEdit } from "react-icons/bi";

//詳細情報ページ
const Card = (props) => {
  const {
    setSelectFlag,
    selectImg,
    users,
    oneUser,
    setOneUser,
    URL,
    userData,
    beforeFlag,
    setBeforeFlag,
  } = props;
  // 日付までを取得
  const dateString = selectImg.item_deadline;
  const date = new Date(dateString);
  const formattedDate = date.toISOString().split("T")[0];
  const sellerUser = users.filter((el) => el.id === selectImg.item_seller);

  const changeHeart = () => {
    const objOneUser = oneUser;
    if (oneUser.favorite.includes(selectImg.id)) {
      setOneUser((prevState) => ({
        ...prevState,
        favorite: prevState.favorite.filter((item) => item !== selectImg.id),
      }));
      objOneUser.favorite = objOneUser.favorite.filter((elem) => {
        return elem !== selectImg.id;
      });
    } else {
      setOneUser((prevState) => ({
        ...prevState,
        favorite: [...prevState.favorite, selectImg.id],
      }));
      objOneUser.favorite.push(selectImg.id);
    }
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
      <div className="card-mainBrock">
        <div className="card-piece">
          <IoIosArrowBack
            className="card-navi-icon"
            onClick={() => {
              if (beforeFlag === "exhibitionList") {
                setSelectFlag("exhibitionList");
              } else if (beforeFlag === "favorite") {
                setSelectFlag("favorite");
              } else if (beforeFlag === "tradingHistory") {
                setSelectFlag("tradingHistory");
              } else {
                setSelectFlag("list");
              }

              // setBeforeFlag("card");
            }}
          />
          <h2 className="card-title">{selectImg.item_name}</h2>
          {/* <h2 className="card-cardTitle">{selectImg.item_name}</h2> */}
          <div className="card-position-adjustment"></div>
        </div>

        {/* <IoIosArrowBack className="card-backIcon" onClick={() => {}} /> */}

        <div className="card-imageBrock">
          <div className="card-IconBrock">
            {/* // 購入者であればハートお気に入り */}
            {oneUser.id === sellerUser[0].id ? (
              // 出品者であれば編集
              <BiEdit
                className="card-editIcon"
                onClick={() => {
                  setSelectFlag("post");
                  setBeforeFlag("card");
                }}
              />
            ) : oneUser.favorite.includes(selectImg.id) ? (
              <AiFillHeart
                className="card-goodIcon"
                onClick={() => changeHeart()}
              />
            ) : (
              <AiOutlineHeart
                className="card-goodIcon"
                onClick={() => changeHeart()}
              />
            )}
          </div>

          {/* <img src={data.img} alt="product" className="card-itemImage" /> */}
          <Swipe setSelectFlag={setSelectFlag} selectImg={selectImg} />
        </div>
        <div className="card-cardItemBrock">
          {/* <div className="card-mainBrock"> */}
          {/* <div className="card-cardItemBrock"> */}
          <p className="card-cardItem">取引状況: {selectImg.item_status}</p>
          <p className="card-cardItem">カテゴリ: {selectImg.item_category}</p>
          <p className="card-cardItem">個数: {selectImg.item_num}</p>
          <p className="card-cardItem">期限: {formattedDate}</p>
          <p className="card-cardItem">販売者: {sellerUser[0].user_name}</p>
          <p className="card-cardItem">メール: {sellerUser[0].tmc_e_mail}</p>
          <p className="card-cardItem">備考欄</p>
          <textarea
            className="card-cardItemTxtarea"
            defaultValue={selectImg.item_explanation}
          ></textarea>
        </div>

        <div className="card-buyBrock">
          <button
            className="card-buyBtn"
            onClick={() => {
              console.log("oneuser.id:", oneUser.id);
              console.log("selectImg.item_seller", selectImg.item_seller);
              console.log("sellerUser:", sellerUser);

              // 購入者であれば連絡リストに遷移
              if (oneUser.id === sellerUser[0].id) {
                console.log("contact");
                setSelectFlag("contactList");
                setBeforeFlag("card");
                // setSelectFlag("transaction");
              } else {
                console.log("transaction");
                setSelectFlag("transaction");
                setBeforeFlag("card");
              }

              // changeStatus();
            }}
          >
            取引き
          </button>
        </div>
      </div>
    </>

    //    <>
    //    <div className="card-mainBrock">
    //      <h2 className="card-cardTitle">{selectImg.item_name}</h2>
    //      <div className="card-imageBrock">
    //        {oneUser.favorite.includes(selectImg.id) ? (
    //          <AiFillHeart
    //            className="card-goodIcon"
    //            onClick={() => {
    //              changeHeart();
    //            }}
    //          />
    //        ) : (
    //          <AiOutlineHeart
    //            className="card-goodIcon"
    //            onClick={() => {
    //              changeHeart();
    //            }}
    //          />
    //        )}

    //        {/* <img src={data.img} alt="product" className="card-itemImage" /> */}
    //        <Swipe setSelectFlag={setSelectFlag} selectImg={selectImg} />
    //      </div>
    //      <div className="card-cardItemBrock">
    //        <p className="card-cardItem">説明</p>
    //        <textarea
    //          className="card-cardItemTxtarea"
    //          defaultValue={selectImg.item_explanation}
    //        ></textarea>
    //        <p className="card-cardItem">取引状況: {selectImg.item_status}</p>
    //        <p className="card-cardItem">カテゴリ: {selectImg.item_category}</p>
    //        <p className="card-cardItem">個数: {selectImg.item_num}</p>
    //        <p className="card-cardItem">期限: {formattedDate}</p>
    //        <p className="card-cardItem">販売者: {sellerUser[0].user_name}</p>
    //        <p className="card-cardItem">メール: {sellerUser[0].tmc_e_mail}</p>
    //      </div>
    //      <div className="card-buyBrock">
    //        <button
    //          className="card-buyBtn"
    //          onClick={() => {
    //            console.log("oneuser.id:", oneUser.id);
    //            console.log("selectImg.item_seller", selectImg.item_seller);
    //            console.log("sellerUser:", sellerUser);

    //            // 購入者であれば連絡リストに遷移
    //            if (oneUser.id === sellerUser[0].id) {
    //              console.log("contact");
    //              setSelectFlag("contactList");
    //              // setSelectFlag("transaction");
    //            } else {
    //              console.log("transaction");
    //              setSelectFlag("transaction");
    //            }

    //            // changeStatus();
    //          }}
    //        >
    //          取引き
    //        </button>
    //      </div>
    //    </div>
    //  </>
  );
};

export default Card;

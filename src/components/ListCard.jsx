import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import "./style/card.css";
import Swipe from "./Swipe";
import { IoIosArrowBack } from "react-icons/io";
import { BiEdit } from "react-icons/bi";

//詳細情報ページ
const ListCard = (props) => {
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
    setEditItem,
  } = props;

  return (
    <div class="l-wrapper_02 card-radius_02">
      <article class="card_02">
        <div class="card__header_02">
          <p class="card__title_02">サムネイルのタイトル</p>
          <figure class="card__thumbnail_02">
            <img
              src="https://dubdesign.net/wp-content/uploads/2020/05/0514_inhouse_designereyecatch.jpg"
              alt="サムネイル"
              class="card__image_02"
            />
          </figure>
        </div>
      </article>
    </div>
  );
};

export default ListCard;

// import React, { useEffect, useState } from "react";
import "./style/mypage.css";
import { FaUserCircle } from "react-icons/fa";

//まいぺ➖じ
const MyPage = (props) => {
  const { setSelectFlag } = props;

  const userName = localStorage.getItem("user");
  return (
    <>
      <div className="my-page-contents-area">
        <div className="user-data-area">
          <FaUserCircle className="image-user-icon" />
          <h1>{userName}</h1>
        </div>
        <p
          onClick={() => {
            setSelectFlag("profile");
          }}
        >
          プロフィール編集
        </p>
        <p
          onClick={() => {
            setSelectFlag("notification");
          }}
        >
          通知内容
        </p>
        <p
          onClick={() => {
            setSelectFlag("exhibitionList");
          }}
        >
          出品リスト
        </p>
        <p
          onClick={() => {
            setSelectFlag("favorite");
          }}
        >
          お気に入り
        </p>
        <p
          onClick={() => {
            setSelectFlag("purchaseList");
          }}
        >
          購入履歴
        </p>
        <p>ログアウト</p>
      </div>
    </>
  );
};

export default MyPage;

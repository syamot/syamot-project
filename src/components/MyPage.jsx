// import React, { useEffect, useState } from "react";
import "./style/mypage.css";
import { FaUserCircle } from "react-icons/fa";
import { BsBell } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { PiUserList } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";

const MyPage = (props) => {
  const { setSelectFlag, oneUser } = props;

  const logOut = () => {
    localStorage.setItem("user", "");
    document.location.reload();
  };
  return (
    <div className="mypage-body">
      <div className="mypage-menu">
        <div className="mypage-icons">
          <BsBell
            className="mypage-navi-icon"
            onClick={() => setSelectFlag("notice")}
          />
          <BiEdit
            className="mypage-navi-icon"
            onClick={() => setSelectFlag("profile")}
          />
          <FiLogOut className="mypage-navi-icon" onClick={() => logOut()} />
        </div>
      </div>
      <div className="mypage-user-icon">
        <FaUserCircle className="mypage-image-user-icon" />
        <p>{oneUser.user_name}</p>
      </div>
      <div className="mypage-user-info">
        <p>住所：{oneUser.residence}</p>
        <p>　寮：{oneUser.area}</p>
        {/* <p>{oneUser.employee_code}</p>
        <p>{oneUser.tmc_e_mail}</p>
        <p>{oneUser.private_e_mail}</p> */}
      </div>
      <div className="mypage-user-contents-brock">
        <div className="mypage-user-contents">
          <div className="mypage-user-contents-piece">
            <PiUserList className="mypage-contents-icon" />
            <p>出品リスト</p>
          </div>
          <IoIosArrowForward
            className="mypage-contents-icon"
            onClick={() => {
              setSelectFlag("exhibitionList");
            }}
          />
        </div>
        <div className="mypage-user-contents">
          <div className="mypage-user-contents-piece">
            <AiOutlineHeart className="mypage-contents-icon" />
            <p>お気に入り</p>
          </div>
          <IoIosArrowForward
            className="mypage-contents-icon"
            onClick={() => {
              setSelectFlag("favorite");
            }}
          />
        </div>
        <div className="mypage-user-contents">
          <div className="mypage-user-contents-piece">
            <BsBell className="mypage-contents-icon" />
            <p>お知らせ</p>
          </div>
          <IoIosArrowForward
            className="mypage-contents-icon"
            onClick={() => {
              setSelectFlag("notice");
            }}
          />
        </div>

        <div className="mypage-user-contents">
          <div className="mypage-user-contents-piece">
            <GrTransaction className="mypage-contents-icon" />
            <p>購入した商品</p>
          </div>
          <IoIosArrowForward
            className="mypage-contents-icon"
            onClick={() => {
              setSelectFlag("tradingHistory");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyPage;

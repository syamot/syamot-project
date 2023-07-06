import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { BsBell } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
import { BiSolidCircle } from "react-icons/bi";
import { ImHome } from "react-icons/im";

import "./style/header.css";

const Header = (props) => {
  const {
    setSelectFlag,
    selectImg,
    URL,
    oneUser,
    sellerChatData,
    setSellerChatData,
    buyerChatData,
    setBuyerChatData,
  } = props;
  const pageHandler = () => {
    setSelectFlag("list");
    // setBeforeFlag("");
  };
  const changeMyPage = () => {
    setSelectFlag("myPage");
    // setBeforeFlag("");
  };

  // const [sellerChatData, setSellerChatData] = useState();
  // const [buyerChatData, setBuyerChatData] = useState();

  //item_id毎のchatDataを取得
  useEffect(() => {
    const fetchData = async () => {
      // console.log("URL", URL);
      const chat = await fetch(URL + "/chatAllData");
      const chatJson = await chat.json();
      // console.log("##############################");
      // // console.log(selectImg);
      // console.log("chatJson:", chatJson);
      // console.log("oneUser:", oneUser);

      if (oneUser !== undefined) {
        // console.log("スタート");
        // 自分の送信したチャットのみ取得
        const sellerFilterChat = chatJson.filter(
          (e) => e.seller_id === oneUser.id
        );
        // console.log("🥶🥶🥶🥶🥶sellerFilterChat:", sellerFilterChat);
        setSellerChatData(sellerFilterChat);
        // 自分の送信したチャットのみ取得
        const buyerFilterChat = chatJson.filter(
          (e) => e.buyer_id === oneUser.id
        );
        // console.log("buyerFilterChat:", buyerFilterChat);
        setBuyerChatData(buyerFilterChat);
      }
    };
    //0.5秒ごとにチャット内容更新
    const interval = setInterval(fetchData, 500);

    return () => {
      clearInterval(interval);
    };
  }, [oneUser]);

  const buyerReadCount =
    buyerChatData === undefined
      ? 0
      : buyerChatData.filter((e) => {
          // console.log("oneUserChatData.filter", e);
          return e.buyer_read_flag === false;
        }).length;
  const sellerReadCount =
    sellerChatData === undefined
      ? 0
      : sellerChatData.filter((e) => {
          // console.log("oneUserChatData.filter", e);
          return e.seller_read_flag === false;
        }).length;
  const readCount = sellerReadCount + buyerReadCount;
  // console.log("readCount=====", readCount);

  return (
    <>
      <header className="header-head">
        <ImHome
          className="header-backIcon"
          onClick={() => {
            pageHandler();
          }}
        />
        <h1 className="header-header1">シャモティ</h1>
        <FaUserCircle
          className="header-userIcon"
          onClick={() => {
            changeMyPage();
          }}
        />
        {readCount !== 0 && (
          <div className="circleIcon-box">
            <BiSolidCircle className="circleIcon" />
            <p className="circleIcon-number">{readCount}</p>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;

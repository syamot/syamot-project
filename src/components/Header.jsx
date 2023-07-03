import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { BsBell } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";

import "./style/header.css";

const Header = (props) => {
  const { setSelectFlag, selectFlag, setUpDataFlag } = props;
  const pageHandler = () => {
    setSelectFlag("list");
  };
  const changeMyPage = () => {
    setSelectFlag("myPage");
  };
  const upData = () => {
    setUpDataFlag(true);
  };

  if (selectFlag === "list") {
    return (
      <>
        <header>
          <GrUpdate
            className="up-data-icon"
            onClick={() => {
              upData();
            }}
          />
          <h1 className="header1">シャモティー</h1>

          <FaUserCircle
            className="userIcon"
            onClick={() => {
              changeMyPage();
            }}
          />
        </header>
      </>
    );
  } else if (
    selectFlag === "card" ||
    selectFlag === "transaction" ||
    selectFlag === "post"
  ) {
    return (
      <>
        <header>
          <IoIosArrowBack
            className="backIcon"
            onClick={() => {
              pageHandler();
            }}
          />
          <h1 className="header1">シャモティー</h1>
          <FaUserCircle
            className="userIcon"
            onClick={() => {
              changeMyPage();
            }}
          />
        </header>
      </>
    );
  } else if (
    selectFlag === "profile" ||
    selectFlag === "notification" ||
    selectFlag === "exhibitionList" ||
    selectFlag === "favorite" ||
    selectFlag === "purchaseList" ||
    selectFlag === "tradingHistory"
  ) {
    return (
      <>
        <header>
          <IoIosArrowBack
            className="backIcon"
            onClick={() => {
              setSelectFlag("myPage");
            }}
          />
          <h1 className="header1">シャモティー</h1>
          <BsBell
            className="bellIcon"
            onClick={() => {
              setSelectFlag("tradingHistory");
            }}
          />
        </header>
      </>
    );
  } else if (selectFlag === "myPage") {
    return (
      <>
        <header>
          <IoIosArrowBack
            className="backIcon"
            onClick={() => {
              setSelectFlag("list");
            }}
          />

          <h1 className="header1">シャモティー</h1>
          <BsBell
            className="userIcon"
            onClick={() => {
              setSelectFlag("tradingHistory");
            }}
          />
        </header>
      </>
    );
  }
};

export default Header;

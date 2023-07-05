import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { BsBell } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
import { BiSolidCircle } from "react-icons/bi";

import "./style/header.css";

const Header = (props) => {
  const { setSelectFlag, selectFlag, setUpDataFlag, setBeforeFlag } = props;
  const pageHandler = () => {
    setSelectFlag("list");
    setBeforeFlag("");
  };
  const changeMyPage = () => {
    setSelectFlag("myPage");
    setBeforeFlag("");
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
          <h1 className="header1">シャモティ</h1>
          <div className="userIcon-box">
            <FaUserCircle
              className="userIcon"
              onClick={() => {
                changeMyPage();
              }}
            />
            <div className="circleIcon-box">
              <BiSolidCircle className="circleIcon" />
              <p className="circleIcon-number">1</p>
            </div>
          </div>
        </header>
      </>
    );
  } else if (
    selectFlag === "card" ||
    selectFlag === "transaction" ||
    selectFlag === "post" ||
    selectFlag === "contactList"
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
          <h1 className="header1">シャモティ</h1>
          <div className="userIcon-box">
            <FaUserCircle
              className="userIcon"
              onClick={() => {
                changeMyPage();
              }}
            />
            <div className="circleIcon-box">
              <BiSolidCircle className="circleIcon" />
              <p className="circleIcon-number">1</p>
            </div>
          </div>
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

          <h1 className="header1">シャモティ</h1>
          <div className="bellIcon-box">
            <BsBell
              className="bellIcon"
              onClick={() => {
                setSelectFlag("tradingHistory");
              }}
            />
            <div className="circleIcon-box">
              <BiSolidCircle className="circleIcon" />
              <p className="circleIcon-number">1</p>
            </div>
          </div>
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

          <h1 className="header1">シャモティ</h1>
          <div className="bellIcon-box">
            <BsBell
              className="bellIcon"
              onClick={() => {
                setSelectFlag("tradingHistory");
              }}
            />
            <div className="circleIcon-box">
              <BiSolidCircle className="circleIcon" />
              <p className="circleIcon-number">1</p>
            </div>
          </div>
        </header>
      </>
    );
  }
};

export default Header;

import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { BsBell } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";

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
          <FaUserCircle
            className="userIcon"
            onClick={() => {
              changeMyPage();
            }}
          />

          <h1 className="header1">シャモティー</h1>
          <GrUpdate
            className="up-data-icon"
            onClick={() => {
              upData();
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
          <FaUserCircle
            className="userIcon"
            onClick={() => {
              changeMyPage();
            }}
          />

          <h1 className="header1">シャモティー</h1>
          {selectFlag !== "list" ? (
            <MdClose
              className="backIcon"
              onClick={() => {
                pageHandler();
              }}
            />
          ) : (
            <div className="backIcon" />
          )}
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
          <BsBell
            className="userIcon"
            onClick={() => {
              setSelectFlag("notification");
            }}
          />

          <h1 className="header1">シャモティー</h1>
          <MdClose
            className="backIcon"
            onClick={() => {
              setSelectFlag("myPage");
            }}
          />
        </header>
      </>
    );
  } else if (selectFlag === "myPage") {
    return (
      <>
        <header>
          <BsBell
            className="userIcon"
            onClick={() => {
              setSelectFlag("notification");
            }}
          />

          <h1 className="header1">シャモティー</h1>
          <MdClose
            className="backIcon"
            onClick={() => {
              setSelectFlag("list");
            }}
          />
        </header>
      </>
    );
  }
};

export default Header;

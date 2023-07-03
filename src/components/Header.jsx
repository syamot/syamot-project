import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { BsBell } from "react-icons/bs";

import "./style/header.css";

const Header = (props) => {
  const { setSelectFlag, selectFlag } = props;
  const pageHandler = () => {
    setSelectFlag("list");
  };
  const changeMyPage = () => {
    setSelectFlag("myPage");
  };

  if (
    selectFlag === "list" ||
    selectFlag === "card" ||
    selectFlag === "transaction" ||
    selectFlag === "post" ||
    selectFlag === "contactList"
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
    selectFlag === "purchaseList"
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

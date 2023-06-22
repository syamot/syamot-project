import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";

import "./style/header.css";

const Header = (props) => {
  const { setSelectFlag, selectFlag } = props;
  const pageHandler = () => {
    console.log("バツが押された");
    if (selectFlag === "card") {
      setSelectFlag("list");
    } else if (selectFlag === "transaction") {
      setSelectFlag("list");
    } else if (selectFlag === "post") {
      setSelectFlag("list");
    }
  };

  return (
    <>
      <header>
        <FaUserCircle className="userIcon" />
        <h1 className="header1">シャモティー</h1>
        <MdClose
          className="backIcon"
          onClick={() => {
            pageHandler();
          }}
        />
      </header>
    </>
  );
};

export default Header;

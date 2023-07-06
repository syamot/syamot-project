import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { BsBell } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr";
import { IoIosArrowBack } from "react-icons/io";
import { BiSolidCircle } from "react-icons/bi";
import { ImHome } from "react-icons/im";

import "./style/header.css";

const Header = (props) => {
  const { setSelectFlag, selectFlag, setUpDataFlag, setBeforeFlag } = props;
  const pageHandler = () => {
    setSelectFlag("list");
    // setBeforeFlag("");
  };
  const changeMyPage = () => {
    setSelectFlag("myPage");
    // setBeforeFlag("");
  };
  const upData = () => {
    setUpDataFlag(true);
  };

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
      </header>
    </>
  );
};

export default Header;

import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import "../card/style.css";
export const Header = () => {
  return (
    <>
      <header>
        <FaUserCircle className="userIcon" />
        <MdClose className="backIcon" />
      </header>
    </>
  );
};

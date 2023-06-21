import React from "react";
import "../card/style.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";

export const Footer = () => {
  return (
    <>
      <footer>
        <AiOutlineSearch className="searchIcon" />
        <BsSend className="postIcon" />
        <GiSettingsKnobs className="settingIcon" />
      </footer>
    </>
  );
};

import React from "react";
import "./style/footer.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";

const Footer = (props) => {
  const { setSelectFlag } = props;
  return (
    <>
      <footer>
        <AiOutlineSearch className="searchIcon" />

        <BsSend className="postIcon" onClick={() => setSelectFlag("post")} />

        <GiSettingsKnobs className="settingIcon" />
      </footer>
    </>
  );
};
export default Footer;

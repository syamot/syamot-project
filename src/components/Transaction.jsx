import React, { useEffect, useState } from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import { BiMailSend } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

import "./style/transaction.css";

const Transaction = (props) => {
  const { selectImg, users } = props;
  const [sendTxt, setSendTxt] = useState("");
  const [messages, setMessages] = useState([]);

  const changeTxt = (e) => {
    setSendTxt(e.target.value);
  };

  useEffect(() => {
    console.log(sendTxt);
  }, [sendTxt]);

  const createMessage = () => {
    if (sendTxt !== "") {
      setMessages((prevMessages) => [...prevMessages, sendTxt]);
      setSendTxt("");
    }
  };

  return (
    <>
      <div className="titleBrock">
        <BsFillChatDotsFill className="chatIcon" />
        <h2 className="transactionTitle">{selectImg.item_name}</h2>
      </div>
      <div className="transMainBrock">
        {messages.map((message, index) => (
          <div key={index} className="messageBrock">
            {/* <FaUserCircle className="messageIcon" /> */}
            <p className="messageContent">{message}</p>
          </div>
        ))}
      </div>
      <div className="postMessageBrock">
        <input
          type="text"
          className="chatInput"
          value={sendTxt}
          onChange={(e) => changeTxt(e)}
        />
        <BiMailSend className="sendBtn" onClick={createMessage} />
      </div>
      <div className="footerBrock">
        <button className="approvalBtn">Approval</button>
        <button className="completeBtn">Receipt complete</button>
      </div>
    </>
  );
};

export default Transaction;

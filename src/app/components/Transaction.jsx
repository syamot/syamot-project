import React from "react";
import { useSearchParams } from "next/navigation";
import { BsFillChatDotsFill } from "react-icons/bs";
import { BiMailSend } from "react-icons/bi";
import "./style/transaction.css";

const Transaction = () => {
  const router = useSearchParams();

  return (
    <>
      <div className="titleBrock">
        <BsFillChatDotsFill className="chatIcon" />
        <h2 className="title">title: {router.get("itemTitle")}</h2>
      </div>
      <div className="transMainBrock">{/* チャット内容を書く */}</div>
      <div className="postMessageBrock">
        <input type="text" className="chatInput"></input>
        <BiMailSend className="sendBtn" />
      </div>
      <div className="footerBrock">
        <button className="approvalBtn">Approval</button>
        <button className="completeBtn">Receipt complete</button>
      </div>
    </>
  );
};
export default Transaction;

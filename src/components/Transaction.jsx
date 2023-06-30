import React, { useEffect, useState } from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import { BiMailSend } from "react-icons/bi";

import "./style/transaction.css";

const Transaction = (props) => {
  const { selectImg, URL, getAllItems, setItems, setSelectImg } = props;
  const [sendTxt, setSendTxt] = useState("");
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState([]);
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    const userName = localStorage.getItem("user");
    (async () => {
      console.log(URL + "/user/" + userName);
      const data = await fetch(URL + "/user/" + userName);
      const jsonData = await data.json();
      setUserData(jsonData);
      // チャット情報を取得
      const chat = await fetch(URL + "/chatAllData");
      const chatJson = await chat.json();
      setChatData(chatJson);
    })();
  }, []);
  useEffect(() => {
    console.log(chatData);
  }, [chatData]);
  useEffect(() => {
    console.log("userData:  ", userData);
  }, [userData]);
  const changeTxt = (e) => {
    setSendTxt(e.target.value);
  };
  // 取引承認処理
  const approval = async () => {
    if (selectImg.item_approval_flag !== true) {
      console.log("承認状況：", selectImg.item_approval_flag);
      console.log("取引状況：", selectImg.item_transaction_flag);
      try {
        await fetch(URL + "/putApprovalFlag", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectImg),
        });
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "承認完了", user: "approve" },
        ]);
        let itemData;
        const asyncPkg = async () => {
          itemData = await getAllItems();
          itemData.forEach((elem) => {
            elem.item_img = JSON.parse(elem.item_img);
          });
          setItems(itemData);
          console.log(itemData);
        };
        asyncPkg();
        setSelectImg({
          ...selectImg,
          item_approval_flag: true,
        });
        changeStatus(); // 取引中に変更
      } catch (error) {
        console.log(error);
      }
    }
  };
  // 取引完了処理
  const complete = async () => {
    if (selectImg.item_transaction_flag !== true) {
      console.log("承認状況：", selectImg.item_approval_flag);
      console.log("受取状況：", selectImg.item_transaction_flag);
      try {
        await fetch(URL + "/putTransactionFlag", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectImg),
        });
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "受取完了", user: "approve" },
        ]);
        let itemData;
        const asyncPkg = async () => {
          itemData = await getAllItems();
          itemData.forEach((elem) => {
            elem.item_img = JSON.parse(elem.item_img);
          });
          setItems(itemData);
          console.log(itemData);
        };
        asyncPkg();
        console.log("＃＃＃＃＃＃＃確認＃＃＃＃＃＃＃＃＃＃＃＃");
        console.log(
          selectImg.item_approval_flag,
          selectImg.item_transaction_flag
        );
        setSelectImg({
          ...selectImg,
          item_transaction_flag: true,
        });
        if (
          selectImg.item_approval_flag === true &&
          selectImg.item_transaction_flag === true
        ) {
          console.log("取引完了処理スタート");
          await fetch(URL + "/putCompleteStatus", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectImg),
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (selectImg.item_approval_flag)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "承認完了", user: "approve" },
      ]);
    if (selectImg.item_transaction_flag)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "受取完了", user: "approve" },
      ]);
  }, []);

  useEffect(() => {
    console.log(sendTxt);
  }, [sendTxt]);

  //   今の日付を確認する
  function getCurrentTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let day = ("0" + now.getDate()).slice(-2);
    let formattedTime = year + "-" + month + "-" + day;
    return formattedTime;
  }

  // チャット送信
  const createMessage = async () => {
    let transaction_flag = false;
    if (sendTxt !== "") {
      // 処理が完了してたらフラグをtrueに設定
      if (
        selectImg.item_approval_flag === true &&
        selectImg.item_transaction_flag === true
      ) {
        transaction_flag = true;
      }
      const obj = {
        transaction_date: getCurrentTime(),
        transaction_flag: transaction_flag,
        item_id: selectImg.id,
        user_id: userData[0].id,
        message: sendTxt,
      };
      try {
        await fetch(URL + "/addChat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
        console.log("チャットが送信されました");
      } catch (error) {
        console.log(error);
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: sendTxt, user: localStorage.getItem("user") },
      ]);
      setSendTxt("");
    }
  };

  const changeStatus = async () => {
    if (
      selectImg.item_status !== "取引終了" ||
      selectImg.item_status !== "取引中"
    ) {
      try {
        await fetch(URL + "/putItemStatus", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectImg),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // console.log("userData.user_name ", userData[0].user_name);

  return (
    <>
      <div className="titleBrock">
        <BsFillChatDotsFill className="chatIcon" />
        <h2 className="transactionTitle">{selectImg.item_name}</h2>
      </div>
      <div className="transMainBrock">
        {messages.map((message, index) => {
          if (message.user === localStorage.getItem("user")) {
            return (
              <div key={index} className="messageBlock">
                <p className="messageContent">{message.text}</p>
              </div>
            );
          } else if (message.user === "approve") {
            return (
              <div key={index} className="messageBlock2">
                <p className="messageContent">{message.text}</p>
              </div>
            );
          } else {
            return (
              <div key={index} className="messageBlock3">
                <p className="messageContent">{message.text}</p>
              </div>
            );
          }
        })}
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
        {userData.length !== 0 &&
          (userData[0].id === selectImg.item_seller ? (
            <button
              className="approvalBtn"
              disabled={selectImg.item_approval_flag}
              onClick={() => approval()}
            >
              取引承認
            </button>
          ) : (
            <button
              className="completeBtn"
              disabled={selectImg.item_transaction_flag}
              onClick={() => complete()}
            >
              受取連絡
            </button>
          ))}
      </div>
    </>
  );
};

export default Transaction;

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
    // console.log(chatData);
  }, [chatData]);
  useEffect(() => {
    // console.log("userData:  ", userData);
  }, [userData]);
  const changeTxt = (e) => {
    setSendTxt(e.target.value);
  };

  // 取引承認処理
  const approval = async () => {
    // 承認フラグ判定
    if (selectImg.item_approval_flag !== true) {
      console.log("============取引承認処理=============");
      console.log("承認状況：", selectImg.item_approval_flag);
      console.log("取引状況：", selectImg.item_transaction_flag);
      try {
        //DBのitems_TBの要素に対して「item_approval_flag: true」に変更
        await fetch(URL + "/putApprovalFlag", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectImg),
        });
        // チャットメッセージを追加
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "承認完了", user: "approve" },
        ]);

        // チャットTBを書き換え
        createMessageStatus(false, "承認完了");
        // Item_TBを全部取得
        let itemData;
        const asyncPkg = async () => {
          itemData = await getAllItems();
          itemData.forEach((elem) => {
            elem.item_img = JSON.parse(elem.item_img);
          });
          setItems(itemData);
          // console.log(itemData);
        };
        asyncPkg();

        // SelectImgのitem_approval_flagを変更
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

  // 取引キャンセル処理
  const approvalCancel = async () => {
    // 承認フラグ判定
    if (selectImg.item_approval_flag === true) {
      console.log("============取引キャンセル処理=============");
      console.log("承認状況：", selectImg.item_approval_flag);
      console.log("取引状況：", selectImg.item_transaction_flag);
      try {
        //DBのitems_TBの要素に対して「item_approval_flag: False」に変更
        await fetch(URL + "/putApprovalFlagCancel", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectImg),
        });
        // チャットメッセージを追加
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "承認キャンセル", user: "approve" },
        ]);

        // チャットTBを書き換え
        createMessageStatus(false, "承認キャンセル");
        // Item_TBを全部取得
        let itemData;
        const asyncPkg = async () => {
          itemData = await getAllItems();
          itemData.forEach((elem) => {
            elem.item_img = JSON.parse(elem.item_img);
          });
          setItems(itemData);
          // console.log(itemData);
        };
        asyncPkg();

        // SelectImgのitem_approval_flagを変更
        setSelectImg({
          ...selectImg,
          item_approval_flag: false,
        });
        changeStatusCancel(); // 在庫ありに変更
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
          { text: "取引完了", user: "approve" },
        ]);

        // チャットTBを書き換え
        createMessageStatus(true, "取引完了");
        let itemData;
        const asyncPkg = async () => {
          itemData = await getAllItems();
          itemData.forEach((elem) => {
            elem.item_img = JSON.parse(elem.item_img);
          });
          setItems(itemData);
          // console.log(itemData);
        };
        asyncPkg();
        // console.log("＃＃＃＃＃＃＃確認＃＃＃＃＃＃＃＃＃＃＃＃");
        // console.log(
        //   selectImg.item_approval_flag,
        //   selectImg.item_transaction_flag
        // );
        setSelectImg({
          ...selectImg,
          item_transaction_flag: true,
        });
        // console.log("取引完了処理スタート");
        await fetch(URL + "/putCompleteStatus", {
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
    // console.log(sendTxt);
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
        // チャットTBに書き換え
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

  // ボタン操作によるチャットステータス送信
  const createMessageStatus = async (transaction_flag, message) => {
    // let transaction_flag = false;
    // 取引完了していたら処理しない
    if (
      !(
        selectImg.item_approval_flag === true &&
        selectImg.item_transaction_flag === true
      )
    ) {
      // 処理が完了してたらフラグをtrueに設定
      // let message = "承認完了";
      // if (
      //   selectImg.item_approval_flag === true &&
      //   selectImg.item_transaction_flag === false
      // ) {
      //   message = "受取完了";
      //   transaction_flag = true;
      // }
      const obj = {
        transaction_date: getCurrentTime(),
        transaction_flag: transaction_flag,
        item_id: selectImg.id,
        user_id: userData[0].id,
        message: message,
      };
      try {
        // チャットTBに書き換え
        await fetch(URL + "/addChat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });
        console.log("ボタンステータス変更チャットが送信されました");
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

  //ステータスを取引中に変更
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

  //取引中をキャンセルして、在庫ありに変更
  const changeStatusCancel = async () => {
    if (selectImg.item_status === "取引中") {
      try {
        await fetch(URL + "/putItemStatusCancel", {
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
            selectImg.item_approval_flag === false ? (
              <button
                className="approvalBtn"
                disabled={selectImg.item_approval_flag}
                onClick={() => approval()}
              >
                取引承認
              </button>
            ) : (
              <>
                <button
                  className="approvalBtn"
                  disabled={!selectImg.item_approval_flag}
                  onClick={() => approvalCancel()}
                >
                  取引キャンセル
                </button>
              </>
            )
          ) : (
            <button
              className="completeBtn"
              disabled={
                !selectImg.item_approval_flag || selectImg.item_transaction_flag
              }
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

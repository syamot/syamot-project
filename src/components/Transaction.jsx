import React, { useEffect, useState } from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import { BiMailSend } from "react-icons/bi";
import "./style/transaction.css";
// import io from "socket.io-client";

const Transaction = (props) => {
  const {
    selectImg,
    URL,
    getAllItems,
    setItems,
    setSelectImg,
    userData,
    setUserData,
  } = props;
  const [sendTxt, setSendTxt] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatData, setChatData] = useState([]);
  // const socket = io("http://localhost:8000");

  useEffect(() => {
    const fetchData = async () => {
      const chat = await fetch(URL + "/chatAllData");
      const chatJson = await chat.json();
      const filterChat = chatJson
        .filter((e1) => e1.item_id === selectImg.id)
        .filter((e2) => {
          return (
            e2.user_id === userData.id ||
            e2.item_seller === userData.id ||
            e2.user_id === e2.item_seller
          );
        });
      setChatData(filterChat);
    };
    //1秒ごとにチャット内容更新
    const interval = setInterval(fetchData, 1000);

    // コンポーネントのアンマウント時にクリーンアップ
    return () => {
      clearInterval(interval);
    };
  }, [URL, chatData, selectImg.id, selectImg.item_seller, userData.id]);
  console.log(chatData);

  //setSelectImgの内容をchatDataをもとに更新
  useEffect(() => {
    if (chatData.length > 0) {
      setSelectImg((prevSelectImg) => ({
        ...prevSelectImg,
        item_approval_flag: chatData[0].item_approval_flag,
        item_transaction_flag: chatData[0].item_transaction_flag,
      }));
    }
  }, [chatData, setSelectImg]);

  //チャット記入欄のデータを取得
  const changeTxt = (e) => {
    setSendTxt(e.target.value);
  };

  //既存メッセージの表示（板倉）
  // [{text: 'a', user: 'admin'}]//
  useEffect(() => {
    const existMessage = [];
    chatData.map((chatObj) => {
      existMessage.push({ text: chatObj.message, user: chatObj.user_name });
      setMessages(existMessage);
    });
  }, [chatData]);

  // const handleSendMessage = () => {
  //   //サーバーへ送信
  //   socket.emit("send_message", { message: message });//messageはtext
  // };

  //   //サーバーから受信
  //   socket.on("received_message", (data) => {
  //     console.log("サーバーから受信:",data);
  //     setList([...list, data]);
  //   });

  //

  // 取引承認処理
  const approval = async () => {
    // 承認フラグ判定
    if (selectImg.item_approval_flag !== true) {
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

  // 受取完了処理
  const complete = async () => {
    if (selectImg.item_transaction_flag !== true) {
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

        // チャットTBを書き換え
        createMessageStatus(true, "受取完了");
        let itemData;
        const asyncPkg = async () => {
          itemData = await getAllItems();
          itemData.forEach((elem) => {
            elem.item_img = JSON.parse(elem.item_img);
          });
          setItems(itemData);
        };
        asyncPkg();
        setSelectImg({
          ...selectImg,
          item_transaction_flag: true,
        });
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
  //
  // useEffect(() => {
  //   if (selectImg.item_approval_flag)
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { text: "承認完了", user: "approve" },
  //     ]);
  //   if (selectImg.item_transaction_flag)
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { text: "受取完了", user: "approve" },
  //     ]);
  // }, []);

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
        user_id: userData.id,
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

        // socket.emit("chatMessage", {
        //   text: sendTxt,
        //   user: localStorage.getItem("user"),
        // });
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
    // 受取完了していたら処理しない
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
        user_id: userData.id,
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

  return (
    <>
      <div className="titleBrock">
        <BsFillChatDotsFill className="chatIcon" />
        <h2 className="transactionTitle">{selectImg.item_name}</h2>
      </div>
      <div className="transMainBrock">
        {messages.map((message, index) => {
          if (
            message.user === "approve" ||
            message.text === "承認完了" ||
            message.text === "承認キャンセル" ||
            message.text === "受取完了"
          ) {
            return (
              <div key={index} className="messageBlock2">
                <p className="messageContent">{message.text}</p>
              </div>
            );
          } else if (message.user === localStorage.getItem("user")) {
            return (
              <div key={index} className="messageBlock">
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
          (userData.id === selectImg.item_seller ? (
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
                  disabled={
                    selectImg.item_approval_flag &&
                    selectImg.item_transaction_flag
                  }
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

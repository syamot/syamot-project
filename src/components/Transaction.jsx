import React, { useEffect, useState } from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import { BiMailSend } from "react-icons/bi";
import "./style/transaction.css";
// import io from "socket.io-client";

// ＃＃＃＃＃＃＃＃＃＃＃＃
import { formatToTimeZone } from "date-fns-timezone"; // 追加
// ＃＃＃＃＃
let paymentFlg = false;

// チャットぺージ
const Transaction = (props) => {
  const {
    selectImg,
    URL,
    getAllItems,
    setItems,
    setSelectImg,
    setOneUser,
    oneUser,
  } = props;
  const [sendTxt, setSendTxt] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [payFetchCnt, setPayFetchCnt] = useState(0);
  // const socket = io("http://localhost:8000");

  useEffect(() => {
    const fetchData = async () => {
      const chat = await fetch(URL + "/chatAllData");
      const chatJson = await chat.json();
      const filterChat = chatJson
        .filter((e1) => e1.item_id === selectImg.id)
        .filter((e2) => {
          return (
            e2.user_id === oneUser.id ||
            e2.item_seller === oneUser.id ||
            e2.user_id === e2.item_seller
          );
        });
      setChatData(filterChat);
      if (
        chatData &&
        chatData.length > 0 &&
        chatData[0].pay_id !== "" &&
        chatData[0].pay_id !== null &&
        !chatData[0].payment
      ) {
        console.log("pay_id操作処理に入ったよ！");
        console.log("支払い処理経過時間", payFetchCnt, "秒");
        setPayFetchCnt((prevCnt) => prevCnt + 1);
        // 10秒経過したら止める
        if (payFetchCnt === 180) {
          setPayFetchCnt(0);
          try {
            await fetch(URL + "/putPaymentDel", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(selectImg),
            });
            createMessageStatus("支払い処理が中断されました");
          } catch (error) {
            console.error(error);
          }
          //それ以外はステータス完了までAPIを叩く
        } else {
          try {
            const response = await fetch(
              `${URL}/payInfo/${chatData[0].pay_id}/${chatData[0].item_id}`
            );
            const data = await response.json();
            console.log("支払いステータス＝====", data);
            if (paymentFlg) return;
            console.log("paymentFlg===========", paymentFlg);
            if (data === "COMPLETED") {
              paymentFlg = true;
              console.log("paymentFlg中中中中中=====", paymentFlg);
              await fetch(URL + "/putPayment", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(selectImg),
              });

              setSelectImg({
                ...selectImg,
                payment: true,
              });
              createMessageStatus("支払い完了");
              window.alert("paypayでの支払いが完了しました");
              // paymentFlg = false;
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
    };
    //0.5秒ごとにチャット内容更新
    const interval = setInterval(fetchData, 1000);

    // コンポーネントのアンマウント時にクリーンアップ
    return () => {
      clearInterval(interval);
    };
  }, [URL, chatData, selectImg.id, selectImg.item_seller, oneUser.id]);

  useEffect(() => {
    console.log("chatData=====", chatData);
  }, [chatData]);

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
        // // チャットメッセージを追加??????????????????????????????????????????????????消す？
        // setMessages((prevMessages) => [
        //   ...prevMessages,
        //   { text: "承認完了", user: "approve" },
        // ]);

        // チャットTBを書き換え
        createMessageStatus("承認完了");
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
        // // チャットメッセージを追加
        // setMessages((prevMessages) => [
        //   ...prevMessages,
        //   { text: "承認キャンセル", user: "approve" },
        // ]);

        // チャットTBを書き換え
        createMessageStatus("承認キャンセル");
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

        await fetch(URL + "/buyer", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            buyer_id: oneUser.id,
            item_id: selectImg.id,
          }),
        });

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "受取完了", user: "approve" },
        ]);

        // チャットTBを書き換え
        createMessageStatus("受取完了");
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
    if (sendTxt !== "") {
      setSendTxt("");
      const now = new Date();
      // // タイムゾーン定義
      const timeZone = "Asia/Tokyo";
      console.log(
        formatToTimeZone(now, "YYYY-MM-DD HH:mm:ss", { timeZone: timeZone })
      );
      console.log(now);
      const obj = {
        send_date: now,
        item_id: selectImg.id,
        user_id: oneUser.id,
        message: sendTxt,
        partner_id: selectImg.item_seller,
        seller_read_flag: true,
        buyer_read_flag: true,
      };
      console.log("sdasdasdsadasdsadas", obj);
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

      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   { text: sendTxt, user: localStorage.getItem("user") },
      // ]);
      // setSendTxt("");
    }
  };

  // ボタン操作によるチャットステータス送信
  const createMessageStatus = async (message) => {
    // 受取完了していたら処理しない
    if (
      !(
        selectImg.item_approval_flag === true &&
        selectImg.item_transaction_flag === true
      )
    ) {
      const obj = {
        //送信日時はサーバー側で取得済み
        item_id: selectImg.id,
        user_id: oneUser.id,
        message: message,
        partner_id: selectImg.item_seller,
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

      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   { text: sendTxt, user: localStorage.getItem("user") },
      // ]);
      // setSendTxt("");
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
  const payment = () => {
    // ページ遷移の処理
    // window.location.href = '/paypay'; // 遷移先のURLを指定
    createMessageStatus("支払い処理中");
    window.open(URL + "/paypay?itemId=" + selectImg.id, "PayPayWindow");
  };
  return (
    <>
      <div className="titleBrock">
        <BsFillChatDotsFill className="chatIcon" />
        <h2 className="transactionTitle">{selectImg.item_name}</h2>
        <button
          className="payment"
          onClick={() => payment()}
          disabled={selectImg.payment}
        >
          支払い
        </button>
      </div>
      <div className="transMainBrock">
        {messages.map((message, index) => {
          if (
            message.user === "approve" || //これ効いていない
            message.text === "承認完了" ||
            message.text === "承認キャンセル" ||
            message.text === "受取完了" ||
            message.text === "支払い処理中" ||
            message.text === "支払い処理が中断されました" ||
            message.text === "支払い完了"
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
        {oneUser.length !== 0 &&
          (oneUser.id === selectImg.item_seller ? (
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
                !selectImg.item_approval_flag ||
                selectImg.item_transaction_flag ||
                !selectImg.payment
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

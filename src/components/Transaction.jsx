import React, { useEffect, useState } from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import { BiMailSend } from "react-icons/bi";
import "./style/transaction.css";
// import io from "socket.io-client";

// ＃＃＃＃＃＃＃＃＃＃＃＃
// import { formatToTimeZone } from "date-fns-timezone"; // 追加
// ＃＃＃＃＃

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
    users,
    selectBuyer,
  } = props;
  const [sendTxt, setSendTxt] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatData, setChatData] = useState([]);
  const partnerId =
    selectImg.item_seller === oneUser.id ? selectBuyer : selectImg.item_seller;
  const partnerUser = users.filter((el) => el.id === Number(partnerId))[0]
    .user_name;

  // const socket = io("http://localhost:8000");

  useEffect(() => {
    const fetchData = async () => {
      const chat = await fetch(URL + "/chatAllData");
      const chatJson = await chat.json();
      // console.log("JJJJJJJJJJJJJJJJJJJJJ", chatJson);

      const filterChat = chatJson
        //選択した写真のアイテムのチャット
        .filter((e1) => {
          return e1.item_id === selectImg.id;
        })
        //チャットのBuyerID===ログイン者のID
        //チャットの出品者ID===選択した投稿の出品者ID

        .filter((e2) => {
          // console.log(
          //   e2.buyer_id,
          //   oneUser.id,
          //   e2.seller_id,
          //   selectImg.item_seller
          // );
          // console.log(
          //   e2.buyer_id,
          //   Number(selectBuyer),
          //   e2.seller_id,
          //   oneUser.id
          // );
          return (
            // 購入者側
            (e2.buyer_id === oneUser.id &&
              e2.seller_id === selectImg.item_seller) ||
            // 出品者側
            (e2.buyer_id === Number(selectBuyer) && e2.seller_id === oneUser.id)
          );
        });
      // console.log(filterChat);
      //chatDataを最新順に並び替え
      const dateAscChatData = filterChat.sort(function (a, b) {
        if (a.send_date > b.send_date) return 1;
        if (b.send_date > a.send_date) return -1;
        return 0;
      });
      setChatData(dateAscChatData);
    };
    //0.5秒ごとにチャット内容更新
    const interval = setInterval(fetchData, 1000);

    // コンポーネントのアンマウント時にクリーンアップ
    return () => {
      clearInterval(interval);
    };
  }, [URL, chatData, selectImg.id, selectImg.item_seller, oneUser.id]);
  // console.log("###################", chatData);

  //setSelectImgの内容をchatDataをもとに更新
  useEffect(() => {
    if (chatData.length > 0) {
      setSelectImg((prevSelectImg) => ({
        ...prevSelectImg,
        item_approval_flag: chatData[0].item_approval_flag,
        item_transaction_flag: chatData[0].item_transaction_flag,
      }));

      const readFetch = async () => {
        const selectFlag =
          selectImg.item_seller === oneUser.id //出品者判定
            ? "seller_read_flag"
            : "buyer_read_flag";
        // console.log("2222222222222", chatData);
        const readArr = chatData.map((e) => e.chat_id);
        // console.log("👾👾👾👾👾👾👾", readArr);
        const Data = { read_arr: readArr, flagText: selectFlag };
        const read = await fetch(URL + "/putChatStatus", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(Data),
        });
        // console.log("#########################", read);
      };
      readFetch();
    }
  }, [chatData, setSelectImg]);

  //チャット記入欄のデータを取得
  const changeTxt = (e) => {
    setSendTxt(e.target.value);
  };

  //既存メッセージの表示（板倉）
  // [{text: 'a', user: 'admin'}]//
  // useEffect(() => {
  //   const existMessage = [];
  //   chatData.map((chatObj) => {
  //     existMessage.push({ text: chatObj.message, user: chatObj.user_name });
  //     setMessages(existMessage);
  //   });
  // }, [chatData]);

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
        // チャットTBを書き換え
        createMessageStatus("受取完了");
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
            soldBuyer_id: oneUser.id,
            item_id: selectImg.id,
          }),
        });

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
  // チャット送信
  const createMessage = async () => {
    if (sendTxt !== "") {
      setSendTxt("");
      const now = new Date();

      const obj = {
        send_date: now,
        item_id: selectImg.id,
        user_id: oneUser.id,
        message: sendTxt,
        buyer_id: selectBuyer === 0 ? oneUser.id : selectBuyer, //####################購入者情報
        seller_id: selectImg.item_seller, //#####################出品者情報
        seller_read_flag: false,
        buyer_read_flag: false,
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
      const now = new Date();
      const obj = {
        send_date: now,
        buyer_id: selectBuyer === 0 ? oneUser.id : selectBuyer, //####################購入者情報
        seller_id: selectImg.item_seller, //#####################出品者情報
        buyer_read_flag: false,
        seller_read_flag: false,
        item_id: selectImg.id,
        user_id: oneUser.id, //####################送信者情報
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
    }
  };

  //ステータスを取引中に変更
  const changeStatus = async () => {
    if (
      selectImg.item_status !== "取引終了" ||
      selectImg.item_status !== "取引中"
    ) {
      try {
        console.log(selectImg);
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
  // console.log("selectImg");
  // console.log(selectImg);

  //取引中をキャンセルして、在庫ありに変更
  const changeStatusCancel = async () => {
    // console.log(selectImg);
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
        <h2 className="transactionTitle">{`${selectImg.item_name} 🤝 ${partnerUser}`}</h2>
      </div>
      <h2 className>{partnerUser}</h2>
      <div className="transMainBrock">
        {/* {messages.map((message, index) => {
          if (
            message.user === "approve" || //これ効いていない
            message.text === "承認完了" ||
            message.text === "承認キャンセル" ||
            message.text === "受取完了"
          ) { */}
        {chatData.map((chat, index) => {
          // console.log(chat);
          if (
            chat.message === "承認完了" ||
            chat.message === "承認キャンセル" ||
            chat.message === "受取完了"
          ) {
            return (
              <div key={index} className="messageBlock2">
                <p className="messageContent">{chat.message}</p>
              </div>
            );
          } else if (chat.user_id === oneUser.id) {
            return (
              <div key={index} className="messageBlock">
                <p className="messageContent">{chat.message}</p>
              </div>
            );
          } else {
            return (
              <div key={index} className="messageBlock3">
                <p className="messageContent">{chat.message}</p>
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

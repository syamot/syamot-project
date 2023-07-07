import React, { useEffect, useRef, useState } from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import { BsSend } from "react-icons/bs";

import { IoIosArrowBack } from "react-icons/io";
import "./style/transaction.css";

let paymentFlg = false;
let payStatus = "";

// チャットぺージ
const Transaction = (props) => {
  const {
    selectImg,
    URL,
    getAllItems,
    setItems,
    setSelectImg,
    oneUser,
    users,
    selectBuyer,
    setSelectFlag,
    setBeforeFlag,
    beforeFlag,
    setConfetFlag,
  } = props;
  const [sendTxt, setSendTxt] = useState("");
  // const [messages, setMessages] = useState([]);
  const [chatData, setChatData] = useState([]);
  const [payFetchCnt, setPayFetchCnt] = useState(0);
  const partnerId =
    selectImg.item_seller === oneUser.id ? selectBuyer : selectImg.item_seller;
  const partnerUser = users.filter((el) => el.id === Number(partnerId))[0]
    .user_name;

  // const socket = io("http://localhost:8000");
  const chatBlockRef = useRef(null);

  useEffect(() => {
    // 投稿が追加されたら最下端にスクロールする処理
    const chatBlock = chatBlockRef.current;
    chatBlock.scrollTop = chatBlock.scrollHeight;
  }, [chatData]);

  useEffect(() => {
    const fetchData = async () => {
      const chat = await fetch(URL + "/chatAllData");
      const chatJson = await chat.json();
      console.log("JJJJJJJJJJJJJJJJJJJJJ", chatJson);

      const filterChat = chatJson
        //選択した写真のアイテムのチャット
        .filter((e1) => {
          console.log("F1======", e1.item_id === selectImg.id);
          return e1.item_id === selectImg.id;
        })
        //チャットのBuyerID===ログイン者のID
        //チャットの出品者ID===選択した投稿の出品者ID

        .filter((e2) => {
          console.log("メッセージ：", e2.message);
          console.log(
            "F2_購入者========",
            e2.buyer_id,
            oneUser.id,
            e2.seller_id,
            selectImg.item_seller
          );
          console.log(
            "F2_出品者========",
            e2.buyer_id,
            Number(selectBuyer),
            e2.seller_id,
            oneUser.id
          );
          return (
            // 購入者側
            (e2.buyer_id === oneUser.id &&
              e2.seller_id === selectImg.item_seller) ||
            // 出品者側
            (e2.buyer_id === Number(selectBuyer) && e2.seller_id === oneUser.id)
          );
        });
      console.log("filterChat========", filterChat);
      //chatDataを最新順に並び替え
      const dateAscChatData = filterChat.sort(function (a, b) {
        if (a.send_date > b.send_date) return 1;
        if (b.send_date > a.send_date) return -1;
        return 0;
      });
      setChatData(dateAscChatData);
      if (
        chatData &&
        chatData.length > 0 &&
        chatData[0].pay_id !== "" &&
        chatData[0].pay_id !== null &&
        !chatData[0].payment &&
        chatData[0].buyer_id === oneUser.id
      ) {
        console.log("pay_id操作処理に入ったよ！");
        console.log("支払い処理経過時間", payFetchCnt, "秒");
        setPayFetchCnt((prevCnt) => prevCnt + 1);
        // 120秒経過したら止める
        if (payFetchCnt === 120 || payStatus === "FALSE") {
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
            console.log(
              `${URL}/payInfo/${chatData[0].pay_id}/${chatData[0].item_id}`
            );
            const response = await fetch(
              `${URL}/payInfo/${chatData[0].pay_id}/${chatData[0].item_id}`
            );
            const data = await response.json();
            console.log("支払いステータス＝====", data);
            payStatus = data;
            if (paymentFlg) {
              paymentFlg = false;
              return;
            }
            // console.log("paymentFlg===========", paymentFlg);
            if (data === "COMPLETED") {
              paymentFlg = true;
              // console.log("paymentFlg中中中中中=====", paymentFlg);
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
              if (!(chatData.length !== 0 && chatData[0].payment)) {
                createMessageStatus("支払い完了");
                window.alert("paypayでの支払いが完了しました");
              }
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
    setConfetFlag(true);
    playAudio();
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
  const payment = () => {
    // ページ遷移の処理
    // window.location.href = '/paypay'; // 遷移先のURLを指定
    createMessageStatus("支払い処理中");
    window.open(URL + "/paypay?itemId=" + selectImg.id, "PayPayWindow");
  };

  const pageHandler = () => {
    setSelectFlag(beforeFlag);
    if (beforeFlag === "contactList") {
      setBeforeFlag("card");
    } else {
      setBeforeFlag("list");
    }
  };

  //   {/* 出品者*/}
  // {/* 取引承認＋キャンセル */}

  // {/* 購入者*/}
  // {/* 　手数料支払いボタンのグレー */}
  // {/* item ステータスが承認完了のみ*/}
  // {/* 　手数料支払い 有効 */}
  // {/* 手数料支払いが終了*/}
  // {/* 　完了ボタンに切り替え
  let btn;
  // 出品者か判定
  if (selectImg.item_seller === oneUser.id) {
    // 出品者なら入る

    if (
      oneUser.length !== 0 &&
      oneUser.id === selectImg.item_seller &&
      chatData.length !== 0
    ) {
      console.log("chatData[0]=========", chatData[0]);
      // 承認フラグ判定
      if (selectImg.item_approval_flag === false) {
        btn = (
          <button
            className="transaction-statusBtn"
            disabled={selectImg.item_approval_flag}
            onClick={() => approval()}
          >
            取引承認
          </button>
        );
      } else {
        // 支払い確認
        if (chatData.length !== 0 && chatData[0].payment === true) {
          console.log(
            "🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠🧠支払い完了したよ〜〜=======",
            chatData.length !== 0 && chatData[0].payment
          );
          // 非表示
          btn = (
            <button
              className="transaction-dummy"
              onClick={() => window.alert("引き続きこのアプリをお願いします🥺")}
            >
              取引完了！　おめでとう🎉
            </button>
          );
        } else {
          console.log(
            "👹👹👹👹👹👹👹👹👹👹👹支払い確認=======",
            chatData.length !== 0 && chatData[0].payment
          );
          btn = (
            <button
              className="transaction-statusBtn"
              disabled={chatData.length !== 0 && chatData[0].payment}
              // display="none"
              onClick={() => approvalCancel()}
            >
              取引キャンセル
            </button>
          );
        }
      }
    }
  } else {
    // 購入者側か確認
    if (oneUser.length !== 0 && oneUser.id === selectImg.item_seller) {
    } else {
      // 支払い終了確認
      if (chatData.length !== 0 && chatData[0].payment === true) {
        // 受け取りフラグ確認
        if (selectImg.item_transaction_flag === true) {
          // 非表示
          btn = (
            <button
              className="transaction-dummy"
              onClick={() => window.alert("引き続きこのアプリをお願いします🥺")}
            >
              取引完了！　おめでとう🎉
            </button>
          );
        } else {
          btn = (
            <button
              className="transaction-statusBtn"
              disabled={
                !selectImg.item_approval_flag ||
                selectImg.item_transaction_flag ||
                !(chatData.length !== 0 && chatData[0].payment)
              }
              onClick={() => complete()}
            >
              受取連絡
            </button>
          );
        }
      } else {
        // 支払いが終了していなければ入る
        //承認されているか判定
        if (selectImg.item_approval_flag === false) {
          btn = (
            <button
              className="transaction-dummy"
              onClick={() =>
                window.alert("出品者から承認連絡をもらってください！")
              }
            >
              承認完了後、押してね！
            </button>
          );
        } else {
          btn = (
            <button
              className="transaction-payment"
              onClick={() => payment()}
              disabled={selectImg.payment}
            >
              手数料支払い
            </button>
          );
        }
      }
    }
  }
  // music===================
  const audioRef = useRef(null);
  const playAudio = () => {
    audioRef.current.play();
  };
  const pauseAudio = () => {
    audioRef.current.pause();
  };
  const resetAudio = () => {
    audioRef.current.currentTime = 0;
  };
  return (
    <div className="transaction-all">
      <audio ref={audioRef}>
        <source src="music/thankyou1.mp3" type="audio/mp3" />
      </audio>
      <div className="transaction-titleBrock">
        <IoIosArrowBack
          className="transaction-backIcon"
          onClick={() => {
            pageHandler();
          }}
        />
        <div className="transaction-title">
          <h2 className="transaction-titleName">{selectImg.item_name}</h2>
          <h2 className="transaction-titleName">{`${partnerUser}さんとのチャット`}</h2>
        </div>
        <div className="transaction-posionAdjust"></div>
      </div>

      <div className="transaction-mainBlock">
        <div className="transaction-chatBlock" ref={chatBlockRef}>
          {chatData.map((chat, index) => {
            // console.log(chat);
            if (
              chat.message === "承認完了" ||
              chat.message === "承認キャンセル" ||
              chat.message === "受取完了" ||
              chat.message === "支払い処理中" ||
              chat.message === "支払い処理が中断されました" ||
              chat.message === "支払い完了"
            ) {
              return (
                <div key={`transaction1_${index}`} className="messageBlock2">
                  <p className="transaction-statusMessageContent">
                    {chat.message}
                  </p>
                </div>
              );
            } else if (chat.user_id === oneUser.id) {
              return (
                <div
                  key={`transaction2_${index}`}
                  className="transaction-sendMessageBlock"
                >
                  <p className="transaction-messageContent">{chat.message}</p>
                  {/* <p>{chat.message}</p> */}
                </div>
              );
            } else {
              return (
                <div
                  key={`transaction3_${index}`}
                  className="transaction-otherMessage"
                >
                  <p className="transaction-messageContent">{chat.message}</p>
                </div>
              );
            }
          })}
        </div>

        <div className="transaction-postMessageBlock">
          <input
            type="text"
            className="transaction-chatInput"
            value={sendTxt}
            onChange={(e) => changeTxt(e)}
          />
          <BsSend className="transaction-sendBtn" onClick={createMessage} />
        </div>
      </div>

      <div className="transaction-footerBlock">{btn}</div>
    </div>
  );
};

export default Transaction;

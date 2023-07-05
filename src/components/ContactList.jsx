import React, { useEffect, useState } from "react";
import "./style/contactList.css";
import { GrNext } from "react-icons/gr";
import { BiSolidCircle } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

const ContactList = (props) => {
  const {
    setSelectFlag,
    selectImg,
    URL,
    getAllItems,
    setItems,
    setSelectImg,
    setSelectBuyer,
    oneUser,
  } = props;
  const [sendTxt, setSendTxt] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatData, setChatData] = useState({});

  //item_id毎のchatDataを取得
  useEffect(() => {
    const fetchData = async () => {
      const chat = await fetch(URL + "/chatAllData");
      const chatJson = await chat.json();
      console.log("##############################");
      console.log(selectImg);
      console.log(oneUser);

      const filterChat = chatJson
        .filter((e1) => e1.item_id === selectImg.id)
        .filter((e2) => e2.user_id !== oneUser.id);
      //chatDataを最新順に並び替え
      const dateAscChatData = filterChat.sort(function (a, b) {
        if (a.send_date > b.send_date) return -1;
        if (b.send_date > a.send_date) return 1;
        return 0;
      });
      //
      const groupedArray = dateAscChatData.reduce((result, element) => {
        const user = element.user_id;
        if (!result[user]) {
          result[user] = [];
        }
        result[user].push(element);
        return result;
      }, {});
      // console.log(dateAscChatData);

      console.log("groupedArray===", groupedArray);
      // {1: Array(2), 3: Array(2)}

      // setChatData(dateAscChatData);
      setChatData(groupedArray);
    };
    fetchData();
    console.log("chatData:", chatData);
  }, []);

  useEffect(() => {
    console.log("chatData:", chatData);
    console.log("Object.entries(chatData)", Object.entries(chatData));
    // console.log("dateAscChatData:", dateAscChatData)
  }, [chatData]);

  return (
    <>
      <div className="contact-list-box">
        <div className="contact-piece">
          <h2 className="contact-title">チャットリスト</h2>
        </div>
        {/* <div className="contact-imgBlock">
            <img
              id={selectImg.id}
              src={selectImg.item_img[0]}
              alt={selectImg.item_name}
            />
          </div> */}

        <div>
          <ul className="contact-image-list">

            {Object.keys(chatData).length === 0 ? (
              <li className="contact-image-item">新着メッセージはありません</li>
            ) : (

              Object.entries(chatData).map(([user_id, arr]) => (
                <li key={arr[0].id} className="contact-image-item">
                  <div className="contact-image-box">
                    <div className="contact-imgBlock">
                      <FaUserCircle/>
                    </div>

                    <div className="contact-info">
                      <p>ユーザー名:{arr[0].user_name}</p>
                      <p>
                        {arr.filter((e) => !e.seller_read_flag).length === 0
                          ? "新着通知なし"
                          : `${
                              arr.filter((e) => !e.seller_read_flag).length
                            }件の通知があります`}
                      </p>
                      {/* <p>商品の状態:{arr[0].item_status}</p> */}
                    </div>
                    <GrNext
                      className="contact-nextIcon"
                      id={arr[0].id}
                      onClick={() => {
                        setSelectBuyer(user_id);
                        setSelectFlag("transaction");
                      }}
                    />
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* ＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃ */}
      {/* 
      <>
        <div className="titleBrock">
          <BsFillChatDotsFill className="chatIcon" />
          <h2 className="transactionTitle">{selectImg.item_name}</h2>
        </div>
        <div className="transMainBrock">
          <h1>
            {Object.keys(chatData).length === 0
              ? "新着メッセージはありません"
              : "【メッセージ一覧】"}
          </h1>
          <ul className="contactList">
            {Object.entries(chatData).map(([user_id, arr]) => (
              <div
                key={user_id}
                onClick={() => {
                  setSelectBuyer(user_id);
                  setSelectFlag("transaction");
                }}
              >
                <h2>User: {arr[0].user_name}</h2>
                <p>
                  {arr.filter((e) => !e.seller_read_flag).length === 0
                    ? "新着通知なし"
                    : `${
                        arr.filter((e) => !e.seller_read_flag).length
                      }件の通知があります`}
                </p>
              </div>
            ))}
          </ul>
        </div>
      </> */}
    </>
  );
};

export default ContactList;

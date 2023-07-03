import React, { useEffect, useState } from "react";

const ContactList = (props) => {
  const {
    setSelectFlag,
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

  //item_id毎のchatDataを取得
  useEffect(() => {
    const fetchData = async () => {
      const chat = await fetch(URL + "/chatAllData");
      const chatJson = await chat.json();
      const filterChat = chatJson.filter((e1) => e1.item_id === selectImg.id);
      // .filter((e2) => {
      //   return (
      //     e2.user_id === userData.id ||
      //     e2.item_seller === userData.id ||
      //     e2.user_id === e2.item_seller
      //   );
      // });
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

      console.log("groupedArray===", groupedArray);

      setChatData(groupedArray);
    };
    fetchData();
    console.log("chatData:", chatData);

    //   //自分以外の各user_idの最新メッセージのみを配列に残す
    //   const contactListChat = [];
    //   for (const chatElm of chatData) {
    //     let flag = 0;
    //     for (const resultElm of contactListChat) {
    //       if (chatElm.user_id === resultElm.user_id) {
    //         contactListChat.push(chatElm);
    //       }
    //     }
    //   }
    //   console.log("contactListChat:", contactListChat);
  }, []);

  useEffect(() => {
    console.log("chatData:", chatData);

    // console.log("dateAscChatData:", dateAscChatData)
  }, [chatData]);

  return (
    <div>
      <h1>ContactList</h1>
      <ul className="contactList">
        {Object.entries(chatData).map(([user_id]) => (
          <div
            key={user_id}
            onClick={() => {
              setSelectFlag("transaction");
            }}
          >
            <h2>User: {user_id}</h2>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;

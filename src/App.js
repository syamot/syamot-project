import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import List from "./components/List";
import Card from "./components/Card";
import Transaction from "./components/Transaction";
import ItemPost from "./components/ItemPost";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { SignUp2 } from "./components/SignUp2";
import MyPage from "./components/MyPage";
import Profile from "./components/Profile";
import Notification from "./components/Notification";
import ExhibitionList from "./components/ExhibitionList";
import Favorite from "./components/Favorite";
import PurchaseList from "./components/PurchaseList";
import TradingHistory from "./components/TradingHistory";
//
import ContactList from "./components/ContactList";
import ConfettiComponent from "./components/ConfettiComponent";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://syamot.onrender.com"
    : "http://localhost:8000";

function App() {
  const [selectFlag, setSelectFlag] = useState("signIn");

  useEffect(() => {
    console.log("表示コンポーネント", selectFlag);
  }, [selectFlag]);

  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [selectImg, setSelectImg] = useState({});
  const [userData, setUserData] = useState({});
  const [selectBuyer, setSelectBuyer] = useState(0);
  const [sorted, setSorted] = useState("");

  const [oneUser, setOneUser] = useState("");
  const [exhibitList, setExhibitList] = useState("");
  const [deadLineList, setDeadLineList] = useState([]);
  const [purchaseList, setPurchaseList] = useState("");
  const [upDataFlag, setUpDataFlag] = useState(false);
  const [beforeFlag, setBeforeFlag] = useState("");
  const [editItem, setEditItem] = useState({});
  useEffect(() => {
    console.log("selectImg===========", selectImg);
  }, [selectImg]);
  const [tradingHistory, setTradingHistory] = useState("");

  const [flagHistory, setFlagHistory] = useState(["list"]);

  useEffect(() => {
    const userName = localStorage.getItem("user");

    if (userName === undefined || userName === null || userName === "") {
      setSelectFlag("signIn");
    } else {
      setSelectFlag("list");
    }
  }, []);

  const getAllUsers = async () => {
    const resData = await fetch(URL + "/userAllData");
    const userData = await resData.json();
    return userData;
  };

  const getAllItems = async () => {
    const resItemData = await fetch(`${URL}/itemAllData`);
    const itemData = await resItemData.json();
    return itemData;
  };

  useEffect(() => {
    let userData;
    let itemData;
    const asyncPkg = async () => {
      userData = await getAllUsers();
      itemData = await getAllItems();

      itemData.forEach((elem) => {
        elem.item_img = JSON.parse(elem.item_img);
      });
      userData.forEach((elem) => {
        elem.favorite = JSON.parse(elem.favorite);
      });

      setUsers(userData);
      setItems(itemData);

      let openUserId;
      userData.forEach((elem) => {
        if (elem.user_name === localStorage.getItem("user")) {
          openUserId = elem.id;
        }
      });
      const userItemData = itemData.filter(
        (elem) => elem.item_seller === openUserId
      );
      setExhibitList(userItemData);

      // 期限切れデータリスト作成
      const AddDeadLineList = userItemData.filter(
        (elem) => new Date(elem.item_deadline) < new Date()
      );
      setDeadLineList(AddDeadLineList);
      console.log("AddDeadLineList============", AddDeadLineList);

      const userPurchaseList = itemData.filter(
        (elem) => elem.buyer_id === openUserId
      );
      setPurchaseList(userPurchaseList);
    };
    asyncPkg();
    setUpDataFlag(false);
  }, [selectFlag, upDataFlag]);

  useEffect(() => {
    setFlagHistory((prevHistory) => [...prevHistory, selectFlag]);
  }, [selectFlag]);

  useEffect(() => {
    const index = users.findIndex(
      (elem) => elem.user_name === localStorage.getItem("user")
    );
    setOneUser(users[index]);
  }, [users]);

  // 新規登録ユーザー情報
  const [addUser, setAdduser] = useState({});
  const [message, setMessage] = useState(""); // 「お問い合わせ内容」の部分

  switch (selectFlag) {
    case "signIn":
      return (
        <>
          <SignIn
            setSelectFlag={setSelectFlag}
            users={users}
            items={items}
            setItems={setItems}
            setSelectImg={setSelectImg}
            getAllItems={getAllItems}
            userData={userData}
            setUserData={setUserData}
            URL={URL}
          />
        </>
      );
    case "signUp":
      return (
        <>
          <SignUp
            setSelectFlag={setSelectFlag}
            items={items}
            setItems={setItems}
            setSelectImg={setSelectImg}
            getAllItems={getAllItems}
            setAdduser={setAdduser}
            URL={URL}
            setMessage={setMessage}
          />
        </>
      );
    case "signUp2":
      return (
        <>
          <SignUp2
            setSelectFlag={setSelectFlag}
            addUser={addUser}
            setAdduser={setAdduser}
            setSelectImg={setSelectImg}
            getAllItems={getAllItems}
            URL={URL}
            setMessage={setMessage}
            message={message}
          />
        </>
      );
    case "list":
      return (
        <>
          <ConfettiComponent />
          <Header
            setSelectFlag={setSelectFlag}
            selectFlag={selectFlag}
            setUpDataFlag={setUpDataFlag}
            setBeforeFlag={setBeforeFlag}
          />
          <List
            setSelectFlag={setSelectFlag}
            items={items}
            setItems={setItems}
            setSelectImg={setSelectImg}
            getAllItems={getAllItems}
            sorted={sorted}
            setSorted={setSorted}
            users={users}
            setUsers={setUsers}
            setSelectBuyer={setSelectBuyer}
            oneUser={oneUser}
            setOneUser={setOneUser}
            setUpDataFlag={setUpDataFlag}
            beforeFlag={beforeFlag}
            setBeforeFlag={setBeforeFlag}
          />
          {/* <Footer setSelectFlag={setSelectFlag} /> */}
        </>
      );
    case "card":
      return (
        <>
          <Header
            setSelectFlag={setSelectFlag}
            selectFlag={selectFlag}
            setBeforeFlag={setBeforeFlag}
          />
          <Card
            setSelectFlag={setSelectFlag}
            selectImg={selectImg}
            users={users}
            oneUser={oneUser}
            userData={userData}
            URL={URL}
            setSelectImg={setSelectImg}
            setOneUser={setOneUser}
            beforeFlag={beforeFlag}
            setBeforeFlag={setBeforeFlag}
          />
          {/* <Footer setSelectFlag={setSelectFlag} /> */}
        </>
      );
    //
    case "contactList":
      return (
        <>
          <Header
            setSelectFlag={setSelectFlag}
            selectFlag={selectFlag}
            setBeforeFlag={setBeforeFlag}
          />
          <ContactList
            setSelectFlag={setSelectFlag}
            selectImg={selectImg}
            setSelectImg={setSelectImg}
            users={users}
            URL={URL}
            oneUser={oneUser}
            getAllItems={getAllItems}
            setItems={setItems}
            setSelectBuyer={setSelectBuyer} //購入者情報選択関数
          />
          {/* <Footer setSelectFlag={setSelectFlag} /> */}
        </>
      );

    //
    case "transaction":
      return (
        <>
          <Header
            setSelectFlag={setSelectFlag}
            selectFlag={selectFlag}
            setBeforeFlag={setBeforeFlag}
          />
          <Transaction
            setSelectFlag={setSelectFlag}
            selectImg={selectImg}
            setSelectImg={setSelectImg}
            users={users}
            URL={URL}
            getAllItems={getAllItems}
            setItems={setItems}
            oneUser={oneUser}
            setOneUser={setOneUser}
            selectBuyer={selectBuyer} //選択された購入者
            selectFlag={selectFlag}
            setBeforeFlag={setBeforeFlag}
          />
          {/* <Footer setSelectFlag={setSelectFlag} /> */}
        </>
      );
    case "myPage":
      return (
        <>
          <Header setSelectFlag={setSelectFlag} selectFlag={selectFlag} />
          <MyPage setSelectFlag={setSelectFlag} oneUser={oneUser} />
        </>
      );
    case "profile":
      return (
        <>
          <Header setSelectFlag={setSelectFlag} selectFlag={selectFlag} />
          <Profile
            setSelectFlag={setSelectFlag}
            oneUser={oneUser}
            setOneUser={setOneUser}
            URL={URL}
          />
          {/* <Footer setSelectFlag={setSelectFlag} /> */}
        </>
      );
    case "tradingHistory":
      return (
        <>
          <Header setSelectFlag={setSelectFlag} selectFlag={selectFlag} />
          <TradingHistory
            items={items}
            setSelectFlag={setSelectFlag}
            setSelectImg={setSelectImg}
            purchaseList={purchaseList}
            beforeFlag={beforeFlag}
            setBeforeFlag={setBeforeFlag}
          />
          {/* <Footer setSelectFlag={setSelectFlag} /> */}
        </>
      );
    case "exhibitionList":
      return (
        <>
          <Header setSelectFlag={setSelectFlag} selectFlag={selectFlag} />
          <ExhibitionList
            selectFlag={selectFlag}
            setSelectFlag={setSelectFlag}
            items={items}
            setSelectImg={setSelectImg}
            exhibitList={exhibitList}
            setExhibitList={setExhibitList}
            setBeforeFlag={setBeforeFlag}
            setEditItem={setEditItem}
            deadLineList={deadLineList}
          />
          {/* <Footer setSelectFlag={setSelectFlag} /> */}
        </>
      );
    case "favorite":
      return (
        <>
          <Header setSelectFlag={setSelectFlag} selectFlag={selectFlag} />
          <Favorite
            oneUser={oneUser}
            items={items}
            setSelectFlag={setSelectFlag}
            setSelectImg={setSelectImg}
            setBeforeFlag={setBeforeFlag}
          />
          {/* <Footer setSelectFlag={setSelectFlag} /> */}
        </>
      );
    case "purchaseList":
      return (
        <>
          <Header setSelectFlag={setSelectFlag} selectFlag={selectFlag} />
          <PurchaseList
            items={items}
            setSelectFlag={setSelectFlag}
            setSelectImg={setSelectImg}
            purchaseList={purchaseList}
          />
          {/* <Footer setSelectFlag={setSelectFlag} /> */}
        </>
      );
    case "post":
      return (
        <>
          <Header
            setSelectFlag={setSelectFlag}
            selectFlag={selectFlag}
            setBeforeFlag={setBeforeFlag}
          />
          <ItemPost
            setSelectFlag={setSelectFlag}
            selectFlag={selectFlag}
            URL={URL}
            setBeforeFlag={setBeforeFlag}
            beforeFlag={beforeFlag}
            editItem={editItem}
            setItems={setItems}
          />
          {/* <Footer setSelectFlag={setSelectFlag} /> */}
        </>
      );
    default:
      break;
  }
}

export default App;

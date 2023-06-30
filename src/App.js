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

const URL =
  process.env.NODE_ENV === "production"
    ? "https://syamot.onrender.com"
    : "http://localhost:8000";

function App() {
  const [selectFlag, setSelectFlag] = useState("signIn");
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [selectImg, setSelectImg] = useState({});
  const [oneUser, setOneUser] = useState("");
  const [exhibitList, setExhibitList] = useState("");

  useEffect(() => {
    console.log("selectImg#####################", selectImg);
  }, [selectImg]);
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
      setUsers(userData);
      setItems(itemData);

      const index = users.findIndex(
        (elem) => elem.user_name === localStorage.getItem("user")
      );
      const userItemData = itemData.filter(
        (elem) => elem.item_seller === index
      );
      setExhibitList(userItemData);
      console.log("userItemData", userItemData);
      console.log(itemData);
    };
    asyncPkg();
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
          <Header setSelectFlag={setSelectFlag} selectFlag={selectFlag} />
          <List
            setSelectFlag={setSelectFlag}
            items={items}
            setItems={setItems}
            setSelectImg={setSelectImg}
            getAllItems={getAllItems}
          />
          <Footer setSelectFlag={setSelectFlag} />
        </>
      );
    case "card":
      return (
        <>
          <Header setSelectFlag={setSelectFlag} selectFlag={selectFlag} />
          <Card
            setSelectFlag={setSelectFlag}
            selectImg={selectImg}
            users={users}
            URL={URL}
          />
          <Footer setSelectFlag={setSelectFlag} />
        </>
      );
    case "transaction":
      return (
        <>
          <Header setSelectFlag={setSelectFlag} selectFlag={selectFlag} />
          <Transaction
            setSelectFlag={setSelectFlag}
            selectImg={selectImg}
            setSelectImg={setSelectImg}
            users={users}
            URL={URL}
            getAllItems={getAllItems}
            setItems={setItems}
            userData={userData}
            setUserData={setUserData}
          />
          <Footer setSelectFlag={setSelectFlag} />
        </>
      );
    case "myPage":
      return (
        <>
          <Header setSelectFlag={setSelectFlag} selectFlag={selectFlag} />
          <MyPage setSelectFlag={setSelectFlag} />
          <Footer setSelectFlag={setSelectFlag} />
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
          <Footer setSelectFlag={setSelectFlag} />
        </>
      );
    case "notification":
      return (
        <>
          <Header setSelectFlag={setSelectFlag} selectFlag={selectFlag} />
          <Notification />
          <Footer setSelectFlag={setSelectFlag} />
        </>
      );
    case "exhibitionList":
      return (
        <>
          <Header setSelectFlag={setSelectFlag} selectFlag={selectFlag} />
          <ExhibitionList
            setSelectFlag={setSelectFlag}
            items={items}
            setSelectImg={setSelectImg}
            exhibitList={exhibitList}
            setExhibitList={setExhibitList}
          />
          <Footer setSelectFlag={setSelectFlag} />
        </>
      );
    case "favorite":
      return (
        <>
          <Header setSelectFlag={setSelectFlag} selectFlag={selectFlag} />
          <Favorite />
          <Footer setSelectFlag={setSelectFlag} />
        </>
      );
    case "purchaseList":
      return (
        <>
          <Header setSelectFlag={setSelectFlag} selectFlag={selectFlag} />
          <PurchaseList
            setSelectFlag={setSelectFlag}
            items={items}
            setSelectImg={setSelectImg}
            exhibitList={exhibitList}
            setExhibitList={setExhibitList}
          />
          <Footer setSelectFlag={setSelectFlag} />
        </>
      );
    case "post":
      return (
        <>
          <Header setSelectFlag={setSelectFlag} selectFlag={selectFlag} />
          <ItemPost
            setSelectFlag={setSelectFlag}
            selectFlag={selectFlag}
            URL={URL}
          />
          <Footer setSelectFlag={setSelectFlag} />
        </>
      );
    default:
      break;
  }
}

export default App;

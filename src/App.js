import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import List from "./components/List";
import Card from "./components/Card";
import Transaction from "./components/Transaction";
import ItemPost from "./components/ItemPost";
import Swipe from "./components/Swipe";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { SignUp2 } from "./components/SignUp2";
const URL = "http://localhost:8000"
// process.env.NODE_ENV === "production"
//   ? "https://syamot.onrender.com"
//   : "http://localhost:8000";

function App() {
  const [selectFlag, setSelectFlag] = useState("signIn");
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [selectImg, setSelectImg] = useState({});

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
    };
    asyncPkg();
    console.log(users)
  }, [selectFlag]);

  // 新規登録ユーザー情報
  const [addUser, setAdduser] = useState({})
  const [message, setMessage] = useState(""); // 「お問い合わせ内容」の部分

  useEffect(() => {
    console.log(addUser);
  }, [addUser])
  useEffect(() => {
    console.log(message);
  }, [message]);
  return (
    <>
      {/* <Header setSelectFlag={setSelectFlag} selectFlag={selectFlag} /> */}
      {selectFlag === "signIn" ? (
        <SignIn
          setSelectFlag={setSelectFlag}
          users={users}
          items={items}
          setItems={setItems}
          setSelectImg={setSelectImg}
          getAllItems={getAllItems}
        />
      )
        : selectFlag === "signUp" ? (
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
        )
          : selectFlag === "signUp2" ? (
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
          )
            : selectFlag === "list" ? (
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
            ) : selectFlag === "card" ? (
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
            ) : selectFlag === "transaction" ? (
              <>
                <Header setSelectFlag={setSelectFlag} selectFlag={selectFlag} />
                <Transaction
                  setSelectFlag={setSelectFlag}
                  selectImg={selectImg}
                  users={users}
                />
                <Footer setSelectFlag={setSelectFlag} />
              </>
            ) : selectFlag === "swipe" ? (
              <Swipe setSelectFlag={setSelectFlag} selectImg={selectImg} />
            ) : (
              <>
                <Header setSelectFlag={setSelectFlag} selectFlag={selectFlag} />
                <ItemPost setSelectFlag={setSelectFlag} URL={URL} />
                <Footer setSelectFlag={setSelectFlag} />
              </>
            )}

      {/* <Footer setSelectFlag={setSelectFlag} /> */}
    </>
  );
}

export default App;

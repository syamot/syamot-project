import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import List from "./components/List";
import Card from "./components/Card";
import Transaction from "./components/Transaction";
import ItemPost from "./components/ItemPost";
import Swipe from "./components/Swipe";

function App() {
  const URL = "http://localhost:8000"
  // const URL = "http://localhost:8000"

  const [selectFlag, setSelectFlag] = useState("list");
  const [users, setUsers] = useState([])
  const [items, setItems] = useState([])
  const [selectImg, setSelectImg] = useState({})

  const getAllUsers = async () => {
    const resData = await fetch(URL + "/userAllData");
    const userData = await resData.json();
    return userData
  }

  const getAllItems = async () => {
    const resItemData = await fetch(`${URL}/itemAllData`)
    const itemData = await resItemData.json()
    return itemData

  }

  useEffect(() => {
    let userData;
    let itemData;
    const asyncPkg = async () => {
      userData = await getAllUsers();
      itemData = await getAllItems();
      itemData.forEach(elem => {
        elem.item_img = JSON.parse(elem.item_img)
      })
      setUsers(userData);
      setItems(itemData)

    }
    asyncPkg();
  }, [])


  return (
    <>
      <Header setSelectFlag={setSelectFlag} selectFlag={selectFlag} />
      {selectFlag === "list" ? (
        <List setSelectFlag={setSelectFlag} items={items} setItems={setItems} setSelectImg={setSelectImg} getAllItems={getAllItems} />
      ) : selectFlag === "card" ? (
        <Card setSelectFlag={setSelectFlag} selectImg={selectImg} users={users} URL={URL} />
      ) : selectFlag === "transaction" ? (
        <Transaction setSelectFlag={setSelectFlag} selectImg={selectImg} users={users} />
      ) : selectFlag === "swipe" ? (
        <Swipe setSelectFlag={setSelectFlag} selectImg={selectImg} />
      ) : (
        <ItemPost setSelectFlag={setSelectFlag} />
      )}

      <Footer setSelectFlag={setSelectFlag} />
    </>
  );
}

export default App;

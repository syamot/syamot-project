import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import List from "./components/List";
import Card from "./components/Card";
import Transaction from "./components/Transaction";
import ItemPost from "./components/ItemPost";

function App() {
  const [selectFlag, setSelectFlag] = useState("list");

  useEffect(() => {
    console.log(selectFlag);
  }, [selectFlag]);

  return (
    <>
      <Header setSelectFlag={setSelectFlag} selectFlag={selectFlag} />
      {selectFlag === "list" ? (
        <List setSelectFlag={setSelectFlag} />
      ) : selectFlag === "card" ? (
        <Card setSelectFlag={setSelectFlag} />
      ) : selectFlag === "transaction" ? (
        <Transaction setSelectFlag={setSelectFlag} />
      ) : (
        <ItemPost setSelectFlag={setSelectFlag} />
      )}

      <Footer setSelectFlag={setSelectFlag} />
    </>
  );
}

export default App;

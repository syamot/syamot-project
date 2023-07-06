import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { GrTransaction } from "react-icons/gr";
import "./style/tradingHistory.css";

function TradingHistory(props) {
  const {
    items,
    setSelectFlag,
    setSelectImg,
    purchaseList,
    beforeFlag,
    setBeforeFlag,
    oneUser,
  } = props;
  const [toggleSwitch, setToggleSwitch] = useState("trading");

  const clickImg = (e) => {
    console.log(e.target);
    if (e.target.tagName === "polyline" || e.target.tagName === "path") return;
    let item;
    let numTargetId = Number(e.target.id);
    items.forEach((elem) => {
      if (elem.id === numTargetId) {
        item = elem;
      }
    });
    setSelectImg(item);
    setSelectFlag("card");
    setBeforeFlag("tradingHistory");
  };
  const toggleChangeStatus = () => {
    toggleSwitch === "trading"
      ? setToggleSwitch("completion")
      : setToggleSwitch("trading");
  };

  return (
    <div className="tradingHistory-list-box">
      <div className="tradingHistory-piece">
        <IoIosArrowBack
          className="tradingHistory-navi-icon"
          onClick={() => setSelectFlag("myPage")}
        />
        <div className="tradingHistory-title-box">
          <h2 className="tradingHistory-title">取引画面</h2>
          <GrTransaction className="exhibition-title-icon" />
        </div>
        <div className="tradingHistory-position-adjustment"></div>
      </div>

      {toggleSwitch === "trading" ? (
        <>
          <div className="tradingHistory-toggle-switch">
            <div className="tradingHistory-trading-history-white">
              <p className="tradingHistory-toggle-text">取引中</p>
            </div>
            <div
              className="tradingHistory-completion-gray"
              onClick={() => toggleChangeStatus()}
            >
              <p className="tradingHistory-toggle-text">完了</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="tradingHistory-toggle-switch">
            <div
              className="tradingHistory-trading-history-gray"
              onClick={() => toggleChangeStatus()}
            >
              <p className="tradingHistory-toggle-text">取引中</p>
            </div>
            <div className="tradingHistory-completion-white">
              <p className="tradingHistory-toggle-text">完了</p>
            </div>
          </div>
          <ul className="tradingHistory-image-list">
            {purchaseList.length !== 0 &&
              purchaseList.map((item) => (
                <li
                  key={`tradingHistory_${item.id}`}
                  className="tradingHistory-image-item"
                >
                  <div className="tradingHistory-image-box">
                    <div className="tradingHistory-imgBlock">
                      <img src={item.item_img[0]} alt={item.item_name}></img>
                      <div className="tradingHistory-info">
                        {item.soldBuyer_id === oneUser.id ? (
                          <>
                            <p>受け取り商品</p>
                          </>
                        ) : (
                          <>
                            <p>差し出し商品</p>
                          </>
                        )}
                        <p>商品名:{item.item_name}</p>
                        <p>期限:{item.item_deadline.split("T")[0]}</p>
                        <p>商品の状態:{item.item_status}</p>
                      </div>
                    </div>
                    <IoIosArrowForward
                      className="tradingHistory-contents-icon"
                      id={item.id}
                      onClick={(e) => {
                        clickImg(e);
                      }}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default TradingHistory;

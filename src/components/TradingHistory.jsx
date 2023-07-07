import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { GrTransaction } from "react-icons/gr";
import "./style/tradingHistory.css";

function TradingHistory(props) {
  const {
    items,
    setSelectFlag,
    selectFlag,
    setSelectImg,
    purchaseList,
    beforeFlag,
    setBeforeFlag,
    oneUser,
    sellerChatData,
    buyerChatData,
  } = props;
  const [toggleSwitch, setToggleSwitch] = useState("trading");
  const [itemsChat, setItemsChat] = useState([]);

  const clickImg = (e) => {
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

  useEffect(() => {
    // let sellerChatDataSort = [].concat(sellerChatData);
    let sellerChatDataSort = JSON.stringify(sellerChatData);
    sellerChatDataSort = JSON.parse(sellerChatDataSort);
    const sellerItems = [];
    if (sellerChatDataSort.length !== 0) {
      sellerChatDataSort = sellerChatDataSort.sort(
        (a, b) => b.chat_id - a.chat_id
      );
      sellerChatDataSort.forEach((elem1) => {
        let flag = false;
        sellerItems.forEach((elem2) => {
          if (elem1.item_id === elem2.item_id) {
            flag = true;
          }
        });
        if (!flag && !elem1.seller_read_flag) {
          sellerItems.push(elem1);
        }
      });

      sellerItems.map((elem1) => {
        let count = 0;
        sellerChatDataSort.forEach((elem2) => {
          if (elem1.item_id === elem2.item_id && !elem2.seller_read_flag) {
            count++;
          }
        });
        elem1.count = count;
        return elem1;
      });
    }
    // let buyerChatDataSort = [].concat(buyerChatData);
    let buyerChatDataSort = JSON.stringify(buyerChatData);
    buyerChatDataSort = JSON.parse(buyerChatDataSort);
    const buyerItems = [];

    if (buyerChatDataSort.length !== 0) {
      buyerChatDataSort = buyerChatDataSort.sort(
        (a, b) => b.chat_id - a.chat_id
      );

      buyerChatDataSort.forEach((elem1) => {
        let flag = false;
        buyerItems.forEach((elem2) => {
          if (elem1.item_id === elem2.item_id) {
            flag = true;
          }
        });
        if (!flag && !elem1.buyer_read_flag) {
          buyerItems.push(elem1);
        }
      });

      buyerItems.map((elem1) => {
        let count = 0;
        buyerChatDataSort.forEach((elem2) => {
          if (elem1.item_id === elem2.item_id && !elem1.buyer_read_flag) {
            count++;
          }
        });
        elem1.count = count;
        return elem1;
      });
    }
    setItemsChat([].concat(sellerItems, buyerItems));
  }, [selectFlag]);

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
          <div className="tradingHistory-trading-history-box"></div>
          <ul className="tradingHistory-image-list">
            {itemsChat.length !== 0 &&
              itemsChat.map((item) => (
                <li
                  key={`tradingHistory1_${item.id}`}
                  className="tradingHistory-image-item"
                >
                  <div className="tradingHistory-image-box">
                    <div className="tradingHistory-imgBlock">
                      <img
                        src={JSON.parse(item.item_img)[0]}
                        alt={item.item_name}
                      ></img>
                      <div className="tradingHistory-info">
                        {item.buyer_id === oneUser.id ? (
                          <>
                            <p>受け取り商品</p>
                          </>
                        ) : (
                          <>
                            <p>差し出し商品</p>
                          </>
                        )}
                        <p>商品名:{item.item_name}</p>
                        <p>通知が{item.count}件あります。</p>
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
                  key={`tradingHistory2_${item.id}`}
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

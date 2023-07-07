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
    tradingState,
    setTradingState,
  } = props;
  const [itemsChat, setItemsChat] = useState([]);
  // const [tradingState, setTradingState] = useState("完了");

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

  useEffect(() => {
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
        if (!flag) {
          buyerItems.push(elem1);
        }
      });

      // buyerItems.map((elem1) => {
      //   let count = 0;
      //   buyerChatDataSort.forEach((elem2) => {
      //     if (elem1.item_id === elem2.item_id && !elem1.buyer_read_flag) {
      //       count++;
      //     }
      //   });
      //   elem1.count = count;
      //   return elem1;
      // });
      console.log("buyerItems", buyerItems);
    }
    setItemsChat(buyerItems);
  }, [selectFlag]);

  const changeState = (state) => {
    setTradingState(state);
  };

  return (
    <div className="tradingHistory-list-box">
      <div className="tradingHistory-piece">
        <IoIosArrowBack
          className="tradingHistory-navi-icon"
          onClick={() => setSelectFlag("myPage")}
        />
        <div className="tradingHistory-title-box">
          <h2 className="tradingHistory-title">取引管理</h2>
          <GrTransaction className="tradingHistory-title-icon" />
        </div>
        <div className="tradingHistory-position-adjustment"></div>
      </div>
      <div className="tradingHistory-toggle-box">
        <div
          className={`tradingHistory-toggle-name ${
            tradingState === "完了" && "tradingHistory-color"
          }`}
        >
          <p onClick={() => changeState("完了")}>完了</p>
        </div>
        <div
          className={`tradingHistory-toggle-name ${
            tradingState === "取引中" && "tradingHistory-color"
          }`}
        >
          <p onClick={() => changeState("取引中")}>取引中</p>
        </div>
      </div>
      {tradingState === "完了" && (
        <>
          <div className="tradingHistory-trading-history-box"></div>
          <ul className="tradingHistory-image-list">
            {itemsChat.length !== 0 &&
              itemsChat
                .filter((elem) => {
                  console.log("itemsChat", itemsChat);
                  if (
                    elem.buyer_id === oneUser.id &&
                    elem.soldBuyer_id !== null
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                })
                .map((item) => {
                  console.log("item-----------------", item);
                  return (
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
                            <p>商品名:{item.item_name}</p>
                            <p>受取日:{item.send_date.split("T")[0]}</p>
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
                  );
                })}
          </ul>
        </>
      )}
      {tradingState === "取引中" && (
        <>
          <ul className="tradingHistory-image-list">
            {itemsChat.length !== 0 &&
              itemsChat
                .filter((elem) => {
                  console.log("itemsChat", itemsChat);
                  if (
                    elem.buyer_id === oneUser.id &&
                    elem.soldBuyer_id === null
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                })
                .map((item) => {
                  console.log("item-----------------", item);
                  return (
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
                            <p>商品名:{item.item_name}</p>
                            <p>期限:{item.item_deadline.split("T")[0]}</p>
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
                  );
                })}
          </ul>
        </>
      )}
    </div>
  );
}

export default TradingHistory;

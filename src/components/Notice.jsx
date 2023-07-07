import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { GrTransaction } from "react-icons/gr";
import { BsBell } from "react-icons/bs";
import "./style/notice.css";

function Notice(props) {
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
    setBeforeFlag("notice");
  };

  useEffect(() => {
    // let sellerChatDataSort = [].concat(sellerChatData);
    let sellerChatDataSort = JSON.stringify(sellerChatData);
    sellerChatDataSort = JSON.parse(sellerChatDataSort);
    console.log("sellerChatDataSort", sellerChatDataSort);
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
    let buyerChatDataSort = JSON.stringify(buyerChatData);
    buyerChatDataSort = JSON.parse(buyerChatDataSort);
    console.log("buyerChatDataSort", buyerChatDataSort);
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
          if (elem1.item_id === elem2.item_id && !elem2.buyer_read_flag) {
            count++;
          }
        });
        elem1.count = count;
        return elem1;
      });
    }

    console.log("sellerItems", sellerItems);
    console.log("buyerItems", buyerItems);
    setItemsChat([].concat(sellerItems, buyerItems));
  }, [selectFlag]);

  return (
    <div className="notice-list-box">
      <div className="notice-piece">
        <IoIosArrowBack
          className="notice-navi-icon"
          onClick={() => setSelectFlag("myPage")}
        />
        <div className="notice-title-box">
          <h2 className="notice-title">お知らせ</h2>
          <BsBell className="notice-title-icon" />
        </div>
        <div className="notice-position-adjustment"></div>
      </div>

      <ul className="notice-image-list">
        {itemsChat.length !== 0 &&
          itemsChat.map((item) => (
            <li key={`notice1_${item.id}`} className="notice-image-item">
              <div className="notice-image-box">
                <div className="notice-imgBlock">
                  <img
                    src={JSON.parse(item.item_img)[0]}
                    alt={item.item_name}
                  ></img>
                  <div className="notice-info">
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
                  className="notice-contents-icon"
                  id={item.id}
                  onClick={(e) => {
                    clickImg(e);
                  }}
                />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Notice;

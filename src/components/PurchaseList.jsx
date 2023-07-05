import React from "react";
import "./style/purchaseList.css";

import { GrNext } from "react-icons/gr";

const PurchaseList = (props) => {
  const { items, setSelectFlag, setSelectImg, purchaseList } = props;

  const clickImg = (e) => {
    console.log(e.target);
    if (e.target.tagName === "polyline") return;
    let item;
    let numTargetId = Number(e.target.id);
    items.forEach((elem) => {
      if (elem.id === numTargetId) {
        item = elem;
      }
    });
    setSelectImg(item);
    setSelectFlag("card");
  };

  return (
    <div className="purchase-list-box">
      <div className="purchase-piece">
        <h2 className="purchase-title">購入履歴</h2>
      </div>
      <div>
        <ul className="purchase-image-list">

          {purchaseList.length !== 0 &&
            purchaseList.map((item, index) => (
              <li key={item.id} className="purchase-image-item">

                <div className="purchase-image-box">
                  <div className="purchase-imgBlock">
                    <img
                      id={item.id}
                      src={item.item_img[0]}
                      alt={item.item_name}
                    />
                  </div>
                  
                  <div className="purchase-info">
                    <p>商品名:{item.item_name}</p>
                    <p>期限:{item.item_deadline.split("T")[0]}</p>
                    <p>商品の状態:{item.item_status}</p>
                  </div>
                  <GrNext
                    className="purchase-nextIcon"
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
    </div>
  );
};

export default PurchaseList;

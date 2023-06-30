import React from "react";
import "./style/purchaseList.css";

const PurchaseList = (props) => {
  const { items, setSelectFlag, setSelectImg, purchaseList } = props;
  const clickImg = (e) => {
    let item;
    let numTargetId = Number(e.target.id);
    items.forEach((elem) => {
      if (elem.id === numTargetId) {
        item = elem;
      }
    });
    setSelectImg(item);
  };

  return (
    <div className="purchase-list-box">
      <div className="exhibition-piece">
        <h2>購入履歴</h2>
      </div>
      <div>
        <ul className="image-list">
          {purchaseList.length !== 0 &&
            purchaseList.map((item, index) => (
              <li key={item.id} className="image-item">
                <div className="image-box">
                  <img
                    id={item.id}
                    src={item.item_img[0]}
                    alt={item.item_name}
                    onClick={(e) => {
                      clickImg(e);
                      setSelectFlag("card");
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

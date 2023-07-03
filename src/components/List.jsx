import React from "react";
import "./style/list.css";

function List(props) {
  const { setSelectFlag, items, setSelectImg, setSelectBuyer } = props;
  const clickImg = (e) => {
    setSelectImg(items[e.target.id]);
  };
  setSelectBuyer(0);
  return (
    <div className="mainBrock-list">
      <ul className="image-list">
        {items.length !== 0 &&
          items.map((item, index) => (
            <li key={item.id} className="image-item">
              <div className="image-box">
                <img
                  id={index}
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
  );
}

export default List;

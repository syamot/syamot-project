import React from "react";
import "./style/list.css";

// ############################React
import ImageShadow from "react-image-shadow";
import "react-image-shadow/assets/index.css";
// ############################React

function List(props) {
  const { setSelectFlag, items, setSelectImg } = props;
  const clickImg = (e) => {
    setSelectImg(items[e.target.id]);
  };

  return (
    <div className="mainBrock-list">
      <ul className="image-list">
        {items.length !== 0 &&
          items.map((item, index) => (
            <li key={item.id} className="image-item">
              <div
                className="image-box"
                onClick={(e) => {
                  clickImg(e);
                  setSelectFlag("card");
                }}
              >
                <img
                  id={index}
                  src={item.item_img[0]}
                  alt={item.item_name}
                  onClick={(e) => {
                    clickImg(e);
                    setSelectFlag("card");
                  }}
                />
                {/* <ImageShadow
                  id={index}
                  src={item.item_img[0]}
                  alt={item.item_name}
                /> */}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default List;

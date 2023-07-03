import React from "react";
import "./style/favorite.css";

const Favorite = (props) => {
  const { oneUser, items, setSelectFlag, setSelectImg } = props;
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
        <h2>お気に入り</h2>
      </div>
      <div>
        <ul className="image-list">
          {oneUser.favorite.length !== 0 &&
            oneUser.favorite.map((idNum) => {
              console.log("idNum", idNum);
              console.log("items", items);
              const item = items.filter((elem) => elem.id === idNum)[0];

              console.log("item", item);

              return (
                <li key={idNum} className="image-item">
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
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Favorite;

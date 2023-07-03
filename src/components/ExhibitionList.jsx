import React from "react";
import "./style/exhibitionList.css";

const ExhibitionList = (props) => {
  const { items, setSelectFlag, setSelectImg, exhibitList, setExhibitList } =
    props;

  // const clickImg = (e) => {
  //   setSelectImg(items[e.target.id]);
  // };

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
    <div className="exhibition-list-box">
      <div className="exhibition-piece">
        <h2 className="exhibition-title">出品リスト</h2>
      </div>
      <div>
        <ul className="exhibition-image-list">
          {exhibitList.length !== 0 &&
            exhibitList.map((item, index) => (
              <li key={item.id} className="exhibition-image-item">
                <div className="exhibition-image-box">
                  <img
                    id={item.id}
                    src={item.item_img[0]}
                    alt={item.item_name}
                    onClick={(e) => {
                      clickImg(e);
                      setSelectFlag("card");
                    }}
                  />
                  <div className="exhibition-info">
                    <p>商品名:{item.item_name}</p>
                    <p>期限:{item.item_deadline}</p>
                    <p>商品の状態:{item.item_status}</p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ExhibitionList;

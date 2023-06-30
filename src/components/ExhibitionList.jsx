import React, { useEffect } from "react";
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

  useEffect(() => {
    console.log("exhibitList", exhibitList);
  });
  return (
    <div className="exhibition-list-box">
      <div className="exhibition-piece">
        <h2>出品リスト</h2>
      </div>
      <div>
        <ul className="image-list">
          {exhibitList.length !== 0 &&
            exhibitList.map((item, index) => (
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

export default ExhibitionList;

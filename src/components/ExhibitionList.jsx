import React from "react";
import "./style/exhibitionList.css";

const ExhibitionList = (props) => {
  const { items, setSelectFlag, setSelectImg, exhibitList, setExhibitList } =
    props;

  const clickImg = (e) => {
    setSelectImg(items[e.target.id]);
  };
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
    </div>
  );
};

export default ExhibitionList;

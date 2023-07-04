import React from "react";
import "./style/exhibitionList.css";
import { GrNext } from "react-icons/gr";
import { BiEdit } from "react-icons/bi";
const ExhibitionList = (props) => {
  const {
    items,
    selectFlag,
    setSelectFlag,
    setSelectImg,
    exhibitList,
    setExhibitList,
    setBeforeFlag,
    setEditItem,
  } = props;

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

  const editItem = (e) => {
    // console.log("editItem入れるよ====", exhibitList[0].id);
    console.log("tagName=====", e.target.tagName);
    if (e.target.tagName === "path") return;
    let item = exhibitList.filter((elem) => elem.id === Number(e.target.id));
    console.log("editItem入れるよ====", item);
    setEditItem(item[0]);
    console.log(selectFlag);
    setBeforeFlag(selectFlag);
    setSelectFlag("post");
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
                  <div className="imgBlock">
                    <img src={item.item_img[0]} alt={item.item_name}></img>
                    <div className="EditIconBlock">
                      <BiEdit
                        className="editIcon"
                        id={item.id}
                        onClick={(e) => editItem(e)}
                      />
                    </div>
                  </div>
                  <div className="exhibition-info">
                    <p>商品名:{item.item_name}</p>
                    <p>期限:{item.item_deadline.split("T")[0]}</p>
                    <p>商品の状態:{item.item_status}</p>
                  </div>
                  <GrNext
                    className="nextIcon"
                    id={item.id}
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

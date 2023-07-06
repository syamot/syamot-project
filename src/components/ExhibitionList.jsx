import React from "react";
import "./style/exhibitionList.css";
import { AiFillWarning } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { PiUserList } from "react-icons/pi";

const ExhibitionList = (props) => {
  const {
    items,
    selectFlag,
    setSelectFlag,
    setSelectImg,
    exhibitList,
    setExhibitList,
    deadLineList,
    setBeforeFlag,
    setEditItem,
  } = props;

  const clickImg = (e) => {
    console.log(e.target);
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
    setBeforeFlag("exhibitionList");
  };

  return (
    <div className="exhibition-list-box">
      <div className="exhibition-piece">
        <IoIosArrowBack
          className="exhibition-navi-icon"
          onClick={() => setSelectFlag("myPage")}
        />
        <div className="exhibition-title-box">
          <h2 className="exhibition-title">出品リスト</h2>
          <PiUserList className="exhibition-title-icon" />
        </div>
        <div className="exhibition-position-adjustment"></div>
      </div>


      <ul className="exhibition-image-list">
        {exhibitList.length !== 0 &&
          exhibitList.map((item) => (
            <li key={item.id} className="exhibition-image-item">


              <div className="exhibition-image-box">
                <div className="exhibition-imgBlock">
                  <img src={item.item_img[0]} alt={item.item_name}></img>
                  <div className="exhibition-info">
                    <p>商品名:{item.item_name}</p>
                    <div className="exhibition-warning">
                      <p>期限:{item.item_deadline.split("T")[0]}</p>
                      {deadLineList.some((obj) => obj.id === item.id) && (
                        <AiFillWarning className="exhibition-warningIcon" />
                      )}
                    </div>
                    <p>商品の状態:{item.item_status}</p>
                  </div>
                </div>
                <IoIosArrowForward
                  className="exhibition-contents-icon"
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
};

export default ExhibitionList;

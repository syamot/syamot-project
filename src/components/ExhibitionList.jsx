import React, { useEffect } from "react";
import "./style/exhibitionList.css";
import { GrNext } from "react-icons/gr";
import { AiFillWarning } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
// import { ImWarning } from "react-icons/im";
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

  // useEffect(()=>{
  //   if(deadLineList.length!==0){

  //   }
  // },[])

  // className={
  //   deadLineList.some((obj) => obj.id === item.id)
  //     ? "exhibition-image-item active"
  //     : "exhibition-image-item"
  // }
  return (
    <div className="exhibition-list-box">
      <div className="exhibition-piece">
        <IoIosArrowBack className="exhibition-navi-icon" />
        <h2 className="exhibition-title">出品リスト</h2>
        <div></div>
        <AiFillWarning className="exhibition-warningIcon" />
      </div>
      <ul className="exhibition-image-list">
        {exhibitList.length !== 0 &&
          exhibitList.map((item) => (
            <li key={item.id} className={"exhibition-image-item"}>
              <div className="exhibition-image-box">
                <div className="exhibition-imgBlock">
                  <img src={item.item_img[0]} alt={item.item_name}></img>
                  <div className="exhibition-info">
                    {/* {deadLineList.some((obj) => obj.id === item.id) && (
                      <div className="warningBlock"></div>
                    )} */}
                    <p>商品名:{item.item_name}</p>
                    <p>期限:{item.item_deadline.split("T")[0]}</p>
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

import React, { useState, useEffect } from "react";
import Modal from "./Modal";
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
    oneUser,
    exhibitionStatus,
    setExhibitionStatus,
  } = props;
  const [modalVisible, setModalVisible] = useState(false);
  // const [exhibitionStatus, setExhibitionStatus] = useState("出品中");

  useEffect(() => {
    console.log("modalVisible", modalVisible);
    console.log("selectFlag", selectFlag);
  }, [modalVisible, selectFlag]);

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

  const changeState = (state) => {
    setExhibitionStatus(state);
  };

  return (
    <>
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

        <div className="exhibition-toggle-box">
          <div
            className={`exhibition-toggle-name ${
              exhibitionStatus === "出品中" && "exhibition-color"
            }`}
          >
            <p onClick={() => changeState("出品中")}>出品中</p>
          </div>
          <div
            className={`exhibition-toggle-name ${
              exhibitionStatus === "取引中" && "exhibition-color"
            }`}
          >
            <p onClick={() => changeState("取引中")}>取引中</p>
          </div>
          <div
            className={`exhibition-toggle-name ${
              exhibitionStatus === "完了" && "exhibition-color"
            }`}
          >
            <p onClick={() => changeState("完了")}>完了</p>
          </div>
        </div>
        {exhibitionStatus === "出品中" && (
          <>
            <ul className="tradingHistory-image-list">
              {items.length !== 0 &&
                items
                  .filter((elem) => {
                    if (
                      elem.item_seller === oneUser.id &&
                      elem.item_status === "在庫あり"
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  })
                  .map((item) => {
                    return (
                      <li
                        key={`tradingHistory1_${item.id}`}
                        className="tradingHistory-image-item"
                      >
                        <div className="tradingHistory-image-box">
                          <div className="tradingHistory-imgBlock">
                            <img
                              src={item.item_img[0]}
                              alt={item.item_name}
                            ></img>
                            <div className="tradingHistory-info">
                              <p>商品名:{item.item_name}</p>
                              <div className="exhibition-warning">
                                <p>期限:{item.item_deadline.split("T")[0]}</p>
                                {deadLineList.some(
                                  (obj) => obj.id === item.id
                                ) && (
                                  <AiFillWarning
                                    className="exhibition-warningIcon"
                                    onClick={() => {
                                      setModalVisible(true);
                                    }}
                                  />
                                )}
                              </div>
                              <p>商品ステータス:{item.item_status}</p>
                            </div>
                          </div>
                          <IoIosArrowForward
                            className="tradingHistory-contents-icon"
                            id={item.id}
                            onClick={(e) => {
                              clickImg(e);
                            }}
                          />
                        </div>
                      </li>
                    );
                  })}
            </ul>
          </>
        )}
        {exhibitionStatus === "取引中" && (
          <>
            <ul className="tradingHistory-image-list">
              {items.length !== 0 &&
                items
                  .filter((elem) => {
                    if (
                      elem.item_seller === oneUser.id &&
                      elem.item_status === "取引中"
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  })
                  .map((item) => {
                    return (
                      <li
                        key={`tradingHistory1_${item.id}`}
                        className="tradingHistory-image-item"
                      >
                        <div className="tradingHistory-image-box">
                          <div className="tradingHistory-imgBlock">
                            <img
                              src={item.item_img[0]}
                              alt={item.item_name}
                            ></img>
                            <div className="tradingHistory-info">
                              <p>商品名:{item.item_name}</p>
                              <div className="exhibition-warning">
                                <p>期限:{item.item_deadline.split("T")[0]}</p>
                                {deadLineList.some(
                                  (obj) => obj.id === item.id
                                ) && (
                                  <AiFillWarning
                                    className="exhibition-warningIcon"
                                    onClick={() => {
                                      setModalVisible(true);
                                    }}
                                  />
                                )}
                              </div>
                              <p>商品ステータス:{item.item_status}</p>
                            </div>
                          </div>
                          <IoIosArrowForward
                            className="tradingHistory-contents-icon"
                            id={item.id}
                            onClick={(e) => {
                              clickImg(e);
                            }}
                          />
                        </div>
                      </li>
                    );
                  })}
            </ul>
          </>
        )}
        {exhibitionStatus === "完了" && (
          <>
            <ul className="tradingHistory-image-list">
              {items.length !== 0 &&
                items
                  .filter((elem) => {
                    if (
                      elem.item_seller === oneUser.id &&
                      elem.item_status === "取引終了"
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  })
                  .map((item) => {
                    return (
                      <li
                        key={`tradingHistory1_${item.id}`}
                        className="tradingHistory-image-item"
                      >
                        <div className="tradingHistory-image-box">
                          <div className="tradingHistory-imgBlock">
                            <img
                              src={item.item_img[0]}
                              alt={item.item_name}
                            ></img>
                            <div className="tradingHistory-info">
                              <p>商品名:{item.item_name}</p>
                              <p>商品ステータス:{item.item_status}</p>
                            </div>
                          </div>
                          <IoIosArrowForward
                            className="tradingHistory-contents-icon"
                            id={item.id}
                            onClick={(e) => {
                              clickImg(e);
                            }}
                          />
                        </div>
                      </li>
                    );
                  })}
            </ul>
          </>
        )}
      </div>
      {modalVisible && (
        <Modal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectFlag={selectFlag}
        />
      )}
    </>
  );
};

export default ExhibitionList;

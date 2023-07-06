import React, { useEffect, useState } from "react";
import "./style/modal.css";
// import { AiFillPlusSquare } from "react-icons/ai";
// import { FiFilter } from "react-icons/fi";
// import { AiFillCloseCircle } from "react-icons/ai";
function Modal(props) {
  const {
    handleFilterArea,
    handleFilter,
    handleSort,
    setModalVisible,
    modalVisible,
    modalAreaSort,
    setModalAreaSort,
    modalItemFilter,
    setModalItemFilter,
    modalItemSort,
    setModalItemSort,
  } = props;
  // const openModal = () => {
  //   setModalVisible(true);
  // };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handleModalClick = (e) => {
    e.stopPropagation(); // クリックイベントのバブリングを防止
  };

  return (
    <div>
      {/* <AiFillPlusSquare
        onClick={openModal}
        alt="addBtn"
        className="itemAddBtn"
      ></AiFillPlusSquare> */}
      {modalVisible && (
        <div id="modalArea" className="modalArea" onClick={closeModal}>
          {/* Modal Content */}
          <div className="modal-Content" onClick={handleModalClick}>
            <div className="modal-HeadBlock">
              <p className="modal-Head">フィルター</p>
              {/* <AiFillCloseCircle className="modal-closeIcon" /> */}
            </div>
            {/* エリアソート */}
            <div className="modal-boxSet">
              <div className="modal-area_sort modal-selectbox">
                <select
                  defaultValue={modalAreaSort}
                  onChange={(e) => {
                    handleFilterArea(e);
                    setModalAreaSort(e.target.value);
                  }}
                >
                  <option value="">会社寮一覧</option>
                  {/* 大林エリア*/}
                  <option value="大林和風寮">大林和風寮</option>
                  <option value="大林清風寮">大林清風寮</option>
                  <option value="第2大林和風寮">第2大林和風寮</option>
                  <option value="第3大林和風寮">第3大林和風寮</option>
                  <option value="第4大林和風寮">第4大林和風寮</option>
                  <option value="ｱﾋﾞﾘｵ大林">ｱﾋﾞﾘｵ大林</option>
                  <option value="大林国際ｾﾝﾀｰ">大林国際ｾﾝﾀｰ</option>
                  <option value="永覚ﾚｼﾞﾃﾞﾝｽ">永覚ﾚｼﾞﾃﾞﾝｽ</option>
                  {/* 平山エリア*/}
                  <option value="平山豊和寮">平山豊和寮</option>
                  <option value="第2平山豊和寮">第2平山豊和寮</option>
                  <option value="第3平山豊和寮">第3平山豊和寮</option>
                  <option value="第4平山豊和寮">第4平山豊和寮</option>
                  <option value="平山ﾚｼﾞﾃﾞﾝｽ">平山ﾚｼﾞﾃﾞﾝｽ</option>
                  <option value="ﾚｼﾞﾃﾞﾝｽ平山">ﾚｼﾞﾃﾞﾝｽ平山</option>
                  {/* 聖心エリア*/}
                  <option value="ｱﾋﾞﾘｵ聖心寮">ｱﾋﾞﾘｵ聖心寮</option>
                  <option value="ﾚｼﾞﾃﾞﾝｽ聖心寮">ﾚｼﾞﾃﾞﾝｽ聖心寮</option>
                  <option value="第2聖心清風寮">第2聖心清風寮</option>
                  <option value="田中清風寮">田中清風寮</option>
                  {/* 小川エリア*/}
                  <option value="小川清風寮">小川清風寮</option>
                  {/* 高岡エリア*/}
                  <option value="高岡清風寮">高岡清風寮</option>
                  <option value="高岡和風寮">高岡和風寮</option>
                  <option value="第2高岡和風寮">第2高岡和風寮</option>
                  <option value="第3高岡和風寮">第3高岡和風寮</option>
                  <option value="ﾚｼﾞﾃﾞﾝｽ高岡寮">ﾚｼﾞﾃﾞﾝｽ高岡寮</option>
                  {/* 日進エリア*/}
                  <option value="レーヴ日進">レーヴ日進</option>
                  {/* 三好ヶ丘エリア*/}
                  <option value="レーヴ三好ヶ丘">レーヴ日進</option>
                  {/* 衣浦エリア*/}
                  <option value="ｱﾋﾞﾘｵ衣浦寮">ｱﾋﾞﾘｵ衣浦寮</option>
                  <option value="ｱﾋﾞﾘｵ第5衣浦寮">ｱﾋﾞﾘｵ第5衣浦寮</option>
                  {/* 田原エリア*/}
                  <option value="第1田原寮">第1田原寮</option>
                  <option value="第3田原寮">第3田原寮</option>
                  <option value="第5田原寮">第5田原寮</option>
                  <option value="第6田原寮">第6田原寮</option>
                  <option value="第1滝頭寮">第1滝頭寮</option>
                  <option value="第2滝頭寮">第2滝頭寮</option>
                  <option value="第3滝頭寮">第3滝頭寮</option>
                  <option value="吉胡寮">吉胡寮</option>
                  {/* 東富士エリア*/}
                  <option value="第2東富士寮">第2東富士寮</option>
                </select>
              </div>

              {/* カテゴリー検索 */}
              <div className="modal-item_filter modal-selectbox">
                <select
                  defaultValue={modalItemFilter}
                  onChange={(e) => {
                    handleFilter(e);
                    setModalItemFilter(e.target.value);
                  }}
                >
                  <option value="">商品カテゴリー</option>
                  <option value="elec">家電</option>
                  <option value="funt">家具</option>
                  <option value="tool">工具</option>
                </select>
              </div>
              {/* 写真のソート */}
              <div className="modal-item_sort modal-selectbox">
                <select
                  defaultValue={modalItemSort}
                  onChange={(e) => {
                    handleSort(e);
                    setModalItemSort(e.target.value);
                  }}
                >
                  <option value="">表示順番</option>
                  <option value="near">出品期限近い物順</option>
                  <option value="far">出品期限遠い物順</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;

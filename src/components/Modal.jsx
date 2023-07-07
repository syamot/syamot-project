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
    selectFlag,
    createAddUser,
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
  //アカウント登録のフラグ管理
  const [signUpFlag, setsignUpFlag] = useState(false);
  const checkClick = (e) => {
    console.log(e.target.checked);
    setsignUpFlag(e.target.checked);
  };
  if (selectFlag === "list") {
    return (
      <div>
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
  } else if (selectFlag === "exhibitionList") {
    return (
      <div>
        {modalVisible && (
          <div id="modalArea" className="modalArea" onClick={closeModal}>
            {/* Modal Content */}
            <div className="modal-Content" onClick={handleModalClick}>
              <div className="modal-HeadBlock">
                <p className="modal-Head">警告</p>
              </div>
              {/* エリアソート */}
              <div className="modal-boxSet modal-warning-box">
                <p>設定した出品期限を過ぎています。</p>
                <p>出品期限を延長するか</p>
                <p>寮の定められて処分方法で</p>
                <p>処分して下さい。</p>
                <button
                  onClick={() => {
                    setTimeout(closeModal, 200);
                  }}
                >
                  確認しました
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        {modalVisible && (
          <div id="modalArea" className="modalArea" onClick={closeModal}>
            {/* Modal Content */}
            <div
              className="modal-Content  modal-signUp-box"
              onClick={handleModalClick}
            >
              <div className="modal-HeadBlock">
                <p className="modal-Head">確認事項</p>
              </div>
              {/* エリアソート */}
              <div className="modal-boxSet">
                <div className="signUp-textarea">
                  <p className="modal-signUp-text">
                    アプリを開始する前に、
                    <br />
                    以下の確認事項があります。
                    <br />
                    <br />
                    1. アプリの手数料について -<br />
                    アプリでは、購入者がアプリの
                    <br />
                    存続を支えるために手数料
                    <br />
                    として500円を負担して頂きます。
                    <br />
                    手数料は、購入時の支払いに
                    <br />
                    含まれ、アプリの運営や開発に
                    <br />
                    使用されます。
                    <br />
                    <br />
                    2. 手数料の目的 -<br />
                    手数料は、アプリの継続的な提供や
                    <br />
                    機能改善、セキュリティ対策、
                    <br />
                    カスタマーサポートの向上など、
                    <br />
                    より良いサービスを提供するために
                    <br />
                    必要です。 購入者の皆様のご理解と
                    <br />
                    ご協力により、アプリの 品質向上に取り組むことができます。
                    <br />
                    <br />
                    3. 手数料の支払い方法 -<br />
                    手数料は、商品購入時にPayPayにて
                    <br />
                    金額500円をお支払い頂きます。
                    <br />
                    <br />
                    4. 手数料の明細 -<br />
                    購入時の明細や領収書には、手数料の詳細が含まれます。
                    <br />
                    購入者は、ご自身の購入履歴や支払い明細を
                    参照頂くことができます。
                    <br />
                    <br />
                    5. 禁止事項 -<br />
                    本アプリは、手数料以外は無償での
                    <br />
                    取引を提供しています。
                    <br />
                    個人間での金銭授受は絶対に
                    <br />
                    おやめ下さい。
                    <br />
                    弊社は、その際の金銭トラブル
                    <br />
                    について一切責任を負いません。
                    <br />
                    <br />
                    6. 最後に -<br />
                    ご理解とご協力を頂き、
                    <br />
                    アプリの存続とサービス向上に
                    <br />
                    ご協力頂けることを
                    心から感謝しています。アプリの利用に際して、
                    <br />
                    どうぞよろしくお願いいたします。
                  </p>
                </div>
                <fieldset className="signUp-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={(e) => checkClick(e)}
                    />
                    同意します
                  </label>
                </fieldset>
                <button
                  onClick={() => {
                    setTimeout(createAddUser(), 200);
                  }}
                  className="signUp-btn"
                  disabled={!signUpFlag}
                >
                  承諾しました
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Modal;

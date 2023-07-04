import React, { useEffect, useState } from "react";
import "./style/list.css";

function List(props) {
  const {
    setSelectFlag,
    items,
    setSelectImg,
    setItems,
    sorted,
    setSorted,
    users,
    setUsers,
  } = props;
  // console.log(users);
  const [sortedItems, setSortedItems] = useState([]);

  //全点リスト表示
  useEffect(() => {
    setSortedItems(items); // 初期表示ではソートを適用しない
    console.log(items);
  }, [items]);

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

  //*＊期限並び替え選択起爆
  const [deadline, setdeadline] = useState("");
  const handleSort = (e) => {
    // 選択された値を取得する
    const value = e.target.value;
    setdeadline(value);
  };

  //*＊カテゴリーフィルター起爆
  const [filteredItem, setFilteredItem] = useState("");
  const handleFilter = (e) => {
    const value = e.target.value;
    setFilteredItem(value);
    console.log(value); // 選択された値を表示する
  };

  //*＊エリアーフィルター起爆
  const [filteredArea, setFilteredArea] = useState("");
  const [idArray, setIdArray] = useState([]);
  const handleFilterArea = (e) => {
    const value = e.target.value;
    setFilteredArea(value);
    console.log(value); // 選択された値を表示する
  };

  //*＊フリーキーワード起爆
  const [inputText, setInputText] = useState(""); // 入力テキストの状態を管理
  const handleInputText = (event) => {
    const searchText = event.target.value;
    console.log(searchText);
    setInputText(searchText);
    console.log(inputText);
  };

  //*＊全ての検索・ソート実作業＆表示準備*＊
  useEffect(() => {
    let sortedArray = [];
    const resultImgs = items;
    console.log("resultImgs", resultImgs);
    // console.log(value); // 選択された値を表示する
    // *＊期限並び替え作業
    if (deadline === "") {
      sortedArray = resultImgs;
      // return console.log("無効です");
    } else if (deadline === "far") {
      sortedArray = resultImgs
        .slice()
        .sort((a, b) => new Date(a.item_deadline) - new Date(b.item_deadline));
    } else if (deadline === "near") {
      sortedArray = resultImgs
        .slice()
        .sort((a, b) => new Date(b.item_deadline) - new Date(a.item_deadline));
    }
    // console.log("期限並び替え作業", sortedArray);

    //sortedArrayをどんどん変化させていく
    //*＊カテゴリーフィルター作業
    console.log("カテゴリーフィルター前", sortedArray);
    let filteredArray = sortedArray;
    // console.log("resultImgs", resultImgs);
    if (filteredItem === "") {
      // sortedArray = resultImgs;
    } else if (filteredItem === "elec") {
      filteredArray = sortedArray.filter(
        (item) => item.item_category === "家電"
      );
    } else if (filteredItem === "funt") {
      filteredArray = sortedArray.filter(
        (item) => item.item_category === "家具"
      );
    } else if (filteredItem === "tool") {
      filteredArray = sortedArray.filter(
        (item) => item.item_category === "工具"
      );
    }
    // console.log("カテゴリーフィルター後", filteredArray);

    //*＊エリアのフィルター作業
    if (filteredArea === "") {
      sortedArray = resultImgs;
      // return console.log("無効です");
    } else if (filteredArea !== "") {
      // console.log(users);
      let filteredUserArray = [];
      let tempUsers = users;
      // console.log(tempUsers);
      filteredUserArray = tempUsers.filter(
        (user) => user.area === filteredArea
      ); //指定されたエリアでユーザー検出
      // console.log("ユーザー情報は", filteredUserArray);
      const idArray = filteredUserArray.map((user) => user.id); //エリアのユーザーID取得
      console.log("ユーザーID", idArray);
      console.log("エリアフィルター前", sortedArray);
      filteredArray = filteredArray.filter((item) =>
        idArray.includes(item.item_seller)
      ); //ユーザーの出品アイテム取得
    }
    console.log("エリアフィルター後", filteredArray);

    //**フリーワード検索
    console.log(filteredArray);
    filteredArray = filteredArray.filter((item) =>
      item.item_name.includes(inputText)
    );
    console.log(filteredArray);

    setSorted(filteredArray);
  }, [deadline, filteredItem, filteredArea, inputText, items]);

  return (
    <>
      <div className="mainBrock-list">
        {/* フリーキーワード検索ボタン */}
        <div className="serch-box">
          <input
            type="text"
            value={inputText}
            onChange={handleInputText}
            placeholder="🔍商品ワード検索"
          />
          {/* <button onClick={(e) => handleInputText(e)}>検索</button> */}
        </div>
        {/* エリアソート */}
        <div className="area_sort">
          <select onChange={(e) => handleFilterArea(e)}>
            <option value="">会社寮一覧</option>
            {/* 大林エリア*/}
            <option value="大林寮">大林和風寮</option>
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
        <div className="item_filter">
          <select onChange={(e) => handleFilter(e)}>
            <option value="">商品ｶﾃｺﾞﾘｰ</option>
            <option value="elec">家電</option>
            <option value="funt">家具</option>
            <option value="tool">工具</option>
          </select>
        </div>
        {/* 写真のソート */}
        <div className="item_sort">
          <select onChange={(e) => handleSort(e)}>
            <option value="">表示順番</option>
            <option value="near">出品期限近い物順</option>
            <option value="far">出品期限遠い物順</option>
          </select>
        </div>
        <ul className="image-list">
          {sorted.length !== 0 &&
            sorted.map((item, index) => (
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
    </>
  );
}

export default List;

// useEffect(() => {
//   let itemData;
//   const asyncPkg = async () => {
//     //Itemをバックからとる
//     itemData = await getAllItems();
//     itemData.forEach((elem) => {
//       elem.item_img = JSON.parse(elem.item_img);
//     });
//     setItems(itemData);
//   };
//   asyncPkg();
// });
// console.log(props.items);

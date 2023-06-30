import React, { useEffect, useState } from "react";
import "./style/list.css";

function List(props) {
  const { setSelectFlag, items, setSelectImg, setItems } = props;
  const [sortedItems, setSortedItems] = useState([]);
  // const [inputWord, setInputWord] = useState([]);

  useEffect(() => {
    setSortedItems(items); // 初期表示ではソートを適用しない
  }, [items]);

  const clickImg = (e) => {
    setSelectImg(items[e.target.id]);
  };

  //キーワード検索
  let inputWord = "";
  const handleInputText = (e) => {
    console.log(e.target.value);
  };
  const handleSearch = (e) => {
    console.log("検索ボタン押された", e.target.value);
  };

  //エリア選択
  const area = [
    "第3大林和風寮",
    "第2大林和風寮",
    "大林和風寮",
    "平山寮",
    "聖心寮",
    "田中寮",
    "丸山寮",
  ];

  //並び替え選択
  const handleSort = (e) => {
    const value = e.target.value; // 選択された値を取得する
    let sortedArray = [];
    console.log(value); // 選択された値を表示する
    if (value === "far") {
      sortedArray = items
        .slice()
        .sort((a, b) => new Date(a.item_deadline) - new Date(b.item_deadline));
    } else if (value === "near") {
      sortedArray = items
        .slice()
        .sort((a, b) => new Date(b.item_deadline) - new Date(a.item_deadline));
    }
    console.log(sortedItems);
    setItems(sortedArray);
  };

  //カテゴリーフィルター
  const handleFilter = (e) => {
    let filteredArray = [];
    const value = e.target.value;
    console.log(value); // 選択された値を表示する
    if (value === "elec") {
      filteredArray = items.filter((item) => item.item_category === "家電");
    } else if (value === "funt") {
      filteredArray = items.filter((item) => item.item_category === "家具");
    } else if (value === "tool") {
      filteredArray = items.filter((item) => item.item_category === "工具");
    }
    // console.log(items);
    console.log(filteredArray);
    setSortedItems(filteredArray);
  };

  return (
    <>
      <div className="mainBrock-list">
        {/* キーワード検索ボタン */}
        <div className="serch-box">
          <input
            type="text"
            placeholder="検索ワード"
            value={inputWord}
            onchange={handleInputText}
          />
          <button onClick={handleSearch}>検索</button>
          {/* エリアソート */}
          <select>
            {area.map((area) => {
              return <option key={area}>{area}</option>;
            })}
          </select>
        </div>
        {/* 写真のソート */}
        <div className="item_sort">
          <select onChange={handleSort}>
            <option value="">表示順番</option>
            <option value="near">出品期限近い物順</option>
            <option value="far">出品期限遠い物順</option>
          </select>
        </div>
        {/* カテゴリー検索 */}
        <div className="item_filter">
          <select onChange={handleFilter}>
            <option value="">商品カテゴリー</option>
            <option value="elec">家電</option>
            <option value="funt">家具</option>
            <option value="tool">工具</option>
          </select>
        </div>

        <ul className="image-list">
          {items.length !== 0 &&
            items.map((item, index) => (
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

import React, { useEffect, useState, useRef } from "react";
import "./style/list.css";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { VscFilter } from "react-icons/vsc";
import { VscFilterFilled } from "react-icons/vsc";
import Modal from "./Modal";

function List(props) {
  const {
    setSelectFlag,
    selectFlag,
    items,
    setSelectImg,
    setItems,
    sorted,
    setSorted,
    users,
    setUsers,
    oneUser,
    setOneUser,
    setUpDataFlag,
    beforeFlag,
    setBeforeFlag,
  } = props;
  // Modalのselectbox値
  const [modalAreaSort, setModalAreaSort] = useState("");
  const [modalItemFilter, setModalItemFilter] = useState("");
  const [modalItemSort, setModalItemSort] = useState("");
  // filterの有無のステータス
  const [filterStatus, setFilterStatus] = useState(false);
  // console.log(users);
  const [sortedItems, setSortedItems] = useState([]);
  // modalFlag
  const [modalVisible, setModalVisible] = useState(false);

  // fileter有無の判定関数
  const filterOnOff = () => {
    if (
      inputText === "" &&
      modalAreaSort === "" &&
      modalItemSort === "" &&
      modalItemFilter === ""
    ) {
      setFilterStatus(false);
    } else {
      setFilterStatus(true);
    }
  };

  //*＊全点リスト表示
  useEffect(() => {
    setSortedItems(items);
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
    const value = e.target.value;
    setdeadline(value);
  };

  //*＊カテゴリーフィルター起爆
  const [filteredItem, setFilteredItem] = useState("");
  const handleFilter = (e) => {
    const value = e.target.value;
    setFilteredItem(value);
  };

  //*＊エリアーフィルター起爆
  const [filteredArea, setFilteredArea] = useState("");
  const [idArray, setIdArray] = useState([]);
  const handleFilterArea = (e) => {
    const value = e.target.value;
    setFilteredArea(value);
  };

  //*＊フリーキーワード起爆
  const [inputText, setInputText] = useState(""); // 入力テキストの状態を管理
  const handleInputText = (event) => {
    const searchText = event.target.value;
    setInputText(searchText);
  };

  //*＊ユーザーの寮を摘出
  const [userArea, setUserArea] = useState("");
  const handleMyarea = (e) => {
    console.log(oneUser);
    const newUserArea = oneUser.area;
    console.log(newUserArea);
    setFilteredArea(newUserArea);
    setdeadline("near");
    setModalAreaSort(newUserArea);
  };

  //*＊全ての検索・ソート実作業＆表示準備*＊
  useEffect(() => {
    let sortedArray = [];
    const resultImgs = items;

    // *＊期限並び替え作業
    if (deadline === "") {
      sortedArray = resultImgs;
    } else if (deadline === "far") {
      sortedArray = resultImgs
        .slice()
        .sort((a, b) => new Date(a.item_deadline) - new Date(b.item_deadline));
    } else if (deadline === "near") {
      sortedArray = resultImgs
        .slice()
        .sort((a, b) => new Date(b.item_deadline) - new Date(a.item_deadline));
    }

    //*＊カテゴリーフィルター作業
    let filteredArray = sortedArray;
    if (filteredItem === "") {
      sortedArray = resultImgs;
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

    //*＊ユーザーの寮＋期限並び替え

    //*＊エリアのフィルター作業
    if (filteredArea === "") {
      sortedArray = resultImgs;
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
      // console.log("ユーザーID", idArray);
      // console.log("エリアフィルター前", sortedArray);
      filteredArray = filteredArray.filter((item) =>
        idArray.includes(item.item_seller)
      ); //ユーザーの出品アイテム取得
    }

    //**フリーワード検索
    // console.log(filteredArray);
    filteredArray = filteredArray.filter((item) =>
      item.item_name.includes(inputText)
    );

    setSorted(sortedArray);
    setSorted(filteredArray);

    // filterの有無判定
    filterOnOff();
  }, [deadline, filteredItem, filteredArea, inputText, items, userArea]);

  const [isClicked, setIsClicked] = useState(false);
  const rotationClass = () => {
    setIsClicked(true);
  };
  useEffect(() => {
    if (isClicked) {
      playAudio();
      setTimeout(() => {
        setIsClicked(false);
      }, 1000);
    }
  }, [isClicked]);

  // music===================
  const audioRef = useRef(null);
  const playAudio = () => {
    audioRef.current.play();
  };
  const pauseAudio = () => {
    audioRef.current.pause();
  };
  const resetAudio = () => {
    audioRef.current.currentTime = 0;
  };

  return (
    <>
      <div className="list-search_boxes">
        <div className="list-search-box">
          {/* <div className="list-searchIconBlock">
            <AiOutlineSearch className="list-searchIcon" />
          </div> */}
          <input
            type="text"
            value={inputText}
            onChange={handleInputText}
            placeholder="商品ワード検索"
            className="list-searchTextBox"
          />
          <div className="list-filterIconBlock">
            {!filterStatus ? (
              <VscFilter
                className="list-filterIcon"
                onClick={() => setModalVisible(true)}
              />
            ) : (
              <VscFilterFilled
                className="list-filterIcon"
                onClick={() => setModalVisible(true)}
              />
            )}
          </div>
          <button className="list-userhome" onClick={(e) => handleMyarea(e)}>
            自分の寮
          </button>
        </div>

        {/* エリアソート */}
      </div>
      <div className="list-mainBrock-list">
        <div className="list-updateBlock">
          <span className="list-exhibitList-span">出品一覧</span>
          <audio ref={audioRef}>
            <source src="music/updata.mp3" type="audio/mp3" />
          </audio>
          <GrUpdate
            className={
              !isClicked ? "list-updateIcon" : "list-updateIcon rotation"
            }
            onClick={(e) => {
              setUpDataFlag(true);
              rotationClass(e);
            }}
          />
        </div>
        {/* フリーキーワード検索ボタン */}
        <div>
          <ul className="list-image-list">
            {sorted.length !== 0 ? (
              sorted.map((item) => (
                <li key={`list_${item.id}`} className="image-item">
                  <div className="list-image-box">
                    <img
                      className="list-image"
                      id={item.id}
                      src={item.item_img[0]}
                      alt={item.item_name}
                      onClick={(e) => {
                        clickImg(e);
                        setSelectFlag("card");
                        setBeforeFlag("list");
                      }}
                    />
                    <p className="list-item-p">{item.item_name}</p>
                  </div>
                </li>
              ))
            ) : (
              <li key="empty" className="list-error-message">
                検索結果がありません。
              </li>
            )}
          </ul>
        </div>
      </div>

      <div
        className="list-addIconBrock"
        onClick={() => {
          setBeforeFlag("list");
          setSelectFlag("post");
        }}
      >
        <AiOutlinePlus className="list-addIcon" />
      </div>

      {modalVisible && (
        <Modal
          handleFilterArea={handleFilterArea}
          handleFilter={handleFilter}
          handleSort={handleSort}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalAreaSort={modalAreaSort}
          setModalAreaSort={setModalAreaSort}
          modalItemFilter={modalItemFilter}
          setModalItemFilter={setModalItemFilter}
          modalItemSort={modalItemSort}
          setModalItemSort={setModalItemSort}
          selectFlag={selectFlag}
        />
      )}
    </>
  );
}

export default List;

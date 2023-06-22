import React, { useState } from "react";
import "./style/list.css";
// import { FaUserCircle } from "react-icons/fa";
// import { MdClose } from "react-icons/md";
const itemList = [
  {
    id: "1",
    photo: "./photo/41jKcetq9eL._AC_UL400_.jpg",
    name: "冷蔵庫",
  },
  {
    id: "2",
    photo: "./photo/51DlWwrJEqL._AC_UL400_.jpg",
    name: "ホットプレート",
  },
  {
    id: "3",
    photo: "./photo/61ybuhZojcL._AC_UL400_.jpg",
    name: "本棚",
  },
  {
    id: "4",
    photo: "./photo/51ds51DYFzS._AC_UL400_.jpg",
    name: "クッカー",
  },
  {
    id: "5",
    photo: "./photo/51ZVjZGMq0L._AC_UL400_.jpg",
    name: "冷蔵庫",
  },
  {
    id: "6",
    photo: "./photo/61KeckL+pyL._AC_UL450_SR450,320_.jpg",
    name: "プラモデル",
  },
  {
    id: "7",
    photo: "./photo/71A6jjHn13L._AC_UL400_.jpg",
    name: "本棚",
  },
  {
    id: "8",
    photo: "./photo/41jKcetq9eL._AC_UL400_.jpg",
    name: "冷蔵庫",
  },
  {
    id: "9",
    photo: "./photo/51DlWwrJEqL._AC_UL400_.jpg",
    name: "ホットプレート",
  },
  {
    id: "10",
    photo: "./photo/61ybuhZojcL._AC_UL400_.jpg",
    name: "本棚",
  },
  {
    id: "11",
    photo: "./photo/51ds51DYFzS._AC_UL400_.jpg",
    name: "クッカー",
  },
  {
    id: "12",
    photo: "./photo/51ZVjZGMq0L._AC_UL400_.jpg",
    name: "冷蔵庫",
  },
  {
    id: "13",
    photo: "./photo/61KeckL+pyL._AC_UL450_SR450,320_.jpg",
    name: "プラモデル",
  },
  {
    id: "14",
    photo: "./photo/71A6jjHn13L._AC_UL400_.jpg",
    name: "本棚",
  },
  {
    id: "15",
    photo: "./photo/41jKcetq9eL._AC_UL400_.jpg",
    name: "冷蔵庫",
  },
  {
    id: "16",
    photo: "./photo/51DlWwrJEqL._AC_UL400_.jpg",
    name: "ホットプレート",
  },
  {
    id: "17",
    photo: "./photo/61ybuhZojcL._AC_UL400_.jpg",
    name: "本棚",
  },
  {
    id: "18",
    photo: "./photo/51ds51DYFzS._AC_UL400_.jpg",
    name: "クッカー",
  },
  {
    id: "19",
    photo: "./photo/51ZVjZGMq0L._AC_UL400_.jpg",
    name: "冷蔵庫",
  },
  {
    id: "20",
    photo: "./photo/61KeckL+pyL._AC_UL450_SR450,320_.jpg",
    name: "プラモデル",
  },
  {
    id: "21",
    photo: "./photo/71A6jjHn13L._AC_UL400_.jpg",
    name: "本棚",
  },
];

function List(props) {
  const { setSelectFlag } = props;
  // const [itemList, setItemList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // useEffect(() => {
  //   fetch("https://")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setItemList(data);
  //     })
  //     .catch((error) => {
  //       console.log("データの取得に失敗しました", error);
  //     });
  // }, []);

  // const handleImageClick = () => {
  //   setSelectFlag(true);
  //   console.log("クリックさたました");
  // };

  return (
    <div className="mainBrock-list">
      <ul className="image-list">
        {itemList.map((item) => (
          <li key={item.id} className="image-item">
            <div
              role="button"
              onClick={() => {
                setSelectFlag("card");
                console.log("クリックされますた");
              }}
              className="image-box"
              // tabIndex={0}
            >
              <img src={item.photo} alt={item.name} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;

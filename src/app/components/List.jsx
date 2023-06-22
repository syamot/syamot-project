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
];

function List() {
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

  const handleImageClick = (image) => {
    // setSelectedImage(image);
    console.log("クリックさたました");
  };

  // const handleCloseDialog = () => {
  //   setSelectedImage(null);
  // };

  return (
    <div className="list-container">
      <ul className="image-list">
        {itemList.map((item) => (
          <li key={item.id} className="image-item">
            <div
              role="button"
              onClick={() => handleImageClick(item.photo)}
              className="image-box"
              // tabIndex={0}
            >
              <img src={item.photo} alt={item.name} />
            </div>
          </li>
        ))}
      </ul>

      {/* {selectedImage && (
        <div className="image-dialog" onClick={handleCloseDialog}>
          <div className="contents">
            <img src={selectedImage} alt="Selected Image" width="100%" />
          </div>
        </div>
      )} */}
    </div>
  );
}

export default List;

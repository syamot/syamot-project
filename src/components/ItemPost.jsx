import React, { useEffect, useState } from "react";
import "./style/post.css";

let imagePathArr;
const ItemPost = (props) => {
  const { setSelectFlag, URL } = props;
  const [imgPathArr, setImgPathArr] = useState([]);
  const [itemObj, setItemObj] = useState({
    item_name: "",
    item_category: "家電",
    item_explanation: "",
    item_status: "出品中",
    item_condition: "",
    item_num: 0,
    item_weight: 0,
    item_size_vertical: 0,
    item_size_width: 0,
    item_size_height: 0,
    item_deadline: "",
    item_img: "[]",
    item_seller: 1,
  });
  // const [userData, setUserData] = useState([]);
  useEffect(() => {
    const userName = localStorage.getItem("user");
    (async () => {
      console.log(URL + "/user/" + userName);
      const data = await fetch(URL + "/user/" + userName);
      const jsonData = await data.json();
      // setUserData(jsonData);
      setItemObj({ ...itemObj, item_seller: Number(jsonData[0].id) });
    })();
  }, []);

  useEffect(() => {
    console.log(itemObj);
  }, [itemObj]);

  const resetImg = () => {
    setImgPathArr([]);
  };

  const setImg = (e) => {
    imagePathArr = [];
    for (let i = 0; i < e.target.files.length; i++) {
      setImgPathArr((cur) => [
        ...cur,
        window.URL.createObjectURL(e.target.files[i]),
      ]);
      imagePathArr.push(e.target.files[i]);
    }
  };

  const handleChange = (e, tag) => {
    if (tag === "家電" || tag === "家具" || tag === "工具") {
      tag = "item_category";
    } else if (
      tag === "新品、未使用" ||
      tag === "未使用に近い" ||
      tag === "目立った傷や汚れなし" ||
      tag === "やや傷や汚れあり" ||
      tag === "傷や汚れあり" ||
      tag === "全体的に状態が悪い"
    ) {
      tag = "item_condition";
    }
    let inputValue;
    if (
      tag === "item_num" ||
      tag === "item_seller" ||
      tag === "item_size_height" ||
      tag === "item_size_vertical" ||
      tag === "item_size_width" ||
      tag === "item_weight"
    ) {
      inputValue = Number(e.target.value);
    } else {
      inputValue = e.target.value;
    }
    setItemObj({ ...itemObj, [tag]: inputValue });
  };

  const handleClick = async () => {
    let postImageNum = 0;
    const postImagePath = [];
    const fetchPostImage = async () => {
      const file = imagePathArr[postImageNum];

      if (file === undefined || postImageNum > 3) return;
      const formData = new FormData();
      formData.append("file", file);

      const responseFileName = await fetch(URL + "/upload", {
        method: "POST",
        // headers: {
        //   "Content-Type": "image/jpeg",
        // },
        body: formData,
      })
        .then((response) => response.json())

        .catch((e) => {
          console.error(e);
        });
      console.log("responseFileName", responseFileName);
      postImagePath.push(responseFileName.fileUrl);
      postImageNum++;
    };
    await fetchPostImage();
    await fetchPostImage();
    await fetchPostImage();

    // const setImageJSON = async () => {
    //   console.log("postImagePath", postImagePath);
    //   const postImagePathJSON = JSON.stringify(postImagePath);
    //   setItemObj({ ...itemObj, item_img: postImagePathJSON });
    // };

    const changeStatus = async () => {
      const testObj = itemObj;
      testObj.item_img = JSON.stringify(postImagePath);
      console.log("itemObj", testObj);
      try {
        await fetch(URL + "/addItems", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(testObj),
        });
      } catch (error) {
        console.log(error);
      }
    };
    await changeStatus();
    // await changeStatus();
    setSelectFlag("list");
  };

  // const setImgaaaaa = async (e) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   await fetch("http://localhost:8000/upload", {
  //     method: "POST",
  //     // headers: {
  //     //   "Content-Type": "image/jpeg",
  //     // },
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch((e) => {
  //       console.error(e);
  //     });

  return (
    <>
      <div className="post-box">
        <div className="post-box-piece">
          <p>商品画像</p>
          <input
            type="file"
            accept="image/*"
            onClick={() => resetImg()}
            onChange={(e) => setImg(e)}
            multiple
          ></input>
          <div className="post-inner-item">
            {imgPathArr.map((elem, index) => {
              return (
                <div key={index} className="post-image-box">
                  <img key={index} src={elem} alt="商品画像" />
                </div>
              );
            })}
          </div>
        </div>
        <h4>商品の詳細</h4>
        <div className="post-box-piece-side">
          <p>カテゴリー</p>
          <select onChange={(e) => handleChange(e, "item_category")}>
            <option value="家電">家電</option>
            <option value="家具">家具</option>
            <option value="工具">工具</option>
          </select>
        </div>

        <div className="post-box-piece-side">
          <p>商品の状態</p>
          <select onChange={(e) => handleChange(e, "item_condition")}>
            <option value="新品、未使用">新品、未使用</option>
            <option value="未使用に近い">未使用に近い</option>
            <option value="目立った傷や汚れなし">目立った傷や汚れなし</option>
            <option value="やや傷や汚れあり">やや傷や汚れあり</option>
            <option value="傷や汚れあり">傷や汚れあり</option>
            <option value="全体的に状態が悪い">全体的に状態が悪い</option>
          </select>
        </div>

        <h4>商品名と説明</h4>
        <div className="post-box-piece">
          <p>商品名</p>
          <input
            type="text"
            onChange={(e) => handleChange(e, "item_name")}
            placeholder="40文字まで"
          ></input>
        </div>
        <div className="post-box-piece">
          <p>商品の説明</p>
          <textarea
            onChange={(e) => handleChange(e, "item_explanation")}
            placeholder="色、素材、重さ、定価、注意点など"
            className="post-description-item"
          ></textarea>
        </div>
        <div className="post-box-piece-side">
          <p>数量</p>
          <input
            type="number"
            onChange={(e) => handleChange(e, "item_num")}
            step="1"
            min="0"
            max="100"
          ></input>
        </div>
        <div className="post-box-piece-side">
          <p>重量</p>
          <div className="post-inner-item">
            <input
              type="number"
              onChange={(e) => handleChange(e, "item_weight")}
              placeholder="0.5"
              step="0.5"
              min="0"
              max="100"
            ></input>
            <p>Kg</p>
          </div>
        </div>
        <div className="post-box-piece-side">
          <p>サイズ</p>
          <div className="post-inner-item">
            <input
              type="number"
              onChange={(e) => handleChange(e, "item_size_vertical")}
              placeholder="縦"
              step="100"
              min="0"
              max="2000"
            ></input>
            <p>mm</p>
            <input
              type="number"
              onChange={(e) => handleChange(e, "item_size_width")}
              placeholder="横"
              step="100"
              min="0"
              max="2000"
            ></input>
            <p>mm</p>
            <input
              type="number"
              placeholder="高さ"
              onChange={(e) => handleChange(e, "item_size_height")}
              step="100"
              min="0"
              max="2000"
            ></input>
            <p>mm</p>
          </div>
        </div>
        <div className="post-box-piece-side">
          <p>出品者</p>
          <input
            type="text"
            // onChange={(e) => handleChange(e, "item_seller")}
            placeholder=""
          ></input>
        </div>
        <div className="post-box-piece-side">
          <p>出品期限</p>
          <input
            type="date"
            onChange={(e) => handleChange(e, "item_deadline")}
            id="start"
            name="trip-start"
            min="2023-06-23"
          />
        </div>
        <button onClick={() => handleClick()}>出品</button>
      </div>
    </>
  );
};

export default ItemPost;

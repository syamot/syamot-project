import React, { useEffect, useState } from "react";
import "./style/post.css";
import { Loading } from "./Loading";

//###########################################################################
// import "react-dropzone-uploader/dist/styles.css";
// import Dropzone from "react-dropzone-uploader";

//###########################################################################

let imagePathArr = [];
const ItemPost = (props) => {
  const { setSelectFlag, URL } = props;
  // const [imgPathArr, setImgPathArr] = useState([]);
  const [itemObj, setItemObj] = useState({
    item_name: "",
    item_category: "家電",
    item_explanation: "", //備考欄
    item_status: "在庫あり", //在庫
    item_num: 1,
    item_deadline: "", //期限
    item_img: "[]",
    item_seller: 1,
    // フラグはサーバー側で追加している
  });
  // アップロード時のローディング画面
  const [load, setLoad] = useState(false);

  // item_seller情報を書き換え
  useEffect(() => {
    const userName = localStorage.getItem("user");
    (async () => {
      const data = await fetch(URL + "/user/" + userName);
      const jsonData = await data.json();
      // setUserData(jsonData);
      setItemObj({ ...itemObj, item_seller: Number(jsonData[0].id) });
    })();
    //s３への送信ファイルは空にする
    imagePathArr = [];
  }, []);

  // 坂本さん処理＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
  // const resetImg = () => {
  //   setImgPathArr([]);
  // };

  // const setImg = (e) => {
  //   imagePathArr = [];
  //   for (let i = 0; i < e.target.files.length; i++) {
  //     setImgPathArr((cur) => [
  //       ...cur,
  //       window.URL.createObjectURL(e.target.files[i]),
  //     ]);
  //     imagePathArr.push(e.target.files[i]);
  //   }
  // };
  // useEffect(() => {
  //   console.log(imgPathArr);
  // }, [imgPathArr]);
  // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

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
    if (tag === "item_num" || tag === "item_seller") {
      inputValue = Number(e.target.value);
    } else {
      inputValue = e.target.value;
    }
    setItemObj({ ...itemObj, [tag]: inputValue });
  };

  const handleClick = async () => {
    // load有効化
    setLoad(true);
    const postImagePath = [];
    const fetchPostImage = async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(URL + "/upload", {
          method: "POST",
          body: formData,
        });
        const responseFileName = await response.json();
        console.log("responseFileName.fileUrl===", responseFileName.fileUrl);
        postImagePath.push(responseFileName.fileUrl);
      } catch (e) {
        console.error(e);
      }
    };

    const imageUploadPromises = imagePathArr.map((file) =>
      fetchPostImage(file)
    );

    try {
      await Promise.all(imageUploadPromises);
    } catch (error) {
      console.log(error);
    }
    // =========================================================
    const changeStatus = async () => {
      const testObj = itemObj;
      testObj.item_img = JSON.stringify(postImagePath);
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
    setSelectFlag("list");
  };

  //###########################################################################

  const [images, setImages] = useState([]);
  useEffect(() => {
    console.log("選んだファイル", images);
    console.log("S3にあげるファイル", imagePathArr);
  }, [images]);

  // 初回アップロード
  const handleImageUpload = (event) => {
    if (event.target.files.length > 8) {
      return window.alert(
        "アップロード上限を超えています。\n写真は8枚までアップロード可能です"
      );
    } else if (imagePathArr.length > 7) {
      return window.alert(
        "アップロード上限を超えています。\n写真は8枚までアップロード可能です"
      );
    }
    for (let i = 0; i < event.target.files.length; i++) {
      setImages((cur) => [
        ...cur,
        window.URL.createObjectURL(event.target.files[i]),
      ]);
      imagePathArr.push(event.target.files[i]);
    }
  };
  // 写真削除処理
  const handleImageRemove = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    imagePathArr.splice(index, 1);
    setImages(newImages);
  };
  // 写真再アップ
  const handleImageReupload = (index, event) => {
    const newImages = [...images];
    newImages[index] = window.URL.createObjectURL(event.target.files[0]);
    setImages(newImages);
    imagePathArr[index] = event.target.files[0];
  };

  const inputClick = (e) => {
    e.target.nextElementSibling.click();
  };

  //###########################################################################


  return (
    <>
      {load ? <Loading /> : null}
      <div className="post-box">
        <div className="post-box-piece">
          <h4>商品画像</h4>
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleImageUpload(e)}
            />
            <div className="img_block">
              {images.length !== 0 &&
                images.map((image, index) => (
                  <div key={index} className="img_block2">
                    <img
                      src={image}
                      alt={`Preview ${index}`}
                      style={{ width: "100px", height: "100px" }}
                      className="img"
                      onClick={(e) => inputClick(e)}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleImageReupload(index, event)}
                      className="img_input"
                    />
                    <button
                      onClick={() => handleImageRemove(index)}
                      className="img_remove"
                    >
                      Remove
                    </button>
                  </div>
                ))}
            </div>
          </div>
          {/* 坂本ver */}
          {/* <input
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
          </div> */}
        </div>
        <h4>商品概要</h4>
        <div className="post-box-piece-side">
          <p>カテゴリー※</p>
          <select onChange={(e) => handleChange(e, "item_category")}>
            <option value="家電">家電</option>
            <option value="家具">家具</option>
            <option value="工具">工具</option>
          </select>
        </div>
        <div className="post-box-piece">
          <p>商品名※</p>
          <input
            type="text"
            onChange={(e) => handleChange(e, "item_name")}
            placeholder="40文字まで"
          ></input>
        </div>

        <h4>商品詳細</h4>
        <div className="post-box-piece-side">
          <p>商品の状態※</p>
          <select onChange={(e) => handleChange(e, "item_condition")}>
            <option value="新品、未使用">新品、未使用</option>
            <option value="未使用に近い">未使用に近い</option>
            <option value="目立った傷や汚れなし">目立った傷や汚れなし</option>
            <option value="やや傷や汚れあり">やや傷や汚れあり</option>
            <option value="傷や汚れあり">傷や汚れあり</option>
            <option value="全体的に状態が悪い">全体的に状態が悪い</option>
          </select>
        </div>
        <div className="post-box-piece-side">
          <p>出品期限※</p>
          <input
            type="date"
            onChange={(e) => handleChange(e, "item_deadline")}
            id="start"
            name="trip-start"
            min="2023-06-23"
          />
        </div>
        <div className="post-box-piece-side">
          <p>数量※</p>
          <input
            type="number"
            onChange={(e) => handleChange(e, "item_num")}
            step="1"
            min="1"
            max="100"
            value="1"
          ></input>
        </div>
        <div className="post-box-piece">
          <p>備考欄</p>
          <textarea
            onChange={(e) => handleChange(e, "item_explanation")}
            placeholder="注意点など"
            className="post-description-item"
          ></textarea>
        </div>
        <button onClick={() => handleClick()}>出品</button>
      </div>
    </>
  );
};

export default ItemPost;

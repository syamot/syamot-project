import React, { useEffect, useState } from "react";
import "./style/post.css";

// ・・・・・・・・・・・・・・・・
import { useDropzone } from "react-dropzone";
// ・・・・・・・・・・・・・・・・

let imagePathArr;
const ItemPost = (props) => {
  const { setSelectFlag, URL } = props;
  const [imgPathArr, setImgPathArr] = useState([]);
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
  // const [userData, setUserData] = useState([]);

  // item_seller情報を書き換え
  useEffect(() => {
    const userName = localStorage.getItem("user");
    (async () => {
      const data = await fetch(URL + "/user/" + userName);
      const jsonData = await data.json();
      // setUserData(jsonData);
      setItemObj({ ...itemObj, item_seller: Number(jsonData[0].id) });
    })();
  }, []);

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
    if (tag === "item_num" || tag === "item_seller") {
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

  //追加＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃

  const [uploadedImages, setUploadedImages] = useState([]);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "image/*",
    maxFiles: 8,
    onDrop: (acceptedFiles) => {
      setUploadedImages((prevImages) => [...prevImages, ...acceptedFiles]);
    },
  });

  const deleteImage = (index) => {
    setUploadedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  //追加＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃

  return (
    <>
      {/* ここに追加したい */}
      {/* 画像のアップロード部分 */}
      <div>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>画像をドラッグ＆ドロップまたはクリックして選択してください。</p>
          <button type="button" onClick={open}>
            画像を選択
          </button>
        </div>

        <div className="image-preview">
          {uploadedImages.map((file, index) => (
            <div key={index}>
              <img
                src={URL.createObjectURL(file)}
                alt={`Uploaded Image ${index}`}
              />
              <button type="button" onClick={() => deleteImage(index)}>
                削除
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* その他のコンポーネントの描画部分 */}

      {/* ここに追加したい */}

      <div className="post-box">
        <div className="post-box-piece">
          <h4>商品画像</h4>

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
        <button type="submit" onClick={() => handleClick()}>
          出品
        </button>
      </div>
      {/* </form> */}
    </>
  );
};

export default ItemPost;

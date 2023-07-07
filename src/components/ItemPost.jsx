import React, { useEffect, useState } from "react";
import "./style/post.css";
import { Loading } from "./Loading";
import { AiFillFolderAdd } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { FaRegPaperPlane } from "react-icons/fa";

// S3アップロード用配列
let imagePathArr = [];
const ItemPost = (props) => {
  const {
    setSelectFlag,
    URL,
    beforeFlag,
    setBeforeFlag,
    editItem,
    setItems,
    setConfetFlag,
  } = props;
  // const [imgPathArr, setImgPathArr] = useState([]);
  const [itemObj, setItemObj] = useState({});
  // アップロード時のローディング画面
  const [load, setLoad] = useState(false);
  // itemObjの変更処理（入力エリアのonChange）
  const handleChange = (e, tag) => {
    if (tag === "家電" || tag === "家具" || tag === "工具") {
      tag = "item_category";
    }
    let inputValue;
    if (tag === "item_num" || tag === "item_seller") {
      inputValue = Number(e.target.value);
    } else if (tag === "item_deadline") {
      inputValue = e.target.value.split("T")[0];
      const date = new Date(inputValue);
      date.setDate(date.getDate() + 1);
      const updatedDate = date.toISOString().split("T")[0];
      setSelectItemDead(inputValue);
      inputValue = updatedDate;
    } else {
      inputValue = e.target.value;
    }
    setItemObj({ ...itemObj, [tag]: inputValue });
  };

  const handleClick = async () => {
    setConfetFlag("post");
    // S3へアップした画像のURLを入れる配列
    const postImagePath = [];
    let uploadFlag = false;
    // もしS3にあげる画像が0じゃなければS3へアップロード
    // ========================================================
    if (imagePathArr.length !== 0) {
      // eslint-disable-next-line no-unused-vars
      uploadFlag = true;
      // load有効化
      setLoad(true);
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
    }
    // =========================================================
    const testObj = itemObj;
    const changeStatus = async () => {
      console.log("beforeFlag===", beforeFlag);
      // S3のURLがなければ全て追加する
      if (testObj.item_img.length === 0) {
        testObj.item_img = JSON.stringify(postImagePath);
        console.log("postアップロードデータ==========", testObj.item_img);

        // 編集処理の場合はlengthが0じゃないけどupする可能性がある
      } else if (uploadFlag === true && testObj.item_img.length !== 0) {
        // 差し替えるためのコード！！
        const replaceImg = images.filter((el) => !el.includes("blob:"));
        testObj.item_img = [...replaceImg, ...postImagePath];
        console.log("putアップロードデータ==========", testObj.item_img);
        console.log("putアップロードデータ==========", testObj.item_img.length);

        // 写真を減らす処理
      } else {
        console.log("何にも！==========", testObj.item_img);
        testObj.item_img = [...images];
      }

      try {
        // 新規登録なら
        if (beforeFlag !== "card") {
          await fetch(URL + "/addItems", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(testObj),
          });
          // 更新処理なら
        } else if (beforeFlag === "card") {
          await fetch(URL + "/editItems", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(testObj),
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    await changeStatus();
    // 前ページのフラグをもどす
    setBeforeFlag("");
    setSelectFlag("list");
    console.log("testObj======", testObj);
  };

  //###########################################################################

  const [images, setImages] = useState([]);
  useEffect(() => {
    console.log("選んだファイル(images)", images);
    console.log("S3にあげるファイル", imagePathArr);
  }, [images]);

  //　出品/編集処理の初期処理 ===================================================
  useEffect(() => {
    const userName = localStorage.getItem("user");

    const fetchUser = async () => {
      const data = await fetch(URL + "/user/" + userName);
      const jsonData = await data.json();
      return jsonData[0].id;
    };

    const getUser = async () => {
      const user = await fetchUser();

      if (beforeFlag === "card") {
        console.log("editItem========", editItem);
        const date = new Date(editItem.item_deadline);
        date.setDate(date.getDate() + 1);
        const updatedDate = date.toISOString().split("T")[0];
        // 表示用写真配列処理
        setImages([...editItem.item_img]);
        setItemObj({
          id: editItem.id,
          item_name: editItem.item_name,
          item_category: editItem.item_category,
          item_explanation: editItem.item_explanation, //備考欄
          item_status: editItem.item_status, //在庫
          item_num: editItem.item_num,
          item_deadline: updatedDate, //期限
          item_img: editItem.item_img,
          item_seller: editItem.item_seller,
          // フラグはサーバー側で追加している
        });
        // 商品カテゴリーのセレクト初期値
        setSelectCategory(editItem.item_category);
        // 商品名のテキストボックス初期値
        setSelectItemName(editItem.item_name);
        //商品ステータスのテキストボックス初期値
        // setSelectStatus(editItem.item_status);
        // 商品期限のカレンダー
        const formattedDate = new Date(editItem.item_deadline)
          .toISOString()
          .split("T")[0];
        setSelectItemDead(formattedDate);
        console.log("date=====", formattedDate);
        // setSelectItemDead(new Date(editItem.item_deadline.split("T")[0]));
        // 商品数のテキストボックス
        setSelectItemNum(editItem.item_num);
        // 商品数のテキストボックス
        setSelectItemExplanation(editItem.item_explanation);
      } else {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        const updatedDate = date.toISOString().split("T")[0];

        setItemObj({
          // post or put用　初期設定
          id: "",
          item_name: "",
          item_category: "家電",
          item_explanation: "", //備考欄
          item_status: "在庫あり", //在庫
          item_num: 1,
          item_deadline: updatedDate, //期限
          item_img: [],
          item_seller: Number(user),
        });
      }
      // s３への送信ファイルは空にする
      imagePathArr = [];
    };
    getUser();
  }, []);

  useEffect(() => {
    console.log("itemObj======", itemObj);
  }, [itemObj]);

  const [selectCategory, setSelectCategory] = useState("家電");
  const [selectItemName, setSelectItemName] = useState("");
  // const [selectStatus, setSelectStatus] = useState("新品、未使用");
  const [selectItemDead, setSelectItemDead] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectItemNum, setSelectItemNum] = useState(1);
  const [selectItemExplanation, setSelectItemExplanation] = useState("");

  // 削除ボタン処理
  const itemDelete = async () => {
    try {
      const response = await fetch(`${URL}/items/${editItem.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const res = await response.text();
        console.log(res);
        setSelectFlag("list");
      } else {
        console.error("削除に失敗しました");
      }
    } catch (error) {
      console.error(error);
    }

    const getAllItems = async () => {
      const resItemData = await fetch(`${URL}/itemAllData`);
      const itemData = await resItemData.json();
      return itemData;
    };
    let itemData = await getAllItems();
    setItems(itemData);
  };

  // =====================================================================
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
    if (imagePathArr.length !== 0) {
      imagePathArr[index] = event.target.files[0];
    } else {
      imagePathArr.push(event.target.files[0]);
    }
  };

  const inputClick = (e) => {
    e.target.nextElementSibling.click();
  };

  //###########################################################################

  // post-fileAddIcon 処理
  const postItemBtn = (e) => {
    if (e.target.tagName === "path") {
      e.target.closest("svg").previousElementSibling.click();
    } else {
      e.target.previousElementSibling.click();
    }
  };

  const back = () => {
    if (beforeFlag === "card") {
      console.log(beforeFlag);
      setSelectFlag("card");
    } else {
      console.log(beforeFlag);
      setSelectFlag("list");
    }
  };

  return (
    <>
      {load ? <Loading /> : null}
      <div className="post-box">
        <div className="post-History-piece">
          <IoIosArrowBack
            className="post-History-navi-icon"
            onClick={() => back()}
          />
          <div className="post-History-title-box">
            <h2 className="post-History-title">
              商品{beforeFlag === "card" ? "編集" : "投稿"}
            </h2>
            {beforeFlag === "card" ? (
              <FaRegPaperPlane className="post-titleIcon" />
            ) : (
              <FaRegPaperPlane className="post-titleIcon" />
            )}
          </div>
          <div className="post-History-position-adjustment"></div>
        </div>
        <div className="post-box-piece-img">
          <h4 className="post-h4">商品画像</h4>
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleImageUpload(e)}
              className="post-itemPostBtn"
            />
            <AiFillFolderAdd
              className="post-fileAddIcon"
              onClick={(e) => postItemBtn(e)}
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
                    {/* <button
                      onClick={() => handleImageRemove(index)}
                      className="post-img_remove"
                    >
                      Remove
                    </button> */}
                    <div
                      className="post-closeBtnBlock"
                      onClick={() => handleImageRemove(index)}
                    >
                      <IoMdClose className="post-closeBtn" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <h4 className="post-h4">商品概要</h4>
        <div className="post-box-piece">
          <p className="post-P">カテゴリー※</p>
          <div className="post-selectbox">
            <select
              defaultValue={selectCategory}
              onChange={(e) => {
                handleChange(e, "item_category");
              }}
            >
              <option value="家電">家電</option>
              <option value="家具">家具</option>
              <option value="工具">工具</option>
            </select>
          </div>
        </div>
        <div className="post-box-piece">
          <p className="post-P">商品名※</p>
          <input
            className="post-merchandise"
            type="text"
            onChange={(e) => {
              handleChange(e, "item_name");
            }}
            placeholder="40文字まで"
            defaultValue={selectItemName}
          ></input>
        </div>

        <h4 className="post-h4">商品詳細</h4>
        {/* <div className="post-box-piece">
          <p>商品の状態※</p>
          <select
            defaultValue={selectStatus}
            onChange={(e) => {
              handleChange(e, "item_condition");
            }}
          >
            <option value="新品、未使用">新品、未使用</option>
            <option value="未使用に近い">未使用に近い</option>
            <option value="目立った傷や汚れなし">目立った傷や汚れなし</option>
            <option value="やや傷や汚れあり">やや傷や汚れあり</option>
            <option value="傷や汚れあり">傷や汚れあり</option>
            <option value="全体的に状態が悪い">全体的に状態が悪い</option>
          </select>
        </div> */}
        <div className="post-box-piece">
          <p className="post-P">出品期限※</p>
          <input
            className="post-deadline"
            type="date"
            value={selectItemDead}
            onChange={(e) => handleChange(e, "item_deadline")}
            id="start"
            name="trip-start"
            min="2023-06-23"
          />
        </div>
        <div className="post-box-piece">
          <p className="post-P">数量※</p>
          <input
            type="number"
            className="post-num"
            onChange={(e) => handleChange(e, "item_num")}
            step="1"
            min="1"
            max="100"
            defaultValue={selectItemNum}
            placeholder="半角数字"
          ></input>
        </div>
        <div className="post-box-piece">
          <p className="post-P">備考欄</p>
          <textarea
            onChange={(e) => handleChange(e, "item_explanation")}
            placeholder="注意点など"
            className="post-description-item"
            defaultValue={selectItemExplanation}
          ></textarea>
        </div>
        {beforeFlag === "card" ? (
          <div className="btnBlock">
            <button className="post-updateBtn" onClick={() => handleClick()}>
              更新
            </button>
            <button className="post-deleteBtn" onClick={() => itemDelete()}>
              削除
            </button>
          </div>
        ) : (
          <div className="buyBtnBlock">
            <button className="post-button" onClick={() => handleClick()}>
              出品
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ItemPost;

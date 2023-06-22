"use client";
import { FaUserCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import postStyle from "./style.css";

export default function Entry() {
  function sliceMaxLength(elem, maxLength) {
    console.log("インプットされました");
    console.log(elem.target.value);
    console.log(typeof elem.target.value);
    elem.target.value = elem.target.value.slice(0, maxLength);
  }
  return (
    <div className="post-box">
      <h2>ユーザー登録</h2>

      <div className="post-box-piece">
        <p>従業員コード</p>
        <input type="number" onInput={(e) => sliceMaxLength(e, 7)} />
      </div>
      <div className="post-box-piece">
        <p>tmcメールアドレス</p>
        <div className="post-inner-item">
          <input type="email" />
          <select>
            <option value="commodity-condition1">@mail.toyota.co.jp</option>
          </select>
        </div>
      </div>
      <div className="post-box-piece">
        <p>私用メールアドレス</p>
        <input type="email" />
      </div>
      <div className="post-box-piece">
        <p>住所</p>
        <input type="number" />
      </div>
      <div className="post-box-piece">
        <p>寮エリア</p>
        <input type="number" />
      </div>
    </div>
  );
}

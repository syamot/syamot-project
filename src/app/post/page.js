"use client";
import { FaUserCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import postStyle from "./style.css";

export default function Post() {
  return (
    <div className="post-box">
      <div>
        <FaUserCircle />
        <MdClose />
      </div>
      <div className="post-box-piece">
        <p>商品画像</p>
        <input type="file" accept="image/*" multiple></input>
      </div>
      <h4>商品の詳細</h4>
      <div className="post-box-piece-side">
        <p>カテゴリー</p>
        <select>
          <option value="home-appliance">家電</option>
          <option value="furniture">家具</option>
          <option value="tool">工具</option>
        </select>
      </div>

      <div className="post-box-piece-side">
        <p>商品の状態</p>
        <select>
          <option value="commodity-condition1">新品、未使用</option>
          <option value="commodity-condition2">未使用に近い</option>
          <option value="commodity-condition3">目立った傷や汚れなし</option>
          <option value="commodity-condition4">やや傷や汚れあり</option>
          <option value="commodity-condition5">傷や汚れあり</option>
          <option value="commodity-condition6">全体的に状態が悪い</option>
        </select>
      </div>

      <h4>商品名と説明</h4>
      <div className="post-box-piece">
        <p>商品名</p>
        <input type="text" placeholder="40文字まで"></input>
      </div>
      <div className="post-box-piece">
        <p>商品の説明</p>
        <textarea
          placeholder="色、素材、重さ、定価、注意点など"
          className="post-description-item"
        ></textarea>
      </div>
      <div className="post-box-piece-side">
        <p>数量</p>
        <input type="number" step="1" min="0" max="100"></input>
      </div>
      <div className="post-box-piece-side">
        <p>重量</p>
        <div className="post-inner-item">
          <input
            type="number"
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
            placeholder="縦"
            step="100"
            min="0"
            max="2000"
          ></input>
          <p>mm</p>
          <input
            type="number"
            placeholder="横"
            step="100"
            min="0"
            max="2000"
          ></input>
          <p>mm</p>
          <input
            type="number"
            placeholder="高さ"
            step="100"
            min="0"
            max="2000"
          ></input>
          <p>mm</p>
        </div>
      </div>
      <div className="post-box-piece-side">
        <p>出品者</p>
        <input type="text" placeholder="ここは自動で入れたいな"></input>
      </div>
      <button>出品</button>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "./style/post.css";
const imgPath = [
  "./photo/41jKcetq9eL._AC_UL400_.jpg",
  "./photo/51DlWwrJEqL._AC_UL400_.jpg",
  "./photo/51ds51DYFzS._AC_UL400_.jpg",
];

const ItemPost = () => {
  const [imgPathArr, setImgPathArr] = useState([]);

  const resetImg = () => {
    setImgPathArr([]);
  };
  const setImg = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      setImgPathArr((cur) => [
        ...cur,
        window.URL.createObjectURL(e.target.files[i]),
      ]);
    }
  };
  useEffect(() => {
    console.log(imgPathArr);
  }, [imgPathArr]);

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
    </>
  );
};

export default ItemPost;

{
  /* <form action="http://localhost:3000/api/test" method="post">
  <input type="number" name="testText"></input>
  <input type="submit" value="送信"></input>
</form>; */
}

// export default function PageWithJSbasedForm() {
//   // Handles the submit event on form submit.
//   const handleSubmit = async (event) => {
//     // Stop the form from submitting and refreshing the page.
//     event.preventDefault()

//     // Get data from the form.
//     const data = {
//       first: event.target.first.value,
//       last: event.target.last.value,
//     }

//     // Send the data to the server in JSON format.
//     const JSONdata = JSON.stringify(data)

//     // API endpoint where we send form data.
//     const endpoint = '/api/form'

//     // Form the request for sending data to the server.
//     const options = {
//       // The method is POST because we are sending data.
//       method: 'POST',
//       // Tell the server we're sending JSON.
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       // Body of the request is the JSON data we created above.
//       body: JSONdata,
//     }

//     // Send the form data to our forms API on Vercel and get a response.
//     const response = await fetch(endpoint, options)

//     // Get the response data from server as JSON.
//     // If server returns the name submitted, that means the form works.
//     const result = await response.json()
//     alert(`Is this your full name: ${result.data}`)
//   }
//   return (
//     // We pass the event to the handleSubmit() function on submit.
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="first">First Name</label>
//       <input type="text" id="first" name="first" required />

//       <label htmlFor="last">Last Name</label>
//       <input type="text" id="last" name="last" required />

//       <button type="submit">Submit</button>
//     </form>
//   )
// }

import React from "react";
import { sha512 } from "js-sha512";
import "./style/signIn.css";
const SignIn = (props) => {
  const { setSelectFlag, users, setUserData, URL } = props;
  // ログインユーザー名を確認する処理
  function getUserByName(userName) {
    return users.find((user) => user.user_name === userName);
  }

  // 実際のログイン処理
  const login = (e) => {
    let pass = e.target.previousElementSibling;
    let user = pass.previousElementSibling;
    const foundUser = getUserByName(user.value);
    setTimeout(() => {
      if (foundUser) {
        // ユーザーが存在したら、パスワードを比較
        if (sha512(pass.value) === foundUser.password) {
          localStorage.setItem("user", user.value);
          setSelectFlag("list");
          // 成功したらユーザー情報を格納する
          const userName = localStorage.getItem("user");
          (async () => {
            const data = await fetch(URL + "/user/" + userName);
            const jsonData = await data.json();
            setUserData(jsonData[0]);
          })();
        } else {
          console.log("パスワードが違います");
          window.alert("パスワードが違います");
        }
      } else {
        console.log("ユーザーが見つかりませんでした");
        window.alert("ユーザーが見つかりませんでした");
      }
    }, 200);
  };
  return (
    <>
      <div className="loginMainBrock">
        <div className="loginBrock">
          <img
            src="photo/syamotIcon.png"
            alt="syamotIcon"
            className="signUp-syamotIcon"
          />
          <h1 className="loginHead">Syamo-t</h1>
          <input placeholder="ID" type="text" className="user" />
          <input placeholder="パスワード" type="password" className="pass" />
          <button
            className="btn loginBtn"
            onClick={(e) => {
              login(e);
            }}
          >
            Log In
          </button>
          <div className="hrLine">
            <hr className="hrStart" />
            <h5 className="NewAccount">New Syamo-t?</h5>
            <hr className="hrEnd" />
          </div>
          <h5 className="addAccount" onClick={() => setSelectFlag("signUp")}>
            Create account
          </h5>
        </div>
      </div>
    </>
  );
};

export default SignIn;

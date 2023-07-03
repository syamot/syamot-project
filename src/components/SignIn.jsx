import React from "react";
import { sha512 } from "js-sha512";
import "./style/signIn.css";
const SignIn = (props) => {
  const { setSelectFlag, users } = props;
  // ログインユーザー名を確認する処理
  function getUserByName(userName) {
    return users.find((user) => user.user_name === userName);
  }

  // 実際のログイン処理
  const login = (e) => {
    let pass = e.target.previousElementSibling;
    let user = pass.previousElementSibling;
    const foundUser = getUserByName(user.value);
    console.log(foundUser);
    if (foundUser) {
      console.log("ユーザーが見つかりました:", foundUser);
      // ユーザーが存在したら、パスワードを比較
      console.log(
        "パスワード確認結果：",
        sha512(pass.value) === foundUser.password
      );
      if (sha512(pass.value) === foundUser.password) {
        console.log("パスワードが一致しました");
        localStorage.setItem("user", user.value);
        setSelectFlag("list");
      } else {
        console.log("パスワードが違います");
      }
    } else {
      console.log("ユーザーが見つかりませんでした");
    }
  };
  return (
    <>
      <div className="loginMainBrock">
        <div className="loginBrock">
          <h1 className="loginHead">
            <span>シャモティ</span>
          </h1>
          <input placeholder="ID" type="text" className="user" />
          <input placeholder="パスワード" type="password" className="pass" />
          <button className="btn loginBtn" onClick={(e) => login(e)}>
            ログイン
          </button>
          <div className="hrLine">
            <hr className="hrStart" />
            <h6 className="NewAccount">New シャモティ?</h6>
            <hr className="hrEnd" />
          </div>
          <h6 className="addAccount" onClick={() => setSelectFlag("signUp")}>
            アカウント新規作成
          </h6>
        </div>
      </div>
    </>
  );
};

export default SignIn;

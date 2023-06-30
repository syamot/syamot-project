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
        // 成功したらユーザー情報を格納する
        const userName = localStorage.getItem("user");
        (async () => {
          console.log(URL + "/user/" + userName);
          const data = await fetch(URL + "/user/" + userName);
          const jsonData = await data.json();
          setUserData(jsonData[0]);
        })();
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
          <input placeholder="Username" type="text" className="user" />
          <input placeholder="Password" type="password" className="pass" />
          <button className="btn loginBtn" onClick={(e) => login(e)}>
            Log in
          </button>
          <div className="hrLine">
            <hr className="hrStart" />
            <h6 className="NewAccount">New シャモティ?</h6>
            <hr className="hrEnd" />
          </div>
          <h6 className="addAccount" onClick={() => setSelectFlag("signUp")}>
            Add Account
          </h6>
        </div>
      </div>
    </>
  );
};

export default SignIn;

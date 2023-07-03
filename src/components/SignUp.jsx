import React, { useState } from "react";
import { sha512 } from "js-sha512";

const SignUp = (props) => {
  const { setSelectFlag, setAdduser, setMessage } = props;

  const [employeeCode, setEmployeeCode] = useState("");
  const changeCode = (e) => {
    setEmployeeCode(e.target.value);
  };
  const [userName, setUserName] = useState("");
  const changeName = (e) => {
    setUserName(e.target.value);
  };
  const [userPass, setUserPass] = useState("");
  const changePass = (e) => {
    setUserPass(e.target.value);
  };
  const [userTMCmail, setUserTMCmail] = useState("");
  const changeTMCmail = (e) => {
    setUserTMCmail(e.target.value);
  };
  const [userPrivatEmail, setUserPrivatEmail] = useState("");
  const changePrivatemail = (e) => {
    setUserPrivatEmail(e.target.value);
  };
  const [location, setLocation] = useState("");
  const changeLocation = (e) => {
    setLocation(e.target.value);
  };
  const [area, setArea] = useState("");
  const changeArea = (e) => {
    setArea(e.target.value);
  };
  //   今の日付を確認する
  function getCurrentTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    let day = ("0" + now.getDate()).slice(-2);
    // let hours = ("0" + now.getHours()).slice(-2);
    // let minutes = ("0" + now.getMinutes()).slice(-2);
    // let seconds = ("0" + now.getSeconds()).slice(-2);

    let formattedTime = year + "-" + month + "-" + day;
    //   "-" +
    //   hours +
    //   ":" +
    //   minutes +
    //   ":" +
    //   seconds;
    return formattedTime;
  }
  // 使用例
  //   console.log(getCurrentTime());

  // 次のコンポーネントに渡す新規登録情報
  const createAddUser = () => {
    // パスワードのハッシュ化
    const hashedPassword = sha512(userPass);
    const registration_date = getCurrentTime();
    console.log(hashedPassword);
    setAdduser({
      password: hashedPassword,
      user_name: userName,
      employee_code: employeeCode,
      area: area,
      residence: location,
      tmc_e_mail: userTMCmail,
      private_e_mail: userPrivatEmail,
      registration_date: registration_date,
    });
    const min = 1000; // 4桁の最小値
    const max = 9999; // 4桁の最大値
    setMessage(Math.floor(Math.random() * (max - min + 1)) + min);
    setSelectFlag("signUp2");
  };

  return (
    <>
      <div className="loginMainBrock">
        <div className="loginBrock2">
          <h1 className="createHead ">
            <span>アカウント新規作成</span>
          </h1>
          <input
            placeholder="従業員コード"
            type="text"
            className="employeeCode"
            onChange={(e) => changeCode(e)}
          />
          <input
            placeholder="ID"
            type="text"
            className="user"
            onChange={(e) => changeName(e)}
          />
          <input
            placeholder="パスワード"
            type="password"
            className="pass"
            onChange={(e) => changePass(e)}
          />
          <input
            placeholder="TOYOTAメールアドレス"
            type="email"
            className="tmc-email"
            onChange={(e) => changeTMCmail(e)}
          />
          <input
            placeholder="私用メールアドレス"
            type="email"
            className="private-email"
            onChange={(e) => changePrivatemail(e)}
          />
          <input
            placeholder="住所（市まで）"
            type="text"
            className="location"
            onChange={(e) => changeLocation(e)}
          />
          <input
            placeholder="居住エリア"
            type="text"
            className="area"
            onChange={(e) => changeArea(e)}
          />
          <button
            className="btn createAccountBtn"
            onClick={() => createAddUser()}
          >
            新規作成
          </button>
          <h6 className="btn" onClick={() => setSelectFlag("signIn")}>
            ログイン画面に戻る
          </h6>
        </div>
      </div>
    </>
  );
};

export default SignUp;

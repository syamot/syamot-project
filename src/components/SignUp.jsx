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
            <span>CREATE</span> ACCOUNT
          </h1>
          <input
            placeholder="employeeCode"
            type="text"
            className="employeeCode"
            onChange={(e) => changeCode(e)}
          />
          <input
            placeholder="Username"
            type="text"
            className="user"
            onChange={(e) => changeName(e)}
          />
          <input
            placeholder="Password"
            type="password"
            className="pass"
            onChange={(e) => changePass(e)}
          />
          <input
            placeholder="TMC-e-mail"
            type="email"
            className="tmc-email"
            onChange={(e) => changeTMCmail(e)}
          />
          <input
            placeholder="Private-e-mail"
            type="email"
            className="private-email"
            onChange={(e) => changePrivatemail(e)}
          />
          <input
            placeholder="Location"
            type="text"
            className="location"
            onChange={(e) => changeLocation(e)}
          />
          <input
            placeholder="Area"
            type="text"
            className="area"
            onChange={(e) => changeArea(e)}
          />
          <button
            className="btn createAccountBtn"
            onClick={() => createAddUser()}
          >
            CREATE ACCOUNT
          </button>
          <h6 className="btn" onClick={() => setSelectFlag("signIn")}>
            Return Sign in
          </h6>
        </div>
      </div>
    </>
  );
};

export default SignUp;

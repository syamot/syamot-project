import React, { useState } from "react";
import { sha512 } from "js-sha512";
import "./style/signIn.css";
import Modal from "./Modal";
const SignUp = (props) => {
  const { setSelectFlag, setAdduser, setMessage, selectFlag } = props;
  // modalFlag
  const [signUp_modalVisible, setSignUp_ModalVisible] = useState(false);
  //modalによる承認事項表示
  const signUpModalOpen = () => {
    if (
      employeeCode !== "" &&
      userName !== "" &&
      userPass !== "" &&
      userTMCmail !== "" &&
      userPrivatEmail !== "" &&
      location !== "" &&
      area !== ""
    ) {
      console.log(selectFlag);
      setSignUp_ModalVisible(true);
    }
  };

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
    setUserTMCmail(e.target.value + "@mail.toyota.co.jp");
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
    setTimeout(() => {
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
        favorite: JSON.stringify([]),
      });
      const min = 1000; // 4桁の最小値
      const max = 9999; // 4桁の最大値
      setMessage(Math.floor(Math.random() * (max - min + 1)) + min);
      setSelectFlag("signUp2");
    }, 200);
  };

  return (
    <>
      <div className="signUpMainBrock">
        <div className="signUpBrock">
          <h1 className="createHead ">Create Account</h1>
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
          <div className="sign-up-side">
            <input
              placeholder="TOYOTAメールアドレス"
              type="email"
              className="tmc-email"
              onChange={(e) => changeTMCmail(e)}
            />
            <p>@mail.toyota.co.jp</p>
          </div>
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
          <div className="signIn-selectbox">
            <select onChange={(e) => changeArea(e)} className="area">
              <option value="">会社寮一覧</option>
              {/* 大林エリア*/}
              <option value="大林寮">大林和風寮</option>
              <option value="大林清風寮">大林清風寮</option>
              <option value="第2大林和風寮">第2大林和風寮</option>
              <option value="第3大林和風寮">第3大林和風寮</option>
              <option value="第4大林和風寮">第4大林和風寮</option>
              <option value="ｱﾋﾞﾘｵ大林">ｱﾋﾞﾘｵ大林</option>
              <option value="大林国際ｾﾝﾀｰ">大林国際ｾﾝﾀｰ</option>
              <option value="永覚ﾚｼﾞﾃﾞﾝｽ">永覚ﾚｼﾞﾃﾞﾝｽ</option>
              {/* 平山エリア*/}
              <option value="平山豊和寮">平山豊和寮</option>
              <option value="第2平山豊和寮">第2平山豊和寮</option>
              <option value="第3平山豊和寮">第3平山豊和寮</option>
              <option value="第4平山豊和寮">第4平山豊和寮</option>
              <option value="平山ﾚｼﾞﾃﾞﾝｽ">平山ﾚｼﾞﾃﾞﾝｽ</option>
              <option value="ﾚｼﾞﾃﾞﾝｽ平山">ﾚｼﾞﾃﾞﾝｽ平山</option>
              {/* 聖心エリア*/}
              <option value="ｱﾋﾞﾘｵ聖心寮">ｱﾋﾞﾘｵ聖心寮</option>
              <option value="ﾚｼﾞﾃﾞﾝｽ聖心寮">ﾚｼﾞﾃﾞﾝｽ聖心寮</option>
              <option value="第2聖心清風寮">第2聖心清風寮</option>
              <option value="田中清風寮">田中清風寮</option>
              {/* 小川エリア*/}
              <option value="小川清風寮">小川清風寮</option>
              {/* 高岡エリア*/}
              <option value="高岡清風寮">高岡清風寮</option>
              <option value="高岡和風寮">高岡和風寮</option>
              <option value="第2高岡和風寮">第2高岡和風寮</option>
              <option value="第3高岡和風寮">第3高岡和風寮</option>
              <option value="ﾚｼﾞﾃﾞﾝｽ高岡寮">ﾚｼﾞﾃﾞﾝｽ高岡寮</option>
              {/* 日進エリア*/}
              <option value="レーヴ日進">レーヴ日進</option>
              {/* 三好ヶ丘エリア*/}
              <option value="レーヴ三好ヶ丘">レーヴ日進</option>
              {/* 衣浦エリア*/}
              <option value="ｱﾋﾞﾘｵ衣浦寮">ｱﾋﾞﾘｵ衣浦寮</option>
              <option value="ｱﾋﾞﾘｵ第5衣浦寮">ｱﾋﾞﾘｵ第5衣浦寮</option>
              {/* 田原エリア*/}
              <option value="第1田原寮">第1田原寮</option>
              <option value="第3田原寮">第3田原寮</option>
              <option value="第5田原寮">第5田原寮</option>
              <option value="第6田原寮">第6田原寮</option>
              <option value="第1滝頭寮">第1滝頭寮</option>
              <option value="第2滝頭寮">第2滝頭寮</option>
              <option value="第3滝頭寮">第3滝頭寮</option>
              <option value="吉胡寮">吉胡寮</option>
              {/* 東富士エリア*/}
              <option value="第2東富士寮">第2東富士寮</option>
            </select>
          </div>
          {/* <input
            placeholder="居住エリア"
            type="text"
            className="area"
            onChange={(e) => changeArea(e)}
          /> */}
          <div className="signUp-btn-block">
            <button
              className="btn createAccountBtn"
              onClick={() => {
                signUpModalOpen();
                // createAddUser()
              }}
            >
              Create new
            </button>
            <h5
              className="signUp-back btn"
              onClick={() => setSelectFlag("signIn")}
            >
              Return to login screen
            </h5>
          </div>
        </div>
      </div>
      {signUp_modalVisible && (
        <Modal
          selectFlag={selectFlag}
          modalVisible={signUp_modalVisible}
          createAddUser={createAddUser}
          setModalVisible={setSignUp_ModalVisible}
        />
      )}
    </>
  );
};

export default SignUp;

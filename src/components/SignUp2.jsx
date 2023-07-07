import React, { useState, useEffect } from "react";
import { init, send } from "emailjs-com";

export const SignUp2 = (props) => {
  const { addUser, setSelectFlag, URL, message } = props;

  //   const [name, setName] = useState("test"); // 「ご氏名」の部分
  //   const [company, setCompany] = useState("test"); // 「会社名」の部分
  //   const [title, setTitle] = useState("test"); // 「件名」の部分
  const [mail, setMail] = useState("ruiruiruipon3110@gmail.com"); // 「メールアドレス」の部分
  //   const [message, setMessage] = useState(""); // 「お問い合わせ内容」の部分
  useEffect(() => {
    console.log("認証コード", message);
  }, []);
  const userID = "jJheKawtmjVu4zAYX";
  const serviceID = "service_10yt1ej";
  const templateID = "template_u4m4aoo";

  const sendMail = () => {
    init(userID);

    const template_param = {
      //   to_name: name,
      //   company: company,
      //   title: title,
      to_email: addUser.tmc_e_mail,
      from_email: mail,
      message: message,
    };
    send(serviceID, templateID, template_param).then(() => {
      window.alert("認証メールを送信しました");
    });
  };

  useEffect(() => {
    // sendMail();
  }, []);

  // 新規登録処理
  const createUser = async (e) => {
    setTimeout(async () => {
      if (e.target.previousElementSibling.value === String(message)) {
        try {
          await fetch(URL + "/addUsers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(addUser),
          });
          console.log("ユーザー登録完了");
          setSelectFlag("signIn");
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("認証コードが違います");
      }
    }, 200);
  };
  return (
    <>
      <div className="loginMainBrock">
        <div className="loginBrock2">
          <h1 className="createHead ">
            <span>One-time password</span>
          </h1>
          <input
            placeholder="認証コード（4桁）"
            type="text"
            className="employeeCode"
            onChange={(e) => createUser(e)}
          />
          <button
            className="btn createAccountBtn"
            onClick={(e) => createUser(e)}
          >
            certification
          </button>
          <h5 className="btn" onClick={() => setSelectFlag("signIn")}>
            Return to login screen
          </h5>
        </div>
      </div>
    </>
  );
};

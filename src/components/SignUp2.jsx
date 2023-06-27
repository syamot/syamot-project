import React, { useState, useEffect } from "react";
import { init, send } from "emailjs-com";

export const SignUp2 = (props) => {
  const { addUser, setSelectFlag, URL, message } = props;

  //   const [name, setName] = useState("test"); // 「ご氏名」の部分
  //   const [company, setCompany] = useState("test"); // 「会社名」の部分
  //   const [title, setTitle] = useState("test"); // 「件名」の部分
  const [mail, setMail] = useState("ruiruiruipon3110@gmail.com"); // 「メールアドレス」の部分
  //   const [message, setMessage] = useState(""); // 「お問い合わせ内容」の部分

  const userID = "jJheKawtmjVu4zAYX";
  const serviceID = "service_10yt1ej";
  const templateID = "template_u4m4aoo";

  const sendMail = () => {
    init(userID);

    const template_param = {
      //   to_name: name,
      //   company: company,
      //   title: title,
      from_email: mail,
      message: message,
    };
    send(serviceID, templateID, template_param).then(() => {
      window.alert("認証メールを送信しました");
    });
  };

  useEffect(() => {
    sendMail();
  }, []);

  // 新規登録処理
  const createUser = async (e) => {
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
  };
  return (
    <>
      <div className="loginMainBrock">
        <div className="loginBrock2">
          <h1 className="createHead ">
            <span>CREATE</span> ACCOUNT2
          </h1>
          <input
            placeholder="authentication code"
            type="text"
            className="employeeCode"
            onChange={(e) => createUser(e)}
          />
          <button
            className="btn createAccountBtn"
            onClick={(e) => createUser(e)}
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

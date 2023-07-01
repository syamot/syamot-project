import React, { useEffect } from "react";
import "./style/profile.css";

const Profile = (props) => {
  const { setSelectFlag, oneUser, setOneUser, URL } = props;
  const userName = localStorage.getItem("user");

  const upDataUser = async (e, tag) => {
    if (tag === "tmc_e_mail") {
      setOneUser({ ...oneUser, [tag]: e.target.value + "@mail.toyota.co.jp" });
    } else {
      setOneUser({ ...oneUser, [tag]: e.target.value });
    }
  };
  useEffect(() => {
    console.log(oneUser);
  }, [oneUser]);

  const postUpDataUser = async () => {
    await fetch(URL + "/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(oneUser),
    });
  };
  return (
    <div className="profile-box">
      <div className="profile-contents">
        <div className="profile-piece title">
          <h2>プロフィール編集</h2>
        </div>
        <div className="profile-piece">
          <p>名前</p>
          <p className="user">{userName}</p>
        </div>

        <div className="profile-piece">
          <p>従業員コード</p>
          <input
            placeholder="1234567"
            type="text"
            className="employeeCode"
            value={oneUser.employee_code}
            onChange={(e) => {
              upDataUser(e, "employee_code");
            }}
          />
        </div>

        <div className="profile-piece">
          <p>私用のメールアドレス</p>
          <input
            placeholder="@gmail.comなど"
            type="email"
            className="private-email"
            value={oneUser.private_e_mail}
            onChange={(e) => {
              upDataUser(e, "private_e_mail");
            }}
          />
        </div>

        <div className="profile-piece">
          <p>tmcのメールアドレス</p>
          <div className="profile-piece-side">
            <input
              placeholder=""
              type="email"
              className="tmc-email"
              value={oneUser.tmc_e_mail.slice(0, -18)}
              onChange={(e) => {
                upDataUser(e, "tmc_e_mail");
              }}
            />
            <p>@mail.toyota.co.jp</p>
          </div>
        </div>

        <div className="profile-piece">
          <p>住所</p>
          <input
            placeholder="愛知県豊田市トヨタ町"
            type="text"
            className="location"
            value={oneUser.residence}
            onChange={(e) => {
              upDataUser(e, "residence");
            }}
          />
        </div>

        <div className="profile-piece">
          <p>寮</p>
          <input
            placeholder="大林和風寮"
            type="text"
            className="area"
            value={oneUser.area}
            onChange={(e) => {
              upDataUser(e, "area");
            }}
          />
        </div>

        <button
          className="btn createAccountBtn"
          onClick={() => {
            postUpDataUser();
            setSelectFlag("myPage");
          }}
        >
          変更
        </button>
      </div>
    </div>
  );
};

export default Profile;

import React, { useEffect } from "react";
import "./style/profile.css";
import { IoIosArrowBack } from "react-icons/io";
import { BiEdit } from "react-icons/bi";

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
        <div className="profile-piece-title">
          <IoIosArrowBack
            className="profile-arrow"
            onClick={() => setSelectFlag("myPage")}
          />
          <h2 className="profile-h2">プロフィール編集</h2>

          <BiEdit className="profile-BiEdit" />
          <div className="profile-position-adj"></div>
        </div>
        <div className="profile-piece">
          <p className="profile-piece-smallTitle-side">名前</p>
          <input
            placeholder=""
            type="text"
            className="profile-user"
            value={userName}
          />

        </div>
        <div className="profile-piece">
          <p className="profile-piece-smallTitle-side">従業員コード</p>
          <input
            placeholder="1234567"
            type="text"
            className="profile-employeeCode"
            value={oneUser.employee_code}
            onChange={(e) => {
              upDataUser(e, "employee_code");
            }}
          />
        </div>

        <div className="profile-piece">
          <p className="profile-piece-smallTitle-side">メールアドレス - 個人</p>
          <input
            placeholder="@gmail.comなど"
            type="email"
            className="profile-private-email"
            value={oneUser.private_e_mail}
            onChange={(e) => {
              upDataUser(e, "private_e_mail");
            }}
          />
        </div>

        <div className="profile-piece">
          <p className="profile-piece-smallTitle-side">- 会社</p>

          <div className="profile-piece-side">
            <input
              placeholder=""
              type="email"
              className="profile-tmc-email"
              value={oneUser.tmc_e_mail.slice(0, -18)}
              onChange={(e) => {
                upDataUser(e, "tmc_e_mail");
              }}
            />
            <p className="profile-piece-address">@mail.toyota.co.jp</p>
          </div>
        </div>

        <div className="profile-piece">
          <p className="profile-piece-smallTitle-side">住所</p>
          <input
            placeholder="愛知県豊田市トヨタ町"
            type="text"
            className="profile-location"
            value={oneUser.residence}
            onChange={(e) => {
              upDataUser(e, "residence");
            }}
          />
        </div>

        <div className="profile-piece">
          <p className="profile-piece-smallTitle-side">寮</p>
          <div className="profile-selectbox">
            <select
              onChange={(e) => {
                upDataUser(e, "area");
              }}
            >
              <option value="">会社寮一覧</option>
              {/* 大林エリア*/}
              <option value="大林和風寮">大林和風寮</option>
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
        </div>
        <div className="profile-createBlock">
          <button
            className="profile-btn-createAccountBtn"
            onClick={() => {
              postUpDataUser();
              setSelectFlag("myPage");
            }}
          >
            変更
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

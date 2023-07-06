import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const ConfettiComponent = () => {
  //   紙吹雪
  const [confettiActive, setConfettiActive] = useState(false);
  // ボタンで紙吹雪を降らす関数
  //   const startConfetti = () => {
  //     setConfettiActive(true);

  //     // 5秒後に紙吹雪を停止する
  //     setTimeout(() => {
  //       setConfettiActive(false);
  //     }, 5000);
  //   };

  useEffect(() => {
    // コンポーネントのアンマウント時に紙吹雪を停止する
    setConfettiActive(true);
    // 5秒後に紙吹雪を停止する
    setTimeout(() => {
      setConfettiActive(false);
    }, 5000);
    return () => {
      setConfettiActive(false);
    };
  }, []);

  return (
    <>
      <div>
        {/* <button onClick={startConfetti}>Confetti</button> */}
        {confettiActive && <Confetti />}
      </div>
    </>
  );
};

export default ConfettiComponent;

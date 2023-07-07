import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const ConfettiComponent = (props) => {
  const { setConfetFlag } = props;
  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(() => {
    let timeout;

    const startConfetti = () => {
      setConfettiActive(true);

      // 5秒後に紙吹雪を停止する
      timeout = setTimeout(() => {
        setConfettiActive(false);
        setConfetFlag(false);
      }, 5000);
    };

    const stopConfetti = () => {
      clearTimeout(timeout);
      setConfettiActive(false);
    };

    // コンポーネントが表示された時に紙吹雪を開始
    startConfetti();

    // コンポーネントがアンマウントされる時に紙吹雪を停止
    return () => {
      stopConfetti();
    };
  }, []);

  return (
    <>
      <div>
        {confettiActive && (
          <Confetti
            recycle={false}
            onConfettiComplete={() => setConfettiActive(false)}
          />
        )}
      </div>
    </>
  );
};

export default ConfettiComponent;

import React, { useState } from "react";
import "./Lotto.css";

const Lotto = () => {
  const [isChecked, setIsChecked] = useState(Array(45).fill(false));
  const [autoSelectedNumbers, setAutoSelectedNumbers] = useState([]);

  const handleButtonClick = (index) => {
    setIsChecked((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleAutoSelect = () => {
    const newAutoSelectedNumbers = [];
    while (newAutoSelectedNumbers.length < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;
      if (!newAutoSelectedNumbers.includes(randomNumber)) {
        newAutoSelectedNumbers.push(randomNumber);
      }
    }
    setAutoSelectedNumbers(newAutoSelectedNumbers);
    setIsChecked((prevState) => {
      const newState = [...prevState];
      newAutoSelectedNumbers.forEach((num) => (newState[num - 1] = true));
      return newState;
    });
  };

  const handleReset = () => {
    setIsChecked(Array(45).fill(false));
    setAutoSelectedNumbers([]);
  };

  const selectedNumbers = isChecked
    .map((checked, index) => (checked ? index + 1 : null))
    .filter((num) => num !== null)
    .sort((a, b) => a - b);

  return (
    <>
      <div className="container">
        <div className="left">
          <div className="picknumber">
            <div className="paper">
              <div className="amount">1000원</div>
              <div className="number">
                {Array.from({ length: 45 }, (_, index) => index + 1).map(
                  (num, index) => (
                    <React.Fragment key={index}>
                      <button
                        onClick={() => handleButtonClick(index)}
                        className={
                          isChecked[index]
                            ? "button-checked"
                            : "button-unchecked"
                        }
                      >
                        {num}
                      </button>
                      {(index + 1) % 10 === 0 && <br />}
                    </React.Fragment>
                  )
                )}
                <div className="action">
                  <button onClick={handleAutoSelect}>자동선택</button>
                  <button onClick={handleReset}>초기화</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="header">
            <h3>선택번호 확인</h3>
          </div>
          <div className="game">
            {selectedNumbers.length > 0 && (
              <div>선택된 번호: {selectedNumbers.join(", ")}</div>
            )}
            {autoSelectedNumbers.length > 0 && (
              <div>자동 선택된 번호: {autoSelectedNumbers.join(", ")}</div>
            )}
          </div>
          <div className="footer"></div>
        </div>
      </div>
    </>
  );
};

export default Lotto;

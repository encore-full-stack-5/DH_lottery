import React, { useState } from "react";
import "./Lotto.css";

const Lotto = () => {
  const [isChecked, setIsChecked] = useState(Array(45).fill(false));
  const [quantity, setQuantity] = useState(1);
  const [tentativeAutoSelectedNumbers, setTentativeAutoSelectedNumbers] = useState([]);
  const [generatedSets, setGeneratedSets] = useState([[], [], [], [], []]);
  const [setLabels, setSetLabels] = useState(["미지정", "미지정", "미지정", "미지정", "미지정"]);
  const [autoSelectActive, setAutoSelectActive] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  const handleButtonClick = (index) => {
    setIsChecked((prevState) => {
      const newState = [...prevState];
      const selectedCount = newState.filter(checked => checked).length;
      if (selectedCount >= 6 && !newState[index]) {
        alert("최대 6개의 숫자만 선택할 수 있습니다.");
        return prevState;
      }
      newState[index] = !newState[index];
      return newState;
    });
  };

  const generateRandomNumbers = (selectedNumbers) => {
    const remainingNumbers = Array.from(
      { length: 45 },
      (_, index) => index + 1
    ).filter((num) => !selectedNumbers.includes(num));

    const newNumbers = [...selectedNumbers];
    while (newNumbers.length < 6) {
      const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
      const randomNumber = remainingNumbers.splice(randomIndex, 1)[0];
      newNumbers.push(randomNumber);
    }
    return newNumbers.sort((a, b) => a - b);
  };

  const handleAutoSelect = () => {
    const selectedNumbers = isChecked
      .map((checked, index) => (checked ? index + 1 : null))
      .filter((num) => num !== null);

    setTentativeAutoSelectedNumbers(generateRandomNumbers(selectedNumbers));
    setAutoSelectActive((prevState) => !prevState);
  };

  const handleConfirm = () => {
    const selectedNumbers = isChecked
        .map((checked, index) => (checked ? index + 1 : null))
        .filter((num) => num !== null);

    let numbersToConfirm = selectedNumbers;

    if (autoSelectActive) {
        numbersToConfirm = tentativeAutoSelectedNumbers;
    }

    if (numbersToConfirm.length < 6) {
        alert("숫자를 6개 입력하세요.");
        return;
    }

    let newLabel = "수동";  // 기본값을 수동으로 설정

    if (autoSelectActive) {
        newLabel = selectedNumbers.length > 0 ? "반자동" : "자동";
    }

    if (currentEditIndex === null) {
        const currentSetCount = generatedSets.filter(set => set.length > 0).length;
        if (currentSetCount + quantity > 5) {
            alert("1회 최대 5게임만 구매할 수 있습니다. (5,000원)");
            return;
        }
    }

    setIsChecked(Array(45).fill(false));
    setAutoSelectActive(false);
    setTentativeAutoSelectedNumbers([]);

    const sets = [...generatedSets];
    const labels = [...setLabels];

    if (currentEditIndex !== null) {
        sets[currentEditIndex] = numbersToConfirm.sort((a, b) => a - b);
        labels[currentEditIndex] = newLabel;
        setGeneratedSets(sets);
        setSetLabels(labels);
        setCurrentEditIndex(null);
        return;
    }

    let setIndex = 0;
    for (let i = 0; i < quantity; i++) {
        while (sets[setIndex].length > 0 && setIndex < sets.length) {
            setIndex++;
        }
        if (setIndex >= sets.length) break;

        if (autoSelectActive) {
            sets[setIndex] = generateRandomNumbers(selectedNumbers).sort((a, b) => a - b);
            labels[setIndex] = selectedNumbers.length > 0 ? "반자동" : "자동";
        } else {
            sets[setIndex] = numbersToConfirm.sort((a, b) => a - b);
            labels[setIndex] = "수동";
        }
        setIndex++;
    }

    setGeneratedSets(sets);
    setSetLabels(labels);
};

  const handleLeftReset = () => {
    setIsChecked(Array(45).fill(false));
    setAutoSelectActive(false);
    setTentativeAutoSelectedNumbers([]);
  };

  const handleRightReset = () => {
    setGeneratedSets([[], [], [], [], []]);
    setSetLabels(["미지정", "미지정", "미지정", "미지정", "미지정"]);
  };

  const handleEditSet = (index) => {
    setCurrentEditIndex(index);
    const selectedSet = generatedSets[index];
    const newCheckedState = Array(45).fill(false);

    selectedSet.forEach((num) => {
      newCheckedState[num - 1] = true;
    });

    setIsChecked(newCheckedState);
    setTentativeAutoSelectedNumbers([]);
    setAutoSelectActive(false);
  };

  const handleDeleteSet = (index) => {
    const sets = [...generatedSets];
    const labels = [...setLabels];

    sets[index] = [];
    labels[index] = "미지정";

    setGeneratedSets(sets);
    setSetLabels(labels);
  };

  const getColorClass = (number) => {
    if (number >= 1 && number <= 10) return "yellow-circle";
    if (number >= 11 && number <= 20) return "blue-circle";
    if (number >= 21 && number <= 30) return "red-circle";
    if (number >= 31 && number <= 40) return "black-circle";
    if (number >= 41 && number <= 45) return "green-circle";
    return "";
  };

  const renderNumberCircle = (number, idx) => (
    <span key={idx} className={`set-number ${getColorClass(number)}`}>
      {number !== null ? number : ""}
    </span>
  );

  const calculateAmount = () => {
    return quantity * 1000;
  };

  const calculateTotalAmount = () => {
    return generatedSets.filter(set => set.length > 0).length * 1000;
  };

  return (
    <>
      <div className="container">
        <div className="left">
          <div className="picknumber">
            <div className="paper">
              <div className="amount">{calculateAmount()}원</div>
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
              </div>
              <div className="action">
                <button
                  onClick={handleAutoSelect}
                  className={
                    autoSelectActive
                      ? "auto-button-checked"
                      : "auto-button-unchecked"
                  }
                >
                  자동선택
                </button>
                <button onClick={handleLeftReset} className="reset-button">
                  초기화
                </button>
              </div>
            </div>
            <div className="paperamount">
              <div className="max5">적용수량</div>
              <select
                className="selects"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                disabled={currentEditIndex !== null}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <input
                className="confirm"
                type="button"
                value="확인"
                onClick={handleConfirm}
              />
            </div>
          </div>
        </div>
        <div className="right">
          <div className="header">
            <h3>선택번호 확인</h3>
            <button onClick={handleRightReset} className="right-reset-button">
              초기화
            </button>
          </div>
          <div className="game">
            {["A", "B", "C", "D", "E"].map((label, index) => (
              <div key={index} className="set-row">
                <span className="set-label">{label} ({setLabels[index]})</span>
                <div className="set-numbers">
                  {generatedSets[index].length > 0
                    ? generatedSets[index].map(renderNumberCircle)
                    : Array.from({ length: 6 }, (_, idx) =>
                        renderNumberCircle(null, idx)
                      )}
                </div>
                <button className="set-button" onClick={() => handleEditSet(index)}>수정</button>
                <button className="set-button" onClick={() => handleDeleteSet(index)}>삭제</button>
              </div>
            ))}
          </div>
          <div className="footer">
            <div className="amount-info">
              <div>보유예치금 0원</div>
              <div>결제금액 {calculateTotalAmount()}원</div>
            </div>
            <button className="buy-button">구매하기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lotto;
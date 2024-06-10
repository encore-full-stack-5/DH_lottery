import "./P_Buying.css";
import React, { useEffect, useState } from "react";

const P_Buying = () => {
  const [sessionNumber, setSessionNumber] = useState(214);
  const [drawDate, setDrawDate] = useState("2024.06.13");
  const [drawEndDate, setDrawEndDate] = useState("2025.06.13");
  const [autoNumber, setAutoNumber] = useState(["모든 조"]);

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // 자동 번호 생성 로직
  const generateAutoNumber = () => {
    const randomSelect = ["모든 조", "1조", "2조", "3조", "4조", "5조"];
    const selectedGroup =
      randomSelect[getRandomNumber(0, randomSelect.length - 1)];

    const randomNumbers = Array.from({ length: 6 }, () =>
      getRandomNumber(0, 9)
    );

    setAutoNumber([selectedGroup, ...randomNumbers]);
  };

  // 자동번호 버튼 클릭 시 동작
  const handleAutoNumberClick = () => {
    generateAutoNumber();
  };

  useEffect(() => {
    setAutoNumber(["모든 조", "", "", "", "", "", ""]);
  }, []);
  const calculateTimeLeft = () => {
    const targetDate = new Date("2024-06-26T00:00:00");
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeLeft = () => {
    return `${timeLeft.days || 0}일 ${timeLeft.hours || 0}시간 ${
      timeLeft.minutes || 0
    }분`;
  };
  return (
    <div className="buying_container">
      {/* header */}
      <div className="buying_header">
        <div className="buying_header-left">
          <a href="/winResult" className="buying_result_btn">
            제 {sessionNumber}회 당첨결과 →
          </a>
        </div>
        <div className="buying_header-center">
          <img className="buying_lotto_logo" src="lotto_logo.png" />
        </div>
        <div className="buying_header-right">
          <p className="buying_medium-text">판매 마감까지 남은시간</p>
          <p className="buying_large-text">{formatTimeLeft()}</p>
        </div>
      </div>
      <hr />
      {/* 티켓 */}
      <div className="buying_main-content">
        <div className="buying_ticket-wrapper">
          <div className="buying_main-wrapper">
            <h2 className="buying_price">1,000원</h2>
            <div className="buying_button-group">
              <a className="buying_auto_num" onClick={handleAutoNumberClick}>
                자동번호
              </a>
              <a className="buying_large-button">{autoNumber[0]}</a>
              <div className="buying_btn_wrapper">
                {autoNumber.slice(1).map((number, index) => (
                  <a key={index} className="buying_btn">
                    {number}
                  </a>
                ))}
              </div>
              <button>선택완료</button>
            </div>

            <br />
          </div>

          <div className="buying_sub-wrapper">
            <div className="buying_line"></div>
            <div className="buying_info">
              <div className="buying_info-left">
                제 {sessionNumber}회 추 첨 일 날짜 {drawDate}
              </div>
              <hr />
              <div className="buying_info-right">
                지급기한 날짜 {drawEndDate}
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <div className="buying_selection">
        <div className="buying_selection-column">
          <p>조선택</p>
          <button className="buying_full-width">모든 조</button>
          <div className="buying_button-group">
            <button>1조</button>
            <button>2조</button>
            <button>3조</button>
          </div>
          <div className="buying_button-group">
            <button>4조</button>
            <button>5조</button>
          </div>
        </div>
        <div className="buying_selection-column">
          <p>6자리 번호 선택</p>
          <div className="buying_button-group">
            <button>1</button>
            <button>2</button>
            <button>3</button>
          </div>
          <div className="buying_button-group">
            <button>4</button>
            <button>5</button>
            <button>6</button>
          </div>
          <div className="buying_button-group">
            <button>7</button>
            <button>8</button>
            <button>9</button>
          </div>
          <button className="buying_zero-button">0</button>
        </div>
        <div className="buying_selection-summary">
          <p>내가 선택한 번호</p>
          <p>선택번호가 존재하지 않습니다.</p>
        </div>
      </div>
      <div className="buying_footer">
        <div className="buying_footer-section">
          <button>구매내역 보기</button>
        </div>
        <div className="buying_footer-section">
          <div className="buying_deposit-info">
            <p>보유중인 예치금</p>
            <button>충전</button>
          </div>
          <p>0원</p>
        </div>
        <div className="buying_footer-section payment-info">
          <div>
            <p>결제 예정 금액</p>
            <p>0 원</p>
          </div>
          <button>구매하기</button>
        </div>
      </div>
    </div>
  );
};

export default P_Buying;

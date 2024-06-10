import "./P_Buying.css";
import React, { useEffect, useState } from "react";

const P_Buying = () => {
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
            제 214회 당첨결과 →
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
      {/*  */}
      <hr />
      <div className="buying_main-content">
        <div className="buying_price">
          <h2>1,000원</h2>
        </div>
        <div className="buying_button-group">
          <button>자동번호</button>
          <button className="buying_large-button">모든 조</button>
          <button> </button>
          <button> </button>
          <button> </button>
          <button> </button>
          <button> </button>
          <button> </button>
          <button>선택완료</button>
        </div>
        <br />
        <div className="buying_info">
          <div className="buying_info-left">
            제 <strong>??</strong>회 추 첨 일 날짜 ~~~
          </div>
          <hr />
          <div className="buying_info-right">지급기한 날짜 ~~~</div>
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

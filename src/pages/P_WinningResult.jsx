import "../css/P_WinningResult.css";
import React from "react";
//
const P_WinningResult = () => {
  const handleSearch = () => {
    alert("Search button clicked!");
  };

  return (
    <>
      <div className="winResult">
        <h4 style={{ fontSize: "28px", fontWeight: "300" }}>
          <strong
            style={{
              fontWeight: "500",
              color: "#d43301",
              paddingRight: "10px",
            }}
          >
            213회
          </strong>
          당첨결과
        </h4>
        <p>(2024년 05월 30일 추첨)</p>
        <div className="numWrap">
          <dl className="prize-winner">
            <dt className="prize-winner-place" style={{ paddingRight: "10px" }}>
              1등
            </dt>
            <dd>
              월<span className="num"> 700</span>
              만원x
              <span className="num">20</span>년
            </dd>
          </dl>
          <div className="win720-num">
            <div className="group">
              <span className="group-num-wrap">
                <span className="group-num">1조</span>
              </span>
            </div>
            <span className="group-num-wrap">
              <span className="group-num num1">1</span>
            </span>
            <span className="group-num-wrap">
              <span className="group-num num2">5</span>
            </span>
            <span className="group-num-wrap">
              <span className="group-num num3">6</span>
            </span>
            <span className="group-num-wrap">
              <span className="group-num num4">0</span>
            </span>
            <span className="group-num-wrap">
              <span className="group-num num5">4</span>
            </span>
            <span className="group-num-wrap">
              <span className="group-num num6">9</span>
            </span>
          </div>
        </div>
        <div className="numWrap">
          <dl className="prize-winner">
            <dt className="prize-winner-place">보너스</dt>
            <dd>
              월<span className="num"> 100</span>
              만원x
              <span className="num">10</span>년
            </dd>
          </dl>
          <div className="win720-num">
            <div className="group">
              <span className="group-num-wrap">
                <span className="bonus-group">각조</span>
              </span>
            </div>
            <span className="group-num-wrap">
              <span className="group-num num1">1</span>
            </span>
            <span className="group-num-wrap">
              <span className="group-num num2">5</span>
            </span>
            <span className="group-num-wrap">
              <span className="group-num num3">6</span>
            </span>
            <span className="group-num-wrap">
              <span className="group-num num4">0</span>
            </span>
            <span className="group-num-wrap">
              <span className="group-num num5">4</span>
            </span>
            <span className="group-num-wrap">
              <span className="group-num num6">9</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default P_WinningResult;

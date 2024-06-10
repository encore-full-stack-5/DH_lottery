import React from "react";
import "./MyPage.css";

const MyPage = () => {
  return (
    <div className="my-page-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <p>마이페이지</p>
        </div>
        <div className="sidebar-menu">
          <div>
            <p>마이페이지 홈</p>
          </div>
          <div>
            <p>구매/당첨</p>
          </div>
          <div>
            <p>구매현황분석</p>
          </div>
          <div>
            <p>예치금</p>
          </div>
          <div>
            <p>개인정보</p>
          </div>
          <div>
            <p>충전하기</p>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="user-info">
          <h2>마이페이지 홈</h2>
          <p className="username">소성민님</p>
          <div className="user-details">
            <div>
              <span>아이디</span>
              <span>dreamthre</span>
            </div>
            <div>
              <span>휴대폰번호</span>
              <span>0000000000</span>
            </div>
            <div>
              <span>이메일</span>
              <span>dreamthre@naver.com</span>
            </div>
            <div>
              <span>이메일 수신여부</span>
              <span>수신거부</span>
            </div>
          </div>
          <div className="user-actions">
            <button>자주 묻는 질문</button>
            <button>1:1 상담</button>
            <button>불법신고센터</button>
          </div>
        </div>

        <div className="deposit-info">
          <h2>회원님의 예치금 현황입니다.</h2>
          <div className="total-deposit">
            <span>총 예치금</span>
            <span>0원</span>
          </div>
          <div className="deposit-details">
            <div>
              <span>간편충전 계좌번호</span>
              <span>-</span>
            </div>
            <div>
              <span>구매가능금액</span>
              <span>0원</span>
            </div>
            <div>
              <span>예약구매금액</span>
              <span>0원</span>
            </div>
            <div>
              <span>누적구매금액</span>
              <span>0원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;

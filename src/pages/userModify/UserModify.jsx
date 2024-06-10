import React, { useState } from "react";
import "./UserModify.css";

const UserModify = () => {
  const [formData, setFormData] = useState({
    name: "소성민",
    username: "dreamthre",
    birthYear: "1993",
    birthMonth: "03",
    birthDay: "13",
    phone: "010-8743-4482",
    email: "dreamthre@naver.com",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="page-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <p>마이페이지</p>
        </div>
        <div className="sidebar-menu">
          <div className="menu-item">
            <p>마이페이지 홈</p>
          </div>
          <div className="menu-item">
            <p>구매/당첨</p>
          </div>
          <div className="menu-item">
            <p>구매현황분석</p>
          </div>
          <div className="menu-item">
            <p>건전구매 프로그램</p>
          </div>
          <div className="menu-item">
            <p>예치금</p>
          </div>
          <div className="menu-item">
            <p>행복더하기 신청</p>
          </div>
          <div className="menu-item active">
            <p>개인정보</p>
          </div>
        </div>
      </div>

      <div className="main-content">
        <h2>개인정보변경</h2>
        <form className="personal-info-form">
          <div className="section">
            <h3>필수 개인정보 입력</h3>
            <div className="form-group">
              <label>이름</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="form-group">
              <label>아이디</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled
              />
            </div>
            <div className="form-group">
              <label>생년월일</label>
              <div className="birth-date">
                <input
                  type="text"
                  name="birthYear"
                  value={formData.birthYear}
                  onChange={handleChange}
                  placeholder="년"
                />
                <input
                  type="text"
                  name="birthMonth"
                  value={formData.birthMonth}
                  onChange={handleChange}
                  placeholder="월"
                />
                <input
                  type="text"
                  name="birthDay"
                  value={formData.birthDay}
                  onChange={handleChange}
                  placeholder="일"
                />
              </div>
            </div>
            <div className="form-group">
              <label>휴대폰번호</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="휴대폰번호"
              />
            </div>
            <div className="form-group">
              <label>이메일</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일"
              />
            </div>
          </div>

          <div className="section">
            <h3>선택 개인정보 입력</h3>
            <div className="form-group">
              <label>개인정보 수집 및 이용 동의</label>
              <input type="checkbox" name="consent" />
            </div>
            <div className="form-group">
              <label>주소</label>
              <input type="text" name="address" placeholder="주소" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModify;

import React, { useState } from "react";
import "./style.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    id: "",
    dateOfBirth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Add your form submission logic here
      console.log("Form submitted");
    }
  };

  return (
    <div className="container">
      <h1 style={{ color: "#0a2a0b", paddingTop: "300px" }}>회원가입</h1>

      <div>
        <div className="signup-field">
          <label htmlFor="email">이메일 주소 *</label>
          <input
            name="email"
            type="email"
            placeholder="이메일 주소"
            value={formData.email}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            required
          />
        </div>
        <div className="signup-field">
          <label htmlFor="password">비밀번호 *</label>
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            required
          />
          <small>대문자,소문자,특수문자 최소8자 이상</small>
        </div>
        <div className="signup-field">
          <label htmlFor="confirmPassword">비밀번호 확인 *</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            required
          />
        </div>

        <div className="signup-field">
          <label htmlFor="id">아이디 *</label>
          <input
            name="id"
            placeholder="아이디"
            value={formData.id}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            required
          />
        </div>

        <div className="signup-field">
          <label htmlFor="dateOfBirth">생년월일</label>
          <input
            name="dateOfBirth"
            type="date"
            placeholder="YYYY-MM-DD"
            value={formData.dateOfBirth}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <small>만19세 이상 가입 가능합니다.</small>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

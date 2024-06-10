import React, { useState, useRef } from "react";
import "./Login.css";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const passwordInputRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (e.target.name === "username") {
        passwordInputRef.current.focus();
      } else if (e.target.name === "password") {
        console.log("Logging in...");
      }
    }
  };

  return (
    <div className="login-page-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <p>회원서비스</p>
        </div>
        <div className="sidebar-menu">
          <div className="menu-item">
            <p>로그인</p>
          </div>
          <div className="menu-item">
            <p>아이디/비밀번호 찾기</p>
          </div>
          <div className="menu-item">
            <p>회원가입</p>
          </div>
        </div>
      </div>

      <div className="main-content">
        <h1>로그인</h1>
        <div className="login-form">
          <div className="login-field">
            <input
              name="username"
              placeholder="아이디"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="login-field">
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              ref={passwordInputRef}
            />
          </div>
          <div className="login-options">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">ID저장</label>
          </div>
          <div className="login-actions">
            <button className="login-button">로그인</button>
          </div>
          <div className="login-links">
            <button className="link-button">회원가입</button>
            <button className="link-button">아이디/비밀번호 찾기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

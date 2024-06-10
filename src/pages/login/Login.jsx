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
        console.log("보내버리기");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>LOGIN</h1>
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
          <button className="link-button">아이디/비밀번호찾기</button>
        </div>
      </div>
    </div>
  );
};

export default Login;

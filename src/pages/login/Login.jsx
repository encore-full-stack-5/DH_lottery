import React, { useState, useRef } from "react";
import "./Login.css";
import { loginRequest } from "../../api/auth";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const passwordInputRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (e.target.name === "userEmail") {
        passwordInputRef.current.focus();
      } else if (e.target.name === "userPassword") {
        login();
      }
    }
  };

  const login = async () => {
    setLoading(true);
    const data = { email, password };
    try {
      const response = await loginRequest(data);
      setMessage(response);
    } catch (error) {
      console.error('Login error:', error);
      setMessage("로그인 실패");
    } finally {
      setLoading(false);
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
              name="userEmail"
              placeholder="아이디"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="login-field">
            <input
              name="userPassword"
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
            <button 
              className="login-button" 
              onClick={login} 
              disabled={loading}
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </div>
          {message && <p className="login-message">{message}</p>}
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

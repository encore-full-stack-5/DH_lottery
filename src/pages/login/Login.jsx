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
    <div>
      <div className="login-content height-alignment">
        <div>
          <div className="login-content">
            <p>아이디</p>
            <input
              name="username"
              placeholder="아이디"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="login-content">
            <p>비밀번호</p>
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
        </div>
        <div>
          <div>
            <button>
              <p>회원가입</p>
            </button>
            <button>
              <p>아이디,비밀번호찾기</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

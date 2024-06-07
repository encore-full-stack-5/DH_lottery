import React, { useRef, useState } from "react";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div>
        <div>
          <p>Login</p>
        </div>
        <div>
          <div>
            <p>아이디</p>
            <input
              name="username"
              placeholder="아이디"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <p>비밀번호</p>
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div>
            <p>회원가입</p>
            <p>아이디/비밀번호 찾기</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

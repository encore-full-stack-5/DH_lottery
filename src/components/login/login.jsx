import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
const Login = () => {
  return (
    <div>
      <div>
        <div>
          <p>Login</p>
        </div>
        <div>
          <div>
            <p style={textStyle}>아이디</p>
          </div>
          <div>
            <p style={textStyle}>비밀번호</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

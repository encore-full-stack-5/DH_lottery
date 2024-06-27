import React, { useState, useEffect } from "react";
import "./style.css";
import { signUpRequest } from "../../api/auth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rePassword: "",
    id: "",
    dateOfBirth: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const formErrors = {};

    // 이메일 형식 검증
    if (!formData.email) {
      formErrors.email = "이메일을 입력해주세요.";
    } else if (!formData.email.includes("@")) {
      formErrors.email = "올바른 이메일 형식이 아닙니다.";
    }

    // 비밀번호 형식 검증
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!formData.password) {
      formErrors.password = "비밀번호를 입력해주세요.";
    } else if (!passwordRegex.test(formData.password)) {
      formErrors.password = "비밀번호는 대문자, 소문자, 특수문자를 포함하여 8자 이상이어야 합니다.";
    }

    if (!formData.rePassword) {
      formErrors.rePassword = "비밀번호 확인을 입력해주세요.";
    } else if (formData.password !== formData.rePassword) {
      formErrors.rePassword = "비밀번호가 일치하지 않습니다.";
    }

    if (!formData.id) formErrors.id = "아이디를 입력해주세요.";
    if (!formData.dateOfBirth) formErrors.dateOfBirth = "생년월일을 입력해주세요.";

    setErrors(formErrors);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      signUp();
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const validateForm = () => {
    return Object.keys(errors).length === 0;
  };

  const signUp = async () => {
    if (!validateForm()) {
      Object.values(errors).forEach((error) => {
        if (error) alert(error);
      });
      return;
    }

    setLoading(true);
    const { email, password, id, dateOfBirth } = formData;

    const age = calculateAge(dateOfBirth);
    if (age < 19) {
      alert("만 19세 이상만 가입 가능합니다.");
      setLoading(false);
      return;
    }

    const data = { email, password, name: id, dateOfBirth };
    try {
      const response = await signUpRequest(data);
      alert(response);
    } catch (error) {
      console.error('SignUp error:', error);
      alert("회원가입 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="signup-container">
        <h1>회원가입</h1>
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
          {errors.email && <small className="error-message">{errors.email}</small>}
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
          <small>대문자, 소문자, 특수문자 최소 8자 이상</small>
          {errors.password && <small className="error-message">{errors.password}</small>}
        </div>
        <div className="signup-field">
          <label htmlFor="rePassword">비밀번호 확인 *</label>
          <input
            name="rePassword"
            type="password"
            placeholder="비밀번호 확인"
            value={formData.rePassword}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            required
          />
          {errors.rePassword && <small className="error-message">{errors.rePassword}</small>}
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
          {errors.id && <small className="error-message">{errors.id}</small>}
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
            required
          />
          <small>만 19세 이상 가입 가능합니다.</small>
          {errors.dateOfBirth && <small className="error-message">{errors.dateOfBirth}</small>}
        </div>
        <div className="signup-actions">
          <button className="signup-button" onClick={signUp} disabled={loading}>
            {loading ? "회원가입 중..." : "회원가입"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

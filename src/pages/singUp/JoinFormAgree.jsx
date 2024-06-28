import React, { useState, useRef, useEffect } from 'react';
import './style.css';
import { certification, emailCertification } from '../../api/auth';

const Modal = ({ show, handleClose, message }) => {
  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

const JoinFormAgree = ({ setEmail }) => {
  const [agree, setAgree] = useState(false);
  const [localEmail, setLocalEmail] = useState("");
  const [emailCertificationCode, setEmailCertificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const authButtonRef = useRef(null);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        window.location.href = 'http://localhost:5173/singUp';
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const handleAgreeChange = (e) => {
    setAgree(e.target.checked);
    setIsEmailSent(false);
  };

  const handleEmailChange = (e) => {
    if (e.target.name === "email") {
      setLocalEmail(e.target.value);
    } else if (e.target.name === "emailCertificationCode") {
      setEmailCertificationCode(e.target.value);
    }
  };

  const sendEmail = async () => {
    if (!agree) {
      setMessage("이용약관에 동의해야 합니다.");
      return;
    }
    setLoading(true);
    const data = { email: localEmail };
    try {
      const response = await certification(data);
      setMessage(response.message || "이메일이 성공적으로 발송되었습니다.");
      setIsEmailSent(true);
    } catch (error) {
      console.error('error:', error);
      setMessage("이메일 발송 실패");
      setIsEmailSent(false);
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!agree) {
      setVerificationMessage("이용약관에 동의해야 합니다.");
      return;
    }
    setVerificationLoading(true);
    const data = { email: localEmail, confirmationRequest: emailCertificationCode };
    try {
      const response = await emailCertification(data);
      setVerificationMessage(response.message || "인증에 성공하였습니다.");
      setShowModal(true);
      if (typeof setEmail === 'function') {
        setEmail(localEmail);  // Update the parent component's email state
      }
    } catch (error) {
      console.error('error:', error);
      setVerificationMessage("인증 실패");
    } finally {
      setVerificationLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="signup-container">
        <div className="terms-header">
          <h2>이용약관 <span className="required">[필수]</span></h2>
          <a href="#!" className="view-all">이용약관 전체보기 &gt;</a>
        </div>
        <div className="terms-content">
          <h3>제6조(서비스의 변경)</h3>
          <ol>
            <li>회사는 기술 및 운영상의 상당한 이유가 있는 경우, 서비스의 전부 또는 일부를 변경할 수 있습니다.</li>
            <li>서비스의 내용, 이용방법, 이용시간에 대해 변경이 있는 경우에는 해당 서비스 초기화면에 변경사유, 변경될 서비스의 내용 및 제공일자 등을 게시합니다.</li>
          </ol>
        </div>
        <div className="agree-checkbox">
          <input
            type="checkbox"
            id="agree"
            name="agree"
            checked={agree}
            onChange={handleAgreeChange}
          />
          <label htmlFor="agree">이용약관에 동의합니다.</label>
        </div>
        <div className="email-authentication">
          <h2>이메일인증</h2>
          <div className="email-option">
            <h3>이메일 본인인증</h3>
            <p>본인 명의로 가입된 이메일 인증하실 수 있습니다.</p>
            <input
              name="email"
              type="email"
              placeholder="이메일 주소"
              value={localEmail}
              onChange={handleEmailChange}
              required
              className="email-input"
              disabled={!agree}
            />
            <button className="auth-button" onClick={sendEmail} disabled={!agree || loading}>
              {loading ? "인증 코드 보내는 중..." : "인증 코드 보내기"}
            </button>
            {message && <p className="message">{message}</p>}
            <input
              name="emailCertificationCode"
              type="text"
              placeholder="인증문자를 입력해주세요"
              value={emailCertificationCode}
              onChange={handleEmailChange}
              required
              className="email-input"
              disabled={!isEmailSent}
            />
            <button className="auth-button" ref={authButtonRef} onClick={verifyCode} disabled={!isEmailSent || verificationLoading}>
              {verificationLoading ? "인증 중..." : "인증하기"}
            </button>
            {verificationMessage && <p className="message">{verificationMessage}</p>}
          </div>
        </div>
      </div>
      <Modal show={showModal} handleClose={handleCloseModal} message="인증에 성공하였습니다." />
    </div>
  );
};

export default JoinFormAgree;

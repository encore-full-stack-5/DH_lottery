import React, { useState, useRef } from 'react';
import './style.css';
import { certification } from '../../api/auth'; // Adjust the import path as needed

const JoinFormAgree = () => {
  const [agree, setAgree] = useState(false);
  const [email, setEmail] = useState("");
  const [emailCertification, setEmailCertification] = useState(""); // Added state for emailCertification
  const [loading, setLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false); // Added state for verification loading
  const [message, setMessage] = useState("");
  const [verificationMessage, setVerificationMessage] = useState(""); // Added state for verification message
  const [isEmailSent, setIsEmailSent] = useState(false); // Added state to track if email is sent

  const authButtonRef = useRef(null); // Ref for the "Authenticate" button

  const handleAgreeChange = (e) => {
    setAgree(e.target.checked);
    setIsEmailSent(false); // Reset email sent status when terms are changed
  };

  const handleEmailChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "emailCertification") {
      setEmailCertification(e.target.value); // Handle emailCertification change
    }
  };

  const sendEmail = async () => {
    if (!agree) {
      setMessage("이용약관에 동의해야 합니다.");
      return;
    }
    setLoading(true);
    const data = { email };
    try {
      const response = await certification(data);
      setMessage(response.message || "이메일이 성공적으로 발송되었습니다.");
      setIsEmailSent(true); // Set email sent status to true
    } catch (error) {
      console.error('error:', error);
      setMessage("이메일 발송 실패");
      setIsEmailSent(false); // Ensure email sent status is false on failure
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
    const data = { email, confirmationRequest: emailCertification };
    try {
      const response = await certification(data);
      setVerificationMessage(response.message || "인증에 성공하였습니다.");
    } catch (error) {
      console.error('error:', error);
      setVerificationMessage("인증 실패");
    } finally {
      setVerificationLoading(false);
    }
  };

  return (
    <div className="container"> {/* <--- className */}
      <div className="signup-container"> {/* <--- className */}
        <div className="terms-header"> {/* <--- className */}
          <h2>이용약관 <span className="required">[필수]</span></h2> {/* <--- className */}
          <a href="#!" className="view-all">이용약관 전체보기 &gt;</a> {/* <--- className */}
        </div>
        <div className="terms-content"> {/* <--- className */}
          <h3>제6조(서비스의 변경)</h3>
          <ol>
            <li>회사는 기술 및 운영상의 상당한 이유가 있는 경우, 서비스의 전부 또는 일부를 변경할 수 있습니다.</li>
            <li>서비스의 내용, 이용방법, 이용시간에 대해 변경이 있는 경우에는 해당 서비스 초기화면에 변경사유, 변경될 서비스의 내용 및 제공일자 등을 게시합니다.</li>
          </ol>
        </div>
        <div className="agree-checkbox"> {/* <--- className */}
          <input 
            type="checkbox" 
            id="agree" 
            name="agree" 
            checked={agree} 
            onChange={handleAgreeChange} 
          />
          <label htmlFor="agree">이용약관에 동의합니다.</label>
        </div>
        {/* Email Authentication Section */}
        <div className="email-authentication"> {/* <--- className */}
          <h2>이메일인증</h2>
          <div className="email-option"> {/* <--- className */}
            <h3>이메일 본인인증</h3>
            <p>본인 명의로 가입된 이메일 인증하실 수 있습니다.</p>
            <input
              name="email"
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={handleEmailChange}
              required
              className="email-input" 
              disabled={!agree}
            />
            <button className="auth-button" onClick={sendEmail} disabled={!agree || loading}> {/* <--- className */}
              {loading ? "인증 코드 보내는 중..." : "인증 코드 보내기"}
            </button>
            {message && <p className="message">{message}</p>} {/* <--- className */}
            <input
              name="emailCertification"
              type="text" // Changed to text to match input type <----
              placeholder="인증문자를 입력해주세요"
              value={emailCertification}
              onChange={handleEmailChange}
              required
              className="email-input" // Ensure same className as email input <----
              disabled={!isEmailSent}
            />
            <button className="auth-button" ref={authButtonRef} onClick={verifyCode} disabled={!isEmailSent || verificationLoading}> {/* <--- className */}
              {verificationLoading ? "인증 중..." : "인증하기"}
            </button>
            {verificationMessage && <p className="message">{verificationMessage}</p>} {/* <--- className */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinFormAgree;

import React from "react";
import "./style.css";

const JoinFormAgree = () => {
  return (
    <div>
      <div className="container" style={{ marginTop: "500px" }}>
        <div className="terms-header" style={{ marginTop: "50px" }}>
          <h2>
            이용약관 <span className="required">[필수]</span>
          </h2>
          <a href="#" className="view-all">
            이용약관 전체보기 &gt;
          </a>
        </div>
        <div className="terms-content">
          <p>
            회사는 서비스의 제공에 필요한 경우, 정기점검을 실시할 수 있으며,
            정기점검시간은 사이트에 공지한 바에 따릅니다.
          </p>
          <h3>제6조(서비스의 변경)</h3>
          <ol>
            <li>
              회사는 기술 및 운영상 상당한 이유가 있는 경우, 서비스의 전부 또는
              일부를 변경할 수 있습니다.
            </li>
            <li>
              서비스의 내용, 이용방법, 이용시간에 대해 변경이 있는 경우에는 해당
              서비스 초기화면에 변경사유, 변경될 서비스의 내용 및 제공일자 등을
              게시합니다.
            </li>
          </ol>
        </div>

        <div className="auth-content" style={{ marginBottom: "20px" }}>
          <div className="agree-checkbox">
            <input type="checkbox" id="agree" />
            <label htmlFor="agree">이용약관에 동의합니다.</label>
          </div>
        </div>

        <div class="auth-container" style={{ marginBottom: "500px" }}>
          <div class="auth-header">
            <h2>인증방식 선택</h2>
          </div>
          <div class="auth-tabs">
            <button class="tab-button active">이메일 본인인증</button>
          </div>
          <div className="auth-content">
            <div class="auth-method">
              <h3>이메일 본인인증</h3>
              <p>본인 명의로 가입된 이메일 인증하실 수 있습니다.</p>
              <button class="auth-button">인증하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinFormAgree;

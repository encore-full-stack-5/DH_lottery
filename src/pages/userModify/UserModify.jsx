import React, { useState } from "react";
import "./UserModify.css";

const UserModify = () => {
  const [formData, setFormData] = useState({
    name: "크리스티나",
    username: "jung",
    birthYear: "0000",
    birthMonth: "00",
    birthDay: "00",
    phone: "010-0000-0000",
    email: "aaaaaaa@naver.com",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressSearch = () => {
    const { naver } = window;

    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
    });

    const infoWindow = new naver.maps.InfoWindow({
      anchorSkew: true,
    });

    const ps = new naver.maps.Service();

    ps.addressSearch(formData.address, (status, response) => {
      if (status === naver.maps.Service.Status.OK) {
        const item = response.v2.addresses[0];
        const address = item.roadAddress || item.jibunAddress;
        const point = new naver.maps.Point(item.x, item.y);

        infoWindow.setContent(`
          <div style="min-width:200px;line-height:150%;">
            <h4>검색 주소: ${address}</h4>
          </div>
        `);

        map.setCenter(point);
        infoWindow.open(map, point);
      } else {
        alert("Address search failed");
      }
    });
  };

  return (
    <div className="page-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <p>마이페이지</p>
        </div>
        <div className="sidebar-menu">
          <div className="menu-item">
            <p>마이페이지 홈</p>
          </div>
          <div className="menu-item">
            <p>구매/당첨</p>
          </div>
          <div className="menu-item">
            <p>구매현황분석</p>
          </div>
          <div className="menu-item">
            <p>예치금</p>
          </div>
          <div className="menu-item">
            <p>개인정보</p>
          </div>
          <div className="menu-item">
            <p>개인정보변경</p>
          </div>
          <div className="menu-item">
            <p>비밀번호변경</p>
          </div>
          <div className="menu-item">
            <p>회원탈퇴</p>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="breadcrumb"></div>
        <h2>개인정보변경</h2>
        <form className="personal-info-form">
          <div className="section">
            <h3>필수 개인정보 입력</h3>
            <div className="form-group">
              <label>이름</label>
              <span>{formData.name}</span>
            </div>
            <div className="form-group">
              <label>아이디</label>
              <span>{formData.username}</span>
            </div>
            <div className="form-group">
              <label>생년월일</label>
              <div className="birth-date">
                <input
                  type="text"
                  name="birthYear"
                  value={formData.birthYear}
                  onChange={handleChange}
                  placeholder="년"
                />
                <span>년</span>
                <input
                  type="text"
                  name="birthMonth"
                  value={formData.birthMonth}
                  onChange={handleChange}
                  placeholder="월"
                />
                <span>월</span>
                <input
                  type="text"
                  name="birthDay"
                  value={formData.birthDay}
                  onChange={handleChange}
                  placeholder="일"
                />
                <span>일</span>
              </div>
            </div>
            <div className="form-group">
              <label>휴대폰번호</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="휴대폰번호"
              />
              <button type="button" className="verify-btn">
                이메일 인증
              </button>
            </div>
            <div className="form-group">
              <label>이메일</label>
              <div className="email-input">
                <input
                  type="text"
                  name="email"
                  value={formData.email.split("@")[0]}
                  onChange={handleChange}
                  placeholder="이메일"
                />
                <span>@</span>
                <input
                  type="text"
                  name="emailDomain"
                  value={formData.email.split("@")[1]}
                  onChange={handleChange}
                  placeholder="도메인"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="form-group">
              <label>주소</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="주소"
              />
              <button
                type="button"
                className="find-address-btn"
                onClick={handleAddressSearch}
              >
                우편번호 찾기
              </button>
            </div>
          </div>
        </form>
        <div id="map" style={{ width: "100%", height: "400px" }}></div>
      </div>
    </div>
  );
};

export default UserModify;

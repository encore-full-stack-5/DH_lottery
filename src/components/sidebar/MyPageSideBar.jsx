import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MyPageSideBar.css";

const MyPageSideBar = () => {
  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (category) => {
    setOpenCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    <div className="sidebar">
      <h1>마이페이지</h1>
      <ul className="sidebar-list">
        <li>
          <Link to="/category1/sub1" className="mypage">
            마이페이지 홈
          </Link>
        </li>
        <li>
          <span
            onClick={() => toggleCategory("category2")}
            className={openCategories["category2"] ? "active" : ""}
          >
            구매/당첨
          </span>
          {openCategories["category2"] && (
            <ul>
              <li>
                <Link to="/category2/sub1"> - 구매당첨내역</Link>
              </li>
              <li>
                <Link to="/category2/sub2"> - 미확인복권내역</Link>
              </li>
              <li>
                <Link to="/category2/sub3"> - 고액당첨내역</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <span
            onClick={() => toggleCategory("category3")}
            className={openCategories["category3"] ? "active" : ""}
          >
            예치금
          </span>
          {openCategories["category3"] && (
            <ul>
              <li>
                <Link to="/category3/sub1"> - 예치금 충전 내역</Link>
              </li>
              <li>
                <Link to="/payment"> - 충전하기</Link>
              </li>
              <li>
                <Link to="/withdraw"> - 출금 신청</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default MyPageSideBar;

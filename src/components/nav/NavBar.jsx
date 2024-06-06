import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./NavBar.css";
const NavBar = () => {
  return (
    <div>
      <header>
        <div className="nav_wrap">
          <nav className="nav">
            <ul className="top-menu">
              <li className="nav-list">
                로또구매
                {/* <ul className="dropdown">
                  <li>옵션 1</li>
                  <li>옵션 2</li>
                  <li>옵션 3</li>
                </ul> */}
              </li>
              <li className="nav-list">연금복권구매</li>
              <li className="nav-list">당첨결과</li>
              <li className="nav-list">판매점</li>
              <li className="nav-list">이벤트</li>
              <li className="nav-list">통계</li>
            </ul>
          </nav>
        </div>
      </header>
      <main></main>
    </div>
  );
};

export default NavBar;

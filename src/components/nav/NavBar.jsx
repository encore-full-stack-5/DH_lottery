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
              <Link to="/Lotto" className="nav-list">
                로또구매
              </Link>
              <Link to="/" className="nav-list">
                연금복권구매
              </Link>
              <Link to="/" className="nav-list">
                당첨결과
              </Link>
              <Link to="/" className="nav-list">
                판매점
              </Link>
              <Link to="/" className="nav-list">
                이벤트
              </Link>
              <Link to="/" className="nav-list">
                통계
              </Link>
            </ul>
          </nav>
        </div>
      </header>
      <main></main>
    </div>
  );
};

export default NavBar;

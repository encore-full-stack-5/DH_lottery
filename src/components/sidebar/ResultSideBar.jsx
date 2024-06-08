import React, { useState } from "react";
import "./ResultSideBar.css";
import { Link } from "react-router-dom";

const ResultSideBar = () => {
  const [selectedCategory, setSelectedCategory] = useState({});

  const handleCategoryChange = (category) => {
    setSelectedCategory((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    <div className="sidebar">
      <h2>당첨 결과</h2>
      <ul className="sidebar-list">
        <li>
          <span
            onClick={() => handleCategoryChange("lottery")}
            className={selectedCategory["lottery"] ? "active" : ""}
          >
            복권
          </span>
          {selectedCategory["lottery"] && (
            <ul>
              <li>
                <Link to="/lotto_result">- 당첨 결과</Link>
              </li>
              <li>
                <Link to="/">- 통계</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <span
            onClick={() => handleCategoryChange("annuity")}
            className={selectedCategory["annuity"] ? "active" : ""}
          >
            연금 복권
          </span>
          {selectedCategory["annuity"] && (
            <ul>
              <li>
                <Link to="/lotto_result">- 당첨 결과</Link>
              </li>
              <li>
                <Link to="/">- 통계</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default ResultSideBar;

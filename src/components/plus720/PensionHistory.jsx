import React, { useState } from 'react';
import './PensionHistory.css';

const PensionHistory = () => {
  const [selectedOption, setSelectedOption] = useState('전체보기');
  const [startDate, setStartDate] = useState('2024-06-10');
  const [endDate, setEndDate] = useState('2024-06-10');
  const [orderBy, setOrderBy] = useState('recent');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrderBy(e.target.value);
  };

  const handleSearch = () => {
  };

  return (
    <div className="pension_history_container">
      <h1 className="pension_history_title">구매/당첨내역</h1>
      <div className="pension_filter-section">
        <div className="pension_filter-row">
          <label htmlFor="option">당/낙첨여부</label>
          <select id="option" value={selectedOption} onChange={handleOptionChange}>
            <option value="전체보기">전체보기</option>
            <option value="당첨내역">당첨내역</option>
            <option value="낙첨내역">낙첨내역</option>
          </select>
        </div>
        <div className="pension_filter-row">
          <label htmlFor="startDate">조회기간</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <span>~</span>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
          />
          <button>당일</button>
          <button>1주일</button>
          <button>1개월</button>
        </div>
        <div className="pension_filter-row">
          <label>조회결과 순서</label>
          <div className="pension_radio-group">
            <label>
              <input
                type="radio"
                value="recent"
                checked={orderBy === 'recent'}
                onChange={handleOrderChange}
              />
              최근내역이 위로
            </label>
            <label>
              <input
                type="radio"
                value="past"
                checked={orderBy === 'past'}
                onChange={handleOrderChange}
              />
              과거내역이 위로
            </label>
          </div>
        </div>
        <button className="pension_search-button" onClick={handleSearch}>조회</button>
      </div>
      <table className="pension_result-table">
        <thead>
          <tr>
            <th>구입일자</th>
            <th>복권명</th>
            <th>회차</th>
            <th>선택번호/복권번호</th>
            {/* <th>구입매수</th> */}
            <th>당첨결과</th>
            <th>당첨금</th>
            <th>추첨일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="8">조회 결과가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PensionHistory;

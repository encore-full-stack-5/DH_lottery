import React, { useEffect, useState } from "react";
import "./PensionHistory.css";
import { getAllTickets } from "../../api/pensionBuy";

const PensionHistory = () => {
  const [selectedOption, setSelectedOption] = useState("전체보기");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [orderBy, setOrderBy] = useState("recent");
  const [purchasedTicket, setPurchasedTicket] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 한 페이지에 표시할 항목 수

  useEffect(() => {
    getTicket();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [selectedOption, startDate, endDate, orderBy]);

  const getTicket = async () => {
    try {
      const response = await getAllTickets();
      console.log(response.data);
      setPurchasedTicket(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPrizeAmount = (result) => {
    switch (result) {
      case 1:
        return "매월 700만원";
      case 2:
        return "매달 100만원";
      case 3:
        return "100만원";
      case 4:
        return "10만원";
      case 5:
        return "1만원";
      case 6:
        return "5000원";
      case 7:
        return "1000원";
      case 8:
        return "매달 100만원";
      case -1:
        return "-";
      default:
        return "-";
    }
  };

  const getResult = (result) => {
    switch (result) {
      case 1:
        return "1등";
      case 2:
        return "2등";
      case 3:
        return "3등";
      case 4:
        return "4등";
      case 5:
        return "5등";
      case 6:
        return "6등";
      case 7:
        return "7등";
      case 8:
        return "보너스";
      case -1:
        return "낙첨";
      default:
        return "미추첨";
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pension_page-number ${currentPage === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

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
    let filtered = purchasedTicket;

    // 필터링: 당/낙첨 여부
    if (selectedOption === "당첨내역") {
      filtered = filtered.filter((item) => item.result > 0);
    } else if (selectedOption === "낙첨내역") {
      filtered = filtered.filter((item) => item.result < 0);
    }

    // 필터링: 날짜 범위
    if (startDate) {
      filtered = filtered.filter(
        (item) => new Date(item.createAt) >= new Date(startDate)
      );
    }
    if (endDate) {
      filtered = filtered.filter(
        (item) => new Date(item.createAt) <= new Date(endDate)
      );
    }

    // 정렬: 최근/과거 내역
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.createAt);
      const dateB = new Date(b.createAt);
      return orderBy === "recent" ? dateB - dateA : dateA - dateB;
    });

    setFilteredTickets(filtered);
    setCurrentPage(1); // 필터링 후 첫 페이지로 이동
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="pension_history_container">
      <h1 className="pension_history_title">구매/당첨내역</h1>
      <div className="pension_filter-section">
        <div className="pension_filter-row">
          <label htmlFor="option">당/낙첨여부</label>
          <select
            id="option"
            value={selectedOption}
            onChange={handleOptionChange}
          >
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
          <button
            onClick={() => {
              const today = new Date().toISOString().split("T")[0];
              setStartDate(today);
              setEndDate(today);
            }}
          >
            당일
          </button>
          <button
            onClick={() => {
              const today = new Date();
              const oneWeekAgo = new Date(today.setDate(today.getDate() - 7))
                .toISOString()
                .split("T")[0];
              setStartDate(oneWeekAgo);
              setEndDate(new Date().toISOString().split("T")[0]);
            }}
          >
            1주일
          </button>
          <button
            onClick={() => {
              const today = new Date();
              const oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1))
                .toISOString()
                .split("T")[0];
              setStartDate(oneMonthAgo);
              setEndDate(new Date().toISOString().split("T")[0]);
            }}
          >
            1개월
          </button>
        </div>
        <div className="pension_filter-row">
          <label>조회결과 순서</label>
          <div className="pension_radio-group">
            <label>
              <input
                type="radio"
                value="recent"
                checked={orderBy === "recent"}
                onChange={handleOrderChange}
              />
              최근내역이 위로
            </label>
            <label>
              <input
                type="radio"
                value="past"
                checked={orderBy === "past"}
                onChange={handleOrderChange}
              />
              과거내역이 위로
            </label>
          </div>
        </div>
        <button className="pension_search-button" onClick={handleSearch}>
          조회
        </button>
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
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.createAt}</td>
                <td>연금복권720</td>{" "}
                <td>{item.round}</td>
                <td>
                  {`${item.groupNum}조 ${item.first}${item.second}${item.third}${item.fourth}${item.fifth}${item.sixth}`}
                </td>
                <td>{getResult(item.result)}</td>
                <td>{getPrizeAmount(item.result)}</td>
                <td>{item.drawDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">조회 결과가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pension_pagination">{renderPageNumbers()}</div>
    </div>
  );
};

export default PensionHistory;

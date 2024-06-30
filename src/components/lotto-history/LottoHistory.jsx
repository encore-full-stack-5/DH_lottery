import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import "./LottoHistory.css";
import axios from "axios";

const LottoHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("전체보기");
  const [startDate, setStartDate] = useState("2024-01-10");
  const [endDate, setEndDate] = useState("2024-06-10");
  const [orderBy, setOrderBy] = useState("recent");
  const [userId, setUserId] = useState("");
  const [allHistory, setAllHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("Authorization")?.split(" ")[1];
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Invalid token", error);
      }
    } else {
      console.error("No token found");
    }
  }, []);

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

  const fetchAllHistory = () => {
    axios
      .get(`http://localhost:8080/api/v1/lotto-history/${userId}`, {
        params: {
          page: page,
          pageSize: pageSize,
          startDate: startDate,
          endDate: endDate,
          orderBy: orderBy,
        },
      })
      .then((response) => {
        setAllHistory(response.data.content);
        setTotalPages(response.data.pageInfo.totalPages);
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get("page");
    const pageValue = pageParam ? parseInt(pageParam) : 0;
    setPage(pageValue);
  }, [location.search]);

  useEffect(() => {
    if (userId) {
      fetchAllHistory();
    }
  }, [userId, page, pageSize, startDate, endDate, orderBy]);

  const handleSearch = () => {
    setPage(0);
    fetchAllHistory();
  };

  const handlePageChange = (newPage) => {
    navigate(`/lotto_history?page=${newPage}`);
  };

  const handleTodayClick = () => {
    const today = new Date().toISOString().split("T")[0];
    setStartDate(today);
    setEndDate(today);
  };

  const handleWeekClick = () => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    setStartDate(lastWeek.toISOString().split("T")[0]);
    setEndDate(today.toISOString().split("T")[0]);
  };

  const handleMonthClick = () => {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    setStartDate(lastMonth.toISOString().split("T")[0]);
    setEndDate(today.toISOString().split("T")[0]);
  };

  return (
    <div className="history_container">
      <h1 className="history_title">구매/당첨내역</h1>
      <div className="filter-section">
        <div className="filter-row">
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
        <div className="filter-row">
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
          <button onClick={handleTodayClick}>당일</button>
          <button onClick={handleWeekClick}>1주일</button>
          <button onClick={handleMonthClick}>1개월</button>
        </div>
        <div className="filter-row">
          <label>조회결과 순서</label>
          <div className="radio-group">
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
        <button className="search-button" onClick={handleSearch}>
          조회
        </button>
      </div>
      <table className="result-table">
        <thead>
          <tr>
            <th>구입일자</th>
            <th>복권명</th>
            <th>회차</th>
            <th>선택번호/복권번호</th>
            <th>구입매수</th>
            <th>당첨결과</th>
            <th>당첨금</th>
            <th>추첨일</th>
          </tr>
        </thead>
        <tbody>
          {allHistory.length > 0 ? (
            allHistory.map((history) => (
              <tr key={history.payId}>
                <td>{new Date(history.payCreatedAt).toLocaleDateString()}</td>
                <td>로또</td>
                <td>{history.roundId}</td>
                <td>{history.lotteryId}</td>
                <td>{history.lotteryCount}</td>
                <td>{history.result}</td>
                <td>{history.resultMoney}</td>
                <td></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">조회 결과가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
        >
          이전
        </button>
        <span>
          {page + 1} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page + 1 >= totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default LottoHistory;

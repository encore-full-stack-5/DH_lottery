import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import "./LottoHistory.css";
import axios from "axios";

const LottoHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("전체보기");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
        console.log(`아이디${decoded.id}`);
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

  const fetchAllHistory = async () => {
    if (!userId) {
      console.error("User ID is not set");
      return;
    }

    try {
      const response = await axios.get(
        `http://34.136.172.224:30003/api/v1/lotto-history/${userId}`,
        {
          params: {
            startDate: startDate,
            endDate: endDate,
            orderBy: orderBy,
          },
          timeout: 10000, // 예시로 10초 타임아웃 설정
        }
      );

      let sortedHistory = [...response.data.content];
      sortedHistory = sortedHistory.sort((a, b) => {
        const dateA = new Date(a.payCreatedAt);
        const dateB = new Date(b.payCreatedAt);
        return orderBy === "recent" ? dateB - dateA : dateA - dateB;
      });

      setAllHistory(sortedHistory);
      setTotalPages(Math.ceil(sortedHistory.length / pageSize));
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 없음:", error.response.data);
      } else if (error.request) {
        console.error("응답 없음:", error.request);
      } else {
        console.error("요청 설정 오류:", error.message);
      }
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get("page");
    const pageValue = pageParam ? parseInt(pageParam) : 0;
    setPage(pageValue);
  }, [location.search]);

  useEffect(() => {
    const fetchHistoryWhenUserIdIsSet = async () => {
      if (userId) {
        await fetchAllHistory();
      }
    };
    fetchHistoryWhenUserIdIsSet();
  }, [userId, page, pageSize, startDate, endDate, orderBy]);

  const handleSearch = () => {
    setPage(0);
    fetchAllHistory();
  };

  const handlePageChange = (newPage) => {
    navigate(`/lotto_history?page=${newPage}`);
    setPage(newPage);
  };

  const handleTodayClick = () => {
    const today = new Date();
    const koreanTime = new Date(today.getTime() + 9 * 60 * 60 * 1000); // Add 9 hours to convert to KST
    const todayDate = koreanTime.toISOString().split("T")[0];
    setStartDate(todayDate);
    setEndDate(todayDate);
  };

  const handleWeekClick = () => {
    const today = new Date();
    const koreanTime = new Date(today.getTime() + 9 * 60 * 60 * 1000); // Add 9 hours to convert to KST
    const lastWeek = new Date(koreanTime);
    lastWeek.setDate(koreanTime.getDate() - 7);
    setStartDate(lastWeek.toISOString().split("T")[0]);
    setEndDate(koreanTime.toISOString().split("T")[0]);
  };

  const handleMonthClick = () => {
    const today = new Date();
    const koreanTime = new Date(today.getTime() + 9 * 60 * 60 * 1000); // Add 9 hours to convert to KST
    const lastMonth = new Date(koreanTime);
    lastMonth.setMonth(koreanTime.getMonth() - 1);
    setStartDate(lastMonth.toISOString().split("T")[0]);
    setEndDate(koreanTime.toISOString().split("T")[0]);
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
          {allHistory.slice(page * pageSize, (page + 1) * pageSize).map((history) => (
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
          ))}
          {allHistory.length === 0 && (
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

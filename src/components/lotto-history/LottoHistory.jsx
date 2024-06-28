import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // useNavigate로 변경
import "./LottoHistory.css";
import axios from "axios";

const LottoHistory = () => {
  const location = useLocation();
  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용
  const [selectedOption, setSelectedOption] = useState("전체보기");
  const [startDate, setStartDate] = useState("2024-01-10");
  const [endDate, setEndDate] = useState("2024-06-10");
  const [orderBy, setOrderBy] = useState("recent");
  const [userId, setUserId] = useState("daniel");
  const [allHistory, setAllHistory] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

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
        },
      })
      .then((response) => {
        setAllHistory(response.data.content);
        setTotalPages(response.data.pageInfo.totalPages);
        console.log(response.data);
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
    fetchAllHistory();
  }, [userId, page, pageSize]);

  const handleSearch = () => {
    setPage(0); // 검색 버튼을 누르면 첫 페이지로 이동
    fetchAllHistory();
  };

  const handlePageChange = (newPage) => {
    navigate(`/lotto_history?page=${newPage}`); // useNavigate 사용
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
          <button>당일</button>
          <button>1주일</button>
          <button>1개월</button>
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

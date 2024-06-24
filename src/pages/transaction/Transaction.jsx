import React, { useEffect, useState } from "react";
import MyPageSideBar from "../../components/sidebar/MyPageSideBar";
import "./Transaction.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const Transaction = () => {
  const [accountHolderName, setAccountHolderName] = useState("name");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = "1";

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `http://localhost:8080/api/v1/accounts/${userId}/histories`;
      if (selectedStartDate && selectedEndDate) {
        const startDate = selectedStartDate.toISOString().split("T")[0];
        const endDate = selectedEndDate.toISOString().split("T")[0];
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    fetchData();
  };

  return (
    <>
      <main>
        <MyPageSideBar />
        <div className="header_article">
          <h3 className="sub_title">예치금 충전 내역</h3>
        </div>
        <div className="transaction_content_wrap">
          <table className="table_transaction_search">
            <tbody className="tbody_transaction">
              <tr>
                <th>조회기간</th>
                <td className="withdraw_td" colSpan="3">
                  <div className="date_wrapper">
                    <div className="start-datepicker-container">
                      <DatePicker
                        selected={selectedStartDate}
                        onChange={(date) => {
                          // 시작일이 종료일보다 늦어지지 않도록 조정
                          if (selectedEndDate && date > selectedEndDate) {
                            alert("시작일은 종료일보다 빨라야 합니다.");
                            return;
                          }
                          setSelectedStartDate(date);
                        }}
                        dateFormat="yyyy/MM/dd"
                        className="startDatepicker"
                        placeholderText="시작일"
                      />
                      <img
                        src="calendar.png"
                        className="date_picker_img"
                        alt="조회 시작날짜 선택"
                        title="조회 시작날짜 선택"
                        onClick={() =>
                          document.querySelector(".startDatepicker").focus()
                        }
                      />
                    </div>
                    <a className="gap"> ~ </a>
                    <div className="end-datepicker-container">
                      <DatePicker
                        selected={selectedEndDate}
                        onChange={(date) => {
                          // 종료일이 시작일보다 빨라지지 않도록 조정
                          if (selectedStartDate && date < selectedStartDate) {
                            alert("종료일은 시작일보다 늦어야 합니다.");
                            return;
                          }
                          setSelectedEndDate(date);
                        }}
                        dateFormat="yyyy/MM/dd"
                        className="endDatepicker"
                        placeholderText="종료일"
                      />
                      <img
                        src="calendar.png"
                        className="date_picker_img"
                        alt="조회 종료날짜 선택"
                        title="조회 종료날짜 선택"
                        onClick={() =>
                          document.querySelector(".endDatepicker").focus()
                        }
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="transaction_btn_wrapper">
            <button
              className="btn_common"
              id="submit_btn"
              onClick={handleSearch}
            >
              조회
            </button>
          </div>
          <h4 className="transaction_title">예치금 조회내역</h4>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error occurred: {error.message}</p>
          ) : (
            <table className="transaction_table">
              <thead className="transaction_thead">
                <tr>
                  <th>적립/사용일자</th>
                  <th>내용</th>
                  <th>입금액</th>
                  <th>출금액</th>
                </tr>
              </thead>
              <tbody className="transaction_tbody">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="4">데이터가 없습니다.</td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={index}>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>{item.transactionStatus}</td>
                      <td>
                        {item.transactionStatus === "입금" ? item.price : "-"}
                      </td>
                      <td>
                        {item.transactionStatus === "출금" ? item.price : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  );
};

export default Transaction;

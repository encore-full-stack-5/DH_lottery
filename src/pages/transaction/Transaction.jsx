import MyPageSideBar from "../../components/sidebar/MyPageSideBar";
import "./Transaction.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Transaction = () => {
  const [accountHolderName, setAccountHolderName] = useState("동행복권_박현서");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const data = [
    {
      requestDate: "2024/06/09",
      bank: "로또구매",
      inAmount: "1,000,000",
    },
    {
      requestDate: "2024/06/09",
      bank: "환급",
      outAmount: "500,000",
    },
  ];
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
                        onChange={(date) => setSelectedStartDate(date)}
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
                        onChange={(date) => setSelectedEndDate(date)}
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
            <button className="btn_common" id="submit_btn">
              조회
            </button>
          </div>
          <h4 className="transaction_title">예치금 조회내역</h4>
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
                  <td colSpan="5">데이터가 없습니다.</td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.requestDate}</td>
                    <td>{item.bank}</td>
                    <td>{item.inAmount}</td>
                    <td>{item.outAmount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Transaction;

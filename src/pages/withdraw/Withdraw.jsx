import MyPageSideBar from "../../components/sidebar/MyPageSideBar";
import "./Withdraw.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Withdraw = () => {
  const serverAddr = "http://localhost:8083/api/v1/accounts";
  const [accountHolderName, setAccountHolderName] = useState("");
  const [selectedBank, setSelectedBank] = useState("국민은행");
  const [fee, setFee] = useState("300원");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [withdrawPrice, setWithdrawPrice] = useState();
  const [withdrawHistory, setWithdrawHistory] = useState([]); // 출금 내역 상태 추가

  const [userId, setUserId] = useState("1");
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false); // 확인 팝업 상태
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // 성공 메시지 상태

  const fees = {
    국민은행: "300원",
    기업은행: "250원",
    신한은행: "200원",
    하나은행: "350원",
    우체국: "150원",
    SC제일은행: "400원",
    시티은행: "300원",
    수협: "280원",
    신협: "260원",
  };

  const handleBankChange = (event) => {
    const newBank = event.target.value;
    setSelectedBank(newBank);
    setFee(fees[newBank]);
  };

  const fetchTotalDeposit = () => {
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem("Authorization");

    // Axios 요청 설정
    axios
      .get(serverAddr, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setTotalDeposit(response.data.point);
      })
      .catch((error) => {
        console.error("예치금을 가져오는 중 에러 발생:", error);
      });
  };

  useEffect(() => {
    fetchTotalDeposit();
  }, [userId]);

  const handleWithdraw = () => {
    const withdrawData = {
      price: withdrawPrice,
      charge: parseInt(fee),
      bankName: selectedBank,
      accountNum: accountHolderName,
      accountOwnerName: "박현서", // 예금주명 (고정값 또는 별도 처리)
    };
    const token = localStorage.getItem("Authorization");
    axios
      .put(`${serverAddr}/withdraw`, withdrawData, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log("출금 요청 성공:", response);
        fetchTotalDeposit(); // 출금 후 총 예치금 다시 가져오기
        setShowSuccessMessage(true); // 성공 메시지 표시
        setTimeout(() => setShowSuccessMessage(false), 3000); // 3초 후 성공 메시지 숨기기
      })
      .catch((error) => {
        console.error("출금 요청 중 에러 발생:", error);
      });
  };

  const handleSearch = () => {
    const startDateString = selectedStartDate?.toISOString();
    const endDateString = selectedEndDate?.toISOString();

    if (
      selectedStartDate &&
      selectedEndDate &&
      selectedStartDate > selectedEndDate
    ) {
      alert("조회 종료일은 시작일보다 빠를 수 없습니다.");
      return;
    }

    const params = {
      startDate: startDateString?.split("T")[0],
      endDate: endDateString?.split("T")[0],
    };
    const token = localStorage.getItem("Authorization");
    axios
      .get(`${serverAddr}/histories/withdraw`, {
        params: params,
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);
        setWithdrawHistory(response.data);
      })
      .catch((error) => {
        console.error("출금 내역 조회 중 에러 발생:", error);
      });
  };

  const formatDate = (dateString) => {
    return dateString.split("T")[0]; // 날짜 부분만 추출
  };

  return (
    <>
      <main>
        <MyPageSideBar />
        <div className="header_article">
          <h3 className="sub_title">출금하기</h3>
        </div>
        <div className="content_wrap">
          <div className="top_info">
            <ul className="list_text_common_withdraw">
              <li>- 출금신청하신 예치금은 본인명의의 계좌번호로 이체됩니다.</li>
              <li className="second_li">
                - 계좌정보가 정확해야 이체되므로
                <br />
                <a className="first_a">
                  계좌번호 확인 후 신청해 주시기 바랍니다.
                </a>
              </li>
            </ul>
            <p className="show_total_money">
              <a className="show_total_money_a">총 예치금 {totalDeposit} 원</a>
            </p>
          </div>
          <div className="group_and_terms_wrapper">
            <div className="group_title">
              <h4 className="title">
                개인정보 수집 및 이용에 대한 안내
                <span className="req">[필수]</span>
              </h4>
            </div>
            <div className="terms_container">
              <div className="terms_content">
                <h5>행동복권 개인정보 수집 및 이용 동의</h5>
                <div>
                  주식회사 행동복권은 아래의 목적으로 개인정보를 수집 및
                  이용하며, 회원의 개인정보를 안전하게 취급하는데 최선을
                  다합니다.
                </div>
                <ol className="list_num_order">
                  <li>
                    <a>수집목적</a>
                  </li>
                  <li>
                    <a>수집항목(필수)</a>
                  </li>
                  <li>
                    <a>보유기간</a>
                  </li>
                  <li>
                    <a>개인정보 수집 및 이용 동의를 거부할 권리</a>
                  </li>
                </ol>
                <h6>1.수집목적</h6>
                <div className="blue_content">- 회원의 예치금 출금 처리</div>
                <h6>2.수집항목(필수) : 은행명, 계좌번호, 예금주명</h6>
                <h6>
                  3.보유기간 : 수집된 정보는 회원탈퇴 후 지체없이 파기됩니다.
                </h6>
                <h6>4.개인정보 수집 및 이용 동의를 거부할 권리</h6>
                <div className="blue_content">
                  이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가
                  있습니다. 회원가입 시 수집하는 최소한의 개인정보, 즉, 필수
                  항목에 대한 수집이용 동의를 거부하실 경우, 예치금 출금이
                  어려울 수 있습니다.
                </div>
                <div className="blue_content">
                  서비스 제공을 위해 필요한 최소한의 개인정보이므로 동의를 해
                  주셔야 서비스 이용이 가능합니다. 더 자세한 내용에 대해서는
                  개인정보처리방침을 참고하시기 바랍니다.
                </div>
              </div>
            </div>
            <div className="check">
              <input
                name="agreeChk"
                id="agreeChk"
                type="checkbox"
                value="Y"
              ></input>
              <label htmlFor="agreeChk">
                개인정보 수집 · 이용에 동의합니다.
              </label>
            </div>
            <h4 className="title">출금</h4>
            <table className="table_withdraw">
              <tbody className="tbody_withdraw">
                <tr>
                  <th>은행명</th>
                  <td colSpan="3">
                    <select
                      className="select_withdraw"
                      value={selectedBank}
                      onChange={handleBankChange}
                    >
                      <option value="국민은행">국민은행</option>
                      <option value="기업은행">기업은행</option>
                      <option value="신한은행">신한은행</option>
                      <option value="하나은행">하나은행</option>
                      <option value="우체국">우체국</option>
                      <option value="SC제일은행">SC제일은행</option>
                      <option value="시티은행">시티은행</option>
                      <option value="수협">수협</option>
                      <option value="신협">신협</option>
                    </select>
                  </td>
                  <th>이체수수료</th>
                  <td colSpan="3">{fee}</td>
                </tr>
                <tr>
                  <th>출금계좌번호</th>
                  <td colSpan="3">
                    <input
                      type="text"
                      value={accountHolderName}
                      onChange={(e) => setAccountHolderName(e.target.value)}
                      className="input_box_withdraw"
                    />
                  </td>
                  <th>출금액</th>
                  <td colSpan="3">
                    {" "}
                    <input
                      type="text"
                      value={withdrawPrice}
                      onChange={(e) => setWithdrawPrice(e.target.value)}
                      className="input_box_withdraw"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="container_withdraw">
              <button className="cancel_button">취소</button>
              <button
                className="confirm_button"
                onClick={() => setShowConfirmationPopup(true)} // 팝업 상태를 true로 설정
              >
                확인
              </button>
            </div>
            <img src="withdraw_process.png" className="withdraw_process" />
            <h4 className="title">출금신청 내역 조회</h4>
            <table className="table_withdraw_search">
              <tbody className="tbody_withdraw_search">
                <tr>
                  <th>조회기간</th>
                  <td className="withdraw_transaction_td" colSpan="3">
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
                  <td className="ta_right_submit">
                    <button
                      className="btn_common"
                      id="submit_btn"
                      onClick={handleSearch}
                    >
                      조회
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="search_table">
              <thead>
                <tr>
                  <th>출금요청일</th>
                  <th>은행</th>
                  <th>출금계좌번호</th>
                  <th>출금액</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody className="search_tbody">
                {withdrawHistory.length === 0 ? (
                  <tr>
                    <td colSpan="5">데이터가 없습니다.</td>
                  </tr>
                ) : (
                  withdrawHistory.map((item, index) => (
                    <tr key={index}>
                      <td>{formatDate(item.createdAt)}</td>
                      <td>{item.withdrawBankName}</td>
                      <td>{item.withdrawAccountNum}</td>
                      <td>{item.price}</td>
                      <td>{item.transactionStatus} 완료</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="empty"></div>
          </div>
        </div>

        {showConfirmationPopup && (
          <div className="popup">
            <div className="popup_inner">
              <h3>출금을 진행하시겠습니까?</h3>
              <button
                onClick={() => {
                  handleWithdraw();
                  setShowConfirmationPopup(false);
                }}
              >
                확인
              </button>
              <button onClick={() => setShowConfirmationPopup(false)}>
                취소
              </button>
            </div>
          </div>
        )}

        {showSuccessMessage && (
          <div className="success_message">
            <p>출금이 성공적으로 진행되었습니다.</p>
          </div>
        )}
      </main>
    </>
  );
};

export default Withdraw;

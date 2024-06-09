import MyPageSideBar from "../../components/sidebar/MyPageSideBar";
import "./Withdraw.css";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Withdraw = () => {
  const [accountHolderName, setAccountHolderName] = useState("동행복권_박현서");
  const [selectedBank, setSelectedBank] = useState("국민은행");
  const [fee, setFee] = useState("300원");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

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

  const data = [
    {
      requestDate: "2024/06/09",
      bank: "국민은행",
      accountNumber: "123-456-7890",
      amount: "100,000",
      status: "처리중",
    },
    {
      requestDate: "2024/06/09",
      bank: "신한은행",
      accountNumber: "124095-120-23090",
      amount: "1,000,000",
      status: "처리중",
    },
  ];

  const handleBankChange = (event) => {
    const newBank = event.target.value;
    setSelectedBank(newBank);
    setFee(fees[newBank]);
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
              <a className="show_total_money_a">총 예치금 0 원</a>
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
              <label for="agreeChk">개인정보 수집 · 이용에 동의합니다.</label>
            </div>
            <h4 className="title">출금 계좌 등록</h4>
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
                  <th>계좌번호</th>
                  <td colSpan="3">
                    <input
                      type="text"
                      value={accountHolderName}
                      onChange={(e) => setAccountHolderName(e.target.value)}
                      className="input_box_withdraw"
                    />
                  </td>
                  <th>예금주명</th>
                  <td colSpan="3">박현서</td>
                </tr>
              </tbody>
            </table>
            <div class="container_withdraw">
              <button class="cancel_button">취소</button>
              <button class="confirm_button">등록</button>
            </div>
            <img src="withdraw_process.png" className="withdraw_process" />
            <h4 className="title">출금신청 내역 조회</h4>
            <table className="table_withdraw_search">
              <tbody className="tbody_withdraw_search">
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
                  <td className="ta_right_submit">
                    <button className="btn_common" id="submit_btn">
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
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="5">데이터가 없습니다.</td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.requestDate}</td>
                      <td>{item.bank}</td>
                      <td>{item.accountNumber}</td>
                      <td>{item.amount}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="empty"></div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Withdraw;

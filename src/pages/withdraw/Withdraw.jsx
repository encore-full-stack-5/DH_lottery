import MyPageSideBar from "../../components/sidebar/MyPageSideBar";
import "./Withdraw.css";
import React, { useEffect, useState } from "react";
const Withdraw = () => {
  const [accountHolderName, setAccountHolderName] = useState("동행복권_박현서");
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
                    <select className="select_withdraw">
                      <option value="국민은행">국민은행</option>
                      <option value="기업은행">기업은행</option>
                      <option value="우리은행">신한은행</option>
                      <option value="하나은행">하나은행</option>
                      <option value="우체국">우체국</option>
                      <option value="SC제일은행">SC제일은행</option>
                      <option value="시티은행">시티은행</option>
                      <option value="수협">수협</option>
                      <option value="신협">신협</option>
                    </select>
                  </td>
                  <th>이체수수료</th>
                  <td colSpan="3">300원</td>
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
          </div>
        </div>
      </main>
    </>
  );
};

export default Withdraw;

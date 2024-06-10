import MyPageSideBar from "../../components/sidebar/MyPageSideBar";
import "./Payment.css";
import React, { useEffect, useState } from "react";

const Payment = () => {
  const [accountHolderName, setAccountHolderName] = useState("동행복권_박현서");

  return (
    <>
      <main>
        <MyPageSideBar />
        <div className="header_article">
          <h3 className="sub_title">충전하기</h3>
          <div>
            <a className="tab_box">가상계좌 입금</a>
            <a className="content-box"></a>
          </div>
        </div>
        <div className="group_content">
          <table className="table">
            <tbody>
              <tr>
                <th>입금내역</th>
                <td>복권 예치금</td>
              </tr>
              <tr>
                <th>금액</th>
                <td>
                  <select>
                    <option value="5000">5,000원</option>
                    <option value="10000">10,000원</option>
                    <option value="30000">30,000원</option>
                    <option value="50000">50,000원</option>
                    <option value="100000">100,000원</option>
                    <option value="200000">200,000원</option>
                    <option value="300000">300,000원</option>
                    <option value="500000">500,000원</option>
                    <option value="700000">700,000원</option>
                    <option value="1000000">1,000,000원</option>
                  </select>
                </td>
              </tr>
              <tr>
                <th>계좌주명</th>
                <td>
                  <input
                    type="text"
                    value={accountHolderName}
                    onChange={(e) => setAccountHolderName(e.target.value)}
                    className="input_box"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div class="payment_container">
            <button class="confirm-button">확인</button>
          </div>
          <div className="list_text_common">
            <ul className="list_content">
              <li>
                예치금이란 인터넷 복권을 구입하실 수 있도록 미리 충전해 둔 복권
                구매용 결제수단입니다.
              </li>
            </ul>
            <ul className="list_content">
              <li>
                가상계좌는 휴대폰 점유인증 후, 케이뱅크의 입금용 010가상계좌가
                제공됩니다.(케이뱅크 고객은 이체 수수료 무료)
              </li>
            </ul>
            <ul className="list_content">
              <li>회원탈퇴 또는 휴면계정으로 전환시 입금이 제한됩니다.</li>
            </ul>
            <ul className="list_content">
              <li className="list_content_alert">
                예치금충전은 먼저 입금액을 선택 후 입금하시고, 입금시 계좌번호와
                입금액, 계좌주명을 꼭 확인하십시오.
              </li>
            </ul>
            <ul className="list_content">
              <li>
                입금용 계좌번호로 입금이 확인되면 예치금으로 바로 충전되며,
                입금완료 후 예치금 확인까지는 최대 5분 정도 소요될 수 있습니다.
              </li>
            </ul>
            <ul className="list_content">
              <li className="list_content_blue">
                예치금 입금용 케이뱅크 가상계좌는 주식회사 동행복권에서 모계좌를
                개설한 것으로, 각 회원 소유의 금융계좌가 아닙니다.
              </li>
            </ul>
          </div>
          <div className="box_process_vertical_tit">예치금충전 절차</div>
          <img src="process.png" className="process" />
        </div>
      </main>
    </>
  );
};

export default Payment;

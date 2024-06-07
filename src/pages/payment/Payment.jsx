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
        </div>
      </main>
    </>
  );
};

export default Payment;

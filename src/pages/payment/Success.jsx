import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Success.css"; // 추가된 스타일 파일

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userId, setUserId] = useState("1");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const serverAddr = "http://34.46.237.231:30421/api/v1/payments/success";
  useEffect(() => {
    const requestData = {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
    };

    async function confirm() {
      const { orderId, amount, paymentKey } = requestData;
      const token = localStorage.getItem("Authorization"); // 로컬 스토리지에서 토큰 가져오기
      console.log("token==================", token);
      const response = await fetch(
        `${serverAddr}?orderId=${orderId}&amount=${amount}&paymentKey=${paymentKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // 헤더에 토큰 추가
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        navigate(`/fail?message=${json.message}&code=${json.code}`);
        return;
      }

      setPaymentDetails(json); // 응답 데이터를 상태에 저장
    }
    confirm();
  }, [searchParams, userId, navigate]);

  const formatApprovedAt = (approvedAt) => {
    const date = new Date(approvedAt);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="success_wrapper">
      <div className="success_box_section">
        <div className="success-icon">✔️</div>
        <h2>결제 성공</h2>
        {paymentDetails ? (
          <>
            <p>
              <span>결제 방법:</span> {paymentDetails.method}
            </p>
            <p>
              <span>총 결제 금액:</span>{" "}
              {Number(paymentDetails.totalAmount).toLocaleString()}원
            </p>
            <p>
              <span>결제 상태:</span>{" "}
              {paymentDetails.status === "DONE"
                ? "결제 완료"
                : paymentDetails.status}
            </p>
            <p>
              <span>승인 시간:</span>{" "}
              {formatApprovedAt(paymentDetails.approvedAt)}
            </p>
            <p>
              <span>결제 내용:</span> {paymentDetails.orderName}
            </p>
          </>
        ) : (
          <p>결제 정보를 불러오는 중...</p>
        )}
        <a href="/" className="success_button">
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
}

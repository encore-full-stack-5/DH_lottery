import { jwtDecode } from "jwt-decode";
import {
  deleteSelectedTicket,
  getRound,
  getSelectedTicket,
  purchase,
  selectNum,
} from "../../api/pensionBuy";
import "./P_Buying.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const P_Buying = () => {
  const today = new Date();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const [drawDate, setDrawDate] = useState(formatDate(today));
  const [drawEndDate, setDrawEndDate] = useState(formatDate(today));
  const [groupNum, setGroupNum] = useState("모든 조");
  const [autoNumber, setAutoNumber] = useState(["모든 조"]);
  const [selectNumber, setSelectNumber] = useState(["", "", "", "", "", ""]);
  const [getSelectedNum, setGetSelectedNum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [round, setRound] = useState(0);
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [userId, setUserId] = useState("");

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // 자동 번호 생성 로직
  const generateAutoNumber = () => {
    const randomNumbers = Array.from({ length: 6 }, () =>
      getRandomNumber(0, 9)
    );

    setSelectNumber([...randomNumbers]);
  };

  // 자동번호 버튼 클릭 시 동작
  const handleAutoNumberClick = () => {
    generateAutoNumber();
  };

  // 조 선택 버튼 클릭 시 동작
  const handleGroupSelection = (group) => {
    setGroupNum(group);
    setAutoNumber((prevAutoNumber) => [group, ...prevAutoNumber.slice(1)]);
  };

  const handleNumberInput = (number) => {
    setSelectNumber((prevSelectNumber) => {
      const newSelectNumber = [...prevSelectNumber];
      if (selectedIndex !== null) {
        newSelectNumber[selectedIndex] = number;
        setSelectedIndex((prevIndex) => {
          let nextIndex = (prevIndex + 1) % 6;
          while (newSelectNumber[nextIndex] !== "" && nextIndex !== prevIndex) {
            nextIndex = (nextIndex + 1) % 6;
          }
          return nextIndex === prevIndex ? null : nextIndex;
        });
      } else {
        for (let i = 0; i < newSelectNumber.length; i++) {
          if (newSelectNumber[i] === "") {
            newSelectNumber[i] = number;
            break;
          }
        }
      }
      return newSelectNumber;
    });
  };

  const handleSelectNumberClick = (index) => {
    setSelectedIndex(index);
  };

  const saveSelectNumber = async () => {
    let data;
    try {
      if (selectNumber.some((num) => num === "")) {
        alert("구매할 번호를 선택해주세요.");
        return;
      }
      if (groupNum === "모든 조") {
        for (let i = 1; i <= 5; i++) {
          data = [round, i, ...selectNumber];
          await selectNum(data); // selectNum이 비동기 함수로 가정
        }
      } else {
        const num = Number(groupNum.split("조")[0]);
        data = [round, num, ...selectNumber];
        await selectNum(data);
      }
    } catch (error) {
      alert(error.response.data);
    }
    setSelectNumber(["", "", "", "", "", ""]);
    setSelectedIndex(null);
    setGroupNum("모든 조");
    getSelected(); // getSelected 함수가 있어야 함
  };

  useEffect(() => {
    setSelectNumber(["", "", "", "", "", ""]);
  }, [errorMessage]);

  const calculateTimeLeft = () => {
    const now = new Date();
    let targetDate = new Date();
  
    // 현재 시간이 0~29분 사이이면, 다음 정각으로 설정
    if (now.getMinutes() < 20) {
      targetDate.setMinutes(20, 0, 0); // 다음 30분
    } else if(now.getMinutes() < 40){
      targetDate.setMinutes(20, 0, 0);
    } else {
      targetDate.setHours(now.getHours() + 1, 0, 0, 0); // 다음 정각
    }
  
    const difference = targetDate - now;
  
    let timeLeft = {};
  
    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeLeft = () => {
    return `${timeLeft.days || 0}일 ${timeLeft.hours || 0}시간 ${
      timeLeft.minutes || 0
    }분`;
  };

  const getSelected = async () => {
    try {
      const d = [round];
      const response = await getSelectedTicket(d);
      setGetSelectedNum(response.data);
      console.log(response.data);
      setUserId(response.data[0].userId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSelectNum = async (selectedNumberId) => {
    try {
      await deleteSelectedTicket(selectedNumberId);
    } catch (error) {
      console.log(error);
    }
    getSelected();
  };

  useEffect(() => {
    getSelected();
    getCurrentRound();
  }, []);
  
  // useEffect(() => {
  //   const token = localStorage.getItem("Authorization")?.split(" ")[1];
  //   console.log(token);
  //   if (token) {
  //     try {
  //       const decoded = jwtDecode(token);
  //       console.log(decoded);
  //       setUserId(decoded.id);
  //     } catch (error) {
  //       console.error("Invalid token", error);
  //     }
  //   } else {
  //     console.error("No token found");
  //   }
  // }, []);

  useEffect(() => {
    const fetchUserBalance = async () => {
      // if (!userId) {
      //   console.error("User ID is not set");
      //   return;
      // }

      try {
        const url = `http://34.46.237.231:30421/api/v1/accounts/${userId}`;
        console.log("Fetching balance from URL:", url);
        const response = await axios.get(url);
        console.log(`response is ${response}`);
        setBalance(response.data.point);
        console.log("Fetched balance:", response.data.point);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    fetchUserBalance();
  }, [userId]);

  const getCurrentRound = async () => {
    try {
      const response = await getRound();
      setRound(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const purchaseTicket = async () => {
    try {
      await purchase();
      alert("구매 완료");
      getSelected();
    } catch (error) {
      if (error.response) {
        // 서버로부터의 응답이 있는 경우
        const { errorCode, errorMessage } = error.response.data;
        alert(error.response.data);
      } else {
        // 서버로부터의 응답이 없는 경우
        console.log(error);
        alert("구매 중 오류가 발생했습니다.");
      }
    }
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("ko-KR").format(number);
  };

  const goToPayment = () => {
    navigate("/payment");
  };

  const goToHistory = () => {
    navigate("/pension_history");
  };

  return (
    <div className="buying_container">
      {/* header */}
      <div className="buying_header">
        <div className="buying_header-left">
          <a href="/winResult" className="buying_result_btn">
            제 {round-1}회 당첨결과 →
          </a>
        </div>
        <div className="buying_header-center">
          <img className="buying_lotto_logo" src="lotto_logo.png" />
        </div>
        <div className="buying_header-right">
          <p className="buying_medium-text">판매 마감까지 남은시간</p>
          <p className="buying_large-text">{formatTimeLeft()}</p>
        </div>
      </div>
      <hr />
      {/* 티켓 */}
      <div className="buying_main-content">
        <div className="buying_ticket-wrapper">
          <div className="buying_main-wrapper">
            <h2 className="buying_price">1,000원</h2>
            <div className="buying_button-group">
              <a className="buying_auto_num" onClick={handleAutoNumberClick}>
                자동번호
              </a>
              <a className="buying_large-button">{groupNum}</a>
              <div className="buying_btn_wrapper">
                {selectNumber.map((number, index) => (
                  <a
                    key={index}
                    className={`buying_btn ${
                      selectedIndex === index ? "selected" : ""
                    }`}
                    onClick={() => handleSelectNumberClick(index)}
                  >
                    {number}
                  </a>
                ))}
              </div>
              <button
                style={{
                  width: "40px",
                  padding: "2px",
                }}
                onClick={saveSelectNumber}
              >
                선택완료
              </button>
            </div>

            <br />
          </div>

          <div className="buying_sub-wrapper">
            <div className="buying_line"></div>
            <div className="buying_info">
              <div className="buying_info-left">
                제 {round}회 추 첨 일 날짜 {drawDate}
              </div>
              <hr />
              <div className="buying_info-right">
                지급기한 날짜 {drawEndDate}
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <div className="buying_input_selection">
        <div className="buying_input_selection-column">
          <p>조선택</p>
          <button
            className="buying_full-width"
            onClick={() => handleGroupSelection("모든 조")}
          >
            모든 조
          </button>
          <div className="buying_input_button-group">
            <button onClick={() => handleGroupSelection("1조")}>1조</button>
            <button onClick={() => handleGroupSelection("2조")}>2조</button>
            <button onClick={() => handleGroupSelection("3조")}>3조</button>
          </div>
          <div className="buying_input_button-group">
            <button onClick={() => handleGroupSelection("4조")}>4조</button>
            <button onClick={() => handleGroupSelection("5조")}>5조</button>
          </div>
        </div>
        <div className="buying_input_selection-column">
          <p>6자리 번호 선택</p>
          <div className="buying_input_button-group">
            <button onClick={() => handleNumberInput(1)}>1</button>
            <button onClick={() => handleNumberInput(2)}>2</button>
            <button onClick={() => handleNumberInput(3)}>3</button>
          </div>
          <div className="buying_input_button-group">
            <button onClick={() => handleNumberInput(4)}>4</button>
            <button onClick={() => handleNumberInput(5)}>5</button>
            <button onClick={() => handleNumberInput(6)}>6</button>
          </div>
          <div className="buying_input_button-group">
            <button onClick={() => handleNumberInput(7)}>7</button>
            <button onClick={() => handleNumberInput(8)}>8</button>
            <button onClick={() => handleNumberInput(9)}>9</button>
          </div>
          <button
            className="buying_zero-button"
            onClick={() => handleNumberInput(0)}
          >
            0
          </button>
        </div>
        <div className="buying_selection-summary">
          <p>내가 선택한 번호</p>
          <div
            style={{
              overflowY: "auto",
              maxHeight: "200px" /* 원하는 높이로 조정 */,
            }}
          >
            {loading ? (
              <p>로딩 중...</p>
            ) : getSelectedNum.length === 0 ? (
              <p>선택번호가 존재하지 않습니다.</p>
            ) : (
              <ul>
                {getSelectedNum.map((number, index) => (
                  <li
                    key={index}
                    style={{
                      padding: "2px 0",
                      marginLeft: "5px",
                      fontSize: "1.2rem",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {`${number.group}조 ${number.first} ${number.second} ${number.third} ${number.fourth} ${number.fifth} ${number.sixth}`}
                    <button
                      style={{ padding: "2px 4px" }}
                      onClick={() => deleteSelectNum(number.selectedNumberId)}
                    >
                      삭제
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="buying_footer">
        <div className="buying_footer-section">
          <button onClick={goToHistory}>구매내역 보기</button>
        </div>
        <div className="buying_footer-section">
          <div className="buying_deposit-info">
            <p>보유중인 예치금</p>
            <button onClick={goToPayment}>충전</button>
          </div>
          <p>{balance}원</p>
        </div>
        <div className="buying_footer-section buying_payment-info">
          <div>
            <p>결제 예정 금액</p>
            <p>
              <b>{formatNumber(getSelectedNum.length * 1000)}</b> 원
            </p>
          </div>
          <button onClick={purchaseTicket}>구매하기</button>
        </div>
      </div>
    </div>
  );
};

export default P_Buying;

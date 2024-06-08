import "../components/plus720/buying720.css";

const P_Buying = () => {
  return (
    <>
      <div
        style={{
          margin: "auto 200px",
        }}
      >
        <div
          style={{
            margin: "auto 30px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* 머릿글 */}
          <div
            style={{
              alignContent: "center",
            }}
          >
            <button>제 ???회 당첨결과 →</button>
            <button>당첨구조 →</button>
          </div>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "0.8rem",
              }}
            >
              1등 월700만원씩 20년간 지급
            </p>
            <p
              style={{
                fontSize: "1.8rem",
              }}
            >
              연금복권720+
            </p>
          </div>
          <div
            style={{
              textAlign: "right",
              alignContent: "center",
            }}
          >
            <p
              style={{
                fontSize: "0.9rem",
              }}
            >
              판매 마감까지 남은시간
            </p>
            <p
              style={{
                fontSize: "1.2rem",
              }}
            >
              남은시간~~
            </p>
          </div>
        </div>
        <hr />
        <div
          style={{
            padding: "20px",
            margin: "auto 80px",
            backgroundColor: "skyblue",
          }}
        >
          {/* 본문 */}
          <div>
            <div
              style={{
                textAlign: "right",
              }}
            >
              <h2>1,000원</h2>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button>자동번호</button>
              <button
                style={{
                  fontSize: "large",
                  padding: "20px 2px",
                }}
              >
                모든 조
              </button>
              <button> </button>
              <button> </button>
              <button> </button>
              <button> </button>
              <button> </button>
              <button> </button>
              <button>선택완료</button>
            </div>
            <br />
            <div
              style={{
                display: "flex",
              }}
            >
              <div style={{ marginRight: "10px" }}>
                제 <strong>??</strong>회 추 첨 일 날짜 ~~~
              </div>
              <hr />
              <div style={{ marginLeft: "10px" }}>지급기한 날짜 ~~~</div>
            </div>
          </div>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            margin: "auto 80px",
          }}
        >
          <div style={{ flex: "1", paddingLeft: "10px", paddingRight: "10px" }}>
            <p>조선택</p>
            <button className="full-width">모든 조</button>
            <div className="button-group">
              <button>1조</button>
              <button>2조</button>
              <button>3조</button>
            </div>
            <div className="button-group">
              <button>4조</button>
              <button>5조</button>
            </div>
          </div>
          <div style={{ flex: "1", paddingLeft: "10px", paddingRight: "10px" }}>
            {/* 6자리 번호 선택 */}
            <p>6자리 번호 선택</p>
            <div className="button-group">
              <button>1</button>
              <button>2</button>
              <button>3</button>
            </div>
            <div className="button-group">
              <button>4</button>
              <button>5</button>
              <button>6</button>
            </div>
            <div className="button-group">
              <button>7</button>
              <button>8</button>
              <button>9</button>
            </div>
            <button style={{ width: "31.5%" }}>0</button>
          </div>
          <div
            style={{
              flex: "2",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            {/* 내가 선택한 번호 */}
            <p>내가 선택한 번호</p>
            <p>선택번호가 존재하지 않습니다.</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "whitesmoke",
          }}
        >
          {/* 마무리 */}
          <div
            style={{
              flex: "1",
              textAlignLast: "center",
            }}
          >
            <button>구매내역 보기</button>
          </div>
          <div
            style={{
              flex: "1",
              textAlignLast: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p>보유중인 예치금</p>
              <button>충전</button>
            </div>
            <p>0원</p>
          </div>
          <div
            style={{
              flex: "1.5",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                textAlign: "right",
              }}
            >
              <p>결제 예정 금액</p>
              <p>0 원</p>
            </div>
            <button>구매하기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default P_Buying;

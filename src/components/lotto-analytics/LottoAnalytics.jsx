import "./LottoAnalytics.css";

const LottoAnalytics = () => {
  return (
    <div className="container">
      <div className="center-content">
        <h1 style={{ marginBottom: "40px" }}>
          <strong>당첨 통계</strong>
        </h1>
        <div>
          <div className="card">
            <div className="card-content">
              <div className="card-text">
                <strong>번호별 통게</strong>
                <p
                  style={{
                    marginBottom: "10px",
                    fontSize: "12px",
                    marginTop: "10px",
                  }}
                >
                  기간별로 당첨번호 출현횟수, 빈도수 확인
                </p>
                <a href="/horizontal" className="details-button">
                  자세히 보기
                </a>
              </div>
              <div className="card-image">
                <img src="../../../public/bg_list_stat1.png" alt="저런" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="card-text">
                <strong>색상 통계</strong>
                <p
                  style={{
                    marginBottom: "10px",
                    fontSize: "12px",
                    marginTop: "10px",
                  }}
                >
                  회차별로 당첨번호 색상 확인
                </p>
                <a href="/pie" className="details-button">
                  자세히 보기
                </a>
              </div>
              <div className="card-image">
                <img src="../../../public/bg_list_stat2.png" alt="저런" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="card-text">
                <strong>구간별 출현횟수</strong>
                <p
                  style={{
                    marginBottom: "10px",
                    fontSize: "12px",
                    marginTop: "10px",
                  }}
                >
                  구간대별 당첨번호 출현빈도 확인
                </p>
                <a href="/vertical" className="details-button">
                  자세히 보기
                </a>
              </div>
              <div className="card-image">
                <img src="../../../public/bg_list_stat3.png" alt="저런" />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="card-text">
                <strong>홀짝 통계</strong>
                <p
                  style={{
                    marginBottom: "10px",
                    fontSize: "12px",
                    marginTop: "10px",
                  }}
                >
                  회차별로 홀짝 비율 및 번호합 확인
                </p>
                <a href="/even_odd" className="details-button">
                  자세히 보기
                </a>
              </div>
              <div className="card-image">
                <img src="../../../public/bg_list_stat4.png" alt="저런" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LottoAnalytics;

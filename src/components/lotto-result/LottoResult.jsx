import "./LottoResult.css";

const data = {
  id: 1111,
  number: [1, 20, 31, 14, 45, 26],
  bonus: 7,
  result: [11, 99, 2932, 151473, 2540890],
  result_data: [28118926506, 4686487839, 4686488276, 7573650000, 12704450000],
  result_money: [2556266046, 47338261, 1598393, 50000, 5000],
  totalMoney: 115083786000,
  createAt: "2024-06-01",
};

export const LottoResult = () => {
  const getColorClass = (num) => {
    if (num < 10) {
      return "color-1";
    } else if (num >= 10 && num < 20) {
      return "color-2";
    } else if (num >= 20 && num < 30) {
      return "color-3";
    } else if (num >= 30 && num < 40) {
      return "color-4";
    } else {
      return "color-5";
    }
  };

  const getRankCriteria = (index) => {
    switch (index) {
      case 0:
        return "당첨 숫자 6개";
      case 1:
        return "당첨 숫자 5개 + 보너스 번호";
      case 2:
        return "당첨 숫자 5개";
      case 3:
        return "당첨 숫자 4개";
      case 4:
        return "당첨 숫자 3개";
      default:
        return "기타";
    }
  };

  return (
    <div style={{ marginTop: "5%" }}>
      <div className="card-container">
        <div className="card" style={{ maxWidth: "70%" }}>
          <div className="base">
            <h1>
              <strong style={{ color: "red" }}>{data.id}</strong> 당첨결과
            </h1>
          </div>
          <div className="base">
            <p
              style={{ marginTop: "5px", marginBottom: "15px" }}
            >{`(${data.createAt})`}</p>
          </div>

          <div className="base">
            {data.number.map((num, index) => {
              const colorClass = getColorClass(num);

              return (
                <div
                  key={index}
                  className={`lotto-ball ${colorClass}`}
                  style={{
                    marginTop: "20px",
                    marginRight: "30px",
                  }}
                >
                  <p style={{ margin: "8px" }}>
                    <span>{num}</span>
                  </p>
                </div>
              );
            })}
            <p
              style={{
                marginTop: "20px",
                marginRight: "30px",
                width: "70px",
                height: "70px",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "50px",
                fontWeight: "bold",
              }}
            >
              +
            </p>
            <div
              className={`lotto-ball ${getColorClass(data.bonus)}`}
              style={{
                marginTop: "20px",
                marginRight: "30px",
              }}
            >
              <p style={{ margin: "8px" }}>
                <span>{data.bonus}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>순위</th>
                <th>등수별 총 당첨금액</th>
                <th>등수별 당첨 인원 수</th>
                <th>인원별 당첨금액</th>
                <th>당첨 기준</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              {data.result_data.map((d, index) => (
                <tr id={index}>
                  <td>{index + 1}</td>
                  <td>{d} 원</td>
                  <td>{data.result[index]}</td>
                  <td>{data.result_money[index]} 원</td>
                  <td>{getRankCriteria(index)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="end_line">
          <p>- 총판매금액 : {data.totalMoney} 원</p>
        </div>
      </div>
    </div>
  );
};

export default LottoResult;

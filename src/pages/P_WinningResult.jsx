import React, { useEffect, useState } from "react";
import { getAll, getBonusByRound, getDrawByRound } from "../api/pensionResult"
import ResultSideBar from "../components/sidebar/ResultSideBar";
import "../components/sidebar/ResultSideBar.css";
import "../css/P_WinningResult.css";

const P_WinningResult = () => {
  const [selectedRound, setSelectedRound] = useState(1);
  const [results, setResults] = useState([]);
  const [allResult, setAllResult] = useState([]);
  const [date, setDate]= useState("");
  const [bonus, setBonus]= useState([]);

  useEffect(() => {
    getAllResult();
  }, []);

  const getAllResult = async () => {
    try {
      const response = await getAll();
      setAllResult(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    console.log(allResult);
  }

  useEffect(() => {
    console.log(allResult);
  }, [allResult]);

  const handleRoundChange = (e) => {
    setSelectedRound(e.target.value);
  };
  

  const handleSearch = async () => {
    console.log(selectedRound);
    try {
      const response = await getDrawByRound(selectedRound);
      const res = await getBonusByRound(selectedRound);
      setResults(response.data);
      setBonus(res.data);
      setDate(response.data[0].drawDate);
      console.log(response.data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log(date);
  }, [date]);

  const renderRoundOptions = () => {
    return allResult.map((item, index) => (
      <option key={index} value={index + 1}>
        {index + 1}
      </option>
    ));
  };

  return (
    <>
      <div className="container-wrap">
        <ResultSideBar />
        <section className="content-section">
          <div className="winResult">
            <div className="header-container">
              <h4 style={{ fontSize: "28px", fontWeight: "300" }}>
                <strong
                  style={{
                    fontWeight: "500",
                    color: "#d43301",
                    paddingRight: "10px",
                  }}
                >
                  {selectedRound}회
                </strong>
                당첨결과
              </h4>
              <p>({date}  추첨) </p>

              <div className="search-container">
                <select
                  className="result-select"
                  style={{
                    width: "100px",
                    padding: "10px",
                    fontSize: "16px",
                    marginRight: "10px",
                  }}
                  value={selectedRound}
                  onChange={handleRoundChange}
                >
                  {allResult.length > 0 && renderRoundOptions()}
                </select>
                <button
                  className="search-button"
                  onClick={handleSearch}
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#d43301",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Search
                </button>
              </div>
            </div>

            {results.length > 0 && (
              <div className="results-container">
                {results.map((result) => (
                  <div key={result.id} className="numWrap">
                    <dl className="prize-winner">
                      <dt className="prize-winner-place" style={{ paddingRight: "10px" }}>
                        1등
                      </dt>
                      <dd>
                        월<span className="num"> 700</span>만원x
                        <span className="num">20</span>년
                      </dd>
                    </dl>
                    <div className="win720-num">
                      <div className="group">
                        <span className="group-num-wrap">
                          <span className="group-num g-num">{result.groupNum}조</span>
                        </span>
                      </div>
                      <span className="group-num-wrap">
                        <span className="group-num num1">{result.firstNum}</span>
                      </span>
                      <span className="group-num-wrap">
                        <span className="group-num num2">{result.secondNum}</span>
                      </span>
                      <span className="group-num-wrap">
                        <span className="group-num num3">{result.thirdNum}</span>
                      </span>
                      <span className="group-num-wrap">
                        <span className="group-num num4">{result.fourthNum}</span>
                      </span>
                      <span className="group-num-wrap ">
                        <span className="group-num num5">{result.fifthNum}</span>
                      </span>
                      <span className="group-num-wrap num6">
                        <span className="group-num num6">{result.sixthNum}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

        {bonus.length > 0 && (
                    <div className="results-container">
                  {bonus.map((bonus) => (
                    <div key={bonus.id} className="numWrap">
                      <dl className="prize-winner">
                        <dt className="prize-winner-place" style={{ paddingRight: "10px" }}>
                          보너스
                        </dt>
                        <dd>
                          월<span className="num"> 100</span>만원x
                          <span className="num">10</span>년
                        </dd>
                      </dl>
                      <div className="win720-num">
                        <div className="group">
                         
                        </div>
                        <span className="group-num-wrap">
                          <span className="group-num num1">{bonus.firstNum}</span>
                        </span>
                        <span className="group-num-wrap">
                          <span className="group-num num2">{bonus.secondNum}</span>
                        </span>
                        <span className="group-num-wrap">
                          <span className="group-num num3">{bonus.thirdNum}</span>
                        </span>
                        <span className="group-num-wrap">
                          <span className="group-num num4">{bonus.fourthNum}</span>
                        </span>
                        <span className="group-num-wrap ">
                          <span className="group-num num5">{bonus.fifthNum}</span>
                        </span>
                        <span className="group-num-wrap num6">
                          <span className="group-num num6">{bonus.sixthNum}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </section>
      </div>
    </>
  );
};

export default P_WinningResult;

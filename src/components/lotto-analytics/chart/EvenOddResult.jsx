import React, { useEffect, useState } from "react";
import "./EvenOddResult.css";
import { getOddEven } from "../../../api/lottoResult";


  const setBackkGroundColor = (number) => {
    
    if (number <= 10) return "#ff5733";
    if (number <= 20) return "#33c1ff";
    if (number <= 30) return "#33ff57";
    if (number <= 40) return "#8a2be2";
    return "darkgrey";
  };

  const isOdd = (number) => number % 2 !== 0;

  const EvenOddResult = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      // Fetching data from API
      const fetchData = async () => {
        try {
          const res = await getOddEven();
          const fetchedData = res.data;

          const sortedData = fetchedData.map(entry => {
            const sortedNumbers = [entry.first, entry.second, entry.third, entry.fourth, entry.fifth, entry.sixth].sort((a, b) => isOdd(b) - isOdd(a));
            return { ...entry, sortedNumbers };
          });

          setData(sortedData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <div className="container-eo">
      <div className="center-content-eo">
        <h1 style={{ marginBottom: "40px" }}>
          <strong>당첨 통계</strong>
        </h1>
        <div className="cards-container-eo">
          {data.map((entry) => (
            <div className="card-eo">
              <h3 style={{ marginTop: "5px", marginRight: "30px" }}>
                {entry.id} 회차
              </h3>
              <div className="balls-container-eo">
                {entry.sortedNumbers.map((number, index) => (
                  <div
                    key={index}
                    className={`ball-eo ${isOdd(number) ? "odd" : "even"}`}
                    style={{ backgroundColor: setBackkGroundColor(number) }}
                  >
                    {number}
                  </div>
                ))}
              </div>
              <p
                style={{
                  marginLeft: "40px",
                  marginTop: "10px",
                  fontSize: "20px",
                }}
              >
                홀수: {[entry.first, entry.second, entry.third, entry.fourth, entry.fifth, entry.sixth].filter(isOdd).length}개, 짝수: {[entry.first, entry.second, entry.third, entry.fourth, entry.fifth, entry.sixth].filter((n) => !isOdd(n)).length}개
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvenOddResult;

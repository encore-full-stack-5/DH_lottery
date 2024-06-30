import React, { useEffect, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { getHorizontal } from "../../../api/lottoResult";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const HorizontalBar = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  
  const lottoRanges = [
    { label: "1~10번", start: 1, end: 10 },
    { label: "11~20번", start: 11, end: 20 },
    { label: "21~30번", start: 21, end: 30 },
    { label: "31~40번", start: 31, end: 40 },
    { label: "41~45번", start: 41, end: 45 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getHorizontal();
        const fetchedData = res.data.horizontal;
        
        const labels = lottoRanges.map((range) => range.label); 
        const values = fetchedData;

        const chartData = {
          labels,
          datasets: [
            {
              label: "구간별 출현횟수",
              data: values,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        setData(chartData); // Set the processed data to the state
      } catch (error) {
        console.error("Error fetching data:", error); // Handle potential errors
      }
    };

    fetchData(); // Call fetchData when component mounts
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        marginTop: "50px",
      }}
    >
      <h1>구간별 출현횟수</h1>
      <div
        style={{
          width: "60%",
          margin: "60px auto",
          marginTop: "40px",
        }}
      >
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default HorizontalBar;

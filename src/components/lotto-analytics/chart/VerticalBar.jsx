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
import { getVertical } from "../../../api/lottoResult";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels2 = [];

for (let i = 0; i < 45; i++) {
  labels2.push(i + 1);
}

const VerticalBar = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getVertical();
        const fetchedData = res.data.vertical;
        
        const labels = labels2;
        const values = fetchedData;

        const chartData = {
          labels: labels,
          datasets: [
            {
              label: "각 로또 번호 당첨 기록",
              data: values,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
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
    indexAxis: "y",
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          autoSkip: false,
          maxTicksLimit: 45,
        },
      },
    },
  };

  return (
    <>
      <div
        style={{
          width: "80%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          height: "100%",
          marginTop: "20px",
        }}
      >
        <Bar data={data} options={options} />
      </div>
    </>
  );
};

export default VerticalBar;

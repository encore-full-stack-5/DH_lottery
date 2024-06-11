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

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = [];

const count = [];
for (let i = 0; i < 45; i++) {
  labels.push(i + 1);
  count.push(Math.floor(Math.random() * 100));
}

const HorizontalBar = () => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "각 로또 번호 당첨 기록",
        data: count,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

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

export default HorizontalBar;

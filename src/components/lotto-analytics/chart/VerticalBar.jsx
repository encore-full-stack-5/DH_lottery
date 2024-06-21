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

const data_random = [];
for (let i = 0; i < 45; i++) {
  data_random.push(Math.floor(Math.random() * 100));
}

const VerticalBar = () => {
  const getRangeNum = (data, start, end) => {
    return data
      .filter((num) => num >= start && num <= end)
      .reduce((acc, num) => acc + num, 0);
  };

  const lottoRanges = [
    { label: "1~10번", start: 1, end: 10 },
    { label: "11~20번", start: 11, end: 20 },
    { label: "21~30번", start: 21, end: 30 },
    { label: "31~40번", start: 31, end: 40 },
    { label: "41~45번", start: 41, end: 45 },
  ];

  const labels = lottoRanges.map((range) => range.label);
  const values = lottoRanges.map((range) =>
    getRangeNum(data_random, range.start, range.end)
  );

  const data = {
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

export default VerticalBar;

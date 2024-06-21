import {
  ArcElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

const labels = ["1번~10번", "11번~20번", "21번~30번", "31번~40번", "41번~45번"];

const count = [];
for (let i = 0; i < 5; i++) {
  count.push(Math.floor(Math.random() * 100));
}

const PieChart = () => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "test",
        data: count,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (a, b) => a + b,
            0
          );
          const percentage = ((value / total) * 100).toFixed(2) + "%";
          return percentage;
        },
        color: "#fff",
        font: {
          weight: "bold",
          size: 14,
        },
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "500px",
          height: "500px",
          // margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginTop: "100px",
          marginRight: "120px",
        }}
      >
        <Pie data={data} options={options} />
      </div>
      <div style={{ marginTop: "50px" }}>
        {data.labels.map((label, index) => (
          <div key={index} style={{ marginBottom: "5px" }}>
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "12px",
                backgroundColor: data.datasets[0].backgroundColor[index],
                marginRight: "10px",
              }}
            ></span>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;

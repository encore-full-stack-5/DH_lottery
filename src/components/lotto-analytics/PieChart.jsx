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

const labels = ["1~10", "11~20", "21~30", "31~40", "41~45"];

const count = [123, 245, 168, 114, 50];

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
    <>
      <div
        style={{
          width: "500px",
          height: "500px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginTop: "100px",
        }}
      >
        <Pie data={data} options={options} />
      </div>
    </>
  );
};

export default PieChart;

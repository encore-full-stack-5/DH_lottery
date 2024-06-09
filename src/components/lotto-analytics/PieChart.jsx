import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

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
        <Pie data={data} width="100px" height="100px" />
      </div>
    </>
  );
};

export default PieChart;

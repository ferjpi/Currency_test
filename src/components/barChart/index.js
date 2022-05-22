import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { BarContainerStyle } from "../../assets/styles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Currencies",
    },
  },
};

function BarChart({ data }) {
  console.log("dataaa: ", data);
  return (
    <BarContainerStyle>
      <Bar options={options} data={data} />
    </BarContainerStyle>
  );
}

export default BarChart;

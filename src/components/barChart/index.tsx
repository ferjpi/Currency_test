import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  CoreChartOptions,
  ElementChartOptions,
  PluginChartOptions,
  DatasetChartOptions,
} from "chart.js";
import { _DeepPartialObject } from "chart.js/types/utils";
import { IChartList } from "../../models";
import React from "react";
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

type Options = _DeepPartialObject<
  CoreChartOptions<"bar"> &
    ElementChartOptions<"bar"> &
    PluginChartOptions<"bar"> &
    DatasetChartOptions<"bar">
>;

const options: Options = {
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

function BarChart({ data }: { data: IChartList }) {
  return (
    <BarContainerStyle>
      <Bar options={options} data={data} />
    </BarContainerStyle>
  );
}

export default BarChart;

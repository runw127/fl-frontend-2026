"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import {
  getGridConfig,
  getXAxisConfig,
  getYAxisConfig,
} from "@/lib/appex-chart-options";

const BasicLineChart = ({ height = 300 }) => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();

  const theme = themes.find((theme) => theme.name === config);

  // Updated data with more differences between clients and convergence around 0.89
  const series = [
    {
      name: "AUMC",
      data: [0.55, 0.62, 0.72, 0.74, 0.75, 0.77, 0.78, 0.80, 0.82, 0.83, 0.84, 0.85, 0.86, 0.87, 0.88, 0.88, 0.88, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89],
    },
    {
      name: "MRC-GAMBIA",
      data: [0.53, 0.6, 0.68, 0.71, 0.73, 0.75, 0.76, 0.78, 0.79, 0.81, 0.82, 0.83, 0.84, 0.85, 0.86, 0.86, 0.87, 0.87, 0.88, 0.88, 0.88, 0.88, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89],
    },
    {
      name: "APOLLO",
      data: [0.5, 0.58, 0.67, 0.69, 0.71, 0.73, 0.75, 0.76, 0.78, 0.79, 0.80, 0.81, 0.82, 0.83, 0.84, 0.85, 0.86, 0.86, 0.87, 0.87, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89],
    },

    {
      name: "BARTS",
      data: [0.5, 0.58, 0.67, 0.69, 0.71, 0.73, 0.75, 0.76, 0.78, 0.79, 0.80, 0.81, 0.82, 0.83, 0.84, 0.85, 0.86, 0.86, 0.87, 0.87, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.88, 0.89, 0.89, 0.89, 0.89, 0.89, 0.89],
    },
  ];

  const options = {
    chart: {
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
          customIcons: []
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 5,
      shape: "circle", // Circle shape for data points
    },
    colors: ['#FF4560', '#00E396', '#008FFB', '#002FFB'], // Different colors for each client
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    grid: getGridConfig(
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird})`
    ),
    yaxis: getYAxisConfig(
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`
    ),
    xaxis: {
      ...getXAxisConfig(
        `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`
      ),
      categories: Array.from({ length: 100 }, (_, i) => i + 1), // 100 communication rounds on the x-axis
      title: {
        text: 'Communication Rounds',
      },
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      height={height}
      width={"100%"}
    />
  );
};

export default BasicLineChart;

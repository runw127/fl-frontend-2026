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

const ValidationLossChart = ({ height = 300 }) => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();

  const theme = themes.find((theme) => theme.name === config);

  // Example validation loss data for 3 clients, corresponding to accuracy plots
  const series = [
    {
      name: "AUMC",
      data: [1.2, 1.1, 0.9, 0.85, 0.82, 0.8, 0.78, 0.75, 0.72, 0.7, 0.68, 0.67, 0.65, 0.63, 0.62, 0.61, 0.6, 0.6, 0.59, 0.58, 0.58, 0.57, 0.57, 0.56, 0.56, 0.55, 0.55, 0.54, 0.54, 0.53, 0.53, 0.52, 0.52],
    },
    {
      name: "MRC-GAMBIA",
      data: [1.4, 1.2, 1.0, 0.88, 0.85, 0.82, 0.8, 0.77, 0.75, 0.73, 0.72, 0.7, 0.68, 0.67, 0.66, 0.65, 0.63, 0.63, 0.62, 0.61, 0.61, 0.6, 0.6, 0.59, 0.59, 0.58, 0.58, 0.57, 0.57, 0.56, 0.56, 0.55, 0.55],
    },
    {
      name: "APOLLO",
      data: [1.5, 1.3, 1.1, 0.92, 0.88, 0.85, 0.82, 0.8, 0.78, 0.76, 0.74, 0.73, 0.71, 0.7, 0.68, 0.67, 0.66, 0.65, 0.64, 0.63, 0.63, 0.62, 0.62, 0.61, 0.61, 0.6, 0.6, 0.59, 0.59, 0.58, 0.58, 0.57, 0.57],
    },
    {
      name: "BARTS",
      data: [1.5, 1.3, 1.1, 0.92, 0.88, 0.85, 0.82, 0.8, 0.78, 0.76, 0.74, 0.73, 0.71, 0.7, 0.68, 0.67, 0.66, 0.65, 0.64, 0.63, 0.63, 0.62, 0.62, 0.61, 0.61, 0.6, 0.6, 0.59, 0.59, 0.58, 0.58, 0.57, 0.57],
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

export default ValidationLossChart;

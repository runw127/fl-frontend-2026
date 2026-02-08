"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import {
  getGridConfig,
  getLabel,
  getYAxisConfig,
} from "@/lib/appex-chart-options";

const GroupedBar = ({ height = 350 }) => {
  const { theme: config, setTheme: setConfig, isRtl } = useThemeStore();
  const { theme: mode } = useTheme();

  const theme = themes.find((theme) => theme.name === config);

  const series = [
    {
      name: "Local Training",
      data: [78, 82, 75, 80, 79, 77],  // Example accuracies for local training
    },
    {
      name: "Federated Learning",
      data: [88, 85, 83, 82, 81, 80],  // Example accuracies for FL training
    },
  ];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -10,
      style: {
        fontSize: "12px",
        fontWeight: 700,
        colors: [
          `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
        ],
      },
    },
    stroke: {
      show: false,
      width: 1,
      colors: [
        `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
      ],
    },
    colors: [
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary})`, // Dark blue for Local Training
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].info})`,    // Light blue for FL Training
    ],
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    grid: getGridConfig(
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird})`
    ),
    xaxis: {
      categories: [
        "Iron Deficiency",
        "Influenza Classification",    // Blood count-related ML models
        "Iron deficiency classification",
        "Leukemia Detection-v.1.2.1",
        "Leukemia Detection-v.1.2.0"
      ],
      labels: getLabel(
        `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`
      ),
      title: {
        text: 'Avg. Accuracy (%)',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
        }
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: getLabel(
        `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`
      ),
      max: 100, // X-axis scale goes from 0 to 100 for accuracy percentage
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    legend: {
      labels: {
        colors: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
        offsetX: isRtl ? 5 : -5,
      },
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={height}
      width={"100%"}
    />
  );
};

export default GroupedBar;

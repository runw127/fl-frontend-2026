"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import {
  getGridConfig,
  getLabel,
} from "@/lib/appex-chart-options";

const PrecisionRecallChart = ({ height = 350 }) => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  const series = [
    {
      name: "Model 1 PR Curve",
      data: [
        [0, 1],    // Example Recall, Precision at different thresholds for Model 1
        [0.1, 0.85],
        [0.2, 0.80],
        [0.3, 0.78],
        [0.4, 0.75],
        [0.5, 0.72],
        [0.6, 0.7],
        [0.7, 0.68],
        [0.8, 0.66],
        [0.9, 0.65],
        [1, 0.6],   // Maximum Recall is 1, Precision drops to 0.6
      ],
    },
    {
      name: "Model 2 PR Curve",
      data: [
        [0, 1],    // Model 2 performing better than Model 1
        [0.1, 0.9],
        [0.2, 0.85],
        [0.3, 0.83],
        [0.4, 0.82],
        [0.5, 0.8],
        [0.6, 0.78],
        [0.7, 0.76],
        [0.8, 0.75],
        [0.9, 0.74],
        [1, 0.7],
      ],
    },
    {
      name: "Model 3 PR Curve",
      data: [
        [0, 1],    // Model 3 performing worse than both Model 1 and Model 2
        [0.1, 0.6],
        [0.2, 0.58],
        [0.3, 0.56],
        [0.4, 0.54],
        [0.5, 0.52],
        [0.6, 0.51],
        [0.7, 0.5],
        [0.8, 0.48],
        [0.9, 0.46],
        [1, 0.45],
      ],
    },
  ];

  const options = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      type: 'numeric', // Treat the x-axis as a continuous numeric value
      title: {
        text: 'Recall',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
        }
      },
      labels: {
        formatter: (val) => (val === 0 || val === 1 ? val : val.toFixed(1)), // Show values like 0, 0.2, 0.4... 1
        style: {
          colors: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
          fontSize: '12px',
        },
      },
      min: 0,
      max: 1,
      tickAmount: 6, // Create 6 ticks: 0, 0.2, 0.4, 0.6, 0.8, 1
    },
    yaxis: {
      title: {
        text: 'Precision',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
        }
      },
      min: 0,
      max: 1,
      tickAmount: 6,  // Step is set to 0.2 (0, 0.2, 0.4, 0.6, 0.8, 1)
      decimalsInFloat: 1,
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Inter',
          colors: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`
        },
      },
    },
    grid: getGridConfig(
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird})`
    ),
    tooltip: {
      x: {
        formatter: (val) => `Recall: ${val.toFixed(2)}`, // Display two decimal places in tooltip
      },
      y: {
        formatter: (val) => `Precision: ${val.toFixed(2)}`, // Display two decimal places in tooltip
      },
      theme: mode === "dark" ? "dark" : "light",
    },
    colors: [
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].success})`, // PR curve for Model 1
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].info})`,    // PR curve for Model 2
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].destructive})`, // PR curve for Model 3
    ],
    markers: {
      size: 4,
    },
    legend: {
      labels: {
        colors: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
      },
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

export default PrecisionRecallChart;

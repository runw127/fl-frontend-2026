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

const AUROCChart = ({ height = 350 }) => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  const series = [
    {
      name: "Iron-Def-XGBoost",
      data: [
        [0, 0],   // Example FPR, TPR at different thresholds for Model 1
        [0.1, 0.6],
        [0.2, 0.75],
        [0.3, 0.82],
        [0.4, 0.88],
        [0.5, 0.90],
        [0.6, 0.92],
        [0.7, 0.94],
        [0.8, 0.95],
        [0.9, 0.97],
        [1, 1],   // Maximum TPR, FPR is at (1,1)
      ],
    },
    {
      name: "Iron-Def-MLP",
      data: [
        [0, 0],   // Model 2 performing better than Model 1
        [0.1, 0.7],
        [0.2, 0.85],
        [0.3, 0.89],
        [0.4, 0.93],
        [0.5, 0.94],
        [0.6, 0.96],
        [0.7, 0.97],
        [0.8, 0.98],
        [0.9, 0.99],
        [1, 1],
      ],
    },
    {
      name: "Local Training",
      data: [
        [0, 0],   // Model 3 performing worse than both Model 1 and Model 2
        [0.1, 0.4],
        [0.2, 0.5],
        [0.3, 0.6],
        [0.4, 0.68],
        [0.5, 0.7],
        [0.6, 0.72],
        [0.7, 0.75],
        [0.8, 0.78],
        [0.9, 0.8],
        [1, 1],
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
        text: 'False Positive Rate (FPR)',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
        }
      },
      labels: {
        formatter: (val) => val.toFixed(1), // Show one decimal place for the x-axis
        style: {
          colors: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
          fontSize: '12px',
        },
      },
      min: 0,
      max: 1,
      tickAmount: 9, // Create 6 ticks: 0, 0.2, 0.4, 0.6, 0.8, 1
    },
    yaxis: {
      title: {
        text: 'True Positive Rate (TPR)',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
        }
      },
      min: 0,
      max: 1,
      tickAmount: 9,  // Step is set to 0.2 (0, 0.2, 0.4, 0.6, 0.8, 1)
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
        formatter: (val) => `FPR: ${val.toFixed(2)}`, // Display two decimal places in tooltip
      },
      y: {
        formatter: (val) => `TPR: ${val.toFixed(2)}`, // Display two decimal places in tooltip
      },
      theme: mode === "dark" ? "dark" : "light",
    },
    colors: [
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].success})`, // AUROC curve for Model 1
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].info})`,    // AUROC curve for Model 2
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].destructive})`, // AUROC curve for Model 3
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

export default AUROCChart;

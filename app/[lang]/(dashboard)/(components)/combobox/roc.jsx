"use client";
import dynamic from "next/dynamic";
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import { nonEuropeans, oldEuropeans, youngEuropeans, newDonors } from './roc.data';
import { getGridConfig, getLabel } from "@/lib/appex-chart-options";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const AUROCChart = ({ height = 350, clientId }) => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  const series = [nonEuropeans, oldEuropeans, youngEuropeans, newDonors];

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
      series={series[clientId]}
      type="line"
      height={height}
      width={"100%"}
    />
  );
};

export default AUROCChart;

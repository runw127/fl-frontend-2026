import React from 'react';
import dynamic from "next/dynamic";
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import { nonEuropeans, oldEuropeans, youngEuropeans, newDonors } from './precision.data';
import { getGridConfig, getLabel } from "@/lib/appex-chart-options";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PrecisionRecallChart = ({ height = 350, clientId }) => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  const allSeriesData = [nonEuropeans, oldEuropeans, youngEuropeans, newDonors];
  const selectedSeries = allSeriesData[clientId];

  // Clamp data to ensure x-values stay between 0 and 1
  const series = selectedSeries.map(item => ({
    name: item.name,
    data: item.data.map(([x, y]) => ({
      x: Math.min(Math.max(x, 0), 1.0), // Clamp x between 0 and 1
      y: Math.min(Math.max(y, 0), 1.0), // Optionally clamp y as well
    }))
  }));

  const options = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
        
      },
      animations: {
        enabled: false
      },
      zoom: { // Add this zoom property
        enabled: false // Set enabled to false to disable zooming
      },
      animations: {
        enabled: false
      }
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      type: 'numeric',
      title: {
        text: 'Recall',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
        }
      },
      min: 0,
      max: 1.0,         // Strictly end at 1.0
      tickAmount: 5,    // Ticks at 0.0, 0.2, 0.4, 0.6, 0.8, 1.0
      labels: {
        formatter: (val) => val.toFixed(1),
        style: {
          colors: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`,
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      overwriteCategories: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0], // Force specific tick values
      range: 1.0,       // Explicitly set range to 1.0
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
      tickAmount: 5,
      decimalsInFloat: 1,
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Inter',
          colors: `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`
        },
        formatter: (val) => val.toFixed(1),
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
    },
    grid: getGridConfig(
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird})`
    ),
    tooltip: {
      x: {
        formatter: (val) => `Recall: ${val.toFixed(2)}`,
      },
      y: {
        formatter: (val) => `Precision: ${val.toFixed(2)}`,
      },
      theme: mode === "dark" ? "dark" : "light",
    },
    colors: [
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].success})`,
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].info})`,
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].destructive})`,
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
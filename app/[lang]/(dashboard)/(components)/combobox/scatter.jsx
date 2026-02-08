"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import { getGridConfig, getLabel } from "@/lib/appex-chart-options";

const BasicScatter = ({ height = 300 }) => {
  const { theme: config, setTheme: setConfig, isRtl } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  const series = [
    {
      name: "Not iron deficient",
      data: Array(800).fill().map(() => [
        65 + Math.random() * 50,
        120 + Math.random() * 55
      ])
    },
    {
      name: "Iron deficient",
      data: Array(350).fill().map(() => [
        70 + Math.random() * 35,
        110 + Math.random() * 40
      ])
    }
  ];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
        type: "xy",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 0,
    },
    colors: [
      `#1f77b4`, // Blue for "Not iron deficient"
      `#ff7f0e`, // Orange for "Iron deficient"
    ],
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    grid: getGridConfig(
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird})`
    ),
    legend: {
      itemMargin: {
        vertical: 10,
      },
      labels: {
        colors: `hsl(${
          theme?.cssVars[
            mode === "dark" || mode === "system" ? "dark" : "light"
          ].chartLabel
        })`,
      },
    },
    fill: {
      opacity: 0.8,
    },
    markers: {
      size: 2, // Reduce the size of the points
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        ...getLabel(
          `hsl(${
            theme?.cssVars[
              mode === "dark" || mode === "system" ? "dark" : "light"
            ].chartLabel
          })`
        ),
        formatter: function(val) {
          return Math.round(val); // Round to nearest integer
        }
      },
      title: {
        text: 'HGB (g/L)',
      },
      min: 110,
      max: 180,
      tickAmount: 7, // This will create 8 ticks, resulting in a step of 10
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: getLabel(
        `hsl(${
          theme?.cssVars[
            mode === "dark" || mode === "system" ? "dark" : "light"
          ].chartLabel
        })`
      ),
      title: {
        text: 'MCV (fL)',
      },
      min: 60,
      max: 120,
      tickAmount: 6, // This will create 7 ticks, resulting in a step of 10
    },
    legend: {
      labels: {
        colors: `hsl(${theme?.cssVars[
          mode === "dark" || mode === "system" ? "dark" : "light"
        ].chartLabel
          })`,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 5,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
        offsetX: isRtl ? 5 : -5
      }
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };

  return (
    <>
      <Chart
        options={options}
        series={series}
        type="scatter"
        height={height}
        width={"100%"}
      />
    </>
  );
};

export default BasicScatter;
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
// import { cornersOfRectangle } from "@dnd-kit/core/dist/utilities/algorithms/helpers";

const ReportsChart = ({ series, chartColor, height = 300 }) => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();

  const theme = themes.find((theme) => theme.name === config);

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    colors: [chartColor],
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    grid: getGridConfig(
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird})`
    ),
    fill: {
      type: "gradient",
      colors: chartColor,
      gradient: {
        shadeIntensity: 0.1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [50, 100, 0],
      },
    },
    yaxis: {
      ...getYAxisConfig(
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`
      ),
      title: {
        text: 'Number of Cases',
      },
    },
    xaxis: getXAxisConfig(
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`
    ),
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };

  const barChartoptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['0-18', '19-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100'],
    },
    yaxis: {
      title: {
        text: 'Number of Patients',
      },
    },
    fill: {
      opacity: 1,
    },
    colors: ['#ff9e69', `${chartColor}`],
    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' people';
        },
      },
    },
  };

  const barChartSeries = [
      {
        name: 'Male',
        data: [104, 94, 60, 78, 80, 71, 33, 17, 11],
      },
      {
        name: 'Female',
        data: [113, 84, 66, 73, 91, 71, 60, 25, 22],
      },
  ];

  const bmiData = {
    series: [
      {
        name: 'Number of Patients',
        data: [2091, 1798, 8002, 2819, 221, 25, 22], // Example data for each BMI range
      },
    ],
    options: {
      chart: {
        type: 'bar', // Use 'bar' for the distribution chart
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      colors: ['#FFA500'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['< 18.5 Underweight', '18.5 - 24.9 Normal', '25 - 29.9 Overweight', '30 - 34.9 Obese Class I', '35 - 39.9 Obese Class II', '> 40 Obese Class III'],
        title: {
          text: 'BMI Range',
        },
      },
      yaxis: {
        title: {
          text: 'Number of Patients',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `${val} people`;
          },
        },
      },
    },
  };

  const ethnicityOptions = {
    chart: {
      type: 'line',
      height: 350,
    },
    stroke: {
      curve: 'smooth', // Smooth lines
    },
    xaxis: {
      categories: ['2015','2016' ,'2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'], // X-axis labels (years)
      title: {
        text: 'Year',
      },
    },
    yaxis: {
      title: {
        text: 'Number',
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    colors: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'], // Different colors for different ethnicities
    legend: {
      position: 'top',
    },
  };

  if (series[0].data[0].male)
    return (
      <div className="chart">
        <Chart
          options={barChartoptions}
          series={barChartSeries}
          type="bar"
          height={height}
        />
      </div>
    )

  if (series[0].name === 'BMI Distribution')
    return (
      <>
        <Chart
          options={bmiData.options}
          series={bmiData.series}
          type="bar"
          height={height}
          // width={"100%"}
        />
      </>
    )

  if (series[0].data[0].name)
    return (
      <>
        <Chart
          options={ethnicityOptions}
          series={series[0].data}
          type="line"
          height={height}
        />
      </>
    )
  
  return (
      <>
        <Chart
          options={options}
          series={series}
          type="area"
          height={height}
          width={"100%"}
        />
      </>
  );
};

export default ReportsChart;

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

const IronDeficiencyCharts = ({ height = 300 }) => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();

  const theme = themes.find((theme) => theme.name === config);

  const getChartOptions = (title) => ({
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    title: {
      text: title,
      align: 'center',
      style: { fontSize: '14px', fontWeight: 'bold' },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    colors: ['#0000FF', '#FF0000'], // Blue for not iron deficient, Red for iron deficient
    tooltip: { theme: mode === "dark" ? "dark" : "light" },
    grid: getGridConfig(
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartGird})`
    ),
    yaxis: {
      ...getYAxisConfig(
        `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`
      ),
      title: { text: 'Distribution' },
    },
    xaxis: {
      ...getXAxisConfig(
        `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`
      ),
      title: { text: 'Patient age' },
      categories: Array.from({length: 71}, (_, i) => i + 10),
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    },
  });

  // Mock data - replace with actual data
  const femaleData = {
    notIronDeficient: [0, 0.005, 0.015, 0.026, 0.025, 0.02, 0.018, 0.021, 0.021, 0.018, 0.014, 0.008, 0.003, 0],
    ironDeficient: [0, 0.008, 0.025, 0.032, 0.028, 0.02, 0.019, 0.022, 0.018, 0.013, 0.009, 0.005, 0.001, 0],
  };

  const maleData = {
    notIronDeficient: [0, 0.005, 0.019, 0.018, 0.017, 0.025, 0.022, 0.019, 0.015, 0.01, 0.005, 0.001, 0],
    ironDeficient: [0, 0.003, 0.015, 0.015, 0.014, 0.024, 0.024, 0.023, 0.018, 0.012, 0.006, 0.002, 0],
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/2">
        <Chart
          options={getChartOptions("Patient sex: F")}
          series={[
            { name: "Not iron deficient", data: femaleData.notIronDeficient },
            { name: "Iron deficient", data: femaleData.ironDeficient },
          ]}
          type="line"
          height={height}
          width="100%"
        />
      </div>
      <div className="w-full md:w-1/2">
        <Chart
          options={getChartOptions("Patient sex: M")}
          series={[
            { name: "Not iron deficient", data: maleData.notIronDeficient },
            { name: "Iron deficient", data: maleData.ironDeficient },
          ]}
          type="line"
          height={height}
          width="100%"
        />
      </div>
    </div>
  );
};

export default IronDeficiencyCharts;
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportsChart from "./reports-chart";
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import DashboardSelect from "@/components/dasboard-select";
import { cn } from "@/lib/utils";

const bmiData = [
  { range: '< 18.5', count: 150, category: 'Underweight' },
  { range: '18.5 - 24.9', count: 400, category: 'Normal weight' },
  { range: '25 - 29.9', count: 300, category: 'Overweight' },
  { range: '30 - 34.9', count: 100, category: 'Obesity Class I' },
  { range: '35 - 39.9', count: 50, category: 'Obesity Class II' },
  { range: '≥ 40', count: 20, category: 'Obesity Class III' },
];

const allUsersSeries = [
  {
    data: [{
      male: [10, 20, 30, 25, 15, 12, 8, 5],
      female: [8, 15, 25, 30, 20, 18, 10, 4]
    }]
  },
];
const conversationSeries = [
  {
    data: [
      {
        name: 'Asian',
        data: [9,19,12,8,11,34,9,11,12,7],
      },
      {
        name: 'Black',
        data: [16,17,38,33,20,29,27,15,24,17],
      },
      {
        name: 'White',
        data: [188,236,215,226,265,395,285,227,278,156],
      },
      {
        name: 'Hawaiian',
        data: [4,4,1,3,0,3,3,2,2,0],
      },
      {
        name: 'Native',
        data: [1,1,0,0,0,6,2,1,0,0],
      },
      {
        name: 'Other',
        data: [0,2,4,1,3,1,2,2,3,3],
      }
    ],
  },
];

const newUserSeries = [
  {
    data: [1, 0, 1, 3, 2, 3, 1, 1, 0, 0, 0, 0, 2, 3, 0, 2, 1, 2, 4, 4, 3]
  },
];
const ReportsSnapshot = () => {
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);
  const primary = `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
    })`;
  const warning = `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].warning
    })`;
  const success = `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].success
    })`;
  const info = `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].info
    })`;
  const tabsTrigger = [
    {
      value: "all",
      text: "all patients",
      total: "1153",
      color: "primary",
    },
    {
      value: "conversation",
      text: "Number of FBC",
      total: "2893",
      color: "success",
    },
    {
      value: "event",
      text: "BMI Distribution",
      total: "14978",
      color: "warning",
    },
    {
      value: "newuser",
      text: "Iron Deficiency Tracking",
      total: "34",
      color: "info",
    },
  ];
  const tabsContentData = [
    {
      value: "all",
      series: allUsersSeries,
      color: primary,
    },
    {
      value: "event",
      series: [{
        name: 'BMI Distribution',
        data: bmiData.map(item => item.count),
      }],
      color: warning,
    },
    {
      value: "conversation",
      series: conversationSeries,
      color: success,
    },
    {
      value: "newuser",
      series: newUserSeries,
      color: info,
    },
  ];
  return (
    <Card>
      <CardHeader className="border-none pb-0">
        <div className="flex items-center gap-2 flex-wrap ">
          <div className="flex-1">
            <div className="text-xl font-semibold text-default-900 whitespace-nowrap">
              {/* Reports Snapshot */}
              Patient Overview
            </div>
            <span className="text-xs text-default-600">
              Demographic properties of your patients
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-1 md:p-5">
        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 justify-start w-full bg-transparent h-full">
            {tabsTrigger.map((item, index) => (
              <TabsTrigger
                key={`report-trigger-${index}`}
                value={item.value}
                className={cn(
                  "flex flex-col gap-1.5 p-4 overflow-hidden   items-start  relative before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-1 before:h-[2px] before:w-9 before:bg-primary/50 dark:before:bg-primary-foreground before:hidden data-[state=active]:shadow-none data-[state=active]:before:block",
                  {
                    "bg-primary/30 data-[state=active]:bg-primary/30 dark:bg-primary/70": item.color === "primary",
                    "bg-orange-50 data-[state=active]:bg-orange-50 dark:bg-orange-500": item.color === "warning",
                    "bg-green-50 data-[state=active]:bg-green-50 dark:bg-green-500": item.color === "success",
                    "bg-cyan-50 data-[state=active]:bg-cyan-50 dark:bg-cyan-500 ": item.color === "info",
                  }
                )}
              >
                <span
                  className={cn(
                    "h-10 w-10 rounded-full bg-primary/40 absolute -top-3 -right-3 ring-8 ring-primary/30",
                    {
                      "bg-primary/50  ring-primary/20 dark:bg-primary dark:ring-primary/40": item.color === "primary",
                      "bg-orange-200 ring-orange-100 dark:bg-orange-300 dark:ring-orange-400": item.color === "warning",
                      "bg-green-200 ring-green-100 dark:bg-green-300 dark:ring-green-400": item.color === "success",
                      "bg-cyan-200 ring-cyan-100 dark:bg-cyan-300 dark:ring-cyan-400": item.color === "info",
                    }
                  )}
                ></span>
                <span className="text-sm text-default-800 dark:text-primary-foreground font-semibold capitalize relative z-10">
                  {" "}
                  {item.text}
                </span>
                <span className={`text-lg font-semibold text-${item.color}/80 dark:text-primary-foreground`}>
                  {item.total}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
          {/* charts data */}
          {tabsContentData.map((item, index) => (
            <TabsContent key={`report-tab-${index}`} value={item.value}>
              <ReportsChart series={item.series} chartColor={item.color} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReportsSnapshot;

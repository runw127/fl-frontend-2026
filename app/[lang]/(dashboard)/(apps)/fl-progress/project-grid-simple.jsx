"use client";
import React, { useState, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { deleteProjectAction } from "@/action/project-action";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroup,
} from "@/components/ui/avatar";
import { Icon } from "@iconify/react";
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const prioritiesColorMap = {
  high: "destructive",
  low: "info",
  medium: "warning",
};
import { useTheme } from "next-themes";
// Helper function to create gauge needle
const needle = (value, data, cx, cy, iR, oR, color) => {
  const total = data.reduce((acc, entry) => acc + entry.value, 0);
  const angle = 180 - (value / total) * 180;
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-angle * (Math.PI / 180));
  const cos = Math.cos(-angle * (Math.PI / 180));
  const r = 5;
  const x0 = cx;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle key={`gauge-circle-${value}`} cx={x0} cy={y0} r={r} fill={color} />,
    <path
      key={`gauge-path-${value}`}
      d={`M${xba} ${yba}L${xbb} ${ybb}L${xp} ${yp}L${xba} ${yba}`}
      fill={color}
    />,
  ];
};

// GaugeChart component
const GaugeChart = ({ value, color, height = 80 }) => {
  const cx = 50;
  const cy = 60;
  const iR = 25;
  const oR = 35;

  const data = [
    { name: "Low", value: 33, color: "#22c55e" },
    { name: "Medium", value: 33, color: "#eab308" },
    { name: "High", value: 34, color: "#ef4444" },
  ];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell fill={entry.color} key={`gauge-cell-${index}`} />
          ))}
        </Pie>
        {needle(value, data, cx, cy, iR, oR, color)}
      </PieChart>
    </ResponsiveContainer>
  );
};

const ProjectGrid = ({ project, onEdit }) => {
  const [open, setOpen] = React.useState(false);
  async function onAction(id) {
    await deleteProjectAction(id);
  }
  const { theme: mode } = useTheme();
  
  // Mock usage values based on priority for demonstration
  const usageValues = {
    low: 25,
    medium: 50,
    high: 85
  };

  return (
    <>
      
      <Card>
        <CardHeader className="flex-row items-center gap-3 border-none mb-0">
        <div className="flex-1">
            <Badge
              color={
                project?.status === "review"
                  ? "warning"
                  : project?.status === "completed"
                  ? "success"
                  : project?.status === "in progress"
                  ? "default"
                  : "info"
              }
              variant={mode === "dark" ? "soft" : "soft"}
              className=" capitalize"
            >
              Connected
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 pb-5">
          {/* logo, title,desc */}
     
            <div className="flex gap-2">
              <div>
                <Avatar className="rounded h-14 w-14">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: "#ef2e32" }}>
                        {project.title.charAt(0)}
                      </div>
                </Avatar>
              </div>
              <div>
                <div className="text-base font-semibold text-default-900 capitalize mb-1">
                  {project?.title}
                </div>
                {/* {project?.description && (
                  <div className="text-xs font-medium text-default-600 max-h-[34px]  overflow-hidden">
                    {project?.description}
                  </div>
                )} */}
              </div>
            </div>   
          {/* team, priority */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex flex-col items-center">
              <div className="text-sm font-medium text-default-900 mb-1 text-center">
                CPU Usage:
              </div>
              <div className="w-24 h-20">
                <GaugeChart 
                  value={usageValues[project.priority || 'low']} 
                  color={mode === "dark" ? "#ffffff" : "#000000"}
                  height={80}
                />
              </div>
              <div className="text-xs font-medium mt-1">
                {project.priority ? `${usageValues[project.priority]}%` : "N/A"}
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-sm font-medium text-default-900 mb-1 text-center">
                GPU Usage:
              </div>
              <div className="w-24 h-20">
                <GaugeChart 
                  value={usageValues[project.priority || 'low'] - 5} 
                  color={mode === "dark" ? "#ffffff" : "#000000"}
                  height={80}
                />
              </div>
              <div className="text-xs font-medium mt-1">
                {project.priority ? `${usageValues[project.priority] - 5}%` : "N/A"}
              </div>
            </div>
            
            {/* <div className="flex flex-col items-center">
              <div className="text-sm font-medium text-default-900 mb-1 text-center">
                RAM Usage:
              </div>
              <div className="w-24 h-20">
                <GaugeChart 
                  value={usageValues[project.priority || 'low'] + 10} 
                  color={mode === "dark" ? "#ffffff" : "#000000"}
                  height={80}
                />
              </div>
              <div className="text-xs font-medium mt-1">
                {project.priority ? `${usageValues[project.priority] + 10}%` : "N/A"}
              </div>
            </div>
             */}
            {/* <div className="flex flex-col items-center">
              <div className="text-sm font-medium text-default-900 mb-1 text-center">
                Network Bandwidth:
              </div>
              <div className="w-24 h-20">
                <GaugeChart 
                  value={usageValues[project.priority || 'low'] + 5} 
                  color={mode === "dark" ? "#ffffff" : "#000000"}
                  height={80}
                />
              </div>
              <div className="text-xs font-medium mt-1">
                {project.priority ? `${usageValues[project.priority] + 5}%` : "N/A"}
              </div>
            </div> */}
          </div>
          
          {/* <div className="mt-5">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-default-900 capitalize">
                Local Training Progress:
              </span>
              <span className="text-xs font-medium text-default-600">
                {project?.percentage/10}/10 Epochs
              </span>
            </div>
            <Progress value={project?.percentage ? project?.percentage : 0} />
          </div> */}
        </CardContent>
        {/* <CardFooter className="flex justify-between border-t  p-4">
          <div>
            <div className="text-xs  text-default-600 mb-[2px]">
              Start Date:
            </div>
            <span className="text-xs font-medium text-default-900">
              {project?.assignDate}
            </span>
          </div>
        </CardFooter> */}
      </Card>
    </>
  );
};

export default ProjectGrid;
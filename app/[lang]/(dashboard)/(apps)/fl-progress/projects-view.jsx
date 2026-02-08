"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackArrow } from '@/components/svg';
import { useRouter } from "next/navigation";
import SideBarTest from './SideBarTest';

import ParticleDensityMap from "../../(map)/map-unovis-flow/flow-particle-density.jsx";
import AccChart from "../../(chart)/(appex-charts)/charts-appex-line/line-chart-accuracy.jsx";
import LossChart from "../../(chart)/(appex-charts)/charts-appex-line/line-chart-loss.jsx";
import ProjectGrid from "./project-grid.jsx";
export const projects = [
  {
    id: 1,
    title: "AUMC",
    color: '#ff4560',
    subtitle:
      "Sample size: 60,0000",
    status: "in progress",
    label: "bug",
    priority: "low",
    description:
    "Sample size: 60,0000",
    percentage: 20,
    assignDate: "03/10/2024",

  },

  {
    id: 2,
    title: "BARTS",
    color: '#002ffb',
    subtitle:
      "Productify is a secure, and high-speed production management system constructed by Laravel.",
    status: "review",
    label: "bug",
    priority: "medium",
    description:
    "Sample size: 50,0000",
    percentage: 50,
    assignDate: "03/10/2024",
  },
  {
    id: 3,
    title: "MRC-GAMBIA",
    color: '#00e396',
    subtitle:
    "Sample size: 10,0000",
    status: "in progress",
    label: "bug",
    priority: "low",
    description:
    "Sample size: 70,0000",
    percentage: 60,
    assignDate: "03/10/2024",
  },
  {
    id: 4,
    title: "APOLLO",
    color: '#008ffb',
    subtitle:
    "Sample size: 100,0000",
    status: "completed",
    label: "bug",
    priority: "high",
    description:
    "Sample size: 100,0000",
    percentage: 40,
    assignDate: "03/10/2024",
  },
 ];

const ProjectsView = () => {
  const router = useRouter();

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "auto 300px"
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center flex-wrap justify-between gap-4">
        <div className="text-xl font-medium text-default-800 ">
          {/* Analytics {trans?.dashboard} */}
          FL-003 Iron Deficiency Classification
        </div>
        {/* <DatePickerWithRange /> */}
        <BackArrow onClick={() => router.back()} style={{ cursor: "pointer" }}/>
        
      </div>
      <div className="grid xl:grid-cols-1  grid-cols-1 gap-6 ">
        <Card>
          <CardHeader>
            <CardTitle>Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <div style={containerStyle}>
              <ParticleDensityMap />
              <SideBarTest />
            </div>
          </CardContent>
        </Card>
        <div className="grid xl:grid-cols-2  grid-cols-1 gap-6 ">
          <Card>
            <CardHeader>
              <CardTitle>Validation Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <LossChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Validation Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <AccChart />

            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid  xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
          {projects.map((project, i) => (
            <ProjectGrid
              project={project}
              key={`project-grid-${i}`}
            />
          ))}
        </div>
    </div>
  );
};

export default ProjectsView;

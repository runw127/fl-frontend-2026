"use client";

import WelcomeBlock from "./components/welcome-block";
import ReportsCard from "./components/reports";
import { Button } from '@/components/ui/button'
import ReportChart from "./components/report-chart";
import GroupedBar from "../../(chart)/(appex-charts)/charts-appex-bar/grouped-bar.jsx";
import ProjectBudget from "./components/project-budget";
import WorksNote from "./components/works-note";
import OverdueTask from "./components/overdue-task";
import ProjectBudgetBar from "./components/project-budget-bar";
import UpcomingDeadline from "./components/upcoming-deadlines";
import RecentActivity from "./components/recent-activity";
import TopContributer from "./components/top-contributer";
import ActiveTask from "./components/active-task";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DatePickerWithRange from "@/components/date-picker-with-range";
import AdvancedTable from "../../(tables)/data-table/advanced";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/react";
import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import world from "app/[lang]/(dashboard)/(map)/maps-vector/worldmap.json";
import { VectorMap } from "@south-paw/react-vector-maps";
import ProjectGrid from "app/[lang]/(dashboard)/(apps)/fl-progress/project-grid.jsx";



const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  max-height: 500px;
  svg {
    path {
      fill: #ccc;
      cursor: default;
      outline: none;
      &[aria-checked='true'] {
        fill: #005eb8;
      }
      &[aria-current='true'] {
        fill: #ff6b6b;
      }
    }
  }
`;
export const projects = [
  {
    id: 1,
    title: "BARTS",
    color: '#ff4560',
    subtitle:
      "Sample size: 60,0000",
    status: "completed",
    label: "bug",
    priority: "low",
    description:
    "Sample size: 60,0000",
    percentage: 20,
    assignDate: "03/10/2024",

  },

  {
    id: 2,
    title: "CUH",
    color: '#002ffb',
    subtitle:
      "Productify is a secure, and high-speed production management system constructed by Laravel.",
    status: "completed",
    label: "bug",
    priority: "medium",
    description:
    "Sample size: 50,0000",
    percentage: 50,
    assignDate: "03/10/2024",
  },
  {
    id: 3,
    title: "AUMC",
    color: '#00e396',
    subtitle:
    "Sample size: 10,0000",
    status: "completed",
    label: "bug",
    priority: "low",
    description:
    "Sample size: 70,0000",
    percentage: 60,
    assignDate: "03/10/2024",
  },
  {
    id: 4,
    title: "MRC-GAMBIA",
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
const CountryMap = () => {
  const hospitals = [
    { name: "Barts", full_name: "Barts Health", user: "2.2m", country: "gb", column1: "33%", column2: "67%" },
    { name: "CUH", full_name: "Cambridge University Hospitals", user: "3.9m", country: "gb", column1: "45%", column2: "55%" },
    { name: "AUMC", full_name: "Amsterdam UMC", user: "1.3m", country: "nl", column1: "20%", column2: "80%" },
    { name: "MRCG", full_name: "MRC Gambia", user: "40k", country: "gm", column1: "90%", column2: "10%" },

   
    // { name: "UCLH", full_name: "UCL Hospitals", user: "70k",  country: "gb" },
    // { name: "APOLLO", full_name: "Apollo Hospitals", user: "70k", country: "in" },
    // { name: "WACCBIP", full_name: "WACCBIP", user: "51k", country: "gh" },
    // { name: "KUL", full_name: "KUZ Leuven", user: "82k", country: "be" },
    // { name: "MUMC", full_name: "MUMC", user: "65k", country: "nl" },
    // { name: "ZMC", full_name: "Zuyderland MC", user: "62k", country: "nl" },
    // { name: "HSA", full_name: "Health Services Authority Singapore", user: "66k", country: "sg" },
    // { name: "SANBS", full_name: "South African National Blood Service", user: "62k", country: "za" }
  ];

  

  const [selectedHospital, setSelectedHospital] = useState(null);

  const hospitalCountries = useMemo(() => 
    hospitals.map(h => h.country.toLowerCase()),
    [hospitals]
  );

  return (
    <div className="grid grid-cols-12 sm:gap-6 gap-4">
      <div className="col-span-12 md:col-span-6">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <div className="text-base font-semibold text-default-900">
            Sample Size
          </div>
        </div>
        
        {/* Updated Sample Size as a formal table with additional columns */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-default-50 dark:bg-default-100">
                <th className="px-4 py-3 text-left text-sm font-medium text-default-700">Site Name</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-default-700">Samples</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-default-700">Primary Care</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-default-700">Secondary Care</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((hospital, i) => (
                <tr 
                  key={i}
                  className="border-b border-default-200 hover:bg-default-50 dark:hover:bg-default-100 cursor-pointer"
                  onMouseEnter={() => setSelectedHospital(hospital)}
                  onMouseLeave={() => setSelectedHospital(null)}
                >
                  <td className="px-4 py-3 text-sm text-default-600">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: "#ef2e32" }}>
                        {hospital.name.charAt(0)}
                      </div>
                      <span>{hospital.full_name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-default-600">
                    <span className="inline-block bg-default-100 dark:bg-default-200 py-1 px-2 rounded">
                      {hospital.user}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-default-600">
                    <span className="inline-block py-1 px-2 rounded text-green-700 bg-green-100">
                      {hospital.column1}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-right text-default-600">
                    <span className="inline-block py-1 px-2 rounded">
                      {hospital.column2}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-span-12 md:col-span-6">
        <MapContainer>
          <VectorMap
            {...world}
            checkedLayers={hospitalCountries}
            currentLayers={selectedHospital ? [selectedHospital.country] : []}
            viewBox="300 230 350 200" // Zoomed in to focus on Asia, Europe, and Africa
          />
        </MapContainer>
      </div>
    </div>
  );
};

const ProjectPageView = ({ trans }) => {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap justify-between gap-4">
        <div className="text-2xl font-medium text-default-800">
          Connected Sites
        </div>
        {/* <Button size="lg" onClick={() => router.push('/fl-job-create')}>Create FL Job</Button> */}
      </div>
      
      {/* <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-12">
          <div className="grid grid-cols-1 sm:grid-cols-4 2xl:grid-cols-4 gap-3">
            <ReportsCard />
          </div>
        </div>
      </div> */}

      
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-12">
          <Card>
            <CardContent className="p-6">
              <CountryMap />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 2xl:grid-cols-4 gap-3">
          {projects.map((project, i) => (
            <ProjectGrid
              project={project}
              key={`project-grid-${i}`}
            />
          ))}
        </div>
      <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 xl:col-span-12">
       <AdvancedTable />
       </div>
      </div>
    </div>
  );
};

export default ProjectPageView;
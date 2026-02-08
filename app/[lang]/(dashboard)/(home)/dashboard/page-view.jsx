"use client";
import {useState} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import ReportsSnapshot from "./components/reports-snapshot";
import DiagramSection from "./components/diagram-section";
import CountryMap from "./components/country-map";
import UserDeviceReport from "./components/user-device-report";
import UserStats from "./components/user-stats-chart";
import UsersStat from "./components/users-stat";
import ReportsArea from "./components/reports-area";
import DashboardSelect from "@/components/dasboard-select";
import TopTen from "./components/top-ten";
import TopPage from "./components/top-page";
import DatePickerWithRange from "@/components/date-picker-with-range";

const DashboardPageView = ({ trans }) => {
  const [filters, setFilters] = useState([])
  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap justify-between gap-4">
        <div className="text-2xl font-medium text-default-800 ">
          {/* Analytics {trans?.dashboard} */}
          Local Data Analytics
        </div>
        {/* <DatePickerWithRange /> */}
      </div>
      {/* reports area */}
      <div className="grid grid-cols-12  gap-6 ">
        <div className="col-span-12 lg:col-span-12">
          <ReportsSnapshot />
        </div>
        {/* <div className="col-span-12 lg:col-span-4">
          <UsersStat />
        </div> */}
      </div>

      {/* Control Panel or Search commented out */}
      {/* <div className="col-span-2">
        <Card>
          <CardHeader className="border-none pb-0">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex-1 text-xl font-semibold text-default-900 whitespace-nowrap">
                Control Panel
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-0">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <Select onValueChange={(value) => addFilter(`Age: ${value}`)}>
                <SelectTrigger>
                  <SelectValue placeholder="Age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-18">0-18</SelectItem>
                  <SelectItem value="19-30">19-30</SelectItem>
                  <SelectItem value="31-50">31-50</SelectItem>
                  <SelectItem value="51+">51+</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => addFilter(`Sex: ${value}`)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => addFilter(`BMI: ${value}`)}>
                <SelectTrigger>
                  <SelectValue placeholder="BMI Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Underweight">Underweight (&lt;18.5)</SelectItem>
                  <SelectItem value="Normal">Normal (18.5-24.9)</SelectItem>
                  <SelectItem value="Overweight">Overweight (25-29.9)</SelectItem>
                  <SelectItem value="Obese">Obese (30+)</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => addFilter(`Ethnicity: ${value}`)}>
                <SelectTrigger>
                  <SelectValue placeholder="Ethnicity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Caucasian">Caucasian</SelectItem>
                  <SelectItem value="African American">African American</SelectItem>
                  <SelectItem value="Asian">Asian</SelectItem>
                  <SelectItem value="Hispanic">Hispanic</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex space-x-2">
                <input
                  type="date"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  onChange={(e) => addFilter(`Start: ${e.target.value}`)}
                />
              </div>
              <div className="flex space-x-2">
                <input
                  type="date"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  onChange={(e) => addFilter(`End: ${e.target.value}`)}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map(filter => (
                <Badge key={filter} variant="secondary" className="text-sm">
                  {filter}
                  <button onClick={() => removeFilter(filter)} className="ml-2 text-red-500">×</button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div> */}

      <div className="col-span-2">
        <DiagramSection />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="grid grid-cols-4 sm:grid-cols-4 gap-4">
          <ReportsArea />
        </div>
        {/* <Card>
          <CardHeader className="border-none p-6 pt-5 mb-0">
            <CardTitle className="text-lg font-semibold text-default-900 p-0">
              New vs Returning Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
              <UserStats />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="border-none p-6 pt-5 mb-0">
            <CardTitle className="text-lg font-semibold text-default-900 p-0">
              Device Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="dashtail-legend">
              <UserDeviceReport />
            </div>
          </CardContent>
        </Card> */}
      </div>
      <div className="col-span-2">
        <Card>
          <CardHeader className="border-none pb-0">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex-1 text-xl font-semibold text-default-900 whitespace-nowrap">
                Federated Learning Connected Sites
              </div>
              {/* <div className="flex-none">
                <DashboardSelect />
              </div> */}
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-20">
            <CountryMap />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPageView;

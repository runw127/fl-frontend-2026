"use client";
import React, { useState, useEffect } from "react";
import { Activity, Server, Cpu, BarChart2, Wifi, Clock, Shield, Database, MoreHorizontal, Zap, Award, TrendingUp, X } from "lucide-react";
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
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";

// Gauge chart component
const GaugeChart = ({ value, color, height = 80, label, suffix = "%" }) => {
  const cx = 50;
  const cy = 50;
  const iR = 30;
  const oR = 40;

  // Data for the gauge sections
  const data = [
    { name: "Low", value: 33, color: "#4ade80" },
    { name: "Medium", value: 33, color: "#facc15" },
    { name: "High", value: 34, color: "#f87171" },
  ];

  // Create needle for gauge
  const needle = (value, data, cx, cy, iR, oR, color) => {
    // Calculate percentage for the gauge
    const total = data.reduce((acc, entry) => acc + entry.value, 0);
    const angle = 180 - (Math.min(value, 100) / 100) * 180;
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

    return (
      <>
        <circle cx={x0} cy={y0} r={r} fill={color} />
        <path
          d={`M${xba} ${yba}L${xbb} ${ybb}L${xp} ${yp}L${xba} ${yba}`}
          fill={color}
        />
      </>
    );
  };

  return (
    <div className="relative flex flex-col items-center">
      <div style={{ width: '100%', height: height }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* Draw the gauge arc */}
          <path
            d="M 10,50 A 40,40 0 0,1 90,50"
            fill="none"
            stroke="#4ade80"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M 10,50 A 40,40 0 0,1 50,10"
            fill="none"
            stroke="#facc15"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M 50,10 A 40,40 0 0,1 90,50"
            fill="none"
            stroke="#f87171"
            strokeWidth="10"
            strokeLinecap="round"
          />
          
          {/* Draw the needle */}
          {needle(value, data, cx, cy, iR, oR, color)}
        </svg>
      </div>
      <div className="absolute bottom-2 text-center font-medium">
        {value}{suffix}
      </div>
    </div>
  );
};

// Contribution metric component for relative comparison
const ContributionMetric = ({ value, label, icon, max = 100 }) => {
  const Icon = icon;
  const percentage = (value / max) * 100;
  
  return (
    <div className="flex items-center gap-3 p-2">
      <div className="bg-red-50 p-2 rounded-lg">
        <Icon className="h-5 w-5 text-red-500" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm font-semibold">{value}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-red-400 to-red-600 h-2 rounded-full" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Training history chart for progress display
const TrainingHistoryChart = ({ data }) => {
  return (
    <div className="w-full h-[120px] flex items-end justify-between mt-4">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div 
            className="w-6 bg-gradient-to-t from-red-600 to-red-400 rounded-t-sm" 
            style={{ height: `${item.accuracy * 100}px` }}
          ></div>
          <div className="text-xs mt-1 text-gray-500">
            {item.epoch}
          </div>
        </div>
      ))}
    </div>
  );
};

const ProjectGrid = ({ project, onEdit }) => {
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { theme: mode } = useTheme();
  
  // Fixed height for content area to prevent layout shifts
  const contentHeight = "350px";
  
  // Get client-specific data based on the client props
  const getClientData = () => {
    const defaultData = {
      id: project?.id || "client-001",
      name: project?.title || "Unknown Client",
      status: project?.status || "active",
      connectionQuality: 87,
      dataContribution: 15000, // number of samples
      modelPerformance: {
        localAccuracy: 78.4,
        balancedAccuracy: 76.2,
        improvement: +1.6,
      },
      hardware: {
        cpu: 35,
        gpu: 42,
        ram: 28,
        network: 12,
      },
      roundsCompleted: 8,
      roundsContributed: 7,
      averageTrainingTime: "8:12", // minutes:seconds
      lastSync: "5 min ago",
      dataPrivacy: "Medium",
      datasetSize: project?.description?.match(/Sample size: (\d+,\d+)/) ? 
        project.description.match(/Sample size: (\d+,\d+)/)[1] : "50,000",
      clientType: "Hospital",
      region: "Europe",
    };

    // Specific data for each client
    switch(project?.title) {
      case "BARTS":
        return {
          ...defaultData,
          name: "BARTS",
          status: "connected",
          connectionQuality: 93,
          dataContribution: 60000,
          modelPerformance: {
            localAccuracy: 81.2,
            balancedAccuracy: 79.8,
            improvement: +2.4,
          },
          hardware: {
            cpu: 27,
            gpu: 38,
            ram: 32,
            network: 11,
          },
          roundsCompleted: 10,
          roundsContributed: 9,
          datasetSize: "60,000",
          averageTrainingTime: "7:46",
          lastSync: "5 min ago",
          clientType: "Hospital",
          region: "UK",
          color: '#ff4560',
        };
      case "CUH":
        return {
          ...defaultData,
          name: "CUH",
          status: "connected",
          connectionQuality: 87,
          dataContribution: 50000,
          modelPerformance: {
            localAccuracy: 79.6,
            balancedAccuracy: 80.3,
            improvement: +1.8,
          },
          hardware: {
            cpu: 54,
            gpu: 48,
            ram: 42,
            network: 18,
          },
          roundsCompleted: 12,
          roundsContributed: 10,
          datasetSize: "50,000",
          averageTrainingTime: "5:38",
          lastSync: "5 min ago",
          clientType: "University Hospital",
          region: "UK",
          color: '#002ffb',
        };
      case "AUMC":
        return {
          ...defaultData,
          name: "AUMC",
          status: "connected",
          connectionQuality: 76,
          dataContribution: 70000,
          modelPerformance: {
            localAccuracy: 77.3,
            balancedAccuracy: 76.9,
            improvement: +3.2,
          },
          hardware: {
            cpu: 29,
            gpu: 0,  // No GPU
            ram: 36,
            network: 14,
          },
          roundsCompleted: 8,
          roundsContributed: 6,
          datasetSize: "70,000",
          averageTrainingTime: "12:24",
          lastSync: "5 min ago",
          clientType: "Academic Medical Center",
          region: "Netherlands",
          color: '#00e396',
        };
      case "MRC-GAMBIA":
        return {
          ...defaultData,
          name: "MRC-GAMBIA",
          status: "syncing",
          connectionQuality: 64,
          dataContribution: 100000,
          modelPerformance: {
            localAccuracy: 74.8,
            balancedAccuracy: 72.5,
            improvement: +4.1,
          },
          hardware: {
            cpu: 82,
            gpu: 76,
            ram: 64,
            network: 8,
          },
          roundsCompleted: 9,
          roundsContributed: 7,
          datasetSize: "100,000",
          averageTrainingTime: "15:52",
          lastSync: "5 min ago",
          clientType: "Research Center",
          region: "Africa",
          color: '#008ffb',
        };
      default:
        return defaultData;
    }
  };

  const clientData = getClientData();
  
  // Sample data for training history
  const trainingHistory = [
    { epoch: 1, accuracy: 0.72 },
    { epoch: 2, accuracy: 0.78 },
    { epoch: 3, accuracy: 0.83 },
    { epoch: 4, accuracy: 0.85 },
    { epoch: 5, accuracy: 0.87 },
    { epoch: 6, accuracy: 0.89 },
    { epoch: 7, accuracy: 0.91 },
    { epoch: 8, accuracy: 0.92 },
  ];

  // Color mapping for different states
  const statusColorMap = {
    active: "success",
    connected: "success",
    disconnected: "destructive",
    syncing: "warning",
    idle: "info",
  };

  // Get the appropriate color for the needle based on theme
  const needleColor = mode === "dark" ? "#ffffff" : "#000000";

  const isSmallScreen = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 2000; // Example: Consider it small screen if width is less than 768px (md breakpoint in Tailwind)
  };


  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex-row items-center justify-between py-4 px-6 bg-gradient-to-r from-red-50 to-white dark:from-gray-800 dark:to-gray-900 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="rounded-full h-12 w-12 border" style={{ backgroundColor: "rgb(239, 46, 50)" }}>
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold">
              {clientData.name.charAt(0)}
            </div>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{clientData.name}</h3>
              <Badge 
                variant="outline" 
                className={`bg-${statusColorMap[clientData.status]}-50 text-${statusColorMap[clientData.status]}-600 border-${statusColorMap[clientData.status]}-200 dark:bg-${statusColorMap[clientData.status]}-900 dark:text-${statusColorMap[clientData.status]}-300 capitalize`}
              >
                {clientData.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-500">
              Last sync: {clientData.lastSync}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b">
            <TabsList className="w-full rounded-none bg-transparent gap-2 px-6 h-12">
              <TabsTrigger value="overview" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-600 dark:data-[state=active]:bg-gray-800 rounded-md">
                Overview
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-600 dark:data-[state=active]:bg-gray-800 rounded-md">
                Performance
              </TabsTrigger>
              <TabsTrigger value="hardware" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-600 dark:data-[state=active]:bg-gray-800 rounded-md">
                Hardware
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="p-6" style={{ height: contentHeight, overflowY: 'auto' }}>
            <div className={`grid ${isSmallScreen() ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-6`}>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-red-500" />
                  <h4 className="font-medium">Model Performance</h4>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-center mb-3">
                    <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 flex items-center justify-center">
                      {clientData.modelPerformance.localAccuracy.toFixed(1)}%
                      {clientData.modelPerformance.improvement > 0 && (
                        <span className="ml-2 text-sm font-medium text-green-500 flex items-center">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          +{clientData.modelPerformance.improvement.toFixed(1)}%
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">Local Model Accuracy</div>
                  </div>
                  <div className="w-full overflow-hidden">
                    <TrainingHistoryChart data={trainingHistory} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-red-500" />
                  <h4 className="font-medium">Contribution Metrics</h4>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3">
                  <ContributionMetric 
                    icon={BarChart2} 
                    label="Train Set" 
                    value={clientData.dataContribution.toLocaleString()} 
                    max={120000}
                  />
                  <ContributionMetric 
                    icon={Database} 
                    label="Val Set" 
                    value={Math.round(clientData.dataContribution * 0.2).toLocaleString()} 
                    max={24000}
                  />
                  <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
                    <span>Avg Training Time:</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{clientData.averageTrainingTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="p-6" style={{ height: contentHeight, overflowY: 'auto' }}>
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Activity className="h-5 w-5 text-red-500" />
                Training Progress
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Epoch: {clientData.roundsContributed}/20</span>
                  <span className="font-medium">{Math.round((clientData.roundsContributed/20)*100)}%</span>
                </div>
                <Progress value={Math.round((clientData.roundsContributed/20)*100)} className="h-2" />
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Last train time:</span>
                  <span className="font-medium">{clientData.averageTrainingTime}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">{clientData.modelPerformance.localAccuracy.toFixed(1)}%</div>
                <div className="text-sm text-gray-500">Local Accuracy</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">{clientData.modelPerformance.balancedAccuracy.toFixed(1)}%</div>
                <div className="text-sm text-gray-500">Balanced Accuracy</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{(clientData.modelPerformance.localAccuracy - Math.random() * 5).toFixed(1)}%</div>
                <div className="text-sm text-gray-500">Precision</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{(clientData.modelPerformance.localAccuracy - Math.random() * 3).toFixed(1)}%</div>
                <div className="text-sm text-gray-500">Recall</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="hardware" className="p-6" style={{ height: contentHeight, overflowY: 'auto' }}>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-red-500" />
                  <h4 className="font-medium">CPU Usage</h4>
                </div>
                <div className="flex flex-col items-center">
                  <GaugeChart 
                    value={clientData.hardware.cpu} 
                    color={needleColor} 
                    height={100}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-red-500" />
                  <h4 className="font-medium">GPU Usage</h4>
                </div>
                {clientData.hardware.gpu > 0 ? (
                  <div className="flex flex-col items-center">
                    <GaugeChart 
                      value={clientData.hardware.gpu} 
                      color={needleColor} 
                      height={100}
                    />
                  </div>
                ) : (
                  <div className="h-[100px] flex items-center justify-center text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    No GPU Available
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-red-500" />
                  <h4 className="font-medium">RAM Usage</h4>
                </div>
                <div className="flex flex-col items-center">
                  <GaugeChart 
                    value={clientData.hardware.ram} 
                    color={needleColor} 
                    height={100}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Wifi className="h-5 w-5 text-red-500" />
                  <h4 className="font-medium">Network</h4>
                </div>
                <div className="flex flex-col items-center">
                  <GaugeChart 
                    value={clientData.hardware.network} 
                    color={needleColor} 
                    height={100}
                    suffix=" MB/s"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Zap className="h-5 w-5 text-red-500" />
                Local Model Convergence
              </h4>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Training Stability</span>
                  <Badge variant="outline" className={
                    clientData.connectionQuality > 90 ? "bg-green-50 text-green-600 border-green-200" :
                    clientData.connectionQuality > 70 ? "bg-yellow-50 text-yellow-600 border-yellow-200" :
                    "bg-red-50 text-red-600 border-red-200"
                  }>
                    {clientData.connectionQuality > 90 ? "Stable" : 
                     clientData.connectionQuality > 70 ? "Moderate" : "Fluctuating"}
                  </Badge>
                </div>
                <Progress value={clientData.connectionQuality} className="h-2 mb-4" />
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Loss Variance:</span>
                  <span className="font-medium">{(Math.random() * 0.02 + 0.01).toFixed(3)}</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProjectGrid;

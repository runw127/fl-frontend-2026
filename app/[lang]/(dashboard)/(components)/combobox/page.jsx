"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import BasicCombobox from "./basic-combobox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PrecisionRecallChart from './precision.jsx';
import BasicScatter from "./scatter.jsx";
import { Tree } from "@/components/ui/tree";
import Select from "react-select";
import { BackArrow } from '@/components/svg';
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import { Play, ChevronDown, Settings2 } from "lucide-react";
import dynamic from 'next/dynamic';

// Import ApexCharts dynamically to avoid SSR issues
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Loading Skeleton Component shown beneath the animation
const LoadingSkeleton = () => {
  return (
    <div className="w-full py-4 flex flex-col items-center mt-6">
      {/* Text skeletons */}
      <div className="flex flex-col items-center space-y-3 w-full max-w-md">
        <motion.div 
          className="h-4 bg-gray-200 rounded w-2/3"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
        />
        <motion.div 
          className="h-4 bg-gray-200 rounded w-1/2"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4
          }}
        />
        <motion.div 
          className="h-4 bg-gray-200 rounded w-3/4"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6
          }}
        />
        
        {/* Progress bar */}
        <motion.div 
          className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-4"
        >
          <motion.div
            className="h-full bg-red-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </motion.div>
        
        {/* Processing indicator text */}
        <div className="mt-2 text-gray-600 font-medium">
          Training and Validating...
        </div>
      </div>
    </div>
  );
};

// This function helps format cells that contain (+) values
const FormattedTableCell = ({ content }) => {
  if (typeof content !== 'string' || !content.includes('(+')) {
    return <TableCell>{content}</TableCell>;
  }

  // Split the content by the opening parenthesis
  const [baseValue, increaseWithParens] = content.split('(');
  const increase = '(' + increaseWithParens;

  return (
    <TableCell>
      {baseValue} <span style={{ color: '#22c55e' }}>{increase}</span>
    </TableCell>
  );
};

const models = [
  {
    value: "irondef_donors_3sites",
    label: "irondef_donors_3sites_prior",
  },
  // {
  //   value: "Iron Deficiency Classifier V2",
  //   label: "Iron Deficiency Classifier V2",
  // }
];

const datasets = [
  {
    value: "Site 4 - New Donors",
    label: "Site 4 - New Donors",
  }
];

const tableData = [
  {
    clientId: "Site 1",
    diseasePrevalence: 0.22,
    balancedAccuracy: "0.763 (+0.021)",
    auroc: "0.841 (+0.034)",
    avgPrecision: "0.608 (+0.043)",
    sensitivity: "0.776 (+0.082)",
    f2Score: "0.686 (+0.047)",
    nri: "4.183531",
  },
  {
    clientId: "Site 2",
    diseasePrevalence: 0.17,
    balancedAccuracy: "0.803 (+0.009)",
    auroc: "0.876 (+0.006)",
    avgPrecision: "0.637 (+0.011)",
    sensitivity: "0.810 (+0.009)",
    f2Score: "0.698 (+0.012)",
    nri: "1.885674",
  },
  {
    clientId: "Site 3",
    diseasePrevalence: 0.23,
    balancedAccuracy: "0.781 (+0.005)",
    auroc: "0.861 (+0.009)",
    avgPrecision: "0.668 (+0.011)",
    sensitivity: "0.807 (+0.026)",
    f2Score: "0.715 (+0.013)",
    nri: "1.042875",
  }
];

const tableModelData = [
  {
    clientId: "Site 4 - New Donors",
    diseasePrevalence: 0.06,
    balancedAccuracy: "0.794 (+0.092)",
    auroc: "0.834 (+0.079)",
    avgPrecision: "0.337 (+0.036)",
    sensitivity: "0.793 (+0.310)",
    f2Score: "0.489 (+0.070)",
    nri: "18.481291",
  }
];

const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed 
      ? { ...base, opacity: "0.5" } 
      : { 
          ...base, 
          backgroundColor: '#fee2e2', 
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: '#fecaca'
          }
        };
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, color: "#626262", paddingRight: 6 }
      : { ...base, color: "#ef4444", fontWeight: 500, paddingRight: 6 };
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed 
      ? { ...base, display: "none" } 
      : { 
          ...base, 
          color: '#ef4444',
          '&:hover': {
            backgroundColor: '#fca5a5',
            color: '#b91c1c'
          }
        };
  },
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
    backgroundColor: state.isSelected ? '#ef4444' : state.isFocused ? '#fee2e2' : null,
    color: state.isSelected ? 'white' : '#374151',
    fontWeight: state.isSelected ? '500' : '400',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: '#ef4444'
    }
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#9ca3af',
    '&:hover': {
      color: '#6b7280'
    }
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: '#9ca3af',
    '&:hover': {
      color: '#6b7280'
    }
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#9ca3af',
  }),
};

// Disease Prevalence Chart Component
const DiseasePrevalenceChart = ({ data, clientId }) => {
  const options = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: data.map(item => {
        const label = item.clientId;
        return label.split('-')[0].trim(); // Only take text before "-"
      }),
    },
    yaxis: {
      title: {
        text: 'Disease Prevalence'
      },
      min: 0,
      max: 0.3,
      labels: {
        formatter: function (val) {
          return val.toFixed(2);
        }
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val.toFixed(2);
        }
      }
    },
    colors: ['#3F51B5', '#FF5722', '#4CAF50']
  };

  const series = [{
    name: 'Prevalence',
    data: data.map(item => item.diseasePrevalence)
  }];

  // Highlight selected client
  if (clientId !== undefined) {
    options.annotations = {
      points: [{
        x: data[clientId].clientId,
        y: data[clientId].diseasePrevalence,
        marker: {
          size: 8,
          fillColor: '#FF4560',
          strokeColor: '#fff',
          strokeWidth: 2,
          radius: 2
        },
        label: {
          borderColor: '#FF4560',
          offsetY: 0,
          style: {
            color: '#fff',
            background: '#FF4560',
          },
          text: 'Selected'
        }
      }]
    };
  }

  return (
    <div className="chart-container">
      <ApexChart options={options} series={series} type="bar" height={300} />
    </div>
  );
};

// NRI Chart Component
const NRIChart = ({ data, clientId }) => {
  const options = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5,
        distributed: true
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(2) + '%';
      },
      style: {
        fontSize: '12px',
        colors: ['#fff']
      },
      background: {
        enabled: true,
        foreColor: '#333',
        opacity: 0.7,
        borderWidth: 0,
        borderRadius: 2,
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: data.map(item => {
        const label = item.clientId;
        return label.split('-')[0].trim(); // Only take text before "-"
      }),
    },
    yaxis: {
      title: {
        text: 'Net Reclassification Improvement (%)'
      },
      labels: {
        formatter: function (val) {
          return val.toFixed(2) + '%';
        }
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val.toFixed(2) + '%';
        }
      }
    },
    colors: ['#4CAF50', '#2196F3', '#9C27B0'],
    theme: {
      monochrome: {
        enabled: false
      }
    }
  };

  const series = [{
    name: 'NRI (%)',
    data: data.map(item => parseFloat(item.nri))
  }];

  // Highlight selected client
  if (clientId !== undefined) {
    options.annotations = {
      points: [{
        x: data[clientId].clientId,
        y: parseFloat(data[clientId].nri),
        marker: {
          size: 8,
          fillColor: '#FF4560',
          strokeColor: '#fff',
          strokeWidth: 2,
          radius: 2
        },
        label: {
          borderColor: '#FF4560',
          offsetY: 0,
          style: {
            color: '#fff',
            background: '#FF4560',
          },
          text: 'Selected'
        }
      }]
    };
  }

  // Add threshold reference lines
  options.annotations = {
    ...options.annotations,
    yaxis: [
      {
        y: 10,
        borderColor: '#FFD54F',
        label: {
          borderColor: '#FFD54F',
          style: {
            color: '#fff',
            background: '#FFD54F',
          },
          text: 'Modest'
        }
      },
      {
        y: 20,
        borderColor: '#FFA726',
        label: {
          borderColor: '#FFA726',
          style: {
            color: '#fff',
            background: '#FFA726',
          },
          text: 'Moderate'
        }
      }
    ]
  };

  return (
    <div className="chart-container">
      <ApexChart options={options} series={series} type="bar" height={300} />
    </div>
  );
};

const ComboBoxPage = () => {
  const handleRunModel = () => {
    setLoading(true); // Show spinner
    
    // Create a reference to the loading area
    const loadingElement = document.getElementById('loading-skeleton-area');
    
    // Scroll to the loading area if it exists - with an offset to position it better in view
    if (loadingElement) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        const yOffset = -50; // Offset to position the element a bit lower from the top
        const elementPosition = loadingElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 100);
    }
    
    setTimeout(() => {
      setLoading(false); // Hide spinner after 3 seconds
      setChartsVisible(true); // Show the hidden charts
    }, 5000);
  };

  const logoVariants = {
    hidden: { pathLength: 0, fill: 'rgba(239, 46, 50, 0)' },
    visible: {
      pathLength: 1,
      transition: {
        duration: 4,  // Slowing down the drawing
        ease: 'easeInOut',
      },
    },
    fill: {
      fill: 'rgba(239, 46, 50, 1)',  // Filling with the red color
      transition: {
        duration: 1,  // The fill color transition
        delay: 1,     // Starts after the drawing is done
        repeat: Infinity,  // Repeat the fill animation
      },
    },
  };

  const treeData = [
    {
      id: 1,
      label: "INTERVAL trial blood donor population",
    },
    {
      id: 3,
      label: "Cambridge University",
    },
  ];


  const [showContent, setShowContent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [chartsVisible, setChartsVisible] = useState(false);
  const [clientId, setClientId] = useState(0);
  const [showIronContent, setShowIronContent] = useState(false);
  const router = useRouter();

  const handleOnClick = (index) => { setClientId(index) }

  return (
    <>
      <BackArrow onClick={() => router.back()} style={{ cursor: "pointer" }} className="mb-5"/>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <div>
            <h4 className="font-bold md:font-medium text-sm md:text-base text-default-800">
              irondef_donors_3sites  
            </h4>
          </div>
        </div>
      </div>

      {/* Conditionally render the content below */}
      {showContent && (
        <>
          <div className="grid xl:grid-cols-1 grid-cols-1 gap-6 mt-5">
            <Card title="Trained On">
              <CardHeader className={'flex-row'} style={{justifyContent: 'space-between'}}>
                <CardTitle>Trained Metrics</CardTitle>
              </CardHeader>
              <span className='p-2 m-2'>Trained On: INTERVAL trial blood donor population</span>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Site ID</TableHead>
                    <TableHead>Balanced Accuracy</TableHead>
                    <TableHead>AUROC</TableHead>
                    <TableHead>Average Precision</TableHead>
                    <TableHead>Sensitivity</TableHead>
                    <TableHead>F2-Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow onClick={() => handleOnClick(index)} key={index} className={clientId === index ? "bg-blue-50" : ""}>
                      <TableCell>{row.clientId}</TableCell>
                      <FormattedTableCell content={row.balancedAccuracy} />
                      <FormattedTableCell content={row.auroc} />
                      <FormattedTableCell content={row.avgPrecision} />
                      <FormattedTableCell content={row.sensitivity} />
                      <FormattedTableCell content={row.f2Score} />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>

          <div className="grid xl:grid-cols-3 grid-cols-1 gap-6 mt-5">
            <Card title='Disease Prevalence'>
              <CardContent>
                <DiseasePrevalenceChart data={tableData} clientId={clientId} />
              </CardContent>
            </Card>
            <Card title='Net Reclassification Improv'>
              <CardContent>
                <NRIChart data={tableData} clientId={clientId} />
              </CardContent>
            </Card>
            <Card title='Precision-Recall'>
              <CardContent>
                <PrecisionRecallChart clientId={clientId} />
              </CardContent>
            </Card>
          </div>

        <div className='mt-5 mb-5'>
          <Card>
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Settings2 className="h-5 w-5 text-red-500" />
                  Regional Analysis  
                </CardTitle>
              <Button color='destructive' onClick={() => setShowIronContent(!showIronContent)}>
                <Play className="h-5 w-5" />
              </Button>
              </div>
            </CardHeader>
            {showIronContent && (
              <CardContent>
                <iframe
                  src="/iron.html"
                  title="Iron Content"
                  style={{ width: '100%', height: '800px', border: 'none' }}
                  />
              </CardContent>
            )}
          </Card>
        </div>

          <div className='mt-5 mb-5'>
          <Card>
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Settings2 className="h-5 w-5 text-red-500" />
                  Model & Dataset 
                </CardTitle>
              </div>
            </CardHeader>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="model-select" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                    Model Selection
                  </Label>
                  <Select
                    inputId="model-select"
                    isClearable={false}
                    placeholder={<div className="text-gray-500 flex items-center"><span>Choose model version</span><ChevronDown className="ml-1 h-4 w-4" /></div>} 
                    styles={{
                      ...styles,
                      control: (base) => ({
                        ...base,
                        boxShadow: 'none',
                        borderColor: '#e2e8f0',
                        '&:hover': {
                          borderColor: '#cbd5e1'
                        },
                        padding: '4px',
                        borderRadius: '0.5rem',
                        backgroundColor: '#f9fafb'
                      }),
                      menu: (base) => ({
                        ...base,
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        borderRadius: '0.5rem',
                        zIndex: 10
                      })
                    }}
                    isMulti
                    name="models"
                    options={models}
                    className="react-select"
                    classNamePrefix="select"
                  />
                  <p className="text-xs text-gray-500 italic">Select one or more models to compare performance</p>
                </div>
                
            <div className="space-y-3">
                  <Label htmlFor="dataset-select" className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                    Target Dataset
                  </Label>
                  <Select
                    inputId="dataset-select"
                    isClearable={false}
                    placeholder={<div className="text-gray-500 flex items-center"><span>Choose target dataset</span><ChevronDown className="ml-1 h-4 w-4" /></div>} 
                    styles={{
                      ...styles,
                      control: (base) => ({
                        ...base,
                        boxShadow: 'none',
                        borderColor: '#e2e8f0',
                        '&:hover': {
                          borderColor: '#cbd5e1'
                        },
                        padding: '4px',
                        borderRadius: '0.5rem',
                        backgroundColor: '#f9fafb'
                      }),
                      menu: (base) => ({
                        ...base,
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                        borderRadius: '0.5rem',
                        zIndex: 10
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: '#111827',
                        fontWeight: 500
                      })
                    }}
                    name="datasets"
                    options={datasets}
                    className="react-select"
                    classNamePrefix="select"
                    defaultValue={datasets[0]} // "New Donors" selected by default
                  />
                  <p className="text-xs text-gray-500 italic">Select the population to analyse model performance on</p>
                </div>
              </div>
              
              <div className="flex justify-end pt-2">
                <Button 
                  onClick={handleRunModel} 
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:shadow-xl flex items-center gap-2 px-6 py-6 rounded-lg font-medium"
                  size="lg"
                >
                  <Play className="h-5 w-5" />
                  {/* <span>Run Model</span> */}
                </Button>
              </div>
            </div>
            
            {/* Keep the original SVG animation */}
            {/* Add an ID to the loading area for scrolling */}
            <div id="loading-skeleton-area" style={{display: 'flex', justifyContent:'center', flexDirection: 'column', alignItems: 'center'}}>
              {loading && (
                <>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="500"
                    height="154"
                    viewBox="0 -10 180 180"
                    initial="hidden"
                    animate="visible"
                  >
                    <g transform="translate(-43.894 -75.85)">
                      {/* Drawing animation for the logo paths */}
                      <motion.path
                        d="M125.843 75.849s-15.13 23.32-28 50.395l17.304-7.138a11.038 11.038 0 0 1-.245-2.31c0-6.078 4.926-11.005 11.003-11.005 6.078 0 11.004 4.927 11.004 11.004a10.973 10.973 0 0 1-.724 3.928l20.96 12.699c-13.42-29.987-31.302-57.573-31.302-57.573Zm31.302 57.573a299.533 299.533 0 0 1 2.708 6.24l27.861 16.88-.007.018-23.084-4.662a187.042 187.042 0 0 1 1.479 4.312l20.793 4.2c-.003.106-.008.213-.008.32 0 .109.005.216.008.324l-18.25 3.685a118.406 118.406 0 0 1 .94 3.822l18.122-3.66.008.02-16.855 10.212a71.92 71.92 0 0 1 .532 4.276l18.45-11.178a10.971 10.971 0 0 0 8.049 3.504c6.076 0 11.003-4.927 11.003-11.004 0-6.078-4.927-11.004-11.003-11.004-3.179 0-6.04 1.349-8.05 3.504zm13.715 41.71a94.369 94.369 0 0 0-1.275-6.57l-32.681 6.6c.001.071.005.142.005.214 0 6.078-4.926 11.005-11.003 11.005-5.5 0-10.056-4.034-10.873-9.304l-34.366-.84a64.199 64.199 0 0 0-.586 6.26l36.69 16.033a10.994 10.994 0 0 1 9.135-4.867c3.28 0 6.223 1.437 8.239 3.713zm-90.78 7.365-14.219-6.213a11.075 11.075 0 0 0 .028-.409l14.778.362a83.759 83.759 0 0 1 .646-3.919l-15.966-.39-.07-.208 17.732-6.88a148.953 148.953 0 0 1 2.451-8.275l-19.803-8.168c.024-.115.045-.23.066-.345h22.745a233.773 233.773 0 0 1 1.527-3.933H65.723a9.988 9.988 0 0 0-.066-.344l29.735-12.265a348.623 348.623 0 0 1 2.451-5.266L64.155 140.14a10.993 10.993 0 0 0-9.257-5.059c-6.077 0-11.004 4.927-11.004 11.005 0 6.077 4.927 11.003 11.004 11.003 3.886 0 7.3-2.016 9.257-5.058l19.87 8.196-20.728 8.044a10.978 10.978 0 0 0-8.4-3.899c-6.076 0-11.003 4.926-11.003 11.004 0 6.078 4.927 11.004 11.004 11.004 4.377 0 8.156-2.555 9.929-6.255l15.261 6.668c1.153 24.273 21.195 43.6 45.755 43.6 25.3 0 45.81-20.51 45.81-45.808 0-1.665-.094-3.395-.26-5.176l-35.208 21.33a10.972 10.972 0 0 1 .724 3.927c0 6.078-4.926 11.005-11.003 11.005-6.078 0-11.004-4.927-11.004-11.005 0-.871.104-1.718.296-2.531l-35.109-15.342a46.166 46.166 0 0 1-.056-2.208c0-.685.02-1.383.048-2.088zm15.312-50.987a288.996 288.996 0 0 0-5.397 12.609h25.085c.929-5.138 5.42-9.037 10.826-9.037 6.077 0 11.004 4.927 11.004 11.004 0 .072-.004.143-.006.215l27.719 5.598a236.939 236.939 0 0 0-4.77-12.237l-25.708-15.576a10.975 10.975 0 0 1-8.24 3.713 10.993 10.993 0 0 1-9.256-5.058zm-6.924 16.542a195.814 195.814 0 0 0-3.007 8.514l3.879 1.6 26.062-10.114zm-7.155 24.266 34.042.833-26.06-10.75-6.285 2.439a108.926 108.926 0 0 0-1.697 7.478zm87.332-7.579c-.737-2.79-1.592-5.64-2.543-8.53l-29.973-6.052c-1.619 4.061-5.584 6.933-10.223 6.933-3.97 0-7.447-2.103-9.383-5.254l-21.914 8.503 22.04 9.092a10.992 10.992 0 0 1 9.256-5.059c4.64 0 8.605 2.872 10.223 6.934z"
                        fill="none"
                        stroke="#ef2e32"
                        strokeWidth="3"
                        variants={logoVariants}
                        initial="hidden"
                        animate={["visible", "fill"]}
                      />
                    </g>
                  </motion.svg>
                  
                  {/* Add the skeleton loading beneath the SVG */}
                  <LoadingSkeleton />
                </>
              )}
            </div>
          </Card>
          </div>

          <div className="grid xl:grid-cols-1 grid-cols-1 gap-6 mt-5">
            {/* Show charts after loading */}
            {chartsVisible && (
              <>
                <Card title="New Donors">
                  <CardHeader className={'flex-row'} style={{justifyContent: 'space-between'}}>
                    <CardTitle>New Donors</CardTitle>
                  </CardHeader>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Site ID</TableHead>
                        <TableHead>Balanced Accuracy</TableHead>
                        <TableHead>AUROC</TableHead>
                        <TableHead>Average Precision</TableHead>
                        <TableHead>Sensitivity</TableHead>
                        <TableHead>F2-Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tableModelData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.clientId}</TableCell>
                          <FormattedTableCell content={row.balancedAccuracy} />
                          <FormattedTableCell content={row.auroc} />
                          <FormattedTableCell content={row.avgPrecision} />
                          <FormattedTableCell content={row.sensitivity} />
                          <FormattedTableCell content={row.f2Score} />
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>

                <div className="grid xl:grid-cols-3 grid-cols-1 gap-6 mt-5">
                  <Card title='Disease Prevalence'>
                    <CardContent>
                      <DiseasePrevalenceChart data={tableModelData} />
                    </CardContent>
                  </Card>
                  <Card title='Net Reclassification Index'>
                    <CardContent>
                      {/* Custom NRI chart for New Donors without threshold labels */}
                      <div className="chart-container">
                        <ApexChart 
                          options={{
                            chart: {
                              type: 'bar',
                              height: 350,
                              toolbar: { show: false }
                            },
                            plotOptions: {
                              bar: {
                                horizontal: false,
                                columnWidth: '55%',
                                borderRadius: 5,
                                distributed: true
                              },
                            },
                            dataLabels: {
                              enabled: true,
                              formatter: function (val) {
                                return val.toFixed(2) + '%';
                              },
                              style: {
                                fontSize: '12px',
                                colors: ['#fff']
                              },
                              background: {
                                enabled: true,
                                foreColor: '#333',
                                opacity: 0.7,
                                borderWidth: 0,
                                borderRadius: 2,
                              }
                            },
                            stroke: {
                              show: true,
                              width: 2,
                              colors: ['transparent']
                            },

                            // xaxis: {
                            //   categories: data.map(item => {
                            //     const label = item.clientId;
                            //     return label.split('-')[0].trim(); // Only take text before "-"
                            //   }),
                            // },
                            
                            xaxis: {
                              categories: tableModelData.map(item => item.clientId.split('-')[0].trim()),
                            },
                            yaxis: {
                              title: {
                                text: 'Net Reclassification Improvement (%)'
                              },
                              labels: {
                                formatter: function (val) {
                                  return val.toFixed(2) + '%';
                                }
                              }
                            },
                            fill: { opacity: 1 },
                            tooltip: {
                              y: {
                                formatter: function (val) {
                                  return val.toFixed(2) + '%';
                                }
                              }
                            },
                            colors: ['#9C27B0']
                          }} 
                          series={[{
                            name: 'NRI (%)',
                            data: tableModelData.map(item => parseFloat(item.nri))
                          }]} 
                          type="bar" 
                          height={300} 
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card title='Precision-Recall'>
                    <CardContent>
                      <PrecisionRecallChart clientId='3' max={0.4} count={3}/>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ComboBoxPage;
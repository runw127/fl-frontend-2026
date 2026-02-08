"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const getHGBData = (gender, bmi, ethnicity, diagnosis, month) => {

  const defaultPayload = {
    Anaemic: {
      Count: 7842, Jan: 124.35336867115977, Feb: 124.25181838232957, Mar: 123.99698118053664, Apr: 124.42669144530885, May: 124.46938724179743, Jun: 124.55561937281992, Jul: 124.39916400763428, Aug: 124.21666670896418, Sep: 124.58048066007206, Oct: 124.05261418912978, Nov: 124.14064488430711, Dec: 124.55564104947784
    },
    Healthy: {
      Count: 21494, Jan: 146.26319446910367, Feb: 146.1842294546009, Mar: 145.9099231953786, Apr: 145.31498406973375, May: 145.6559905383089, Jun: 144.98725390897403, Jul: 145.6845637339466, Aug: 145.19681770827228, Sep: 145.34355920770068, Oct: 145.90299562435587, Nov: 146.09709072400386, Dec: 146.2844390620789
    },
    IronDef: {
      Count: 3912, Jan: 137.9242897500048, Feb: 138.45597798887755, Mar: 138.71089836273612, Apr: 138.8714345462976, May: 137.45567049944285, Jun: 139.17187518673668, Jul: 138.23882253479243, Aug: 138.22025822750695, Sep: 138.38849838647099, Oct: 138.7213017680845, Nov: 138.9029039714126, Dec: 139.13536256626438
    },
    LowIron: {
      Count: 8395, Jan: 141.938985437304, Feb: 141.9365813951398, Mar: 141.51413184933676, Apr: 142.03982548972428, May: 142.4428907225981, Jun: 142.02318404739185, Jul: 141.3730322867607, Aug: 141.86387668114094, Sep: 141.79047883864885, Oct: 142.334168304141, Nov: 142.49945053959465, Dec: 142.94894077343284
    },
    Polycythaemic: {
      Count: 3959, Jan: 164.44133591342626, Feb: 163.92733687610635, Mar: 164.5172965321306, Apr: 165.3837283151704, May: 165.49586193273117, Jun: 162.56267540719782, Jul: 159.28411504698124, Aug: 160.2971242402186, Sep: 163.17693766975532, Oct: 163.37661809912407, Nov: 163.16055476362638, Dec: 163.7984677362371
    }
  }

  const maleOnlyPayload = {
    Anaemic: {"Count": 404, "Jan": 124.91830324227324, "Feb": 125.49098186556411, "Mar": 122.11385866681486, "Apr": 125.57347382741986, "May": 126.87016611511993, "Jun": 127.39528378870448, "Jul": 126.29299051032041, "Aug": 126.79803296697168, "Sep": 126.33191056676469, "Oct": 124.71527593781597, "Nov": 124.97540703993191, "Dec": 127.73711829363816},
    Healthy: {"Count": 14096, "Jan": 149.8316637574858, "Feb": 149.95331014698422, "Mar": 149.17983973425845, "Apr": 148.53686976956462, "May": 148.95991233557575, "Jun": 148.10570874292654, "Jul": 148.69065190283345, "Aug": 148.64076886937565, "Sep": 149.13381283514414, "Oct": 149.99916623719878, "Nov": 150.10676567590468, "Dec": 150.19785147458362},
    IronDef: {"Count": 1615, "Jan": 141.4454455830831, "Feb": 143.4630236734492, "Mar": 142.67289493520641, "Apr": 142.34273085169178, "May": 138.98451110667688, "Jun": 142.29006744853424, "Jul": 141.32456980639213, "Aug": 141.37349715904315, "Sep": 141.86116410290228, "Oct": 142.26018235229313, "Nov": 142.74070154277285, "Dec": 143.29764707015198},
    LowIron: {"Count": 3881, "Jan": 147.34421044704547, "Feb": 147.78832850908094, "Mar": 146.87830775539467, "Apr": 145.94944817448874, "May": 147.66656930603048, "Jun": 147.01873310771492, "Jul": 145.71275899241073, "Aug": 146.8474500758781, "Sep": 147.4506798725707, "Oct": 147.21312934346852, "Nov": 147.59688327540155, "Dec": 148.9408904284392},
    Polycythaemic: {"Count": 3689, "Jan": 164.97219885117545, "Feb": 164.40043142301172, "Mar": 164.6076902376219, "Apr": 165.75852708136262, "May": 165.61753765703295, "Jun": 162.98713975904792, "Jul": 160.27674062496604, "Aug": 160.43095637363376, "Sep": 162.9599885208198, "Oct": 163.45164760546263, "Nov": 163.11015579306246, "Dec": 164.23627181392257}
  }

  const maleNormalPayload = {
    Anaemic: {"Count": 176, "Jan": 126.24270580368587, "Feb": 125.8365741766045, "Mar": 121.52857169133935, "Apr": 126.67385664073781, "May": 127.86971822430496, "Jun": 128.21821430043764, "Jul": 125.98206837246087, "Aug": 126.62363212472951, "Sep": 125.44816974881053, "Oct": 122.91697100536601, "Nov": 126.11842317120035, "Dec": 127.824362356207},
    Healthy: {"Count": 4726, "Jan": 148.41853874424027, "Feb": 148.91907770767335, "Mar": 147.73143660337817, "Apr": 147.4757081525934, "May": 147.9798817426619, "Jun": 147.3066768690925, "Jul": 146.87795857352484, "Aug": 147.9858346109211, "Sep": 148.16802846261817, "Oct": 149.0473117549047, "Nov": 148.90220756905705, "Dec": 148.71031668061357},
    IronDef: {"Count": 698, "Jan": 141.27257217572327, "Feb": 144.45272497754658, "Mar": 143.4587998438282, "Apr": 141.14999696991703, "May": 138.7262636641252, "Jun": 142.53879569415648, "Jul": 141.213428232081, "Aug": 141.8538861123157, "Sep": 142.1787178538635, "Oct": 142.50611266163028, "Nov": 143.26136063827246, "Dec": 143.1680162154811},
    LowIron: {"Count": 1651, "Jan": 146.5109103543719, "Feb": 147.58049662430622, "Mar": 146.0256869551961, "Apr": 145.44682324079568, "May": 146.4188891641835, "Jun": 146.35168590522167, "Jul": 144.94080655556144, "Aug": 146.32442315164437, "Sep": 146.6590468008503, "Oct": 145.80136337090377, "Nov": 147.2516293584201, "Dec": 147.69680070774},
    Polycythaemic: {"Count": 948, "Jan": 163.6898569376941, "Feb": 164.5051082855701, "Mar": 164.08511433398476, "Apr": 166.28258934290668, "May": 165.0235748661714, "Jun": 163.39668521545698, "Jul": 159.3826362944316, "Aug": 159.0925521041498, "Sep": 160.84822728684426, "Oct": 163.9215359590893, "Nov": 162.78196357039343, "Dec": 164.99654138229792}
  }

  const maleNormalCaucasianPayload = {
    Anaemic: {"Count": 156, "Jan": 126.73978808516021, "Feb": 125.42681634223594, "Mar": 120.63387067103197, "Apr": 126.82192852199805, "May": 127.86971822430496, "Jun": 128.21821430043764, "Jul": 126.38273055144029, "Aug": 126.62363212472951, "Sep": 125.47175762506374, "Oct": 122.80634177939555, "Nov": 126.27819789565754, "Dec": 128.30240763823286},
    Healthy: {"Count": 4308, "Jan": 148.25051817003418, "Feb": 148.69965217190668, "Mar": 147.71232602970682, "Apr": 147.7868562510537, "May": 147.73584523573894, "Jun": 146.99166409504863, "Jul": 146.8857376659201, "Aug": 148.01276906751696, "Sep": 148.02411834202462, "Oct": 149.0042394262195, "Nov": 148.89559083399442, "Dec": 148.7227709060296},
    IronDef: {"Count": 609, "Jan": 141.29068254790073, "Feb": 144.23384813047593, "Mar": 143.03105009530415, "Apr": 140.8558325767555, "May": 138.75375003466343, "Jun": 142.52368972565378, "Jul": 140.97924103136717, "Aug": 141.95160102717603, "Sep": 141.49642972558505, "Oct": 142.31543734671845, "Nov": 143.53633217682147, "Dec": 143.06294377534115},
    LowIron: {"Count": 1512, "Jan": 146.62237319062953, "Feb": 147.80740864022596, "Mar": 146.21479513514436, "Apr": 145.41939970762257, "May": 146.34237439658824, "Jun": 146.0145702388452, "Jul": 144.56848373531275, "Aug": 146.40444014662873, "Sep": 146.6397318172949, "Oct": 145.71020192659918, "Nov": 147.0966928837289, "Dec": 147.79193659844424},
    Polycythaemic: {"Count": 855, "Jan": 162.8968604149329, "Feb": 164.73301657004663, "Mar": 164.189948332342, "Apr": 166.25125229772627, "May": 165.28958760601466, "Jun": 163.45127705651325, "Jul": 159.7737092975343, "Aug": 159.32438953088817, "Sep": 161.39062714068788, "Oct": 163.92558550666098, "Nov": 162.95367450184384, "Dec": 165.08445511858963}
  }

  if (gender === 'All' && bmi === 'All' && ethnicity === 'All') {
    return defaultPayload[diagnosis][month];
  }

  if (gender === 'Male' && bmi === 'All' && ethnicity === 'All') {
    return maleOnlyPayload[diagnosis][month];
  }

  if (gender === 'Male' && bmi === '18-24.9' && ethnicity === 'All') {
    return maleNormalPayload[diagnosis][month];
  }

  if (gender === 'Male' && bmi === '18-24.9' && ethnicity === 'Caucasian') {
    return maleNormalCaucasianPayload[diagnosis][month];
  }

  return Math.round((10 + Math.random() * 4) * 10);

}

  // Mock data for top 5 diagnoses
  const initialTopDiagnoses = [
    { diagnosis: 'Anaemic', count: 1250, color: '#4CAF50' },
    { diagnosis: 'Healthy', count: 450, color: '#FFC107' },
    { diagnosis: 'IronDef', count: 200, color: '#FF9800' },
    { diagnosis: 'LowIron', count: 80, color: '#F44336' },
    { diagnosis: 'Polycythaemic', count: 72, color: '#9C27B0' },
  ]

  const topDiagnoses2 = [
    { diagnosis: 'Anaemic', count: 678, color: '#4CAF50' },
    { diagnosis: 'Healthy', count: 410, color: '#FF9800' },
    { diagnosis: 'LowIron', count: 204, color: '#FFC107' },
    { diagnosis: 'IronDef', count: 80, color: '#F44336' },
    { diagnosis: 'Polycythaemic', count: 72, color: '#9C27B0' },
  ]

  const topDiagnoses3 = [
    { diagnosis: 'IronDef', count: 220, color: '#FF9800' },
    { diagnosis: 'Anaemic', count: 213, color: '#4CAF50' },
    { diagnosis: 'Healthy', count: 202, color: '#FFC107' },
    { diagnosis: 'LowIron', count: 30, color: '#F44336' },
    { diagnosis: 'Polycythaemic', count: 24, color: '#9C27B0' },
  ]

  const topDiagnoses4 = [
    { diagnosis: 'IronDef', count: 210, color: '#FF9800' },
    { diagnosis: 'Healthy', count: 207, color: '#FFC107' },
    { diagnosis: 'Anaemic', count:195, color: '#4CAF50' },
    { diagnosis: 'LowIron', count: 105, color: '#F44336' },
    { diagnosis: 'Polycythaemic', count: 99, color: '#9C27B0' },
  ]


// Mock data for hematology trends
const generateMockData = (genderOption, bmiOption, ethnicityOption) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
    const diagnoses = ['Anaemic', 'Healthy', 'IronDef', 'LowIron', 'Polycythaemic']
    const genders = ['Male', 'Female']
    const ethnicities = ['Caucasian', 'African American', 'Asian', 'Hispanic', 'Other']
  
    return months.flatMap(month =>
      diagnoses.flatMap(diagnosis =>
        genders.flatMap(gender =>
          ethnicities.map(ethnicity => ({
            month,
            diagnosis,
            gender,
            ethnicity,
            bmi: Math.round((18 + Math.random() * 17) * 10) / 10, // BMI between 18 and 35
            wbc: Math.round((4 + Math.random() * 7) * 10) / 10, // WBC between 4 and 11
            hgb: getHGBData(genderOption, bmiOption, ethnicityOption, diagnosis, month),
            // hgb: Math.round((10 + Math.random() * 5) * 10), // HGB between 8 and 18
            rbc: Math.round((3 + Math.random() * 3) * 10) / 10, // RBC between 3 and 6
          }))
        )
      )
    )
  }
  
  const hematologyData = generateMockData()

const DiagramSection = () => {
    const [selectedDiagnosis, setSelectedDiagnosis] = useState('Normal')
    const [selectedMetric, setSelectedMetric] = useState('hgb')
    const [filters, setFilters] = useState({
      gender: 'All',
      bmiRange: 'All',
      ethnicity: 'All',
      startMonth: 'Jan',
      endMonth: 'Oct',
    })
    const [filteredData, setFilteredData] = useState(hematologyData)
    const [topDiagnoses, setTopDiagnoses] = useState(initialTopDiagnoses)
  
    const handleRowClick = (diagnosis) => {
      setSelectedDiagnosis(diagnosis)
    }
  
    const handleFilterChange = (key, value) => {
      setFilters(prev => ({ ...prev, [key]: value }))
    }
  
    useEffect(() => {
      const filtered = generateMockData(filters.gender, filters.bmiRange, filters.ethnicity).filter(item => {
        const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(item.month)
        const startIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(filters.startMonth)
        const endIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(filters.endMonth)
  
        // const bmiInRange = () => {
        //   if (filters.bmiRange === 'All') return true
        //   const [min, max] = filters.bmiRange.split('-').map(Number)
        //   return item.bmi >= min && item.bmi <= max
        // }
  
        return (
          // (filters.gender === 'All' || item.gender === filters.gender) &&
          // (filters.ethnicity === 'All' || item.ethnicity === filters.ethnicity) &&
          // bmiInRange() &&
          monthIndex >= startIndex && monthIndex <= endIndex
        )
      })
      setFilteredData(filtered)
    }, [filters])
  
    const getChartData = () => {
      const groupedData = filteredData.reduce((acc, item) => {
        if (!acc[item.month]) {
          acc[item.month] = { month: item.month }
        }
        if (!acc[item.month][item.diagnosis]) {
          acc[item.month][item.diagnosis] = []
        }
        acc[item.month][item.diagnosis].push(item[selectedMetric])
        return acc
      }, {})
  
      return Object.values(groupedData).map(monthData => ({
        month: monthData.month,
        ...Object.fromEntries(
          Object.entries(monthData)
            .filter(([key]) => key !== 'month')
            .map(([diagnosis, values]) => [diagnosis, values.reduce((sum, value) => sum + value, 0) / values.length])
        )
      }))
    }
  
    const getYAxisLabel = () => {
      switch (selectedMetric) {
        case 'wbc': return 'WBC (x10^9/L)'
        case 'hgb': return 'Hemoglobin (g/dL)'
        case 'rbc': return 'RBC (x10^12/L)'
        default: return ''
      }
    }

    useEffect(() => {
      if (filters.gender === 'Male') {
        if (filters.ethnicity === 'Caucasian') {
          if (filters.startMonth==='Jan' && filters.endMonth === 'Jun') {
            setTopDiagnoses(topDiagnoses4); return;
          }
          setTopDiagnoses(topDiagnoses3); return;
        }
        setTopDiagnoses(topDiagnoses2);
      }
    }, [filters])

  
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Haematology Trend Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="gender">Sex</Label>
                <Select onValueChange={(value) => handleFilterChange('gender', value)}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bmi">BMI Range</Label>
                <Select onValueChange={(value) => handleFilterChange('bmiRange', value)}>
                  <SelectTrigger id="bmi">
                    <SelectValue placeholder="Select BMI range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="18-24.9">18-24.9 (Normal)</SelectItem>
                    <SelectItem value="25-29.9">25-29.9 (Overweight)</SelectItem>
                    <SelectItem value="30-34.9">30-34.9 (Obese)</SelectItem>
                    <SelectItem value="35-39.9">35-39.9 (Severely Obese)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="ethnicity">Ethnicity</Label>
                <Select onValueChange={(value) => handleFilterChange('ethnicity', value)}>
                  <SelectTrigger id="ethnicity">
                    <SelectValue placeholder="Select ethnicity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Caucasian">Caucasian</SelectItem>
                    <SelectItem value="African American">African American</SelectItem>
                    <SelectItem value="Asian">Asian</SelectItem>
                    <SelectItem value="Hispanic">Hispanic</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="startMonth">Start Month</Label>
                <Select onValueChange={(value) => handleFilterChange('startMonth', value)}>
                  <SelectTrigger id="startMonth">
                    <SelectValue placeholder="Select start month" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((month) => (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="endMonth">End Month</Label>
                <Select onValueChange={(value) => handleFilterChange('endMonth', value)}>
                  <SelectTrigger id="endMonth">
                    <SelectValue placeholder="Select end month" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-semibold mb-4">Top 5 Diagnoses</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Diagnosis</TableHead>
                      <TableHead>Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topDiagnoses.map((d) => (
                      <TableRow
                        key={d.diagnosis}
                        className={`cursor-pointer ${d.diagnosis === selectedDiagnosis ? 'bg-muted' : ''}`}
                        onClick={() => handleRowClick(d.diagnosis)}
                      >
                        <TableCell>
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: d.color }}></div>
                            {d.diagnosis}
                          </div>
                        </TableCell>
                        <TableCell>{d.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
  
              <div className="md:col-span-3">
                <div className="mb-4">
                  <RadioGroup defaultValue="hgb" onValueChange={setSelectedMetric} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="wbc" id="wbc" />
                      <Label htmlFor="wbc">WBC</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hgb" id="hgb" />
                      <Label htmlFor="hgb">HGB</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rbc" id="rbc" />
                      <Label htmlFor="rbc">RBC</Label>
                    </div>
                  </RadioGroup>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis label={{ value: getYAxisLabel(), angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    {topDiagnoses.map((d) => (
                      <Line
                        key={d.diagnosis}
                        type="monotone"
                        dataKey={d.diagnosis}
                        stroke={d.color}
                        strokeWidth={d.diagnosis === selectedDiagnosis ? 3 : 1}
                        dot={d.diagnosis === selectedDiagnosis}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
};

export default DiagramSection;
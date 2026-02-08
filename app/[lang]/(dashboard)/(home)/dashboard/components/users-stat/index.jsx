"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import UsersDataChart from "./users-data-chart";
import UsersDataTable from "./users-data-table";

const UsersStat = () => {
  const users = [
    {
      id: 1,
      country: "Bangladesh",
      count: "05",
    },
    {
      id: 2,
      country: "India",
      count: "06",
    },
    {
      id: 3,
      country: "Pakistan",
      count: "06",
    },
    {
      id: 4,
      country: "Australia",
      count: "10",
    },
    {
      id: 5,
      country: "America",
      count: "08",
    },
  ];
  const methods = [
    {
      id: 1,
      country: "Mild Anaemia",
      count: "450",
    },
    {
      id: 2,
      country: "Polycythemia",
      count: "366",
    },
    {
      id: 3,
      country: "AML",
      count: "167",
    },
    {
      id: 4,
      country: "Complete Blood Count",
      count: "165",
    },
    {
      id: 5,
      country: "mammography",
      count: "82",
    },
  ];
  return (
    <Card>
      <CardHeader className="border-none pb-0 mb-5">
        <div className="flex items-center gap-1">
          <div className="flex-1">
            <div className="text-xl font-semibold text-default-900">
              {/* Users */}
              Diagnosis
            </div>
            <span className="text-xs text-default-600 ml-1">In Last 30 Minutes</span>
          </div>
          <div className="flex-none flex items-center gap-1">
            <span className="text-4xl font-semibold text-primary">63</span>
            <span className="text-2xl text-success">
              <Icon icon="heroicons:arrow-trending-up-16-solid" />
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-0">
        <p className="text-xs font-medium text-default-800">
            {/* User Per Minutes */}
            Methods Ranking Rate
        </p>
        <div className="grid grid-cols-12  gap-6 ">
          <div className="col-span-12 lg:col-span-6">
            <UsersDataChart />
          </div>
          <div className="col-span-12 lg:col-span-6">
            <UsersDataTable users={methods} />
          </div>
        </div>

        {/* <UsersDataTable users={users} /> */}
      </CardContent>
    </Card>
  );
};

export default UsersStat;
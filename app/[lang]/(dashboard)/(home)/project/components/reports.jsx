import { Application } from "@/components/svg";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Fragment } from "react";

const ReportsCard = () => {
  const overview = [
    {
      id: 1,
      title: "Models Overview",
      icon: <Application className="w-6 h-6 text-primary" />,
      color: "primary",
      details: [
        { label: "Total Models", value: "10" },
        { label: "Active Models", value: "3" },
        { label: "Completed Models", value: "5" },
        { label: "Failed Models", value: "2" }
      ],
      rate: "5.2",
      trendingType: "success"
    },
    {
      id: 2,
      title: "Model Performance",
      icon: <Application className="w-6 h-6 text-success" />,
      color: "success",
      details: [
        { label: "Avg Accuracy", value: "88%" },
        { label: "Avg Loss", value: "0.25" },
        { label: "Best Model", value: "Iron-deficiency" },
        { label: "Worst Model", value: "BMI-classification" }
      ],
      rate: "8.5",
      trendingType: "success"
    },
    {
      id: 3,
      title: "Training Performance",
      icon: <Application className="w-6 h-6 text-destructive" />,
      color: "destructive",
      details: [
        { label: "Avg Local Epochs", value: "10" },
        { label: "Avg Comm Rounds", value: "100" },
        { label: "Avg Time", value: "40 Mins" },
        { label: "", value: "" }
      ],
      rate: "6.8",
      trendingType: "warning"
    },
    {
      id: 4,
      title: "Participant & Data Stats",
      icon: <Application className="w-6 h-6 text-info" />,
      color: "info",
      details: [
        { label: "Avg Participants", value: "4" },
        { label: "Avg Val Participants", value: "4" },
      ],
      rate: "7.1",
      trendingType: "success"
    }
  ];

  const trendingIconColor = {
    success: "text-success/90",
    warning: "text-warning/90",
    error: "text-error/90"
  };

  return (
    <Fragment>
      {
        overview.map(section => (
          <Card key={section.id} className="rounded-lg p-4 flex flex-col items-center w-full">
            <div>
              <span className={`h-12 w-12 rounded-full flex justify-center items-center bg-${section.color}/10`}>
                {section.icon}
              </span>
            </div>
            <div className="mt-4 text-center">
              <div className="text-lg font-semibold text-default-600">{section.title}</div>
              <div className="space-y-1 mt-2">
                {section.details.map((detail, index) => (
                  <div key={index} className="flex justify-between text-base gap-10 text-default-600 w-full px-2">
                    <span>{detail.label}</span>
                    <span>{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))
      }
    </Fragment>
  );
};

export default ReportsCard;

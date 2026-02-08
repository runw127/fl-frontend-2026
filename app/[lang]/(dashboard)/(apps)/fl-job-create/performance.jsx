import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const PerformanceMetricSelector = ({ metrics, selectedMetrics, onToggleMetric }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {metrics.map((metric) => {
        const isSelected = selectedMetrics.includes(metric.id);
        return (
          <div
            key={metric.id}
            className={cn(
              "bg-default-100 px-4 py-2 rounded-md inline-flex items-center justify-center cursor-pointer transition-all border border-transparent hover:bg-info/5",
              {
                "bg-info/10 border-info/30": isSelected,
              }
            )}
            onClick={() => onToggleMetric(metric.id)}
          >
            <Checkbox
              id={metric.id}
              color="info"
              checked={isSelected}
              onCheckedChange={() => onToggleMetric(metric.id)}
            />
            <label
              htmlFor={metric.id}
              className={cn("text-xs font-semibold text-default-600 ml-2 cursor-pointer", {
                "text-info": isSelected,
              })}
            >
              {metric.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default PerformanceMetricSelector;

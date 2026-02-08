import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

const ParticipantSelector = ({ participants, selectedParticipants, onToggleParticipant }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {participants.map((participant) => {
        const isChecked = selectedParticipants.includes(participant.id);
        return (
          <Label
            key={participant.id}
            className={cn(
              "flex justify-between items-center p-3 rounded-md border border-default-200 transition-all cursor-pointer hover:border-success/50",
              {
                "border-success bg-success/5": isChecked,
              }
            )}
            htmlFor={participant.id}
          >
            <div className="flex items-center gap-3">
              <Checkbox
                id={participant.id}
                color="success"
                checked={isChecked}
                onCheckedChange={() => onToggleParticipant(participant.id)}
              />
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 rounded">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                    {participant.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-xs text-default-800">
                    {participant.name}
                  </h4>
                  <p className="text-[10px] text-default-500 line-clamp-1">
                    {participant.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 ltr:ml-2 rtl:mr-2">
              <span
                className={cn("h-1.5 w-1.5 rounded-full", {
                  "bg-success": participant.status === "approved",
                  "bg-warning": participant.status === "awaiting",
                  "bg-default-400": participant.status === "inactive",
                })}
              ></span>
              <span className={cn("text-[9px] font-semibold uppercase", {
                "text-success": participant.status === "approved",
                "text-warning": participant.status === "awaiting",
                "text-default-500": participant.status === "inactive",
              })}>
                {participant.status === "approved" ? "Approved" : participant.status === "awaiting" ? "Pending" : "Available"}
              </span>
            </div>
          </Label>
        );
      })}
    </div>
  );
};

export default ParticipantSelector;

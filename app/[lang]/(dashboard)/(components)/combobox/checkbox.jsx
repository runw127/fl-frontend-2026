"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const CustomStyledCheckbox = () => {
  const [checked1, setchecked1] = useState(false);
  const [checked2, setchecked2] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <Label
        className={cn(
          "flex justify-end sm:justify-between items-center w-full flex-wrap p-4 rounded-md border border-transparent gap-2",
          {
            "border-success": checked1,
          }
        )}
        htmlFor="csc_1"
      >
        <div className="flex items-center gap-3 ">
          <Checkbox
            value="csc_1"
            id="csc_1"
            color="success"
            onCheckedChange={() => setchecked1(checked1)}
          />
          <div className="flex items-center gap-3">
            <div>
              <h4 className="font-bold md:font-medium text-sm md:text-base text-default-800">
              Iron Deficiency Classifier
              </h4>
              <p className="text-xs md:text-sm font-semibold text-default-600">
              HD-FBC
              </p>
            </div>
          </div>
        </div>
      </Label>

      <Label
        className={cn(
          "flex justify-end sm:justify-between items-center w-full flex-wrap p-4 rounded-md border border-transparent gap-2",
          {
            "border-success": checked2,
          }
        )}
        htmlFor="csc_2"
      >
        <div className="flex items-center gap-3 ">
          <Checkbox
            value="csc_2"
            id="csc_2"
            color="success"
            onCheckedChange={() => setchecked2(!checked2)}
          />
          <div className="flex items-center gap-3">
            <div>
              <h4 className="font-bold md:font-medium text-sm md:text-base text-default-800">
              Iron Deficiency Classifier V2
              </h4>
              <p className="text-xs md:text-sm font-semibold text-default-600">
              HD-FBC
              </p>
            </div>
          </div>
        </div>
      </Label>
    </div>
  );
};

export default CustomStyledCheckbox;

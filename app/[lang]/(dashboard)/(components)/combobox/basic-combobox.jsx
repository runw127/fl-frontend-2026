"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const models = [
  {
    value: "Iron Deficiency Classifier",
    label: "Iron Deficiency Classifier V2",
  },
  {
    value: "Iron Deficiency Classifier",
    label: "Iron Deficiency Classifier V3",
  },
  {
    value: "Iron Deficiency Classifier",
    label: "Iron Deficiency Classifier V4",
  },
  {
    value: "Iron Deficiency Classifier",
    label: "Iron Deficiency Classifier V5",
  },
  {
    value: "Iron Deficiency Classifier",
    label: "Iron Deficiency Classifier V6",
  },
];

const BasicCombobox = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
        >
          {value
            ? models.find((model) => model.value === value)
              ?.label
            : "Select Curated Models"}
          <ChevronsUpDown className="ml-2 h-4 w-6 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search models..." />
          <CommandEmpty>No models found.</CommandEmpty>
          <CommandGroup>
            {models.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default BasicCombobox;
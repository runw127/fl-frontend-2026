"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { statuses } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[500px] truncate font-medium">
        {row.getValue("title")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      return (
        <div className="flex w-[100px] items-center">
          <Badge
            variant="soft"
            color={
              (row.getValue("status") === "done" && "destructive") ||
              (row.getValue("status") === "in progress" && "success") ||
              (row.getValue("status") === "canceled" && "info")
            }
            className="capitalize"
          >
            {row.getValue("status")}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "time_finished",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time Finished" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("time_finished") || "N/A"}</div>
    ),
  },
  {
    accessorKey: "local_epochs",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Local Epochs" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("local_epochs") || "N/A"}</div>
    ),
  },
  {
    accessorKey: "log",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Log" />
    ),
    cell: ({ row }) => <div>{row.getValue("log")}</div>,
  },
  {
    accessorKey: "completed_rounds",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Completed Rounds" />
    ),
    cell: ({ row }) => <div>{row.getValue("completed_rounds")}</div>,
  },
  {
    accessorKey: "participants",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Participants" />
    ),
    cell: ({ row }) => <div>{row.getValue("participants")}</div>,
  },
  {
    accessorKey: "accuracy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Accuracy" />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("accuracy") ? `${(row.getValue("accuracy") * 100).toFixed(2)}%` : "N/A"}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
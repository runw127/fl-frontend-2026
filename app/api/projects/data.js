import avatar1 from "@/public/images/avatar/avatar-1.jpg";
import avatar2 from "@/public/images/avatar/avatar-2.jpg";
import avatar3 from "@/public/images/avatar/avatar-3.jpg";
import avatar4 from "@/public/images/avatar/avatar-4.jpg";
import avatar5 from "@/public/images/avatar/avatar-5.jpg";
import avatar6 from "@/public/images/avatar/avatar-6.jpg";
import avatar7 from "@/public/images/avatar/avatar-7.jpg";
import avatar8 from "@/public/images/avatar/avatar-8.jpg";
import avatar9 from "@/public/images/avatar/avatar-9.jpg";
import avatar10 from "@/public/images/avatar/avatar-10.jpg";
import avatar11 from "@/public/images/avatar/avatar-11.jpg";
import avatar12 from "@/public/images/avatar/avatar-12.jpg";
import avatar13 from "@/public/images/avatar/avatar-13.jpg";

import ass from "@/public/images/projects/ass.jpg";
import productify from "@/public/images/projects/productify.jpg";
import uradvisor from "@/public/images/projects/uradvisor.jpg";
import konst from "@/public/images/projects/konst.jpg";
import { faker } from "@faker-js/faker";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Timer,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { format } from "date-fns";
import { color } from "framer-motion";
export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CheckCircle2,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: Timer,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle2,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ChevronDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ChevronRight,
  },
  {
    label: "High",
    value: "high",
    icon: ChevronUp,
  },
];

function getRandomDate(startDate, endDate) {
  const start = startDate.getTime();
  const end = endDate.getTime();
  const randomTime = start + Math.random() * (end - start);
  return new Date(randomTime);
}

export function generateAssignments(numAssign) {
  const assignObjects = [];

  for (let j = 0; j < numAssign; j++) {
    assignObjects.push({
      image: faker.image.avatarLegacy(),
      label: faker.person.firstName(),
      value: faker.internet.userName(),
    });
  }

  return assignObjects;
}

const currentYear = new Date().getFullYear();
const assignDate = faker.date.past(
  `${currentYear}-01-01`,
  `${currentYear}-12-31`
);
const dueDate = faker.date.future(assignDate, `${currentYear}-12-31`);
export const projects = [
  {
    id: 1,
    title: "AUMC",
    color: '#ff4560',
    subtitle:
      "Sample size: 60,0000",
    status: "in progress",
    label: "bug",
    priority: "low",
    description:
    "Sample size: 60,0000",
    percentage: 20,
    assignDate: "03/10/2024",

  },

  {
    id: 2,
    title: "BARTS",
    color: '#002ffb',
    subtitle:
      "Productify is a secure, and high-speed production management system constructed by Laravel.",
    status: "review",
    label: "bug",
    priority: "medium",
    description:
    "Sample size: 50,0000",
    percentage: 50,
    assignDate: "03/10/2024",
  },
  {
    id: 3,
    title: "MRC-GAMBIA",
    color: '#00e396',
    subtitle:
    "Sample size: 10,0000",
    status: "in progress",
    label: "bug",
    priority: "low",
    description:
    "Sample size: 70,0000",
    percentage: 60,
    assignDate: "03/10/2024",
  },
  {
    id: 4,
    title: "APOLLO",
    color: '#008ffb',
    subtitle:
    "Sample size: 100,0000",
    status: "completed",
    label: "bug",
    priority: "high",
    description:
    "Sample size: 100,0000",
    percentage: 40,
    assignDate: "03/10/2024",
  },
 ];

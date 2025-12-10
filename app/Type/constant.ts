import { Calendar, FolderKanban, Home, LayoutDashboard, Users } from "lucide-react";

export const menuItems = [
  { name: "Overview Dashboard", icon: Home, href: "/dashboardLocker/Overview_Dashboard" },
  { name: "Locker View 2D", icon: LayoutDashboard, href: "/dashboardLocker/Locker_section" },
  { name: "Check Locker Report", icon: Users, href: "/dashboardLocker/lockerReport" },
  { name: "Import Locker Data", icon: FolderKanban, href: "/dashboardLocker/Locker_Data_Import" },
  { name: "Employee Data", icon: Calendar, href: "/dashboardLocker/Locker_Data_User" },
];

export const months = [
  "January","February ","March ","April","May","June","July","August",
  "September","Octorber","November","December"
];

export const monthsMALL = [
  "Jan","Feb","Mar","Apr","May","June","July","Aug",
  "Sep","Oct","Nov","Dec"
];

export const REQUIRED_HEADER = [
  //"LOCKERUSERDATA ID",
  //"LOCKER ID",
  "LOCKER NUMBER",
  "MEMBER ID",
  "NAME-LASTNAME",
  //"ACTIVE LOKCER STATUS"
]

export const REQUIRED_HEADER_SHOE = [
  "SHOESLOCKERNUMBER",
  "MEMBER ID FIRST",
  "MEMBER ID SECOUND",
  "NAME-LASTNAME FIRST",
  "NAME-LASTNAME SECOUND",
] 
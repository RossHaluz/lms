"use client";
import { BarChart, Compass, Layout, List } from "lucide-react";
import React from "react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

const questRoutes = [
  {
    id: 1,
    icon: Layout,
    lable: "Dashboard",
    href: "/",
  },
  {
    id: 2,
    icon: Compass,
    lable: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    id: 1,
    icon: List,
    lable: "Courses",
    href: "/teacher/courses",
  },
  {
    id: 2,
    icon: BarChart,
    lable: "Analitics",
    href: "/teacher/analytics",
  },
];

const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : questRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes?.map((item) => {
        return <SidebarItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default SidebarRoutes;

"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const SidebarItem = ({ item }) => {
  const { lable, href, icon: Icon } = item;
  const pathname = usePathname();
  const route = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname.startsWith(`${href}/`);

  const onClick = () => {
    route.push(href);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center pl-4 gap-x-2 text-sm font-medium transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-sky-700 bg-slate-200/20 hover:bg-sky-200/20 hover:text-sky-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={24}
          className={cn("text-slate-500", isActive && "text-sky-700")}
        />
        {lable}
      </div>

      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-sky-700 h-full rounded-md transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};

export default SidebarItem;

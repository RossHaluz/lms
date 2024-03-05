"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherRoute = pathname?.startsWith("/teacher");
  const isPlayerRoute = pathname?.includes("/chapter");

  return (
    <div className="flex items-center gap-2 ml-auto">
      {isTeacherRoute || isPlayerRoute ? (
        <Link href="/">
          <Button size="sm" variant="ghost">
            <LogOut className="w-4 h-4" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button size="sm" variant="ghost">
            Teacher mode
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavbarRoutes;

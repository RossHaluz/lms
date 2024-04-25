"use client";
import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./search-input";
import isTeacher from "@/lib/is-teacher";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const { userId } = useAuth();

  const isTeacherRoute = pathname?.startsWith("/teacher");
  const isPlayerRoute = pathname?.includes("/chapter");
  const isSearch = pathname === "/search";

  return (
    <>
      {isSearch && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex items-center gap-2 ml-auto">
        {isTeacherRoute || isPlayerRoute ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="w-4 h-4" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavbarRoutes;

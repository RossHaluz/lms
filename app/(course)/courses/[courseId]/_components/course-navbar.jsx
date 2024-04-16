import NavbarRoutes from "@/components/navbar-routes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import CourseMobileSidebar from "./course-mobile-sidebar";

const CourseNavbar = ({ course, progressCount }) => {
  return (
    <div className="flex items-center p-4 h-full border-b bg-white shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
};

export default CourseNavbar;

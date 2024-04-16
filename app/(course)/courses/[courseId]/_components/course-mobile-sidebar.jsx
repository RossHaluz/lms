import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import CourseSidebar from "./course-sidebar";

const CourseMobileSidebar = ({ course, progressCount }) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden opacity-75" asChild>
        <Menu />
      </SheetTrigger>

      <SheetContent side="left" className="p-0 w-72 bg-white">
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
};

export default CourseMobileSidebar;

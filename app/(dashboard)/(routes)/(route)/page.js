import getDashboardCourse from "@/actions/get-dashboard-courses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CourseList from "../search/_components/course-list";
import { CheckCircle, Clock } from "lucide-react";
import InfoCard from "./_components/info-card";

const Dashboard = async () => {
  const { userId } = auth();
  if (!userId) return redirect("/");
  const { comletedCourses, coursesInProgress } = await getDashboardCourse(
    userId
  );

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoCard
          icon={Clock}
          lable="In Progress"
          numberOfItems={coursesInProgress?.length}
          variant="default"
        />

        <InfoCard
          icon={CheckCircle}
          lable="Completed"
          numberOfItems={comletedCourses?.length}
          variant="success"
        />
      </div>
      <CourseList items={[...comletedCourses, ...coursesInProgress]} />
    </div>
  );
};

export default Dashboard;

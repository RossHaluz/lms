import getProgress from "@/actions/get-progress";
import CourseModel from "@/models/course";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CourseSidebar from "./_components/course-sidebar";
import CourseNavbar from "./_components/course-navbar";

const CourseLayout = async ({ children, params: { courseId } }) => {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const course = await CourseModel.findOne({
    _id: courseId,
  })
    .populate({
      path: "chapters",
      match: { isPublished: true },
      options: { sort: { position: 1 } },
      populate: {
        path: "userProgress",
        match: { userId: userId },
      },
    })
    .sort({ createAt: "asc" })
    .exec();

  if (!course) return redirect("/");

  const progressCount = await getProgress(userId, course?._id);

  return (
    <div className="h-full">
      <div className="md:pl-80 h-[80px] w-full fixed inset-y-0 z-50">
        <CourseNavbar course={course} progressCount={progressCount} />
      </div>
      <div className="hidden md:flex flex-col w-80 h-full fixed inset-y-0 z-50">
        <CourseSidebar course={course} progressCount={progressCount} />
      </div>
      <main className="md:pl-80 pt-20 h-full">{children}</main>
    </div>
  );
};

export default CourseLayout;

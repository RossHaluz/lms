import PurchasesModel from "@/models/purchases";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CourseSedibarItem from "./course-sidebar-item";
import CourseProgress from "@/components/course-progress";

const CourseSidebar = async ({ course, progressCount }) => {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const purchase = await PurchasesModel.findOne({
    userId,
    courseId: course?._id,
  });

  return (
    <div className="flex flex-col border-r h-full overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col gap-4 border-b">
        <h1 className="font-semibold">{course?.title}</h1>
        <CourseProgress value={progressCount} />
      </div>
      <div className="flex flex-col w-full">
        {course?.chapters?.map((item) => {
          return (
            <CourseSedibarItem
              key={item?._id}
              id={item?._id}
              label={item?.title}
              isCompleted={!!item?.userProgress?.[0]?.isCompleted}
              courseId={course?._id}
              isLocked={!item?.isFree && !purchase}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CourseSidebar;

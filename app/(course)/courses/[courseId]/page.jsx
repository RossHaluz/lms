import connect from "@/lib/mongodb";
import CourseModel from "@/models/course";
import { redirect } from "next/navigation";

const CourseDetailsPage = async ({ params }) => {
  await connect();
  const course = await CourseModel.findOne({
    _id: params?.courseId,
  }).populate({
    path: "chapters",
    match: { isPublished: true },
  });

  if (!course) return redirect("/");

  return redirect(
    `/courses/${course?._id}/chapters/${course?.chapters[0]?._id}`
  );
};

export default CourseDetailsPage;

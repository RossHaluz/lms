import connect from "@/lib/mongodb";
import CourseModel from "@/models/course";

const CourseDetailsPage = async ({ params }) => {
  await connect();
  const course = await CourseModel.findById(params?.courseId);

  return <div>Coure details page {course?.title}</div>;
};

export default CourseDetailsPage;

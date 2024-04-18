import CourseModel from "@/models/course";
import getProgress from "./get-progress";

const getCourses = async ({ title, categoryId, userId }) => {
  try {
    let query = {
      userId,
      isPublished: true,
    };

    if (categoryId) {
      query.categoryId = categoryId;
    }

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    const courses = await CourseModel.find(query)
      .populate("categoryId")
      .populate({
        path: "chapters",
        match: { isPublished: true },
        select: "_id",
      })
      .sort({ createdAt: "desc" })
      .exec();

    const coursesWithProgress = await Promise.all(
      courses?.map((course) => {
        if (course?.purchases?.length === 0) {
          return {
            ...course,
            progress: null,
          };
        }

        const progressPersateg = getProgress(userId, course?._id);

        return {
          ...course,
          progress: progressPersateg,
        };
      })
    );

    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
};

export default getCourses;

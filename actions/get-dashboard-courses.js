import connect from "@/lib/mongodb";
import PurchasesModel from "@/models/purchases";
import getProgress from "./get-progress";

const getDashboardCourse = async (userId) => {
  try {
    await connect();

    const purchaseCourses = await PurchasesModel.find({ userId }).populate({
      path: "courseId",
      populate: {
        path: "chapters",
        match: { isPublished: true },
      },
    });

    const courses = purchaseCourses
      ?.filter((item) => item?.courseId)
      .map((item) => item.courseId);

    for (let course of courses) {
      const progress = await getProgress(userId, course?._id);
      course["progress"] = progress;
    }

    const comletedCourses = courses?.filter((item) => item?.progress === 100);
    const coursesInProgress = courses?.filter(
      (item) => (item?.progress ?? 0) !== 100
    );

    return {
      comletedCourses,
      coursesInProgress,
    };
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      comletedCourses: [],
      coursesInProgress: [],
    };
  }
};

export default getDashboardCourse;

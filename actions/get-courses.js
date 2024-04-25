import CourseModel from "@/models/course";
import getProgress from "./get-progress";
import PurchasesModel from "@/models/purchases";

const getCourses = async ({ title, categoryId, userId }) => {
  try {
    let query = {
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

    const purchasesUser = await PurchasesModel.find({
      userId,
    });

    const coursesWithProgress = await Promise.all(
      courses?.map(async (course) => {
        const findPurchase = purchasesUser?.find(
          (item) =>
            item?._id.toString() === course?._doc?.purchases[0].toString()
        );

        if (!findPurchase) {
          return {
            ...course._doc,
            progress: null,
          };
        }

        return {
          ...course?._doc,
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

import connect from "@/lib/mongodb";
import ChapterModel from "@/models/chapter";
import UserProgressModel from "@/models/userProgress";

const getProgress = async (userId, courseId) => {
  try {
    await connect();

    const publishedChapters = await ChapterModel.find({
      courseId,
      isPublished: true,
    }).select("_id");

    const publiheChaptersIds = publishedChapters?.map((item) => item?._id);
    const countCompletedChapters = await UserProgressModel.countDocuments({
      userId: userId,
      chapterId: { $in: publiheChaptersIds },
      isCompleted: true,
    });

    const proggressPersent =
      (countCompletedChapters / publiheChaptersIds?.length) * 100;

    return proggressPersent;
  } catch (error) {
    console.log("[COMPLETED_CHAPTERS_PERSENT]", error.message);
  }
};

export default getProgress;

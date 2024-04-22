import AttachmentModel from "@/models/attachment";
import ChapterModel from "@/models/chapter";
import CourseModel from "@/models/course";
import MuxDataModel from "@/models/muxdata";
import PurchasesModel from "@/models/purchases";
import UserProgressModel from "@/models/userProgress";

const getChapter = async ({ userId, chapterId, courseId }) => {
  try {
    const purchase = await PurchasesModel.findOne({
      userId,
      courseId,
    });

    const course = await CourseModel.findOne({
      _id: courseId,
      isPublished: true,
    }).select("price");

    const chapter = await ChapterModel.findOne({
      _id: chapterId,
      isPublished: true,
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let muxData = null;
    let attachments = [];
    let nextChapter = null;

    if (purchase) {
      attachments = await AttachmentModel.find({
        courseId,
      });
    }

    if (chapter?.isFree || purchase) {
      muxData = await MuxDataModel.findOne({
        chapterId,
      });

      nextChapter = await ChapterModel.findOne({
        _id: { $ne: chapterId }, // не поточний розділ
        courseId,
        position: { $gte: chapter.position },
      }).sort("asc");
    }

    const userProgress = await UserProgressModel.findOne({
      userId,
      chapterId,
    });

    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      purchase,
      userProgress,
    };
  } catch (error) {
    console.log("[CHAPTER_DETAILS]", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      purchase: null,
      userProgress: null,
    };
  }
};

export default getChapter;

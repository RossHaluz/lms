import connect from "@/lib/mongodb";
import ChapterModel from "@/models/chapter";
import CourseModel from "@/models/course";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { courseId, chapterId } = params;
    const { userId } = auth();
    await connect();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await CourseModel.findOne({
      _id: courseId,
      userId: userId,
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updateChapter = await ChapterModel.findByIdAndUpdate(
      chapterId,
      {
        isPublished: false,
      },
      { new: true }
    );

    return NextResponse.json(updateChapter);
  } catch (error) {
    console.log("[CHAPTER_ID_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

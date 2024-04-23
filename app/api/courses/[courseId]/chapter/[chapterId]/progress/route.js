import getProgress from "@/actions/get-progress";
import connect from "@/lib/mongodb";
import ChapterModel from "@/models/chapter";
import CourseModel from "@/models/course";
import UserProgressModel from "@/models/userProgress";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await connect();
    const { isCompleted } = await req.json();
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorize", { status: 401 });
    }
    const userProgress = await UserProgressModel.findOneAndUpdate(
      {
        userId,
        chapterId: params.chapterId,
      },
      { userId, chapterId: params.chapterId, isCompleted },
      { new: true, upsert: true }
    );

    const progressCount = await getProgress(userId, params?.courseId);

    await CourseModel.findByIdAndUpdate(params?.courseId, {
      progress: progressCount,
    });

    await ChapterModel.findByIdAndUpdate(params?.chapterId, {
      $push: { userProgress: userProgress },
    });

    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("[UPDATE_PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

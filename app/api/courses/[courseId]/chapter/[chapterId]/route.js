import connect from "@/lib/mongodb";
import ChapterModel from "@/models/chapter";
import CourseModel from "@/models/course";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;
    const values = await req.json();
    await connect();

    if (!userId) {
      return new NextResponse("Unauthorize", { status: 401 });
    }

    const findCourse = await CourseModel.findOne({
      _id: courseId,
      userId: userId,
    });

    if (!findCourse) {
      return new NextResponse("Unauthorize", { status: 401 });
    }

    const updateChapter = await ChapterModel.findByIdAndUpdate(
      chapterId,
      { ...values },
      { new: true }
    );

    return NextResponse.json(updateChapter);
  } catch (error) {
    console.log(error.message);
    return new NextResponse("Iteral Error", { status: 500 });
  }
}

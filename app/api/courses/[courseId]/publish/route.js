import connect from "@/lib/mongodb";
import ChapterModel from "@/models/chapter";
import CourseModel from "@/models/course";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { courseId } = params;
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

    const isPublishedChapter = await ChapterModel.find({
      courseId: courseId,
      isPublished: true,
    });

    if (!isPublishedChapter?.length) {
      return new NextResponse("There should be at least one public chaper", {
        status: 400,
      });
    }

    const updateCourse = await CourseModel.findByIdAndUpdate(
      courseId,
      {
        isPublished: true,
      },
      { new: true }
    );

    return NextResponse.json(updateCourse);
  } catch (error) {
    console.log(error.message);
    return new NextResponse("[COURSE_PUBLISH]", error.message);
  }
}

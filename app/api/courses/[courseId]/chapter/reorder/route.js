import connect from "@/lib/mongodb";
import ChapterModel from "@/models/chapter";
import CourseModel from "@/models/course";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { userId } = auth();
    const { list } = await req.json();
    const { courseId } = params;
    await connect();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const findCourse = await CourseModel.findOne({
      userId: userId,
      _id: courseId,
    });

    if (!findCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    for (let item of list) {
      await ChapterModel.findByIdAndUpdate(item.id, {
        position: item.position,
      });
    }

    return new NextResponse("Success", { status: 200 });
  } catch (error) {
    console.log("[REORDER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

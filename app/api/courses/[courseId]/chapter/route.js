import connect from "@/lib/mongodb";
import ChapterModel from "@/models/chapter";
import CourseModel from "@/models/course";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { userId } = auth();
  const { courseId } = params;
  const { title } = await req.json();
  await connect();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const lastElement = await ChapterModel.findOne({ courseId: courseId })
    .sort({ position: -1 })
    .exec();
  const newPosition = lastElement ? lastElement.position + 1 : 1;

  const newChapter = await ChapterModel.create({
    courseId: courseId,
    title: title,
    position: newPosition,
  });

  await CourseModel.findByIdAndUpdate(courseId, {
    $push: newChapter._id,
  });

  return NextResponse.json(newChapter);
}

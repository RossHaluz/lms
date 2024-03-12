import connect from "@/lib/mongodb";
import AttachmentModel from "@/models/attachment";
import CourseModel from "@/models/course";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const { userId } = auth();
  const { courseId } = params;
  const { url } = await req.json();
  await connect();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const findCourse = await CourseModel.findById(courseId);

  if (!findCourse) {
    return new NextResponse("Something went wrong", { status: 500 });
  }

  const newAttachment = await AttachmentModel.create({
    url,
    name: url.split("/").pop(),
    courseId: courseId,
  });

  if (!newAttachment) new NextResponse("Unauthorized", { status: 401 });

  await CourseModel.findByIdAndUpdate(findCourse._id, {
    $push: { attachments: newAttachment._id },
  });

  return NextResponse.json(newAttachment);
}

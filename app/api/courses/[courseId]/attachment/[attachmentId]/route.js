import connect from "@/lib/mongodb";
import AttachmentModel from "@/models/attachment";
import CourseModel from "@/models/course";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { courseId, attachmentId } = params;
  const { userId } = auth();
  await connect();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const findCourse = await CourseModel.findById(courseId);

  if (!findCourse) {
    return new NextResponse("Something went wrong", { status: 500 });
  }

  const updateCourse = findCourse?.attachments?.filter(
    (item) => item.toString() !== attachmentId
  );

  await CourseModel.findByIdAndUpdate(findCourse._id, {
    attachments: updateCourse,
  });

  const deleteAttachment = await AttachmentModel.findByIdAndDelete(
    attachmentId
  );
  if (!deleteAttachment) {
    return new NextResponse("Something went wrong", { status: 500 });
  }

  return NextResponse.json(deleteAttachment);
}

import connect from "@/lib/mongodb";
import CourseModel from "@/models/course";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { userId } = auth();
    const { courseId } = req.params;
    const values = await req.json();
    console.log(values);
    await connect();

    if (!userId) {
      return NextResponse("Unauthorized", { status: 401 });
    }

    const updateCourse = await CourseModel.findByIdAndUpdate(courseId, values, {
      new: true,
    });

    if (!updateCourse) {
      return NextResponse("Something went wrong", { status: 500 });
    }

    return NextResponse(updateCourse);
  } catch (error) {
    console.log(error.message);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

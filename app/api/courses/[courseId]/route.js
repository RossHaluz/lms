import connect from "@/lib/mongodb";
import CategoryModel from "@/models/category";
import CourseModel from "@/models/course";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();
    await connect();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updateCourse = await CourseModel.findByIdAndUpdate(courseId, values, {
      new: true,
    });

    if (!updateCourse) {
      return new NextResponse("Something went wrong", { status: 500 });
    }

    if (values.categoryId) {
      await CategoryModel.findByIdAndUpdate(values.categoryId, {
        $push: { courses: updateCourse._id },
      });
    }

    return new NextResponse(updateCourse);
  } catch (error) {
    console.log(error.message);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

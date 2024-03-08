import connect from "@/lib/mongodb";
import CourseModel from "@/models/course";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = auth();
    const { title } = await req.json();
    await connect();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const newCourse = await CourseModel.create({
      userId,
      title,
    });

    return new NextResponse.json(newCourse);
  } catch (error) {
    console.log(error.message);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

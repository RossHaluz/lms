import connect from "@/lib/mongodb";
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

    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("[UPDATE_PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

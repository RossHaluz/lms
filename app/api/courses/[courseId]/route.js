import connect from "@/lib/mongodb";
import CategoryModel from "@/models/category";
import ChapterModel from "@/models/chapter";
import CourseModel from "@/models/course";
import MuxDataModel from "@/models/muxdata";
import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

const mux = new Mux(process.env.MUX_TOKEN_ID, process.env.MUX_TOKEN_SECRET);

export async function DELETE(req, { params }) {
  try {
    const { courseId } = params;
    const { userId } = auth();
    await connect();

    if (!userId) {
      return new NextResponse("Unouthorized", { status: 401 });
    }

    const ownCourse = await CourseModel.findOne({
      _id: courseId,
      userId: userId,
    });

    if (!ownCourse) {
      return new NextResponse("Unouthorized", { status: 401 });
    }

    const chapters = await ChapterModel.find({ courseId: courseId });

    await Promise.all(
      chapters?.map(async (item) => {
        if (item?.videoUrl) {
          const existingMuxData = await MuxDataModel.findOne({
            chapterId: item?._id,
          });

          if (existingMuxData) {
            await mux.video.assets.delete(existingMuxData.assetId);
            await MuxDataModel.findByIdAndDelete(existingMuxData._id);
          }
        }
      })
    );

    await Promise.all(
      chapters?.map(async (item) => {
        return ChapterModel.findByIdAndDelete(item?._id);
      })
    );

    const deleteCourse = await CourseModel.findByIdAndDelete(courseId);

    return NextResponse.json(deleteCourse);
  } catch (error) {
    console.log(error.message);
    return new NextResponse("[DELETE_COURSE_BYID]", error.message);
  }
}

export async function PUT(req, { params }) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();
    await connect();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updateCourse = await CourseModel.findByIdAndUpdate(
      courseId,
      {
        ...values,
        userId: userId,
      },
      {
        new: true,
      }
    );

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

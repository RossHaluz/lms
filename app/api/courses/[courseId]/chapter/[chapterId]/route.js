import connect from "@/lib/mongodb";
import ChapterModel from "@/models/chapter";
import CourseModel from "@/models/course";
import MuxDataModel from "@/models/muxdata";
import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

const mux = new Mux(process.env.MUX_TOKEN_ID, process.env.MUX_TOKEN_SECRET);

export async function DELETE(req, { params }) {
  try {
    const { courseId, chapterId } = params;
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

    const chapter = await ChapterModel.findOne({
      _id: chapterId,
      courseId: courseId,
    });

    if (!chapter) {
      return new NextResponse("Not found", { status: 404 });
    }

    if (chapter?.videoUrl) {
      const existingMuxData = await MuxDataModel.findOne({
        chapterId: chapterId,
      });

      if (existingMuxData) {
        await mux.video.assets.delete(existingMuxData.assetId);
        await MuxDataModel.findByIdAndDelete(existingMuxData._id);
      }
    }

    const deleteChapter = await ChapterModel.findByIdAndDelete(chapterId);

    const isPublishedChapterInCourse = await ChapterModel.find({
      courseId: courseId,
      isPublished: true,
    });

    if (!isPublishedChapterInCourse.length) {
      await CourseModel.findByIdAndUpdate(courseId, { isPublished: false });
    }

    return NextResponse.json(deleteChapter);
  } catch (error) {
    console.log("CHAPTER_ID_DELETE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;
    const values = await req.json();
    await connect();

    if (!userId) {
      return new NextResponse("Unauthorize", { status: 401 });
    }

    const findCourse = await CourseModel.findOne({
      _id: courseId,
      userId: userId,
    });

    if (!findCourse) {
      return new NextResponse("Unauthorize", { status: 401 });
    }

    const updateChapter = await ChapterModel.findByIdAndUpdate(
      chapterId,
      { ...values },
      { new: true }
    );

    if (values.videoUrl) {
      const existingMuxData = await MuxDataModel.findOne({
        chapterId: chapterId,
      });

      if (existingMuxData) {
        await mux.video.assets.delete(existingMuxData.assetId);
        await MuxDataModel.findByIdAndDelete(existingMuxData._id);
      }

      const asset = await mux.video.assets.create({
        input: values.videoUrl,
        playback_policy: "public",
        test: false,
      });

      await MuxDataModel.create({
        chapterId: chapterId,
        assetId: asset.id,
        playbackId: asset.playback_ids?.[0]?.id,
      });
    }

    return NextResponse.json(updateChapter);
  } catch (error) {
    console.log(error.message);
    return new NextResponse("Iteral Error", { status: 500 });
  }
}

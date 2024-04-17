import getChapter from "@/actions/get-chapter";
import Banner from "@/components/banner";
import connect from "@/lib/mongodb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import VideoPlayer from "./_componets/video-player";

const ChapterDetailsPage = async ({ params }) => {
  const { userId } = auth();
  await connect();

  if (!userId) return redirect("/");

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    purchase,
    userProgress,
  } = await getChapter({
    userId,
    chapterId: params?.chapterId,
    courseId: params?.courseId,
  });

  if (!course || !chapter) {
    return redirect("/");
  }

  const isLocked = !chapter?.isFree && !purchase;
  const completedOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label={"You already completed this chapter."}
        />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label={"You need purchase this course to wathc this chapter."}
        />
      )}

      <div className="flex flex-col max-w-2xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            isLocked={isLocked}
            title={chapter?.title}
            userProgress={userProgress}
            nextChapterId={nextChapter?._id}
            completedOnEnd={completedOnEnd}
            playbackId={muxData?.playbackId}
          />
        </div>
      </div>
    </div>
  );
};

export default ChapterDetailsPage;

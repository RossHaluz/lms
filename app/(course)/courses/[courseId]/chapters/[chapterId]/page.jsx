import getChapter from "@/actions/get-chapter";
import Banner from "@/components/banner";
import connect from "@/lib/mongodb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import VideoPlayer from "./_componets/video-player";
import CourseAnrrolBtn from "./_componets/course-anrrol-btn";
import { Preview } from "@/components/preview-description";
import { Separator } from "@/components/ui/separator";
import { File } from "lucide-react";

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

      <div className="flex flex-col max-w-2xl mx-auto">
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

      <div className="mt-4 flex flex-col gap-4">
        <div className="p-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h3 className="font-medium text-lg">{chapter?.title}</h3>
          {purchase ? (
            <span>Progress btn</span>
          ) : (
            <CourseAnrrolBtn
              courseId={params?.courseId}
              price={course?.price}
            />
          )}
        </div>

        <Preview value={chapter?.description} />

        <Separator />
      </div>

      {!!attachments && (
        <div className="p-4">
          {attachments?.map((item) => {
            return (
              <a
                href={item?.url}
                target="_blanck"
                key={item?._id}
                className="flex items-center gap-2 p-3 bg-sky-200 w-full border text-sky-700 rounded-md hover:underline"
              >
                <File />
                <p className="line-clamp-1">{item?.name}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChapterDetailsPage;

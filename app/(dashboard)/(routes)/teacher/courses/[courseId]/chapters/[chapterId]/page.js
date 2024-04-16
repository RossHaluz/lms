import { IconBadge } from "@/components/icon-badge";
import ChapterModel from "@/models/chapter";
import { ArrowLeft, EyeIcon, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import ChapterTitleForm from "./_components/chapter-title-form";
import ChapterDescriptionForm from "./_components/chapter-description-form";
import ChapterAccessForm from "./_components/chapter-access-form";
import MuxDataModel from "@/models/muxdata";
import ChapterVideoForm from "./_components/chapter-video-form";
import Banner from "@/components/banner";
import ChapterActions from "./_components/chapter-actions";

const ChapterIdPage = async ({ params }) => {
  const chapter = await ChapterModel.findById(params?.chapterId);

  const muxdata = await MuxDataModel.findOne({ chapterId: params?.chapterId });

  const requireFields = [
    chapter?.title,
    chapter?.description,
    chapter?.videoUrl,
  ];

  const totalFields = requireFields?.length;
  const completeFields = requireFields?.filter(Boolean)?.length;

  const completeText = `${completeFields}/${totalFields}`;

  const allCompleted = requireFields?.every(Boolean);

  return (
    <>
      {!chapter?.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not visible in the course"
        />
      )}
      <div className="p-6 flex flex-col gap-16">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <Link
              href={`/teacher/courses/${params?.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition  gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go back
            </Link>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-medium">Chapter setup</h1>
              <span className="text-sm text-slate-700">
                Complete all fields {completeText}
              </span>
            </div>
          </div>
          <ChapterActions
            chapterId={params?.chapterId}
            courseId={chapter?.courseId?.toString()}
            disabled={!allCompleted}
            isPublished={chapter?.isPublished}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your chapter</h2>
              </div>
              <ChapterTitleForm
                initialData={{
                  title: chapter?.title,
                }}
              />
              <ChapterDescriptionForm
                initialData={{
                  description: chapter?.description,
                }}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <IconBadge icon={EyeIcon} />
                <h2 className="text-xl">Access settings</h2>
              </div>
              <ChapterAccessForm
                initialData={{
                  isFree: chapter?.isFree,
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Add video</h2>
            </div>
            <ChapterVideoForm
              initialData={{
                videoUrl: chapter?.videoUrl,
                playbackId: muxdata?.playbackId,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChapterIdPage;

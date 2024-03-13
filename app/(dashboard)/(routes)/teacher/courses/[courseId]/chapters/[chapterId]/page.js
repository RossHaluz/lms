import { IconBadge } from "@/components/icon-badge";
import ChapterModel from "@/models/chapter";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import Link from "next/link";

const ChapterIdPage = async ({ params }) => {
  const chapter = await ChapterModel.findById(params?.chapterId);

  const requireFields = [
    chapter?.title,
    chapter?.description,
    chapter?.videoUrl,
  ];

  const totalFields = requireFields?.length;
  const completeFields = requireFields?.filter(Boolean)?.length;

  const completeText = `${completeFields}/${totalFields}`;

  console.log(chapter);

  return (
    <div className="p-6 flex flex-col gap-16">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your chapter</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;

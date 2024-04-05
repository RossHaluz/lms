import { IconBadge } from "@/components/icon-badge";
import connect from "@/lib/mongodb";
import CourseModel from "@/models/course";
import { auth } from "@clerk/nextjs";
import {
  DollarSignIcon,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import CategoryModel from "@/models/category";
import CategoryForm from "./_components/category-form";
import PriceForm from "./_components/price-form";
import AttachmentForm from "./_components/attachment-form";
import AttachmentModel from "@/models/attachment";
import ChapterForm from "./_components/chapter-form";
import ChapterModel from "@/models/chapter";
import Banner from "@/components/banner";
import Actions from "./_components/actions";

const CourseDetailsPage = async ({ params }) => {
  await connect();
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const categories = await CategoryModel.find();

  const course = await CourseModel.findById(params?.courseId);

  const attachments = await AttachmentModel.find({
    courseId: params?.courseId,
  });

  const chapters = await ChapterModel.find({
    courseId: params?.courseId,
  }).sort({ position: 1 });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course?.title,
    course?.description,
    course?.imageUrl,
    course?.price,
    course?.categoryId,
  ];

  const totalFields = requiredFields?.length;
  const completedFields = requiredFields?.filter(Boolean)?.length;

  const completedText = `${completedFields}/${totalFields}`;

  const isCompleted = requiredFields?.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner label="This course is unpublish. It will not visible in the courses" />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completedText}
            </span>
          </div>
          <Actions
            disabled={!isCompleted}
            isPublished={course.isPublished}
            courseId={course._id.toString()}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>

            <TitleForm
              initialData={{
                _id: course._id.toString(),
                userId: course.userId,
                title: course.title,
                description: course.description,
                imageUrl: course.imageUrl,
                price: course.price,
                isPublished: course.isPublished,
                attachments: course.attachments,
              }}
            />

            <DescriptionForm
              initialData={{
                _id: course._id.toString(),
                userId: course.userId,
                title: course.title,
                description: course.description,
                imageUrl: course.imageUrl,
                price: course.price,
                isPublished: course.isPublished,
                attachments: course.attachments,
              }}
            />

            <ImageForm
              initialData={{
                _id: course._id.toString(),
                userId: course.userId,
                title: course.title,
                description: course.description,
                imageUrl: course.imageUrl,
                price: course.price,
                isPublished: course.isPublished,
                attachments: course.attachments,
              }}
            />

            <CategoryForm
              initialData={{
                _id: course._id.toString(),
                categoryId: course?.categoryId?.toString(),
                userId: course.userId,
                title: course.title,
                description: course.description,
                imageUrl: course.imageUrl,
                price: course.price,
                isPublished: course.isPublished,
                attachments: course.attachments,
              }}
              options={categories?.map((item) => ({
                label: item?.name,
                value: item?._id.toString(),
              }))}
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course chapter</h2>
              </div>
              <ChapterForm
                chapters={chapters?.map((chapter) => ({
                  id: chapter?._id.toString(),
                  title: chapter?.title,
                  description: chapter?.description,
                  videoUrl: chapter?.videoUrl,
                  position: chapter?.position,
                  isPublished: chapter?.isPublished,
                  isFree: chapter?.isFree,
                  courseId: chapter?.courseId.toString(),
                }))}
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <IconBadge icon={DollarSignIcon} />
                <h2 className="text-xl">Course price</h2>
              </div>
              <PriceForm
                initialData={{
                  _id: course._id.toString(),
                  userId: course.userId,
                  title: course.title,
                  description: course.description,
                  imageUrl: course.imageUrl,
                  price: course.price,
                  isPublished: course.isPublished,
                  attachments: course.attachments,
                }}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentForm
                attachments={attachments?.map((attachment) => ({
                  id: attachment?._id?.toString(),
                  name: attachment?.name,
                  url: attachment?.url,
                  courseId: attachment?.courseId?.toString(),
                }))}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailsPage;

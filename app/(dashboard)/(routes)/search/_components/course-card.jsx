import CourseProgress from "@/components/course-progress";
import { IconBadge } from "@/components/icon-badge";
import { FormatPrice } from "@/lib/format";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseCard = ({
  title,
  price,
  imageUrl,
  id,
  category,
  chaptersLength,
  progress,
}) => {
  console.log(progress);
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md">
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        </div>
        <div className="text-lg mt-2 group-hover:text-sky-700 md:text-base font-medium transition line-clamp-2">
          {title}
        </div>
        <p className="text-xs text-muted-foreground">{category}</p>
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
          <div className="flex items-center gap-1 text-slate-500">
            <IconBadge size="sm" icon={BookOpen} />
            <span>
              {chaptersLength}
              {chaptersLength === 1 ? "Chapter" : "Chapters"}
            </span>
          </div>
        </div>
        {progress !== null ? (
          <CourseProgress
            value={progress}
            variant={progress === 100 ? "success" : "default"}
          />
        ) : (
          <p className="text-md md:text-sm font-medium text-slate-600">
            {FormatPrice(price)}
          </p>
        )}
      </div>
    </Link>
  );
};

export default CourseCard;

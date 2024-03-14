"use client";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ChapterVideoForm = ({ initialData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const route = useRouter();
  const { courseId, chapterId } = useParams();

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values) => {
    try {
      await axios.put(`/api/courses/${courseId}/chapter/${chapterId}`, values);
      toast.success("Course success update");
      toggleEdit();
      route.refresh();
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  return (
    <div className="p-4 bg-slate-200 rounded-md flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm">Course image</h3>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData?.playbackId} />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;

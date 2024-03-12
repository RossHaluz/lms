"use client";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { File, PlusCircle, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const AttachmentForm = ({ attachments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const route = useRouter();
  const { courseId } = useParams();

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachment`, values);
      toast.success("Attachment success added");
      toggleEdit();
      route.refresh();
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  const deleteAttachment = async (attachmentId) => {
    try {
      await axios.delete(`/api/courses/${courseId}/attachment/${attachmentId}`);
      toast.success("Attachment success delete");
      route.refresh();
    } catch (error) {
      toast.error("Something went wrong... ");
    }
  };

  return (
    <div className="p-4 bg-slate-200 rounded-md flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm"> Course attachments</h3>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && attachments?.length === 0 && (
        <p className="text-sm mt-2 text-slate-500 italic">No attachments yet</p>
      )}
      {attachments?.length > 0 &&
        attachments?.map((attachment) => {
          return (
            <div
              key={attachment.id}
              className="flex items-center justify-between gap-2 p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
            >
              <div className="flex items-center gap-2">
                <File className="h-4 w-4" />
                <p className="text-xs line-clamp-1">{attachment.name}</p>
              </div>
              <button
                type="button"
                className="hover:opacity-75 transition"
                onClick={() => deleteAttachment(attachment.id)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the course.
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;

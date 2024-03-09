"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "react-toastify";

export const FileUpload = ({ onChange, endpoint }) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error) => {
        toast.error(error.message);
      }}
    />
  );
};

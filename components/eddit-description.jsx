"use client";

import dynamic from "next/dynamic";
import { useMemo, forwardRef } from "react";

import "react-quill/dist/quill.snow.css";

export const EdditDescription = ({ value, onChange }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="bg-white">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};

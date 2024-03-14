"use client";

import dynamic from "next/dynamic";
import { useMemo, forwardRef } from "react";

import "react-quill/dist/quill.snow.css";

export const EdditDescription = forwardRef(({ value, onChange }, ref) => {
  const ReactQuill = useMemo(
    () =>
      dynamic(() => import("react-quill").then((mod) => mod.default), {
        ssr: false,
      }),
    []
  );

  const handleChange = (content, delta, source, editor) => {
    onChange(content);
  };

  return (
    <div className="bg-white">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        ref={ref}
      />
    </div>
  );
});

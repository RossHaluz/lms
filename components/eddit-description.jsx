"use client";

import dynamic from "next/dynamic";
import { forwardRef, useMemo } from "react";

import "react-quill/dist/quill.snow.css";

export const EdditDescription = forwardRef(({ value, onChange }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="bg-white">
      <div>
        <ReactQuill theme="snow" value={value} onChange={onChange} />
      </div>
    </div>
  );
});

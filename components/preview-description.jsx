"use client";

import dynamic from "next/dynamic";
import { forwardRef, useMemo } from "react";

import "react-quill/dist/quill.bubble.css";

export const Preview = forwardRef(({ value }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return <ReactQuill theme="bubble" value={value} readOnly />;
});

"use client";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const VideoPlayer = ({
  isLocked,
  title,
  userProgress,
  nextChapterId,
  completedOnEnd,
  playbackId,
}) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative aspect-video flex flex-col gap-4">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="w-8 h-8 animate-spin text-secondary" />
        </div>
      )}

      {isLocked && (
        <div className=" absolute inset-0 flex flex-col gap-2 items-center justify-center bg-slate-800">
          <Lock className="w-8 h-8 text-secondary" />
          <p className="text-secondary">This chapter is locked</p>
        </div>
      )}

      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          autoPlay
          onEnded={() => {}}
          playbackId={playbackId}
        />
      )}
    </div>
  );
};

export default VideoPlayer;

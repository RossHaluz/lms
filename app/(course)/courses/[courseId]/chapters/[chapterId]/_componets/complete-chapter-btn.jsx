"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CompleteChapterBtn = ({
  courseId,
  chapterId,
  nextChapter,
  isCompleted,
}) => {
  const route = useRouter();
  const confetti = useConfettiStore();

  const onClick = async () => {
    try {
      await axios.put(
        `/api/courses/${courseId}/chapter/${chapterId}/progress`,
        { isCompleted: !isCompleted }
      );

      toast.success("Chapter succes completed");
      route.refresh();

      if (!isCompleted && !nextChapter) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapter) {
        route.push(`/courses/${courseId}/chapters/${nextChapter?._id}`);
      }
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  return (
    <Button
      onClick={onClick}
      className="w-full md:w-auto"
      variant={isCompleted ? "outline" : "success"}
    >
      {isCompleted ? "Not completed" : "Mark as complete"}
    </Button>
  );
};

export default CompleteChapterBtn;

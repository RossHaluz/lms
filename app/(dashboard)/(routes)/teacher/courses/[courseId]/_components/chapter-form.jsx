"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";
import ChaptersList from "./chapters-list";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

const ChapterForm = ({ chapters }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const route = useRouter();
  const { courseId } = useParams();

  const toggleCreating = () => setIsCreating((prev) => !prev);

  const form = useForm({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapter`, values);
      toast.success("Course success update");
      toggleCreating();
      route.refresh();
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  const onReorder = async (chapterDetails) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapter/reorder`, {
        list: chapterDetails,
      });
      toast.success("Chapters reorder success");
      route.refresh();
    } catch (error) {
      toast.error("Something went wrong...");
    } finally {
      setIsUpdating(false);
    }
  };

  const isEddit = (id) => {
    route.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className="relative p-4 bg-slate-200 rounded-md flex flex-col gap-2">
      {isUpdating && (
        <div className="absolute top-0 left-0 rounded-md w-full h-full flex items-center justify-center bg-slate-400/20">
          <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
        </div>
      )}
      <div className="flex items-center justify-between">
        <h3 className="text-sm">Course chapter</h3>
        {!isCreating ? (
          <Button
            variant="ghost"
            onClick={toggleCreating}
            className="flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Add chapte
          </Button>
        ) : (
          <Button variant="ghost" onClick={toggleCreating}>
            Cansel
          </Button>
        )}
      </div>

      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'Title of the chapter'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="flex items-center gap-2">
              <Button disabled={isSubmitting || !isValid} type="submit">
                Create
              </Button>
            </div>
          </form>
        </Form>
      )}

      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !chapters.length && "text-slate-500 italic"
          )}
        >
          {!chapters.length && "No chapters"}
          <ChaptersList
            onReorder={onReorder}
            items={chapters}
            isEddit={isEddit}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
};

export default ChapterForm;

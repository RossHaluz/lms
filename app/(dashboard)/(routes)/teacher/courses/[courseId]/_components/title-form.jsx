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
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

const TitleForm = ({ initialData, courseId }) => {
  const [isEddit, setIsEddit] = useState(false);
  const route = useRouter();

  const toggleEddit = () => setIsEddit((prev) => !prev);

  const form = useForm({
    defaultValues: initialData,
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      await axios.put(`/api/courses/${courseId}`, values);
      toast.success("Course success update");
      route.refresh();
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  return (
    <div className="p-4 bg-slate-200 rounded-md flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm">Course title</h3>
        {!isEddit ? (
          <Button
            variant="ghost"
            onClick={toggleEddit}
            className="flex items-center gap-2"
          >
            <Pencil className="w-4 h-4" />
            Eddit title
          </Button>
        ) : (
          <Button variant="ghost" onClick={toggleEddit}>
            Cansel
          </Button>
        )}
      </div>

      {isEddit ? (
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
                        placeholder="e.g. 'Advance web development'"
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
                Eddit
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <p>{initialData?.title}</p>
      )}
    </div>
  );
};

export default TitleForm;

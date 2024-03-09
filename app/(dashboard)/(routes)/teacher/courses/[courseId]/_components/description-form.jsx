"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const formSchema = z.object({
  description: z.string().min(1, "Description is required"),
});

const DescriptionForm = ({ initialData }) => {
  const [isEddit, setIsEddit] = useState(false);
  const route = useRouter();
  const { courseId } = useParams();

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
      toggleEddit();
      route.refresh();
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  return (
    <div className="p-4 bg-slate-200 rounded-md flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm">Course description</h3>
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
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="e.g. 'This course about...'"
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
        <p
          className={cn(
            "text-sm",
            !initialData?.description && "text-slate-500 italic"
          )}
        >
          {initialData?.description || "No description"}
        </p>
      )}
    </div>
  );
};

export default DescriptionForm;

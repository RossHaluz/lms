"use client";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
const validSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

const CreatePage = () => {
  const route = useRouter();

  const form = useForm({
    resolver: zodResolver(validSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const response = await axios.post("/api/courses", values);
      console.log(response);
      if (response.status === 200) {
        route.push(`/teacher/courses/${response?.data?._id}`);
        toast.success("Succes created new course");
      }
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center p-6 h-full">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl">Name your course</h1>
          <p className="text-sm text-slate-600">
            What would you like name your course? Dont&apos;t wortyt, you can
            change this later.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 'Advance web development'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    How would you like called your course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-4">
              <Link href="/">
                <Button type="button" variant="ghost">
                  Cansel
                </Button>
              </Link>

              <Button type="submit" disabled={isSubmitting || !isValid}>
                Сontinue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;

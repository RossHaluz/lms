import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import CourseModel from "@/models/course";
import connect from "@/lib/mongodb";
import { auth } from "@clerk/nextjs";

const CoursesPage = async () => {
  const { userId } = auth();
  await connect();

  if (!userId) return;

  const data = await CourseModel.find({ userId });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CoursesPage;

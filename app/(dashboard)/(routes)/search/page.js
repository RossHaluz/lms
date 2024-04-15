import connect from "@/lib/mongodb";
import Categories from "./_components/categories";
import CategoryModel from "@/models/category";
import SearchInput from "@/components/search-input";
import { auth } from "@clerk/nextjs";
import getCourses from "@/actions/get-courses";
import CourseList from "./_components/course-list";
import { redirect } from "next/navigation";

const SearchPage = async ({ searchParams }) => {
  await connect();
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const items = await CategoryModel.find();
  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden block">
        <SearchInput />
      </div>
      <div className="p-6 flex flex-col gap-4">
        <Categories items={items} />

        <CourseList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;

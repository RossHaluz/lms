import React from "react";
import CourseCard from "./course-card";

const CourseList = ({ items }) => {
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items?.map((item) => {
          return (
            <CourseCard
              key={item?._id}
              title={item?.title}
              id={item?._id}
              imageUrl={item?.imageUrl}
              chaptersLength={item?.chapters?.length}
              price={item?.price}
              progress={item?.progress}
              category={item?.categoryId?.name}
            />
          );
        })}
      </div>
      {items?.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </>
  );
};

export default CourseList;

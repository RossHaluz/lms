"use client";
import CategoryItem from "./category-item";
import { FcEngineering } from "react-icons/fc";

const Categories = ({ items }) => {
  const iconMap = {
    "Web development": FcEngineering,
    "Next.js": FcEngineering,
    "React.js": FcEngineering,
    JavaScript: FcEngineering,
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {items?.map((item) => {
        return (
          <CategoryItem
            key={item?._id}
            lable={item.name}
            value={item._id}
            icon={iconMap[item.name]}
          />
        );
      })}
    </div>
  );
};

export default Categories;

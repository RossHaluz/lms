import { IconBadge } from "@/components/icon-badge";
import React from "react";

const InfoCard = ({ lable, numberOfItems, icon, variant }) => {
  return (
    <div className="p-4 border rounded-md flex items-center gap-4">
      <IconBadge icon={icon} variant={variant} />
      <div className="flex flex-col gap-2">
        <p className="font-medium">{lable}</p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;

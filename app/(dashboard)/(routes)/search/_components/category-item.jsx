"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const CategoryItem = ({ lable, value, icon: Icon }) => {
  const router = useRouter();
  const pathcname = usePathname();
  const searchParams = useSearchParams();
  const getCategoryId = searchParams.get("categoryId");
  const getTitle = searchParams.get("title");

  const isSelected = getCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathcname,
        query: {
          categoryId: isSelected ? null : value,
          title: getTitle,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      variant="ghost"
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-1 hover:border-sky-700 transition",
        isSelected && "bg-sky-200/20 text-sky-800 border-sky-700"
      )}
    >
      {Icon && <Icon size={24} />}
      <div className="truncate">{lable}</div>
    </button>
  );
};

export default CategoryItem;

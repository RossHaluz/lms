"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/use-debouce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const debounceValue = useDebounce({ value });
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debounceValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [router, pathname, currentCategoryId, debounceValue]);

  return (
    <div className="relative">
      <Search className="w-4 h-4 absolute top-3 left-3 text-slate-600" />
      <Input
        value={value}
        placeholder="Seatch course..."
        onChange={(e) => setValue(e.target.value)}
        className="rounded-full w-full md:w-[300px] pl-9 bg-slate-100 focus-visible:ring-slate-200"
      />
    </div>
  );
};

export default SearchInput;

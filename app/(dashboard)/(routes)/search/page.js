import connect from "@/lib/mongodb";
import Categories from "./_components/categories";
import axios from "axios";
import CategoryModel from "@/models/category";

const SearchPage = async () => {
  await connect();
  const items = await CategoryModel.find();

  return (
    <div className="p-6">
      <Categories items={items} />
    </div>
  );
};

export default SearchPage;

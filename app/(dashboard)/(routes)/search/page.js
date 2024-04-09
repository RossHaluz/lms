import CategoryModel from "@/models/category";
import Categories from "./_components/categories";

const SearchPage = async () => {
  const items = await CategoryModel.find();
  return (
    <div className="p-6">
      <Categories items={items} />
    </div>
  );
};

export default SearchPage;

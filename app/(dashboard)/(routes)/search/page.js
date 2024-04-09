import Categories from "./_components/categories";
import axios from "axios";

const SearchPage = async () => {
  const items = await axios.get("/api/category");

  return (
    <div className="p-6">
      <Categories items={items} />
    </div>
  );
};

export default SearchPage;

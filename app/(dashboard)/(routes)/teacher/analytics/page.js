import { getAnalytics } from "@/actions/get-analiytics";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DataCard from "./_components/data-card";
import Chart from "./_components/chart";

const AnalyticsPage = async () => {
  const { userId } = auth();

  if (!userId) return redirect("/");

  const { data, totalSales, totalRevenue } = await getAnalytics(userId);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard value={totalRevenue} lable="Total revenue" shouldFormat />
        <DataCard value={totalSales} lable="Total sales" />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default AnalyticsPage;

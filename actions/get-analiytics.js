import connect from "@/lib/mongodb";
import PurchasesModel from "@/models/purchases";

const groupByCourse = (purchases) => {
  const grouped = {};

  purchases?.forEach((item) => {
    const courseTitle = item?.title;

    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }

    grouped[courseTitle] += item?.price;
  });

  return grouped;
};

export const getAnalytics = async (userId) => {
  try {
    await connect();
    const purchases = await PurchasesModel.find({
      userId: userId,
    }).populate("courseId");

    const filterPurchasesByCourseId = purchases
      ?.filter((item) => item?.courseId?.userId === userId)
      ?.map((item) => item?.courseId);

    const groupeEarnings = groupByCourse(filterPurchasesByCourseId);
    const data = Object.entries(groupeEarnings).map(([courseTitle, total]) => ({
      name: courseTitle,
      total: total,
    }));
    const totalSales = filterPurchasesByCourseId?.length;
    const totalRevenue = data?.reduce((acc, item) => {
      return acc + item?.total;
    }, 0);

    return {
      data,
      totalRevenue,
      totalSales,
    };
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      data: [],
      totalSales: 0,
      totalRevenue: 0,
    };
  }
};

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormatPrice } from "@/lib/format";

const DataCard = ({ value, lable, shouldFormat }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{lable}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">
          {shouldFormat ? FormatPrice(value) : value}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCard;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const RecommendationsCard = ({ topSellingProducts, totalItems }) => {
  // Get top and lowest performing products
  const topProduct = topSellingProducts?.[0];
  const lowestProduct = topSellingProducts?.[topSellingProducts.length - 1];
  // Calculate total quantity of top products
  const topProductsQty =
    topSellingProducts?.reduce(
      (acc, product) => acc + (product.totalQty || 0),
      0
    ) || 0;

  return (
    <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
      <CardHeader>
        <CardTitle className="text-base">Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="-mt-5">
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
              <TrendingUp className="h-3 w-3 text-amber-500" />
            </div>
            <span>
              {topProduct
                ? `Increase stock levels for ${topProduct.product} (${topProduct.totalQty} units sold)`
                : "No top-selling products to recommend stock increases for"}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
              <TrendingUp className="h-3 w-3 text-amber-500" />
            </div>
            <span>
              {topSellingProducts?.length > 1
                ? `Consider bundle promotions for top products like ${topSellingProducts[0]?.product} and ${topSellingProducts[1]?.product}`
                : "Not enough top products for bundle promotions"}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
              <TrendingUp className="h-3 w-3 text-amber-500" />
            </div>
            <span>
              {lowestProduct && topSellingProducts?.length > 1
                ? `Monitor inventory for ${lowestProduct.product} as it has lower sales (${lowestProduct.totalQty} units)`
                : totalItems > 0
                ? `Overall sales volume is low (${totalItems} units); consider marketing campaigns`
                : "No sales data to monitor inventory"}
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecommendationsCard;

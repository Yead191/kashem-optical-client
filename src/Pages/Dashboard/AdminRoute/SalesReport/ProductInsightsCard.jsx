import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const ProductInsightsCard = ({ topSellingProducts, totalItems }) => {
  // Calculate total quantity of top products
  const topProductsQty = topSellingProducts?.reduce(
    (acc, product) => acc + (product.totalQty || 0),
    0
  ) || 0;

  // Calculate percentage of total sales (handle division by zero)
  const salesPercentage =
    totalItems > 0 ? ((topProductsQty / totalItems) * 100).toFixed(1) : 0;

  // Get top product (first item, since sorted by totalQty)
  const topProduct = topSellingProducts?.[0];

  return (
    <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
      <CardHeader>
        <CardTitle className="text-base">Product Insights</CardTitle>
      </CardHeader>
      <CardContent className="-mt-5">
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
              <CheckCircle className="h-3 w-3 text-green-500" />
            </div>
            <span>
              {topProduct
                ? `${topProduct.product} is the top selling product with ${topProduct.totalQty} units sold`
                : "No top selling product available"}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
              <CheckCircle className="h-3 w-3 text-green-500" />
            </div>
            <span>
              {topSellingProducts?.length > 0
                ? `Top ${topSellingProducts.length} products sold a total of ${topProductsQty} units`
                : "No sales data for top products"}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
              <CheckCircle className="h-3 w-3 text-green-500" />
            </div>
            <span>
              Top {topSellingProducts?.length || 0} products account for{" "}
              {salesPercentage}% of total sales
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default ProductInsightsCard;
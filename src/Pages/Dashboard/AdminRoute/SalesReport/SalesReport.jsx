import React from "react";
import SalesReportHeader from "./SalesReportHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "react-query";
import OverviewCards from "./OverviewCards";
import { format, parseISO } from "date-fns";
import RevenueChart from "./RevenueChart";
import OrderStatusChart from "./OrderStatusChart";
import TopSellingChart from "./TopSellingChart";
import OrderVolumeChart from "./OrderVolumeChart";
import RevenueCards from "./RevenueCards";
import RevenueByDayTable from "./RevenueByDayTable";
import ProductInsightsCard from "./ProductInsightsCard";
import PerformanceTable from "./PerformanceTable";
import PerformanceChart from "./PerformanceChart";
import RecommendationsCard from "./RecommendationsCard";
import TopCustomerTable from "./TopCustomerTable";
import SalesReportSkeleton from "./Skeleton/SkeletonBox";
import Seo from "@/components/Seo/Seo";


const SalesReport = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: report = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["report"],
    queryFn: async () => {
      const res = await axiosSecure.get("/sales-report");
      return res.data;
    },
  });

  // Handle loading and error states
  if (isLoading || error) {
    return <SalesReportSkeleton />;
  }

  // Sort revenue data by date for the chart
  const sortedRevenueData = [...(report?.revenuePerDay || [])].sort(
    (a, b) => new Date(a._id).getTime() - new Date(b._id).getTime()
  );

  // Calculate additional metrics
  const totalItems = (report?.revenuePerDay ?? []).reduce(
    (acc, day) => acc + (day?.totalQty ?? 0),
    0
  );
  const avgItemValue = report?.totalRevenue / totalItems;

  const avgOrderValue =
    report?.totalOrders > 0 ? report?.totalRevenue / report?.totalOrders : 0;

  const avgDailyRevenue =
    report?.revenuePerDay?.length > 0
      ? report.revenuePerDay.reduce((acc, day) => acc + day.totalRevenue, 0) /
        report.revenuePerDay.length
      : 0;

  // Order status data for pie chart
  const orderStatusData = [
    {
      name: "Delivered",
      value: report?.deliveredOrders || 0,
      color: "#10b981",
    },
    {
      name: "Pending",
      value: report?.pendingOrders || 0,
      color: "#f59e0b",
    },
    {
      name: "Other",
      value:
        (report?.totalOrders || 0) -
        (report?.pendingOrders || 0) -
        (report?.deliveredOrders || 0),
      color: "#6b7280",
    },
  ];

  // Enhanced data for charts
  const enhancedRevenueData = (report?.revenuePerDay || []).map((item) => ({
    formattedDate: format(parseISO(item._id), "MMM dd"),
    totalRevenue: item.totalRevenue || 0,
    totalQty: item.totalQty || 0,
  }));

  return (
    <div className="px-2 md:px-4 lg:px-6 flex flex-col gap-4 md:gap-6 lg:gap-8">
      <Seo title="Sales Report | Kashem Optical" />
      {/* Sales Report Header */}
      <SalesReportHeader />
      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4 ">
        {/* All Tablist */}
        <TabsList className="border  px-1 flex justify-between items-center flex-wrap lg:flex-nowrap lg:flex-row w-full h-full">
          <TabsTrigger value="overview" className="cursor-pointer py-2 px-4 w-full">
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="cursor-pointer py-2 px-4 w-full">
            Detailed Analytics
          </TabsTrigger>
          <TabsTrigger value="products" className="cursor-pointer py-2 px-4 w-full">
            Product Performance
          </TabsTrigger>
          <TabsTrigger value="insights" className={"cursor-pointer py-2 px-4 w-full"}>
            Customer Insights
          </TabsTrigger>
        </TabsList>
        {/* 1st tab content overview */}
        <TabsContent value="overview" className="space-y-6">
          <OverviewCards
            totalOrders={report?.totalOrders || 0}
            totalPendingOrders={report?.pendingOrders || 0}
            totalDeliveredOrders={report?.deliveredOrders || 0}
            totalRevenue={report?.totalRevenue || 0}
          />
          {/* Revenue & OrderStatus  Charts */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            {/* Revenue Chart */}
            <RevenueChart enhancedRevenueData={enhancedRevenueData} />
            {/* OrderStatus Chart */}
            <OrderStatusChart orderStatusData={orderStatusData} />
          </div>
          {/* Top Selling & Order Volume Charts */}
          <div className="grid gap-6  lg:grid-cols-7">
            {/* Top Selling Chart */}
            <TopSellingChart
              topSellingProduct={report?.topSellingProducts.slice(0, 5)}
            />
            {/* Order Volume Chart */}
            <OrderVolumeChart enhancedRevenueData={enhancedRevenueData} />
          </div>
        </TabsContent>
        {/* 2nd Tab Content */}
        <TabsContent value="analytics" className="space-y-6">
          <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
            <CardHeader>
              <CardTitle className="text-base font-bold">
                Revenue Analysis
              </CardTitle>
              <CardDescription className="py-0 font-medium -mt-1">
                Detailed breakdown of revenue metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Revenue Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <RevenueCards
                  avgDailyRevenue={avgDailyRevenue}
                  avgOrderValue={avgOrderValue}
                  avgItemValue={avgItemValue}
                  totalItems={totalItems}
                />
              </div>
              {/* Revenue by Day */}
              <div>
                <h3 className="text-base font-bold mb-4">Revenue by Day</h3>
                <div>
                  <RevenueByDayTable sortedRevenueData={sortedRevenueData} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* 3rd Tab Content */}
        <TabsContent value="products" className="space-y-6">
          <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
            <CardHeader>
              <CardTitle className="text-base font-bold">
                Product Performance
              </CardTitle>
              <CardDescription className="py-0 font-medium -mt-1">
                Detailed analysis of top selling products
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Performance Chart & Table */}
              <div className="grid grid-cols-1 lg:grid-cols-7 xl:grid-cols-8">
                <div className="mb-6  lg:col-span-4 xl:col-span-5 w-full h-[250px] md:h-auto">
                  {/* Medicine Performance Chart */}
                  <PerformanceChart
                    topSellingProducts={report?.topSellingProducts}
                  />
                </div>
                {/* Medicine Performance Table */}
                <div className="lg:col-span-3 xl:col-span-3 w-full overflow-x-auto">
                  <PerformanceTable
                    topSellingProducts={report?.topSellingProducts}
                    totalItems={totalItems}
                  />
                </div>
              </div>
              {/* Product Insights & Recommendations */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Insights */}
                <ProductInsightsCard
                  topSellingProducts={report?.topSellingProducts}
                  totalItems={totalItems}
                />
                {/* Recommendations */}
                <RecommendationsCard
                  topSellingProducts={report?.topSellingProducts || []}
                  totalItems={totalItems}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* 4th Tab Content */}
        <TabsContent value="insights">
          <Card className="border shadow-none border-[#e5e7eb] w-full py-6">
            <CardHeader>
              <CardTitle className="text-base font-bold">
                Top Customer
              </CardTitle>
              <CardDescription className="py-0 font-medium -mt-1">
                Most valuable customers based on total purchases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TopCustomerTable topCustomers={report?.topCustomers} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesReport;

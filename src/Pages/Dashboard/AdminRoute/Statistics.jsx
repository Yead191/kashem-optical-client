import DashboardPagesHeader from "@/components/DashboardPagesHeader";
import { ChartBar, Flag, Package, Stethoscope, Users } from "lucide-react";
import React from "react";
import { useQuery } from "react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { ProductCategories } from "@/components/ProductCategories";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  // Calculate percentages
  const totalBanners = (stats.activeBanners || 0) + (stats.inactiveBanners || 0);
  const activeBannersPercentage =
    totalBanners > 0 ? ((stats.activeBanners / totalBanners) * 100).toFixed(1) : 0;
  const inStockPercentage =
    stats.totalProduct > 0
      ? ((stats.totalInStockProduct / stats.totalProduct) * 100).toFixed(1)
      : 0;

  return (
    <div className="px-2 md:px-4 lg:px-4">
      <DashboardPagesHeader title={"Statistics"} icon={ChartBar} />
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Users & Admins Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          {isLoading ? (
            <div className="space-y-4">
              <div className="skeleton h-4 w-32"></div>
              <div className="skeleton h-10 w-20"></div>
              <div className="skeleton h-4 w-40"></div>
              <div className="skeleton h-3 w-28"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">Users & Admins</span>
                <div className="flex items-center text-xs font-medium text-emerald-500">
                  <Users className="h-3 w-3 mr-1" />
                  {(stats.totalUsers || 0) + (stats.totalAdmin || 0)} Total
                </div>
              </div>
              <div className="text-3xl font-extrabold mb-3">{stats.totalUsers || 0}</div>
              <div className="flex items-center text-sm font-medium mb-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>{stats.totalAdmin || 0} Admins</span>
              </div>
              <div className="text-xs text-gray-500">
                {stats.totalUsers || 0} Users, {stats.totalAdmin || 0} Admins
              </div>
            </>
          )}
        </div>

        {/* Banners Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          {isLoading ? (
            <div className="space-y-4">
              <div className="skeleton h-4 w-32"></div>
              <div className="skeleton h-10 w-20"></div>
              <div className="skeleton h-4 w-40"></div>
              <div className="skeleton h-3 w-28"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">Banners</span>
                <div className="flex items-center text-xs font-medium text-emerald-500">
                  <Flag className="h-3 w-3 mr-1" />
                  {totalBanners} Total
                </div>
              </div>
              <div className="text-3xl font-extrabold mb-3">{totalBanners}</div>
              <div className="flex items-center gap-3 text-sm font-medium mb-1">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-base">{stats.activeBanners || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span className="text-base">{stats.inactiveBanners || 0}</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {activeBannersPercentage}% of banners currently active
              </div>
            </>
          )}
        </div>

        {/* Products Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          {isLoading ? (
            <div className="space-y-4">
              <div className="skeleton h-4 w-32"></div>
              <div className="skeleton h-10 w-20"></div>
              <div className="skeleton h-4 w-40"></div>
              <div className="skeleton h-3 w-28"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">Products</span>
                <div className="flex items-center text-xs font-medium text-emerald-500">
                  <Package className="h-3 w-3 mr-1" />
                  {stats.totalProduct || 0} Total
                </div>
              </div>
              <div className="text-3xl font-extrabold mb-3">{stats.totalProduct || 0}</div>
              <div className="flex items-center gap-3 text-sm font-medium mb-1">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-base">{stats.totalInStockProduct || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <XCircle className="h-5 w-5 text-red-500" />
                  <span className="text-base">{stats.totalOutOfStockProduct || 0}</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {inStockPercentage}% of products in stock
              </div>
            </>
          )}
        </div>

        {/* Patients Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          {isLoading ? (
            <div className="space-y-4">
              <div className="skeleton h-4 w-32"></div>
              <div className="skeleton h-10 w-20"></div>
              <div className="skeleton h-4 w-40"></div>
              <div className="skeleton h-3 w-28"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">Patients</span>
                <div className="flex items-center text-xs font-medium text-emerald-500">
                  <Stethoscope className="h-3 w-3 mr-1" />
                  {stats.totalPatient || 0} Total
                </div>
              </div>
              <div className="text-3xl font-extrabold mb-3">{stats.totalPatient || 0}</div>
              <div className="flex items-center text-sm font-medium mb-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>Patient Records</span>
              </div>
              <div className="text-xs text-gray-500">Total registered patients</div>
            </>
          )}
        </div>
      </div>
      <div className="my-8 border rounded-md">
        <div className="pl-6 my-4">
          <h1 className="text-2xl font-bold">Product Categories</h1>
          <p>Distribution of sales by product category</p>
        </div>
        <ProductCategories />
      </div>
    </div>
  );
};

export default Statistics;
import DashboardPagesHeader from "@/components/DashboardPagesHeader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { HistoryIcon } from "lucide-react";
import { FaFileInvoice } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo/Seo";


const PurchaseHistoryTable = ({ purchaseHistory, isLoading, user }) => (
  <Table>
    <TableCaption>Your Purchase History</TableCaption>
    <TableHeader>
      <TableRow className={"bg-base-200 hover:bg-base-200"}>
        <TableHead className={"mt-1 text-xs flex flex-col gap-1"}>
          <span>Order ID</span>
        </TableHead>
        <TableHead>
          Products <sub>(qty)</sub>
        </TableHead>
        <TableHead>Total Amount</TableHead>
        <TableHead>Payment Status</TableHead>
        <TableHead>Order Status</TableHead>
        <TableHead>Purchase Date</TableHead>
        <TableHead>Shipping Address</TableHead>
        <TableHead />
        <TableHead>Invoice</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {isLoading ? (
        Array.from({ length: 5 }).map((_, i) => (
          <TableRow key={i}>
            {Array.from({ length: 8 }).map((_, j) => (
              <TableCell key={j}>
                <div className="skeleton h-8 rounded w-full"></div>
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : purchaseHistory.length === 0 ? (
        <TableRow>
          <TableCell
            colSpan={8}
            className="text-center font-medium text-gray-800 py-4 border-y"
          >
            {!user
              ? "Please Login with your purchased email to see your purchase history and Invoice!"
              : "No Purchase History Available"}
          </TableCell>
        </TableRow>
      ) : (
        purchaseHistory?.map((order, idx) => (
          <TableRow key={idx}>
            <TableCell>
              <div className={"mt-1 text-xs flex flex-col font-medium gap-1.5"}>
                <span>{order?._id}</span>
              </div>
            </TableCell>
            <TableCell>
              <div
                className={`${
                  order?.products.length > 4
                    ? "max-h-[100px] overflow-y-auto"
                    : ""
                } space-y-1`}
              >
                {order?.products?.map((product, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <span className="font-medium text-sm">
                      {product?.productName}
                    </span>
                    <sub className="text-xs text-gray-500">
                      ({product?.quantity})
                    </sub>
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell>৳ {order?.totalPrice.toFixed(2)}</TableCell>
            <TableCell>
              <span
                className={`${
                  order?.paymentStatus === "Paid"
                    ? "text-green-600"
                    : "text-red-600"
                } font-medium`}
              >
                {order?.paymentStatus}
              </span>
            </TableCell>
            <TableCell>
              <div
                className={`flex ${
                  order?.orderStatus === "Ready for Pickup" ||
                  order?.orderStatus === "Out for Delivery"
                    ? "items-stretch"
                    : "items-center "
                } gap-1`}
              >
                <span
                  className={`text-xl font-medium rounded ${
                    order?.orderStatus === "Pending"
                      ? "text-yellow-600"
                      : order?.orderStatus === "Processing"
                      ? "text-orange-500"
                      : order?.orderStatus === "Ready for Pickup"
                      ? "text-blue-500"
                      : order?.orderStatus === "Shipped"
                      ? "text-blue-600"
                      : order?.orderStatus === "Out for Delivery"
                      ? "text-indigo-500"
                      : order?.orderStatus === "Delivered"
                      ? "text-green-600"
                      : order?.orderStatus === "Canceled"
                      ? "text-red-600"
                      : order?.orderStatus === "Refunded"
                      ? "text-gray-500"
                      : ""
                  }`}
                >
                  ●
                </span>{" "}
                <span className="font-medium mt-[3.2px]">
                  {(order?.orderStatus === "Ready for Pickup" && (
                    <span>
                      Ready for <br /> Pickup
                    </span>
                  )) ||
                    (order?.orderStatus === "Out for Delivery" && (
                      <span>
                        Out for <br /> Delivery
                      </span>
                    )) ||
                    order?.orderStatus}
                </span>
              </div>
            </TableCell>
            <TableCell>
              {order?.date
                ? new Date(order.date).toLocaleString().split(",")[0]
                : "N/A"}{" "}
              <br />
              <span className="mt-[1px] text-xs">
                {order?.date
                  ? new Date(order.date).toLocaleString().split(",")[1]
                  : "N/A"}
              </span>
            </TableCell>
            <TableCell className="max-w-40 overflow-x-auto">
              <div>{order?.customerInfo?.address}</div>
              <div>
                {order?.customerInfo?.district && order?.customerInfo?.division
                  ? `${order?.customerInfo?.district}, ${order?.customerInfo?.division}`
                  : "N/A"}
              </div>
            </TableCell>
            <TableCell />
            <TableCell>
              <Link to={`/dashboard/invoice/${order._id}`}>
                <Button variant={"outline"} className={"cursor-pointer"}>
                  <FaFileInvoice className="text-slate-700" />
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))
      )}
    </TableBody>
  </Table>
);

const PurchaseHistory = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["purchase-history", user?.email],
    enabled: !!user && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="px-2 md:px-6 mx-auto">
      <Seo title={"Purchase History | Kashem Optical"} />
      <DashboardPagesHeader
        title="Purchase History"
        subtitle="View all your pending, present and past purchases in one place!"
        icon={HistoryIcon}
      />
      {/* Purchase History Table */}
      <PurchaseHistoryTable
        purchaseHistory={orders}
        isLoading={isLoading}
        user={user}
      />
    </div>
  );
};

export default PurchaseHistory;

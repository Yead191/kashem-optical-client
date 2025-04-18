import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import useOrders from "../../../../hooks/useOrders";
import { FaTruck } from "react-icons/fa6";
import OrdersTable from "./OrdersTable";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import DashboardPagesHeader from "@/components/DashboardPagesHeader";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/Provider/AuthProvider";
import Seo from "@/components/Seo/Seo";

const ManageOrders = () => {
  const [orders, isLoading, refetch] = useOrders();
  const [activeTab, setActiveTab] = useState("All");
  const axiosSecure = useAxiosSecure();
  const { searchPhone, setSearchPhone } = useContext(AuthContext);
  // console.log(searchPhone);

  const changeOrderStatus = async (id, newStatus) => {
    await toast.promise(
      axiosSecure.patch(`/orders/change-status/${id}`, {
        orderStatus: newStatus,
      }),
      {
        loading: "Updating Status...",
        success: <b>Order Status Updated!</b>,
        error: (error) => <b>{error.message}</b>,
      }
    );
    refetch();
  };

  const handlePaymentStatusChange = async (orderId, newStatus) => {
    await toast.promise(
      axiosSecure.patch(`/orders/payment/${orderId}`, {
        paymentStatus: newStatus,
      }),
      {
        loading: "Updating payment status...",
        success: (response) => `Payment status updated to ${newStatus}`,
        error: (error) => `Failed to update payment status: ${error.message}`,
      }
    );

    refetch();
  };

  const orderStatuses = [
    "All",
    "Pending",
    "Processing",
    "Ready for Pickup",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Canceled",
    "Refunded",
  ];

  const filteredOrders =
    activeTab === "All"
      ? orders
      : orders?.filter((order) => order.orderStatus === activeTab);

  return (
    <div className="px-2 md:px-6">
      <Seo title="Manage Orders | Kashem Optical" />
      <DashboardPagesHeader
        title="Manage Orders"
        subtitle="Track and process all Eye-wear orders efficiently"
        icon={FaTruck}
      />

      <Tabs defaultValue="All" className="w-full" onValueChange={setActiveTab}>
        <div className="flex flex-col lg:flex-row  gap-4 items-center">
          <TabsList className="flex justify-start items-center lg:w-3/4 flex-wrap h-full mb-4">
            {orderStatuses?.map((status) => (
              <TabsTrigger
                key={status}
                value={status}
                className="cursor-pointer"
              >
                {status}
                {status !== "All" ? (
                  <span className="ml-1 mt-1 text-xs">
                    (
                    {
                      orders.filter((order) => order?.orderStatus === status)
                        .length
                    }
                    )
                  </span>
                ) : (
                  <span className="ml-1 mt-1 text-xs">({orders?.length})</span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="lg:w-1/4 mb-4 w-full">
            <Input
              type="text"
              placeholder="Search order by Name / Phone no."
              className="w-full"
              onChange={(e) => setSearchPhone(e.target.value)}
            />
          </div>
        </div>

        {orderStatuses?.map((status) => (
          <TabsContent key={status} value={status}>
            <OrdersTable
              ordersData={filteredOrders}
              isLoading={isLoading}
              changeOrderStatus={changeOrderStatus}
              orderStatuses={orderStatuses}
              handlePaymentStatusChange={handlePaymentStatusChange}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ManageOrders;

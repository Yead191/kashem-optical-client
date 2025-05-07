import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Link } from "react-router-dom";
import { FaFileInvoice } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import ProductsDialog from "./ProductsDialog";

const OrdersTable = ({
  ordersData,
  isLoading,
  changeOrderStatus,
  orderStatuses,
  handlePaymentStatusChange,
}) => (
  <Table>
    <TableCaption>A List Of All Orders</TableCaption>
    <TableHeader>
      <TableRow className="bg-base-200 hover:bg-base-200">
        <TableHead className="min-w-[150px]">Customer</TableHead>
        <TableHead className="min-w-[120px]">
          Products <sub>(qty)</sub>
        </TableHead>
        <TableHead className="text-xs min-w-[80px]">
          Total <br /> Amount
        </TableHead>
        <TableHead className="text-xs min-w-[90px]">
          Payment <br /> Status
        </TableHead>
        <TableHead className=" text-xs min-w-[100px] flex items-center gap-1">
          Order ID
        </TableHead>
        <TableHead className="min-w-[100px]">Order Date</TableHead>
        <TableHead className="min-w-[120px]">Shipping Address</TableHead>
        <TableHead className="w-[20px]" /> {/* Spacer */}
        <TableHead className="min-w-[100px]">Order Status</TableHead>
        <TableHead className="text-xs min-w-[120px]">
          Change
          <br />
          Order Status
        </TableHead>
        <TableHead className="text-[10px] min-w-[80px]">
          View <br /> Ordered
          <br />
          Products
        </TableHead>
        <TableHead className="text-[10px] min-w-[80px]">
          View <br /> Order <br /> Invoice
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {isLoading ? (
        Array.from({ length: 10 }).map((_, i) => (
          <TableRow key={i}>
            {Array.from({ length: 12 }).map((_, j) => (
              <TableCell key={j}>
                <div className="skeleton h-8 rounded w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : ordersData.length === 0 ? (
        <TableRow>
          <TableCell
            colSpan={12}
            className="text-center font-medium text-gray-800 py-4 border-y"
          >
            No Orders Data Available In This Order Status
          </TableCell>
        </TableRow>
      ) : (
        ordersData.map((order, idx) => (
          <TableRow key={idx}>
            <TableCell>
              <div className="truncate">
                <h1 className="font-normal text-sm">
                  <span className="font-semibold">Name:</span>{" "}
                  {order?.customerInfo?.name}
                </h1>
                <h1 className="font-normal text-sm md:block">
                  <span className="font-semibold">Email:</span>{" "}
                  {order?.customerInfo?.email}
                </h1>
                <h1 className="font-normal text-sm lg:block">
                  <span className="font-semibold">Phone:</span>{" "}
                  {order?.customerInfo?.phone}
                </h1>
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
                  <div key={idx} className="flex items-center gap-1 truncate">
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
            <TableCell className="text-sm">
            ৳{order?.totalPrice.toFixed(2)}
            </TableCell>
            <TableCell>
              <Select
                value={order?.paymentStatus}
                onValueChange={(newStatus) =>
                  handlePaymentStatusChange(order?._id, newStatus)
                }
                className="cursor-pointer"
              >
                <SelectTrigger className="cursor-pointer min-w-[90px] text-sm">
                  <SelectValue>{order?.paymentStatus}</SelectValue>
                </SelectTrigger>
                <SelectContent className="cursor-pointer">
                  <SelectItem value="Pending" className="cursor-pointer">
                    Pending
                  </SelectItem>
                  <SelectItem value="Paid" className="cursor-pointer">
                    Paid
                  </SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <div className="mt-1 text-xs max-w-28 overflow-x-auto font-medium truncate">
                <span>{order?._id}</span>
              </div>
            </TableCell>
            <TableCell className="text-sm">
              {order?.date
                ? new Date(order.date).toLocaleString().split(",")[0]
                : "N/A"}
              <br />
              <span className="mt-[1px] text-xs hidden md:inline">
                {order?.date
                  ? new Date(order.date).toLocaleString().split(",")[1]
                  : "N/A"}
              </span>
            </TableCell>
            <TableCell className="max-w-40 overflow-x-auto text-sm">
              <div className="">{order?.customerInfo?.address}</div>
              <div className="">
                {order?.customerInfo?.district}, {order?.customerInfo?.division}
              </div>
            </TableCell>
            <TableCell />
            <TableCell>
              <div
                className={`flex ${
                  order?.orderStatus === "Ready for Pickup" ||
                  order?.orderStatus === "Out for Delivery"
                    ? "items-stretch"
                    : "items-center"
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
                </span>
                <span className="font-medium mt-[3.2px] text-sm">
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
              <Select
                value={order?.orderStatus}
                onValueChange={(newStatus) =>
                  changeOrderStatus(order?._id, newStatus)
                }
                className="cursor-pointer"
              >
                <SelectTrigger className="cursor-pointer min-w-[115px] truncate text-sm">
                  <SelectValue>
                    {(order?.orderStatus === "Ready for Pickup" && (
                      <span className="py-1 text-xs">
                        Ready for <br /> Pickup
                      </span>
                    )) ||
                      (order?.orderStatus === "Out for Delivery" && (
                        <span className="py-1 text-xs">
                          Out for <br /> Delivery
                        </span>
                      )) ||
                      order?.orderStatus}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="cursor-pointer min-w-[170px]">
                  {orderStatuses.slice(1).map((status) => (
                    <SelectItem
                      key={status}
                      className="cursor-pointer"
                      value={status}
                    >
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <ProductsDialog
                products={order?.products}
                totalPrice={order?.totalPrice}
              />
            </TableCell>
            <TableCell>
              <Link to={`/dashboard/invoice/${order?._id}`}>
                <Button variant="outline" className="cursor-pointer">
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

export default OrdersTable;

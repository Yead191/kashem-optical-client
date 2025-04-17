import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useCart from "@/hooks/useCart";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import emptyCart from "../../../assets/empty-cart.jpg";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { districts, divisionDistricts, divisions } from "@/lib/address";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Confetti from "react-confetti";
import useDiscount from "@/hooks/useDiscount";

const ManageCart = () => {
  const { user } = useAuth();
  const [cart, , refetch] = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [subtotal, setSubtotal] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [discount, discountLoading] = useDiscount();
  const navigate = useNavigate();

  // Discount Calculations
  const discountAmount = discount ? (subtotal * discount) / 100 : 0;
  const totalAfterDiscount = subtotal - discountAmount;

  // Form values
  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [division, setDivision] = useState("");
  const [address, setAddress] = useState("");

  const filteredDistricts = division ? divisionDistricts[division] : districts;

  const customerInfo = {
    name: name || user?.displayName,
    email: email || user?.email,
    phone,
    district,
    division,
    address,
  };

  useEffect(() => {
    const calculatedSubtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(calculatedSubtotal);
  }, [cart]);

  const handleIncrease = async (itemId) => {
    const item = cart.find((i) => i._id === itemId);
    const updatedQuantity = item.quantity + 1;
    await toast.promise(
      axiosSecure.patch(`/carts/quantity/${itemId}`, {
        quantity: updatedQuantity,
      }),
      {
        loading: "Updating quantity...",
        success: <b>Quantity Added!</b>,
        error: (error) => error.message,
      }
    );
    refetch();
  };

  const handleDecrease = async (itemId) => {
    const item = cart.find((i) => i._id === itemId);
    if (item.quantity === 1) {
      Swal.fire({
        title: "Want to remove this item?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await toast.promise(axiosSecure.delete(`/carts/delete/${itemId}`), {
            loading: "Deleting item...",
            success: <b>Item Removed!</b>,
            error: (error) => error.message,
          });
          refetch();
        }
      });
    } else {
      const updatedQuantity = item.quantity - 1;
      await toast.promise(
        axiosSecure.patch(`/carts/quantity/${itemId}`, {
          quantity: updatedQuantity,
        }),
        {
          loading: "Updating quantity...",
          success: <b>Quantity Decreased!</b>,
          error: (error) => error.message,
        }
      );
      refetch();
    }
  };

  const handleClearCart = async () => {
    try {
      await toast.promise(axiosSecure.delete(`/carts/clear/${user?.email}`), {
        loading: "Clearing Cart...",
        success: <b>Cart Cleared Successfully!</b>,
        error: (error) => error.message,
      });
      refetch();
      setIsOpen(false);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const handleConfirmOrder = async () => {
    if (
      !customerInfo.name ||
      !customerInfo.email ||
      !customerInfo.phone ||
      !customerInfo.district ||
      !customerInfo.division ||
      !customerInfo.address
    ) {
      return toast.error("Please fill in all required fields");
    }

    const orderData = {
      customerInfo,
      totalPrice: totalAfterDiscount,
      discountPercentage: discount || 0,
      discountAmount,
      paymentStatus: "Pending",
      orderStatus: "Pending",
      date: new Date().toISOString(),
      products: cart.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity,
        brandName: item.brandName,
        image: item.image,
      })),
    };

    try {
      await toast.promise(axiosSecure.post("/orders", orderData), {
        loading: "Placing your order...",
        success: async () => {
          await axiosSecure.delete(`/carts/clear/${user?.email}`);
          refetch();
          setShowConfetti(true);
          setTimeout(() => {
            setShowConfetti(false);
            navigate("/dashboard/purchase-history");
          }, 5000);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Order Placed Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          return <b>Order placed successfully!</b>;
        },

        error: (error) => {
          const errorMessage =
            error.response?.data?.error ||
            error.message ||
            "Unable to place order";
          return <b>{errorMessage}</b>;
        },
      });
    } catch (error) {
      console.error("Error placing order:", error); 
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 md:gap-0 md:flex-row p-2 md:px-7 py-12 ">
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      {/* Left Column - Order Summary */}
      <div className="bg-gray-50 rounded-md p-4 md:p-8 flex-1 ">
        <h2 className="text-[1.2rem] text-gray-700 font-semibold mb-6">
          Your order
        </h2>
        <div className="border border-gray-200 rounded-md">
          {cart.length ? (
            cart.map((item, idx) => (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  delay: idx * 0.1,
                }}
                viewport={{ once: true }}
                key={item._id}
                className="flex flex-col md:flex-row md:items-center gap-4 border-t p-4 border-gray-200"
              >
                <div className="border relative border-gray-200 w-max rounded-md bg-white">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <span className="px-[0.45rem] rounded-full absolute bg-white -top-2 -right-2 z-30 text-[0.9rem] text-gray-800 border border-gray-200 shadow-sm">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.productName}</h3>
                  <div className="flex items-center gap-[30px] mt-2">
                    <p className="text-sm text-gray-500">
                      <b className="text-gray-800">{item.brandName}</b>
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrease(item._id)}
                        className="p-1 border rounded hover:bg-gray-200"
                      >
                        <AiOutlineMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item._id)}
                        className="p-1 border rounded hover:bg-gray-200"
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </div>
                </div>
                <span className="font-medium">
                  ৳ {(item.price * item.quantity).toFixed(2)}
                </span>
              </motion.div>
            ))
          ) : (
            <img
              src={emptyCart}
              alt="empty cart"
              className="border rounded-md"
            />
          )}
        </div>

        {/* Pricing Summary */}
        <div className="mt-8 space-y-2 border-t border-gray-200 pt-6">
          <div className="flex justify-between">
            <span className="text-[1rem] text-gray-500">Subtotal</span>
            <span className="text-[1rem] font-medium text-gray-800">
              ৳ {subtotal.toFixed(2)}
            </span>
          </div>

          {discount && (
            <div className="flex justify-between text-green-600">
              <span className="text-[1rem]">Discount ({discount}%)</span>
              <span className="text-[1rem]">
                - ৳ {discountAmount.toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex justify-between border-t border-gray-200 pt-5 font-medium">
            <span>Total</span>
            <span className="text-[1rem] text-gray-800">
              ৳ {totalAfterDiscount.toFixed(2)}
            </span>
          </div>

          {cart.length > 0 && discount && (
            <p className="text-green-600 font-medium mt-2">
              🎉 You saved {discount}% on this order!
            </p>
          )}
        </div>

        {/* Cart Controls */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-5 mt-5"
        >
          <Link to={"/products"}>
            <Button className="cursor-pointer">Continue Shopping</Button>
          </Link>
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-red-500 hover:bg-red-400 text-white cursor-pointer"
          >
            Clear Cart <FaCartShopping />
          </Button>
        </motion.div>
      </div>

      {/* Right Column - Customer Info Form */}
      <div className="flex-1 md:px-8 lg:sticky lg:top-16 lg:self-start ">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="user@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <div className="flex gap-2 items-center">
              <div className="border rounded px-3 py-[5px] border-gray-200 w-[130px]">
                <h1 value="bd">🇧🇩 +88</h1>
              </div>
              <Input
                type="tel"
                id="phone"
                placeholder="Enter Your Phone Number!"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="division">Division</Label>
              <Select
                onValueChange={(value) => {
                  setDivision(value);
                  setDistrict("");
                }}
                value={division}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Division" />
                </SelectTrigger>
                <SelectContent>
                  {divisions.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Select
                onValueChange={setDistrict}
                value={district}
                disabled={!division}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      division ? "Select District" : "Select Division First"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="max-h-80 overflow-y-auto">
                  {filteredDistricts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <Label htmlFor="billingAddress">Address</Label>
            <Input
              id="billingAddress"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="Enter Your Location"
            />
          </div>
          <Button
            onClick={handleConfirmOrder}
            disabled={!cart.length}
            className="w-full"
            size="lg"
          >
            Confirm Order
          </Button>
        </div>
      </div>

      {/* Confirmation Modal for Clear Cart */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <p className="text-sm text-muted-foreground">
              This action will remove all items from your cart.
            </p>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="destructive" onClick={handleClearCart}>
              Yes, Clear Cart
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageCart;

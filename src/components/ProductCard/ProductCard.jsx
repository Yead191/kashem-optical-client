import React, { useState } from "react";
// Import Swiper React components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { BaggageClaim, Heart, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils"; // Assuming you have shadcn's cn utility
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useCart from "@/hooks/useCart";

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  // State to manage the Heart button (liked/unliked)
  const [, , refetch] = useCart();

  const [isLiked, setIsLiked] = useState(false);

  // Handler for Heart button click (Wishlist)
  const handleWishlist = (e, id) => {
    e.stopPropagation(); // Prevent the click from bubbling up to the Link
    e.preventDefault(); // Prevent any default behavior
    setIsLiked(!isLiked); // Toggle the liked state
    console.log(`Toggled wishlist for product ID: ${id}`);
    // Add your wishlist logic here (e.g., API call to add/remove from wishlist)
  };

  // Handler for Add to Cart button click
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      return toast.error("You must login before adding to cart");
    }

    const cartItem = {
      customer: {
        customerName: user.displayName,
        customerEmail: user.email,
      },
      productId: product._id,
      productName: product.productName,
      brandName: product.brandName,
      price:
        product.price.discount.discountedAmount > 0
          ? product.price.discount.discountedAmount
          : product.price.amount,
      image: product.image[0],
      quantity: 1,
    };

    await toast.promise(axiosPublic.post("/carts", cartItem), {
      loading: "Adding to cart...",
      success: <b>Successfully Added To Cart</b>,
      error: (error) => {
        const errorMessage =
          error.response?.data?.error || error.message || "Unable to Add";
        return <b>{errorMessage}</b>;
      },
    });
    refetch();
  };

  return (
    <Link
      to={`/product/${product._id}`}
      key={product._id}
      className="relative rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col border border-gray-200 w-full h-full"
    >
      {/* Heart Icon */}
      <div className="absolute top-2 right-2 z-10">
        <button onClick={(e) => handleWishlist(e, product._id)}>
          <Heart
            className={cn(
              "h-5 w-5 cursor-pointer",
              isLiked
                ? "text-red-500 fill-red-500"
                : "text-gray-500 hover:text-red-500"
            )}
          />
        </button>
      </div>

      {/* Product Images with Swiper */}
      <div className="relative pt-4 md:px-4 mb-4 h-[180px] md:h-[200px] lg:h-[260px]">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="h-full w-full"
        >
          {product?.image.map((imgUrl, index) => (
            <SwiperSlide key={index}>
              <img
                className="mx-auto object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                src={imgUrl}
                alt={`${product?.brandName} - ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Rating */}
        <div className="flex items-center mb-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>4.9</span>
            <span className="text-gray-500">
              ({Math.floor(Math.random() * 1000)})
            </span>
          </Badge>
        </div>

        {/* Brand Name */}
        <h4 className="text-md md:text-lg font-semibold mb-1">
          {product?.productName}
        </h4>

        {/* Size and Additional Info */}
        <p className="text-sm text-gray-500 mb-2 flex-grow">
          Size: {product?.frameSize} • {product?.brandName}
        </p>

        <div className="flex items-center justify-between">
          {/* Price */}
          <div className="flex items-center gap-2">
            {product.price.discount.discountedAmount > 0 ? (
              <>
                <span className="text-lg font-semibold text-black">
                  ৳{product.price.discount.discountedAmount}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ৳{product.price.amount}
                </span>
                <span className="text-sm text-green-600">
                  ({product.price.discount.percentage}% OFF)
                </span>
              </>
            ) : (
              <span className="text-lg font-semibold text-black">
                ৳{product.price.amount}
              </span>
            )}
          </div>
          {/* Add to Cart Button */}
          <div className="mt-auto">
            {product?.status === "In Stock" ? (
              <Button
                variant="outline"
                onClick={(e) => handleAddToCart(e)}
                className="border-[#00bac6] text-[#00bac6] hover:bg-[#00bac6] hover:text-white"
              >
                <BaggageClaim className="h-5 w-5" />
                Add to Cart
              </Button>
            ) : (
              <Button
                disabled
                className="w-full flex items-center gap-2 rounded-md bg-red-500 hover:bg-red-600"
              >
                <BaggageClaim className="h-4 w-4" />
                Out of Stock
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

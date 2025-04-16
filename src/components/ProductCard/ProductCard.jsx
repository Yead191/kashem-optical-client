import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { BaggageClaim, Heart, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useCart from "@/hooks/useCart";

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [, , refetch] = useCart();
  const [isLiked, setIsLiked] = useState(false);

  const handleWishlist = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLiked(!isLiked);
    console.log(`Toggled wishlist for product ID: ${id}`);
  };

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
      productId: product._id ? product._id : product.productId,
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
    <div className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 bg-white/80 backdrop-blur-md border border-gray-200/50 hover:shadow-lg hover:shadow-indigo-200/50">
      {/* Hover Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-sky-300/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Animated Border Effect */}
      <div className="absolute inset-0 border border-transparent group-hover:border-purple-500/30 rounded-xl transition-colors duration-300"></div>

      {/* Heart Icon */}
      <div className="absolute top-3 right-3 z-20">
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
      <Link
        to={`/product/${product._id ? product._id : product.productId}`}
        className="relative block h-[180px] md:h-[200px] lg:h-[260px] overflow-hidden"
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{
            delay: 3000, 
            disableOnInteraction: false, 
          }}
          pagination={{ clickable: true }}
          className="h-full w-full"
        >
          {product?.image?.map((imgUrl, index) => (
            <SwiperSlide key={index}>
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={imgUrl}
                alt={`${product?.brandName} - ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* View Details Button (visible on hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-indigo-600/90 text-white backdrop-blur-md">
            View Details
          </span>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Rating */}
        <div className="flex items-center mb-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>4.9</span>
            <span className="text-gray-500">
              ({Math.floor(Math.random() * 20)})
            </span>
          </Badge>
        </div>

        {/* Brand Name */}
        <Link to={`/product/${product._id ? product._id : product.productId}`}>
          <h4 className="text-md md:text-lg font-semibold mb-1 truncate hover:text-indigo-600">
            {product?.productName}
          </h4>
        </Link>

        {/* Size and Additional Info */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
          Size: {product?.frameSize} • {product?.brandName}
        </p>

        <div className="flex items-center justify-between">
          {/* Price */}
          <div className="flex items-center gap-2">
            {product.price.discount.discountedAmount > 0 ? (
              <>
                <span className="text-lg font-semibold text-indigo-600">
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
              <span className="text-lg font-semibold text-indigo-600">
                ৳{product.price.amount}
              </span>
            )}
          </div>
          {/* Add to Cart Button */}
          <div className="mt-auto z-30">
            {product?.status === "In Stock" ? (
              <Button
                variant="outline"
                onClick={(e) => handleAddToCart(e)}
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
              >
                <BaggageClaim className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            ) : (
              <Button
                disabled
                className="w-full flex items-center gap-2 rounded-md bg-red-500 hover:bg-red-600"
              >
                <BaggageClaim className="h-4 w-4 mr-2" />
                Out of Stock
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

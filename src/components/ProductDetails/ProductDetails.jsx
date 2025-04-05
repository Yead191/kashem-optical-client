import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

// react icons
import { FaStar } from "react-icons/fa6";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FaCircle } from "react-icons/fa"; // For the dot icon
import useAxiosPublic from "@/hooks/useAxiosPublic";

const ProductDetails = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const axiosPublic = useAxiosPublic();

  const {
    data: product = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosPublic(`/product/${id}`);
      return res.data;
    },
  });

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.image.length);
  };

  const previousImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.image.length) % product.image.length
    );
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error || !product) {
    return <div className="text-center py-12">Product not found</div>;
  }

  return (
    <div className="mx-auto md:px-8 md:py-12 w-11/12 md:w-10/12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left side - Image gallery */}
        <div className="space-y-2">
          {" "}
          {/* Reduced spacing from space-y-4 to space-y-2 */}
          <div className="relative aspect-square">
            {/* NEW and Discount tags */}
            {/* <div className="absolute top-4 left-4 z-10 space-y-2">
              <span className="inline-block px-2 py-1 text-xs font-semibold bg-black text-white">
                NEW
              </span>
              <div className="inline-block px-2 py-1 text-xs font-semibold bg-emerald-500 text-white">
                -{product.price.discount.percentage}%
              </div>
            </div> */}

            {/* Main image with navigation arrows */}
            <div className="relative h-[70vh]">
              <img
                src={product?.image[currentImageIndex]}
                alt={`${product.productName} view ${currentImageIndex + 1}`}
                className="w-full h-full object-cover overflow-hidden"
              />
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-[#0FABCA] hover:text-white"
                aria-label="Previous image"
              >
                <BiChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-[#0FABCA] hover:text-white"
                aria-label="Next image"
              >
                <BiChevronRight className="w-6 h-6" />
              </button>
            </div>
            {/* Thumbnail images */}
            <div className="flex gap-2 mt-4 justify-center">
              {product?.image?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative transition-all duration-300 w-[6rem] aspect-square ${
                    currentImageIndex === index
                      ? "ring-2 ring-[#0FABCA]"
                      : "hover:ring-2 hover:ring-[#0FABCA]"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Product details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="w-4 h-4 fill-black" />
              ))}
            </div>
            <span className="text-sm text-gray-600">11 Reviews</span>
          </div>

          <h1 className="text-[1.6rem] md:text-[1.9rem] text-gray-800 font-semibold">
            {product.productName} - {product.brandName}
          </h1>

          <p className="text-gray-600 text-[0.9rem]">
            Premium {product.category} for {product.gender}. Made with{" "}
            {product.frameMaterial} frame in {product.frameSize} size. Origin:{" "}
            {product.origin}
          </p>

          <div className="flex items-center gap-3">
            <span className="text-[1.5rem] text-gray-800 font-medium">
              ৳ {product.price.discount.discountedAmount}
            </span>
            <span className="text-lg text-gray-500 line-through">
              ৳ {product.price.amount}
            </span>
          </div>

          <div className="space-y-2 border-t border-t-gray-200 pt-4">
            <p className="font-medium text-[0.9rem] text-gray-600">
              Specifications
            </p>
            {product.brandName && (
              <p className="text-gray-800">Brand: {product.brandName}</p>
            )}
            {product.productName && (
              <p className="text-gray-800">Product: {product.productName}</p>
            )}
            {product.category && (
              <p className="text-gray-800">Category: {product.category}</p>
            )}
            {product.gender && (
              <p className="text-gray-800">Gender: {product.gender}</p>
            )}
            {product.origin && (
              <p className="text-gray-800">Origin: {product.origin}</p>
            )}
            {product.frameMaterial && (
              <p className="text-gray-800">
                Frame Material: {product.frameMaterial}
              </p>
            )}
            {product.frameSize && (
              <p className="text-gray-800">Frame Size: {product.frameSize}</p>
            )}
            {product.status && (
              <p className="text-gray-800 flex items-center gap-2">
                <FaCircle
                  className={`w-3 h-3 ${
                    product.status === "In Stock"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                />
                {product.status}
              </p>
            )}
            {product.priceNum && (
              <p className="text-gray-800">Price Number: {product.priceNum}</p>
            )}
          </div>

          <div className="flex gap-4 items-center pt-6">
            <div className="flex items-center bg-gray-100 rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-[0.560rem] text-[1.3rem] font-[300] hover:bg-gray-100 rounded-l-md"
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-10 font-medium outline-none text-[0.9rem] bg-transparent text-center"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-[0.560rem] text-[1.3rem] font-[300] hover:bg-gray-100 rounded-r-md"
              >
                +
              </button>
            </div>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="py-3 border border-gray-200 rounded-md flex items-center justify-center gap-[10px] grow hover:bg-gray-50"
            >
              {isFavorite ? (
                <FaHeart className="w-5 h-5 text-red-500" />
              ) : (
                <FaRegHeart className="w-5 h-5 text-gray-800" />
              )}
              Wishlist
            </button>
          </div>

          <button className="w-full px-6 py-3 bg-[#0FABCA] text-white rounded-md hover:bg-[#0FABCA]/90">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// react icons
import {
  FaStar,
  FaHeart,
  FaRegHeart,
  FaCircle,
  FaGlasses,
  FaTag,
  FaVenusMars,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaPalette,
  FaBorderAll,
  FaShapes,
  FaCogs,
  FaRuler,
  FaRulerHorizontal,
  FaWeightHanging,
  FaLayerGroup,
  FaGlobe,
  FaFilePrescription,
} from "react-icons/fa";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Spinner from "../Spinner/Spinner";
import { Button } from "../ui/button";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
import { Heart } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useCart from "@/hooks/useCart";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import Seo from "../Seo/Seo";

const ProductDetails = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [cart, cartLoading, refetch] = useCart();
  const [isAddedToCart, setIsAddedToCart] = useState(false);

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
  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, value));
  };

  // handle Add to cart
  const handleAddToCart = async () => {
    try {
      setIsAddedToCart(true);

      const cartItem = {
        customer: {
          customerName: user?.displayName || "Guest",
          customerEmail: user?.email || "guest@email.com",
        },
        productId: product?._id,
        productName: product?.productName,
        price: product?.price?.discount?.discountedAmount
          ? product?.price.discount.discountedAmount
          : product?.price?.amount,
        image: product?.image[0],
        brandName: product?.brandName,
        quantity: quantity,
      };
      if (!user) {
        try {
          const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
          const existingItemIndex = existingCart.findIndex(
            (item) => item.productId === id
          );
          if (existingItemIndex >= 0) {
            existingCart[existingItemIndex].quantity += 1;
          } else {
            existingCart.push(cartItem);
          }
          localStorage.setItem("cart", JSON.stringify(existingCart));
          toast.success("Successfully Added To Cart");
          refetch();
        } catch (error) {
          toast.error("Failed to add to cart");
          console.error("Error saving to local storage:", error);
        }
        return;
      }

      toast.promise(axiosPublic.post("/carts", cartItem), {
        loading: "Adding to cart...",
        success: () => {
          refetch();
          return <b>Product Successfully Added To Cart</b>;
        },
        error: (error) => {
          const errorMessage =
            error.response?.data?.error || error.message || "Unable To Add";
          // Only reset isAddedToCart if the error isn't "Item already exists in cart"
          if (errorMessage !== "Item already exists in cart") {
            setIsAddedToCart(false);
          }
          return <b>{errorMessage}</b>;
        },
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      if (isAddedToCart) {
        refetch();
      }
    }
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (error || !product) {
    return <div className="text-center py-12">Product not found</div>;
  }

  // console.log(product);

  return (
    <div className="mx-auto md:px-8 py-12 w-11/12 md:w-10/12  ">
      <Seo
        title={`${product.productName} | Kashem Optical`}
        content={`Explore detailed information about ${product.productName}.`}
        link={`/product/${id}`}
      ></Seo>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to={"/"}>
              <BreadcrumbLink>Home</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to={"/products"}>
              <BreadcrumbLink>Shop</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{product?.productName}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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
            <div className="relative h-[40vh] md:h-[70vh]">
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
            {product.productName}
          </h1>
          <p className="text-sm mt-1">
            <span className="font-medium">{product?.brandName}</span> • Model:{" "}
            {product?.modelNo}
          </p>
          {product.status && (
            <p className="text-gray-800 flex items-center gap-2 ">
              <FaCircle
                className={`w-3 h-3 ${
                  product.status === "In Stock"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              />{" "}
              {product.status} {product?.quantity && `(${product?.quantity})`}
            </p>
          )}

          {product.description ? (
            <p className="text-gray-600 text-[0.9rem]">{product.description}</p>
          ) : (
            <p className="text-gray-600 text-[0.9rem]">
              Premium {product.category} for {product.gender}. Made with{" "}
              {product.frameMaterial} frame in {product.frameSize} size. Origin:{" "}
              {product.origin}
            </p>
          )}
          {product.price.discount.discountedAmount ? (
            <div className="flex items-center gap-3">
              <span className="text-[2rem] text-black font-semibold">
                <span className="text-[1.5rem] mr-0.5">৳</span>
                {product.price.discount.discountedAmount}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ৳{product.price.amount}
              </span>
            </div>
          ) : (
            <span className="text-[1.5rem] text-black font-semibold">
              ৳ {product.price.amount}
            </span>
          )}
          {/* specification */}
          <p className="font-medium text-[0.9rem] text-gray-600 border-t border-t-gray-200 pt-4">
            Specifications
          </p>
          <div className="space-y-2 grid grid-cols-2 text-xs md:text-sm">
            {product.brandName && (
              <p className="text-gray-800 flex items-center gap-2">
                <FaTag className="w-4 h-4 text-gray-600" /> Brand:{" "}
                {product.brandName}
              </p>
            )}
            {product.productType && (
              <p className="text-gray-800 flex items-center gap-2">
                <FaGlasses className="w-4 h-4 text-gray-600" /> Product Type:{" "}
                {product.productType}
              </p>
            )}
            {product.modelNo && (
              <p className="text-gray-800 flex items-center gap-2">
                <FaTag className="w-4 h-4 text-gray-600" /> Model No:{" "}
                {product.modelNo}
              </p>
            )}
            {product.category && (
              <p className="text-gray-800 flex items-center gap-2">
                <FaLayerGroup className="w-4 h-4 text-gray-600" /> Category:{" "}
                {product.category}
              </p>
            )}
            {product.gender && (
              <p className="text-gray-800 flex items-center gap-2">
                <FaVenusMars className="w-4 h-4 text-gray-600" /> Gender:{" "}
                {product.gender}
              </p>
            )}
            {product.origin && (
              <p className="text-gray-800 flex items-center gap-2">
                <FaMapMarkerAlt className="w-4 h-4 text-gray-600" /> Origin:{" "}
                {product.origin}
              </p>
            )}
            {product.warranty && (
              <p className="text-gray-800 flex items-center gap-2">
                <FaShieldAlt className="w-4 h-4 text-gray-600" /> Warranty:{" "}
                {product.warranty}
              </p>
            )}
            {product.color && (
              <p className="text-gray-800 flex items-center gap-2">
                <FaPalette className="w-4 h-4 text-gray-600" /> Color:{" "}
                {product.color}
              </p>
            )}
            {product.frameType && (
              <p className="text-gray-800 flex items-center gap-2">
                <FaBorderAll className="w-4 h-4 text-gray-600" /> Frame Type:{" "}
                {product.frameType}
              </p>
            )}
            {product.frameShape && (
              <p className="text-gray-800 flex items-center gap-2">
                <FaShapes className="w-4 h-4 text-gray-600" /> Frame Shape:{" "}
                {product.frameShape}
              </p>
            )}
            {product.frameMaterial && (
              <p className="text-gray-800 flex items-center gap-2">
                <FaCogs className="w-4 h-4 text-gray-600" /> Frame Material:{" "}
                {product.frameMaterial}
              </p>
            )}
            {product.templeMaterial && (
              <p className="text-gray-800 flex items-center gap-2">
                <FaCogs className="w-4 h-4 text-gray-600" /> Temple Material:{" "}
                {product.templeMaterial}
              </p>
            )}
            {product.frameSize && (
              <p className="text-gray-800 flex items-center gap-2">
                <FaRuler className="w-4 h-4 text-gray-600" /> Frame Size:{" "}
                {product.frameSize}
              </p>
            )}
            {product.frameWidth && (
              <p className="text-gray-800 flex items-center gap-2">
                <FaRulerHorizontal className="w-4 h-4 text-gray-600" /> Frame
                Width: {product.frameWidth}
              </p>
            )}
            {product.dimensions && (
              <p className="text-gray-800 flex items-center gap-2">
                <FaRuler className="w-4 h-4 text-gray-600" /> Dimensions:{" "}
                {product.dimensions}
              </p>
            )}
            {product.weight && (
              <p className="text-gray-800 flex items-center gap-2">
                <FaWeightHanging className="w-4 h-4 text-gray-600" /> Weight:{" "}
                {product.weight}
              </p>
            )}
            {product.weightGroup && (
              <p className="text-gray-800 flex items-center gap-2">
                <FaWeightHanging className="w-4 h-4 text-gray-600" /> Weight
                Group: {product.weightGroup}
              </p>
            )}
            {product.frameStyle && (
              <p className="text-gray-800 flex items-center gap-2">
                <FaShapes className="w-4 h-4 text-gray-600" /> Frame Style:{" "}
                {product.frameStyle}
              </p>
            )}
            {product.prescription && (
              <p className="text-gray-800 flex items-center gap-2">
                <FaFilePrescription className="w-4 h-4 text-gray-600" />{" "}
                Prescription: {product.prescription}
              </p>
            )}
          </div>
          {product?.spectaclePrescription &&
            Object.values(product.spectaclePrescription).some(
              (eyeData) =>
                eyeData.sph || eyeData.cyl || eyeData.axis || eyeData.add
            ) && (
              <div className="w-full  rounded-lg border shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Eye</TableHead>
                      <TableHead>SPH</TableHead>
                      <TableHead>CYL</TableHead>
                      <TableHead>Axis</TableHead>
                      <TableHead>ADD</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(product?.spectaclePrescription).map(
                      ([eye, values]) => (
                        <TableRow key={eye}>
                          <TableCell className="font-medium">{eye}</TableCell>
                          <TableCell>{values.sph || "—"}</TableCell>
                          <TableCell>{values.cyl || "—"}</TableCell>
                          <TableCell>{values.axis || "—"}</TableCell>
                          <TableCell>{values.add || "—"}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </div>
            )}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="flex gap-4 items-center pt-6"
          >
            {/* Quantity Increase & Favorite */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="h-10 w-10 rounded-r-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-12 text-center font-medium">{quantity}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="h-10 w-10 rounded-l-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              onClick={() => setIsFavorite(!isFavorite)}
              variant="outline"
              size="lg"
              className="w-full"
            >
              {isFavorite ? (
                <FaHeart className="w-5 h-5 text-red-500" />
              ) : (
                <FaRegHeart className="w-5 h-5 text-gray-800" />
              )}
              Wishlist
            </Button>
          </motion.div>

          {isAddedToCart ? (
            // Shopping & Checkout Button
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <Link to={"/products"} className="w-full">
                <Button
                  className={"cursor-pointer w-full"}
                  variant="outline"
                  size="lg"
                >
                  Continue Shopping
                </Button>
              </Link>
              <Link to={"/dashboard/manage-cart"} className="w-full">
                <Button className={"cursor-pointer w-full"} size="lg">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Checkout
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
              viewport={{ once: true }}
            >
              {product.status === "In Stock" ? (
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="w-full cursor-pointer"
                >
                  Add to Cart
                </Button>
              ) : (
                <Button
                  disabled
                  size="lg"
                  className="w-full cursor-not-allowed bg-red-500 text-white hover:bg-red-300"
                >
                  Out Of Stock
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

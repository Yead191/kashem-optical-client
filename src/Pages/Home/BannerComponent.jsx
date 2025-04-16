import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { IoSparkles } from "react-icons/io5";
import useAuth from "@/hooks/useAuth.jsx";
import { Glasses, GlassesIcon } from "lucide-react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "react-query";

const BannerComponent = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProduct, setActiveProduct] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { data: featuredProducts = [], isLoading: bannerLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/banners");
      const filtered = data.filter((item) => item.status === "added");
      return filtered;
    },
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?search=${searchQuery}`);
    // console.log("Searching for:", searchQuery);
  };

  // Auto-rotate featured products
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setActiveProduct((prev) => (prev + 1) % featuredProducts.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovering, featuredProducts.length]);

  const handleProductHover = (index) => {
    setActiveProduct(index);
    setIsHovering(true);
  };

  const handleProductLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  //   const featuredProducts = [
  //     {
  //       name: "Ray-Ban Aviator",
  //       category: "Sunglasses",
  //       price: "$149.99",
  //       image:
  //         "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
  //       color: "from-blue-500 to-teal-600",
  //     },
  //     {
  //       name: "Blue Light Glasses",
  //       category: "Anti-Glare",
  //       price: "$59.99",
  //       image:
  //         "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
  //       color: "from-gray-500 to-gray-700",
  //     },
  //     {
  //       name: "Progressive Lenses",
  //       category: "Prescription",
  //       price: "$199.99",
  //       image:
  //         "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?auto=format&fit=crop&w=800&q=80",
  //       color: "from-blue-600 to-indigo-800",
  //     },
  //     {
  //       name: "Oakley Sports",
  //       category: "Sports Eyewear",
  //       price: "৳129.99",
  //       image:
  //         "https://images.unsplash.com/photo-1509695507491-09ce0b54602d?auto=format&fit=crop&w=800&q=80",
  //       color: "from-green-400 to-green-600",
  //     },
  //   ];

  console.log(featuredProducts);

  return (
    <div className=" w-full overflow-hidden transition-all duration-300 bg-white text-gray-900">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-blue-600/20 to-teal-600/20 blur-3xl"></div>
          <div className="absolute top-40 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-600/20 to-cyan-600/20 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-blue-600/20 to-teal-600/20 blur-3xl"></div>

          {/* Animated Lines */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse"></div>
            <div
              className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute left-2/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-pulse"
              style={{ animationDelay: "2.5s" }}
            ></div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-24">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-10">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2 bg-blue-100 text-blue-700 border border-blue-200">
                  <IoSparkles className="mr-1" size={16} />
                  <span>Enhancing Your Vision</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600">
                  See the World.
                  <br />
                  <span className="relative inline-block text-gray-900">
                    In Style
                    <svg
                      className="absolute -bottom-5 left-0 w-full"
                      viewBox="0 0 100 15"
                      preserveAspectRatio="none"
                      height="15"
                    >
                      <path
                        d="M0,5 Q40,0 50,5 Q60,10 100,5 L100,15 L0,15 Z"
                        fill="rgba(29, 78, 216, 0.2)"
                      />
                    </svg>
                  </span>
                </h1>

                <p className="text-lg md:text-xl max-w-md text-gray-600">
                  Discover premium eyewear and lenses tailored to your style and
                  vision needs.
                </p>
              </div>

              {/* Search Bar */}
              <div className="h-24 relative max-w-md transition-all duration-300 transform hover:scale-[1.02] bg-white rounded-2xl border border-blue-200/50 shadow-lg shadow-blue-600/5">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Find glasses, lenses, or brands..."
                    className="w-full px-5 py-4 pr-12 rounded-2xl focus:outline-none transition-all duration-300 bg-transparent text-gray-900 placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90"
                    aria-label="Search"
                  >
                    <FiSearch size={20} />
                  </button>
                </form>

                {/* Search Suggestions */}
                <div className="absolute bottom-0 left-4 right-6 flex space-x-2 overflow-x-auto pb-3 no-scrollbar">
                  {["Sunglasses", "Eyeglasses", "Screen Glasses", "Lenses"].map(
                    (term, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSearchQuery(term)}
                        className="px-3 py-1 text-xs rounded-full whitespace-nowrap transition-all duration-300 bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to={"/products"}
                  className="group w-6/12 relative px-6 py-3 rounded-xl font-medium transition-all duration-300 overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-600/20"
                >
                  <span className="relative z-10 flex items-center">
                    Shop Now{" "}
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <span className="absolute inset-0 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-teal-600 to-blue-600"></span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center">
                  <div className="p-2 rounded-full mr-3 bg-blue-100 text-blue-600">
                    <Glasses size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Free Eye Test
                    </p>
                    <p className="text-xs text-gray-500">With every purchase</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="p-2 rounded-full mr-3 bg-blue-100 text-blue-600">
                    <GlassesIcon size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Fast Shipping
                    </p>
                    <p className="text-xs text-gray-500">
                      Same-day in select areas
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Product Showcase */}
            <div className="lg:col-span-7 relative">
              <div className="relative h-[500px] perspective-1000">
                <div className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-white/50 to-blue-100/30 border border-blue-200/30 backdrop-blur-md shadow-xl">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/10 to-teal-600/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-indigo-600/10 to-cyan-600/10 rounded-full blur-2xl"></div>
                  </div>

                  {/* Product Display */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {bannerLoading ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-full h-full animate-pulse">
                          {/* Skeleton Image */}
                          <div className="absolute inset-0 bg-gray-200 rounded-3xl"></div>
                          {/* Skeleton Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent"></div>
                          {/* Skeleton Product Info */}
                          <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="flex items-end justify-between">
                              <div>
                                <div className="h-4 w-24 bg-gray-300 rounded mb-1"></div>
                                <div className="h-8 w-48 bg-gray-300 rounded mb-1"></div>
                                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                              </div>
                              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      featuredProducts.map((product, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 transform ${
                            index === activeProduct
                              ? "opacity-100 scale-100 rotate-0 translate-z-0"
                              : "opacity-0 scale-90 rotate-3 -translate-z-10"
                          }`}
                        >
                          <div className="relative w-full h-full">
                            {/* Product Image */}
                            <div className="absolute inset-0 overflow-hidden">
                              <img
                                src={product?.image || "/placeholder.svg"}
                                alt={product?.title}
                                className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                              />
                            </div>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent"></div>

                            {/* Product Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                              <div className="flex items-end justify-between">
                                <div>
                                  <p className="text-sm font-medium text-gray-300 mb-1">
                                    {product?.category}
                                  </p>
                                  <h3 className="text-3xl font-bold text-white mb-1">
                                    {product?.title}
                                  </h3>
                                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
                                    ৳{product?.price}
                                  </div>
                                </div>
                                <Link
                                  to={`/products?search=${product.title
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`}
                                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
                                >
                                  <FiArrowRight size={20} />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Product Selection Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {featuredProducts?.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveProduct(index)}
                        onMouseEnter={() => handleProductHover(index)}
                        onMouseLeave={handleProductLeave}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activeProduct
                            ? "w-8 bg-white"
                            : "bg-white/50 hover:bg-white/80"
                        }`}
                        aria-label={`View product ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerComponent;

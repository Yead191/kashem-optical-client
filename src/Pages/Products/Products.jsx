import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Spinner from "../../components/Spinner/Spinner";
import useCategory from "../../hooks/useCategory";
import { Menu } from "@headlessui/react";
import "react-dropdown/style.css";
import { Link, useSearchParams } from "react-router-dom";
import Seo from "../../components/Seo/Seo";
import Select from "react-select";
import { ArrowDownUp, Filter, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import ProductCard from "@/components/ProductCard/ProductCard";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { motion } from "framer-motion";

const Products = () => {
  const axiosPublic = useAxiosPublic();
  const [categories, categoriesLoading] = useCategory();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const initialCategory = searchParams.get("category") || "";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortPrice, setSortPrice] = useState("");
  const [selectedGender, setSelectedGender] = useState(
    searchParams.get("gender") || ""
  );
  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") || ""
  );
  const [selectedMaterial, setSelectedMaterial] = useState(
    searchParams.get("material") || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    searchParams.get("size") || ""
  );
  const [selectedType, setSelectedType] = useState(
    searchParams.get("type") || ""
  );
  const [selectedColor, setSelectedColor] = useState(
    searchParams.get("color") || ""
  );
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: filterOptions = {}, isLoading: filterLoading } = useQuery({
    queryKey: ["filterOptions"],
    queryFn: async () => {
      const res = await axiosPublic.get("/filter-options");
      return res.data;
    },
  });

  useEffect(() => {
    if (filterOptions.priceRange) {
      setPriceRange([
        filterOptions.priceRange.min,
        filterOptions.priceRange.max,
      ]);
    }
  }, [filterOptions]);

  useEffect(() => {
    const params = {};
    if (selectedCategory) params.category = selectedCategory;
    if (selectedGender) params.gender = selectedGender;
    if (selectedBrand) params.brand = selectedBrand;
    if (selectedMaterial) params.material = selectedMaterial;
    if (selectedSize) params.size = selectedSize;
    if (selectedType) params.type = selectedType;
    if (selectedColor) params.color = selectedColor;
    if (sortPrice) params.sort = sortPrice;
    setSearchParams(params, { replace: true });
  }, [
    selectedCategory,
    selectedGender,
    selectedBrand,
    selectedMaterial,
    selectedType,
    sortPrice,
    selectedColor,
    setSearchParams,
  ]);

  useEffect(() => {
    const categoryFromParams = searchParams.get("category") || "";
    if (categoryFromParams !== selectedCategory) {
      setSelectedCategory(categoryFromParams);
    }
  }, [searchParams]);

  const sortOptions = [
    { value: "asc", label: "Low to High" },
    { value: "desc", label: "High to Low" },
  ];

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "products",
      selectedCategory,
      selectedGender,
      selectedBrand,
      selectedMaterial,
      selectedSize,
      priceRange,
      selectedType,
      selectedColor,
    ],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/products?search=${searchTerm}&category=${selectedCategory}&gender=${selectedGender}&brand=${selectedBrand}&material=${selectedMaterial}&size=${selectedSize}&type=${selectedType}&color=${selectedColor}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&sort=${sortPrice}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      refetch();
    }, 500);

    return () => clearTimeout(handler);
  }, [
    searchTerm,
    selectedCategory,
    selectedGender,
    selectedBrand,
    selectedMaterial,
    selectedType,
    selectedColor,
    sortPrice,
    priceRange,
    refetch,
  ]);

  const handleCategorySelect = (category) => {
    setSortPrice("");
    setSelectedCategory(category.name);
  };

  const handleClearFilter = () => {
    setSearchTerm("");
    setSortPrice("");
    setSelectedCategory("");
    setSelectedGender("");
    setSelectedBrand("");
    setSelectedMaterial("");
    setSelectedType("");
    setSelectedSize("");
    setSelectedColor("");
    setPriceRange([
      filterOptions.priceRange?.min || 0,
      filterOptions.priceRange?.max || 10000,
    ]);
    refetch();
  };

  const handleSortChange = (selectedOption) => {
    setSortPrice(selectedOption ? selectedOption.value : "");
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  // Filter Sidebar Component
  const FilterSidebar = () => (
    <div className="w-full lg:w-64 shrink-0 lg:block hidden">
      <motion.aside className="w-full bg-white  p-6 h-fit sticky top-28 shadow-md border rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-red-500"
            onClick={handleClearFilter}
          >
            Clear All
          </Button>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-3">Categories</h3>
          <div className="grid grid-cols-1 gap-2">
            {categories.map((category) => (
              <Button
                key={category._id}
                variant={
                  selectedCategory === category.name ? "default" : "outline"
                }
                className="justify-start text-sm h-auto py-2"
                onClick={() => setSelectedCategory(category.name)}
              >
                <span className="truncate">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-3">Price Range</h3>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={filterOptions.priceRange?.min || 0}
            max={filterOptions.priceRange?.max || 10000}
            step={100}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm">
            <span>৳{priceRange[0]}</span>
            <span>৳{priceRange[1]}</span>
          </div>
        </div>

        {/* Gender */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-3">Gender</h3>
          <div className="grid grid-cols-2 gap-2">
            {filterOptions.genders?.map((gender) => (
              <Button
                key={gender}
                variant={selectedGender === gender ? "default" : "outline"}
                className="justify-start text-sm h-auto py-2"
                onClick={() => setSelectedGender(gender)}
              >
                <span className="truncate">{gender}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Frame Type (Shape) */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-3">Frame Shape</h3>
          <div className="grid grid-cols-3 gap-2">
            {filterOptions.types?.map((type) => (
              <div key={type} className="flex flex-col items-center gap-1">
                <div
                  className={`w-12 h-8 border-2 border-gray-300 ${
                    type === "Round"
                      ? "rounded-full"
                      : type === "Square"
                      ? "rounded-md"
                      : type === "Rectangle"
                      ? "rounded-sm"
                      : type === "Cat Eye"
                      ? "rounded-tr-2xl rounded-bl-2xl"
                      : type === "Aviator"
                      ? "rounded-t-xl"
                      : "rounded-tl-2xl rounded-br-2xl"
                  } hover:border-gray-900 cursor-pointer transition-all ${
                    selectedType === type ? "border-gray-900" : ""
                  }`}
                  onClick={() => setSelectedType(type)}
                ></div>
                <span className="text-xs">{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-3">Brands</h3>
          <div className="grid grid-cols-2 gap-2">
            {filterOptions.brands?.map((brand) => (
              <Button
                key={brand}
                variant={selectedBrand === brand ? "default" : "outline"}
                className="justify-start text-sm h-auto py-2"
                onClick={() => setSelectedBrand(brand)}
              >
                <span className="truncate">{brand}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Material (Type) */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-3">Material</h3>
          <div className="flex flex-wrap gap-3">
            {filterOptions.materials?.map((material) => (
              <div
                key={material}
                className={`flex items-center justify-center px-3 py-1 border rounded-md text-sm cursor-pointer transition-all
          ${
            selectedMaterial === material
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
                onClick={() => setSelectedMaterial(material)}
                title={material}
              >
                {/* You can use icons if available, or just show text */}
                {material === "Stainless Steel" ? (
                  <span>🔩 Stainless Steel</span>
                ) : material === "Leather" ? (
                  <span>🧵 Leather</span>
                ) : material === "Silicone" ? (
                  <span>🟣 Silicone</span>
                ) : (
                  <span>{material}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/*  Color */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-3">Color</h3>
          <div className="flex flex-wrap gap-2">
            {filterOptions.colors?.map((material) => (
              <div key={material} className="flex flex-col items-center gap-1">
                <div
                  className={`w-6 h-6 rounded-full ${
                    material.includes("Black")
                      ? "bg-black"
                      : material.includes("Brown")
                      ? "bg-amber-800"
                      : material.includes("Gray")
                      ? "bg-gray-500"
                      : material.includes("Blue")
                      ? "bg-blue-500"
                      : material.includes("Green")
                      ? "bg-green-600"
                      : material.includes("Red")
                      ? "bg-red-600"
                      : material.includes("Gold")
                      ? "bg-yellow-500"
                      : material.includes("Silver")
                      ? "bg-gray-300"
                      : "bg-gray-300"
                  } hover:ring-2 ring-offset-2 ring-gray-900 cursor-pointer transition-all ${
                    selectedMaterial === material ? "ring-2 ring-gray-900" : ""
                  }`}
                  title={material}
                  onClick={() => setSelectedMaterial(material)}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Frame Size */}
        <div className="mb-8">
          <h3 className="text-sm font-medium mb-3">Frame Size</h3>
          <div className="grid grid-cols-2 gap-2">
            {filterOptions.sizes?.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "default" : "outline"}
                className="justify-start text-sm h-auto py-2"
                onClick={() => setSelectedSize(size)}
              >
                <span className="truncate">{size}</span>
              </Button>
            ))}
          </div>
        </div>
      </motion.aside>
    </div>
  );

  // Drawer Component for Small Devices
  const FilterDrawer = () => (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent className="h-[90vh]">
        <DrawerHeader>
          <DrawerTitle className="text-lg font-semibold">Filters</DrawerTitle>
          <DrawerClose className="absolute right-4 top-4">
            <X className="h-5 w-5" />
          </DrawerClose>
        </DrawerHeader>
        <div className="p-6 overflow-y-auto">
          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Button
                  key={category._id}
                  variant={
                    selectedCategory === category.name ? "default" : "outline"
                  }
                  className="justify-start text-sm h-auto py-2"
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setIsDrawerOpen(false);
                  }}
                >
                  <span className="truncate">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Price Range</h3>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={filterOptions.priceRange?.min || 0}
              max={filterOptions.priceRange?.max || 10000}
              step={100}
              className="mb-4"
            />
            <div className="flex items-center justify-between text-sm">
              <span>৳{priceRange[0]}</span>
              <span>৳{priceRange[1]}</span>
            </div>
          </div>

          {/* Gender */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Gender</h3>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions.genders?.map((gender) => (
                <Button
                  key={gender}
                  variant={selectedGender === gender ? "default" : "outline"}
                  className="justify-start text-sm h-auto py-2"
                  onClick={() => setSelectedGender(gender)}
                >
                  <span className="truncate">{gender}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Frame Type (Shape) */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Frame Shape</h3>
            <div className="grid grid-cols-3 gap-2">
              {filterOptions.types?.map((type) => (
                <div key={type} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-12 h-8 border-2 border-gray-300 ${
                      type === "Round"
                        ? "rounded-full"
                        : type === "Square"
                        ? "rounded-md"
                        : type === "Rectangle"
                        ? "rounded-sm"
                        : type === "Cat Eye"
                        ? "rounded-tr-2xl rounded-bl-2xl"
                        : type === "Aviator"
                        ? "rounded-t-xl"
                        : "rounded-tl-2xl rounded-br-2xl"
                    } hover:border-gray-900 cursor-pointer transition-all ${
                      selectedType === type ? "border-gray-900" : ""
                    }`}
                    onClick={() => setSelectedType(type)}
                  ></div>
                  <span className="text-xs">{type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Brands</h3>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions.brands?.map((brand) => (
                <Button
                  key={brand}
                  variant={selectedBrand === brand ? "default" : "outline"}
                  className="justify-start text-sm h-auto py-2"
                  onClick={() => setSelectedBrand(brand)}
                >
                  <span className="truncate">{brand}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Material (Type) */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Material</h3>
            <div className="flex flex-wrap gap-3">
              {filterOptions.materials?.map((material) => (
                <div
                  key={material}
                  className={`flex items-center justify-center px-3 py-1 border rounded-md text-sm cursor-pointer transition-all
          ${
            selectedMaterial === material
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
                  onClick={() => setSelectedMaterial(material)}
                  title={material}
                >
                  {/* You can use icons if available, or just show text */}
                  {material === "Stainless Steel" ? (
                    <span>🔩 Stainless Steel</span>
                  ) : material === "Leather" ? (
                    <span>🧵 Leather</span>
                  ) : material === "Silicone" ? (
                    <span>🟣 Silicone</span>
                  ) : (
                    <span>{material}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/*  Color */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Color</h3>
            <div className="flex flex-wrap gap-2">
              {filterOptions.colors?.map((material) => (
                <div
                  key={material}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className={`w-6 h-6 rounded-full ${
                      material.includes("Black")
                        ? "bg-black"
                        : material.includes("Brown")
                        ? "bg-amber-800"
                        : material.includes("Gray")
                        ? "bg-gray-500"
                        : material.includes("Blue")
                        ? "bg-blue-500"
                        : material.includes("Green")
                        ? "bg-green-600"
                        : material.includes("Red")
                        ? "bg-red-600"
                        : material.includes("Gold")
                        ? "bg-yellow-500"
                        : material.includes("Silver")
                        ? "bg-gray-300"
                        : "bg-gray-300"
                    } hover:ring-2 ring-offset-2 ring-gray-900 cursor-pointer transition-all ${
                      selectedMaterial === material
                        ? "ring-2 ring-gray-900"
                        : ""
                    }`}
                    title={material}
                    onClick={() => setSelectedMaterial(material)}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* Frame Size */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Frame Size</h3>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions.sizes?.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  className="justify-start text-sm h-auto py-2"
                  onClick={() => setSelectedSize(size)}
                >
                  <span className="truncate">{size}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button
            variant="ghost"
            className="text-red-500"
            onClick={handleClearFilter}
          >
            Clear All
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  return (
    <div className="bg-base-100 my-4 md:my-12 p-2 md:w-11/12 lg:w-10/12 mx-auto">
      <Seo
        title={"Shop | Kashem Optical"}
        content={
          "Browse our full range of premium lenses, frames, and optical accessories."
        }
        link={"/products"}
      />
      <div className=" my-2 space-y-4 md:space-y-0 p-2 md:flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Browse Products</h1>
        </div>
        <div className="md:flex items-center gap-2 md:gap-4 space-y-3 md:space-y-0">
          <div className="relative">
            <input
              className="input input-sm input-bordered w-full md:min-w-96 py-4 pl-8"
              placeholder="Search By Product Name / Brand Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4" />
          </div>

          <div className="flex items-center justify-between">
            <Select
              options={sortOptions}
              value={
                sortOptions.find((option) => option.value === sortPrice) ||
                sortPrice
              }
              onChange={handleSortChange}
              placeholder={
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <ArrowDownUp size={16} />
                  <span>Price</span>
                </div>
              }
              isClearable
              isSearchable={false}
              className="w-48"
            />
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                className={`btn btn-sm flex items-center gap-2 ${
                  selectedCategory && "btn-neutral"
                }`}
                onClick={() => setIsDrawerOpen(true)}
              >
                <span className="hidden md:flex">Filter</span>
                <Filter className="inline-flex" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row gap-4 p-2">
        {/* Sidebar for large devices */}
        <FilterSidebar />

        {/* Drawer for small devices */}
        <FilterDrawer />

        {/* Main Content */}
        <div className="w-full">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">All Results</h2>
            <p className="text-gray-500">{products.length} products found</p>
          </div>
          {isLoading ? (
            <Spinner />
          ) : products.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <p className="text-red-500 text-2xl">No Product Found!</p>
              <Button
                onClick={handleClearFilter}
                variant="destructive"
                size="sm"
                className="mt-2"
              >
                Clear Filter
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

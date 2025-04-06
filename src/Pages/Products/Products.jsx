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
import { ArrowDownUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Filter, Search } from "lucide-react";

const Products = () => {
  const axiosPublic = useAxiosPublic();
  const [categories, categoriesLoading] = useCategory();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
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
    searchParams.get("size") || ""
  );
  const [priceRange, setPriceRange] = useState([0, 10000]);

  // Fetch filter options
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
    if (sortPrice) params.sort = sortPrice;
    setSearchParams(params, { replace: true });
  }, [
    selectedCategory,
    selectedGender,
    selectedBrand,
    selectedMaterial,
    selectedType,
    sortPrice,
    setSearchParams,
  ]);

  // Sync selectedCategory with search params on mount or param change
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
      sortPrice,
      selectedSize,
      priceRange,
      selectedType,
    ],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/products?search=${searchTerm}&category=${selectedCategory}&gender=${selectedGender}&brand=${selectedBrand}&material=${selectedMaterial}&size=${selectedSize}&type=${selectedType}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&sort=${sortPrice}`
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
    setPriceRange([
      filterOptions.priceRange?.min || 0,
      filterOptions.priceRange?.max || 10000,
    ]);
    refetch();
  };

  const handleSortChange = (selectedOption) => {
    setSortPrice(selectedOption ? selectedOption.value : "");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="bg-base-100 my-4 md:my-12">
      <Seo title={"Products | Kashem Optical"} />
      <div className="container mx-auto my-2 space-y-4 md:space-y-0 p-2 md:flex items-center justify-between">
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
              <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                  <>
                    <Menu.Button
                      className={`btn btn-sm flex items-center gap-2 ${
                        selectedCategory && "btn-neutral"
                      }`}
                    >
                      <span className="hidden md:flex">Filter</span>
                      <Filter className="inline-flex" />
                    </Menu.Button>

                    {open && (
                      <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
                        <Menu.Items className="p-2">
                          {categoriesLoading ? (
                            <div className="px-4 py-2 text-sm text-gray-500">
                              Loading...
                            </div>
                          ) : categories.length > 0 ? (
                            categories?.map((category, index) => (
                              <Menu.Item key={index}>
                                {({ active }) => (
                                  <button
                                    onClick={() =>
                                      handleCategorySelect(category)
                                    }
                                    className={`block w-full text-left px-4 py-2 text-sm rounded-md ${
                                      selectedCategory === category?.name
                                        ? "bg-gray-200"
                                        : "hover:bg-base-300"
                                    }`}
                                  >
                                    {category?.name}
                                  </button>
                                )}
                              </Menu.Item>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-sm text-gray-500">
                              No categories found
                            </div>
                          )}
                          <div className="mt-2">
                            <button
                              onClick={handleClearFilter}
                              className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                            >
                              Clear Filter
                            </button>
                          </div>
                        </Menu.Items>
                      </div>
                    )}
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row gap-4 p-2">
        {/* Sidebar */}
        <div className="w-full lg:w-64 shrink-0 lg:block hidden">
          <aside className="w-full bg-white p-4 rounded-lg shadow-md border sticky top-20">
            <h3 className="text-lg font-semibold mb-3">Filters</h3>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Categories</h4>
              {categoriesLoading ? (
                <p>Loading...</p>
              ) : (
                categories.map((category) => (
                  <div key={category._id} className="flex items-center mb-2">
                    <Checkbox
                      id={`category-${category._id}`}
                      checked={selectedCategory === category.name}
                      onCheckedChange={() => setSelectedCategory(category.name)}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`category-${category._id}`}
                      className="text-gray-500"
                    >
                      {category.name}
                    </label>
                  </div>
                ))
              )}
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Price Range</h4>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={filterOptions.priceRange?.min || 0}
                max={filterOptions.priceRange?.max || 10000}
                step={100}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>৳{priceRange[0]}</span>
                <span>৳{priceRange[1]}</span>
              </div>
            </div>

            {/* Gender */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Gender</h4>
              {filterOptions.genders?.map((gender) => (
                <div key={gender} className="flex items-center mb-2">
                  <Checkbox
                    id={`gender-${gender}`}
                    checked={selectedGender === gender}
                    onCheckedChange={() => setSelectedGender(gender)}
                    className="mr-2"
                  />
                  <label htmlFor={`gender-${gender}`} className="text-gray-500">
                    {gender}
                  </label>
                </div>
              ))}
            </div>
            {/* Frame Type */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Frame Type</h4>
              {filterOptions.types?.map((type) => (
                <div key={type} className="flex items-center mb-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={selectedType === type}
                    onCheckedChange={() => setSelectedType(type)}
                    className="mr-2"
                  />
                  <label htmlFor={`type-${type}`} className="text-gray-500">
                    {type}
                  </label>
                </div>
              ))}
            </div>

            {/* Brands */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Brands</h4>
              {filterOptions.brands?.map((brand) => (
                <div key={brand} className="flex items-center mb-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrand === brand}
                    onCheckedChange={() => setSelectedBrand(brand)}
                    className="mr-2"
                  />
                  <label htmlFor={`brand-${brand}`} className="text-gray-500">
                    {brand}
                  </label>
                </div>
              ))}
            </div>

            {/* Material */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Material</h4>
              {filterOptions.materials?.map((material) => (
                <div key={material} className="flex items-center mb-2">
                  <Checkbox
                    id={`material-${material}`}
                    checked={selectedMaterial === material}
                    onCheckedChange={() => setSelectedMaterial(material)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`material-${material}`}
                    className="text-gray-500"
                  >
                    {material}
                  </label>
                </div>
              ))}
            </div>
            {/* Frame Size */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Frame Size</h4>
              {filterOptions.sizes?.map((size) => (
                <div key={size} className="flex items-center mb-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={selectedSize === size}
                    onCheckedChange={() => setSelectedSize(size)}
                    className="mr-2"
                  />
                  <label htmlFor={`size-${size}`} className="text-gray-500">
                    {size}
                  </label>
                </div>
              ))}
            </div>

            {(selectedCategory ||
              selectedGender ||
              selectedBrand ||
              selectedMaterial ||
              selectedSize ||
              selectedType) && (
              <button
                onClick={handleClearFilter}
                className="text-red-500 text-sm mt-2"
              >
                Clear All Filters
              </button>
            )}
          </aside>
        </div>

        {/* Main Content */}
        <div className="w-full">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">All Results</h2>
            <p className="text-gray-500">{products.length} products found</p>
          </div>
          {products.length ? (
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-4 w-full place-items-center place-content-center justify-center items-center">
              {products?.map((product) => (
                <ProductCard product={product}></ProductCard>
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

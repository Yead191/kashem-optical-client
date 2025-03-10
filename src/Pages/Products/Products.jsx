import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { BaggageClaim, Filter, Search } from 'lucide-react';
import Spinner from '../../components/Spinner/Spinner';
import useCategory from '../../hooks/useCategory';
import { Menu } from "@headlessui/react";
import 'react-dropdown/style.css';
import { useLocation, useSearchParams } from 'react-router-dom';
import Seo from '../../components/Seo/Seo';
import Select from 'react-select'
import { ArrowDownUp } from 'lucide-react';

const Products = () => {
    const axiosPublic = useAxiosPublic();
    const [categories, categoriesLoading] = useCategory();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const initialCategory = searchParams.get("category") || "";
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [sortPrice, setSortPrice] = useState("");

    const sortOptions = [
        { value: "asc", label: "Low to High" },
        { value: "desc", label: "High to Low" }
    ];

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', selectedCategory, sortPrice],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products?search=${searchTerm}&category=${selectedCategory}&sort=${sortPrice}`);
            return res.data;
        },
        select: (data) => {
            if (sortPrice === 'asc') {
                // Sort the products by price in ascending order
                return data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            } else if (sortPrice === 'desc') {
                // Sort the products by price in descending order
                return data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            }
            return data;
        }
    });

    useEffect(() => {
        setSearchParams({ category: selectedCategory, sort: sortPrice });
        refetch();
    }, [searchTerm, selectedCategory, sortPrice, setSearchParams, refetch]);

    const handleCategorySelect = (category) => {
        setSortPrice('')
        setSelectedCategory(category.name);
    };

    const handleClearFilter = () => {
        setSearchTerm("")
        setSortPrice('')
        setSelectedCategory("");
    };

    const handleSortChange = (selectedOption) => {
        setSortPrice(selectedOption ? selectedOption.value : "");
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className='bg-base-100 my-4 md:my-12 '>
            <Seo title={'Products | Kashem Optical'}></Seo>
            <div className='container mx-auto my-2 space-y-4 md:space-y-0 p-2 md:flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold'>Browse Products</h1>
                </div>
                <div className='md:flex  items-center gap-2 md:gap-4 space-y-3 md:space-y-0'>
                    <div className='relative'>
                        <input
                            className='input input-sm input-bordered w-full md:min-w-96 py-4 pl-8'
                            placeholder='Search By Name'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                                onClick={() => setSearchTerm("")}
                            >
                                ✕
                            </button>
                        )}
                        <Search className='absolute left-2 top-1/2 -translate-y-1/2 w-4' />
                    </div>

                    <div className='flex items-center justify-between'>

                        <Select
                            options={sortOptions}
                            value={sortOptions.find(option => option.value === sortPrice) || sortPrice}
                            onChange={handleSortChange}
                            placeholder={
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <ArrowDownUp size={16} />
                                  <span>Price</span>
                                </div>
                              }
                            isClearable
                            isSearchable={false}
                            className='w-48'
                        />
                        <div className='flex items-center gap-2 lg:hidden'>
                            <Menu as="div" className="relative inline-block text-left">
                                {({ open }) => (
                                    <>
                                        <Menu.Button className={`btn btn-sm flex items-center gap-2 ${selectedCategory && 'btn-neutral'}`}>
                                            <span className='hidden md:flex'>Filter</span>
                                            <Filter className="inline-flex" />
                                        </Menu.Button>

                                        {open && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
                                                <Menu.Items className="p-2">
                                                    {categoriesLoading ? (
                                                        <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
                                                    ) : categories.length > 0 ? (
                                                        categories?.map((category, index) => (
                                                            <Menu.Item key={index}>
                                                                {({ active }) => (
                                                                    <button
                                                                        onClick={() => handleCategorySelect(category)}
                                                                        className={`block w-full text-left px-4 py-2 text-sm rounded-md ${selectedCategory === category?.name ? "bg-gray-200" : "hover:bg-base-300"}`}
                                                                    >
                                                                        {category?.name}
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        ))
                                                    ) : (
                                                        <div className="px-4 py-2 text-sm text-gray-500">No categories found</div>
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
                    {/* Price Sorting */}
                </div>
            </div>
            <div className='container mx-auto flex flex-col lg:flex-row gap-4  p-2'>

                {/* Sidebar */}
                <div className="w-full lg:w-64 shrink-0 lg:block hidden">


                    <aside className='w-full  bg-white p-4 rounded-lg shadow-md border sticky top-20'>
                        <h3 className='text-lg font-semibold mb-3'>Filter by Categories</h3>
                        {categoriesLoading ? <p>Loading...</p> : categories.map(category => (
                            <div key={category._id} className='flex items-center mb-2'>
                                <input
                                    type='checkbox'
                                    checked={selectedCategory === category.name}
                                    onChange={() => handleCategorySelect(category)}
                                    className='mr-2'
                                />
                                <label>{category.name}</label>
                            </div>
                        ))}
                        {
                            selectedCategory &&
                            <button onClick={handleClearFilter} className='text-red-500 text-sm mt-2'>Clear Filter</button>

                        }
                    </aside>
                </div>

                {/* Main Content */}
                <div className='w-full '>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">All Results</h2>
                        <p className="text-gray-500">{products.length} products found</p>
                    </div>
                    {
                        products.length ?
                            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-4 w-full place-items-center place-content-center justify-center items-center'>
                                {products?.map(product => (
                                    <div key={product._id} className='rounded-xl bg-white shadow-lg hover:border hover:border-[#b21000] flex flex-col border border-base-200 w-full h-full'>
                                        <img className='mx-auto pt-8 px-2 mb-7 object-cover h-[180px] md:h-[200px] lg:h-[260px] hover:transition hover:scale-110 hover:duration-700' src={product?.image} alt='' />
                                        <div className='p-4 flex-grow'>
                                            <h4 className='text-md md:text-xl font-bold mb-2'>{product?.name}</h4>
                                            <div className='flex items-center justify-between'>
                                                <p className='text-[#b21000]'>৳ <span className='text-xl font-semibold'>{product?.price}</span></p>
                                                <p className='badge'>• {product?.category}</p>
                                            </div>
                                        </div>
                                        <div className='w-11/12 mx-auto mb-4'>
                                            {product?.status === "In Stock" ? (
                                                <button className='btn w-full btn-sm flex items-center gap-2 rounded-md hover:btn-neutral'>
                                                    <BaggageClaim width={16} />
                                                    Add to Cart
                                                </button>
                                            ) : (
                                                <button disabled className='btn w-full btn-sm flex items-center rounded-md gap-2 btn-error'>
                                                    <BaggageClaim width={16} />
                                                    Out of Stock
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            :
                            <div className='flex  flex-col justify-center items-center '>
                                <p className='text-red-500 text-2xl'>No Product Found!</p>

                                <button onClick={handleClearFilter} className='btn btn-sm btn-error text-white font-normal rounded-md text-sm mt-2'>Clear Filter</button>
                            </div>

                    }

                </div>
            </div>
        </div>
    );
};

export default Products;
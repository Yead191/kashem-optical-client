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

const Products = () => {
    const axiosPublic = useAxiosPublic();
    const [categories, categoriesLoading] = useCategory();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const initialCategory = searchParams.get("category") || "";
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);


    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', selectedCategory,],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products?search=${searchTerm}&category=${selectedCategory}`);
            return res.data;
        }
    });

    useEffect(() => {
        setSearchParams({ category: selectedCategory });
        refetch(); 
    }, [searchTerm, selectedCategory, setSearchParams, refetch]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category.name);
    };

    const handleClearFilter = () => {
        setSelectedCategory("");
    };

    // const handleSearch = () => {
    //     refetch();
    // };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className='bg-base-100'>
            <Seo  title={'Products | Kashem Optical'}></Seo>
            <div className="h-[80px] bg-base-200 relative">
                <h1 className='text-3xl lg:text-4xl font-bold text-center pt-5'>Products</h1>
            </div>

            <div className='flex justify-between items-center container mx-auto p-2 my-12'>
                <div className='hidden md:flex'></div>
                <div className="join flex justify-center items-center relative">
                    <div className="relative">
                        <input
                            className="input input-sm input-bordered min-w-64 md:min-w-96 py-5"
                            placeholder="Search By Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() => setSearchTerm("")}
                            >
                                ✕
                            </button>
                        )}
                        <Search className='absolute right-2 top-1/2 -translate-y-1/2' />
                    </div>
                    {/* <div className="indicator">
                        <button onClick={handleSearch} className="btn btn-sm join-item">
                            Search
                        </button>
                    </div> */}
                </div>

                <div className='flex items-center gap-2'>
                    <div className="relative">
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
            </div>

            <div className='container mx-auto my-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-2'>
                {products?.map(product =>
                    <div key={product._id} className="rounded-xl bg-white shadow-lg hover:border hover:border-[#b21000] flex flex-col border border-base-200 ">
                        <img className="mx-auto pt-8 px-2 mb-7 object-cover h-[180px] md:h-[200px] lg:h-[260px] hover:transition hover:scale-110 hover:duration-700" src={product?.image} alt="" />
                        <div className="p-4 flex-grow">
                            <h4 className="text-md md:text-xl font-bold mb-2">{product?.name}</h4>
                            <div className='flex items-center justify-between'>
                                <p className="text-[#b21000]">৳ <span className='text-xl font-semibold'>{product?.price}</span></p>
                                <p className='badge'>• {product?.category}</p>
                            </div>
                        </div>
                        <div className='w-11/12 mx-auto mb-4'>
                            {product?.status === "In Stock" ? (
                                <button className='btn w-full btn-sm flex items-center gap-2 rounded-md  hover:btn-neutral'>
                                    <BaggageClaim width={16} />
                                    Add to Cart
                                </button>
                            ) : (
                                <button disabled className='btn w-full btn-sm flex items-center rounded-md  gap-2 btn-error'>
                                    <BaggageClaim width={16} />
                                    Out of Stock
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;

import React, { useEffect, useState } from 'react';
import Seo from '../../../components/Seo/Seo';
import { IoMdAddCircle } from 'react-icons/io';
import AddProductModal from '../../../components/Modal/AddProductModal';
import { useQuery } from 'react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import Swal from 'sweetalert2';
import UpdateProductModal from '../../../components/Modal/UpdateProductModal';
import { Filter } from 'lucide-react';
import useCategory from '../../../hooks/useCategory';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { PencilIcon } from 'lucide-react';
import { TrashIcon } from '@heroicons/react/16/solid';


const ManageProducts = () => {
    const axiosSecure = useAxiosSecure()
    const [categories, categoriesLoading] = useCategory();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', selectedCategory,],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products?search=${searchTerm}&category=${selectedCategory}`);
            return res.data;
        }
    });

    useEffect(() => {
        refetch();
    }, [searchTerm, selectedCategory, refetch]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category.name);
    };

    const handleClearFilter = () => {
        setSelectedCategory("");
    };

    // console.log(products);
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/product/delete/${id}`)
                    .then(res => {
                        console.log(res);
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }

    const [updateItem, setUpdateItem] = useState({})

    const handleUpdateProduct = item => {
        setUpdateItem(item)
        setUpdateModalOpen(true)

    }



    return (
        <div className='my-10 p-2 container mx-auto'>
            <Seo title={'Manage Products | Kashem Optical'} />
            <div className="mb-6 text-center">
                <h2 className="text-3xl xl:text-4xl font-bold pb-3">
                    Manage <span className="text-blue-600">Products</span>
                </h2>
            </div>
            {/* Button to open modal */}

            {/*  */}


            {/*  */}





            <div className="flex justify-between items-center mb-10">
                <div className='flex flex-row-reverse gap-2 items-center '>
                    <div className="join flex justify-center items-center relative">
                        <div className="relative">
                            <input
                                className="input input-sm input-bordered min-w-64 md:min-w-96"
                                placeholder="Search By Name"
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
                                            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
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
                <button onClick={() => setIsModalOpen(true)} className="btn  btn-neutral btn-sm rounded-md font-normal flex items-center gap-2">
                    <IoMdAddCircle className="text-lg" />
                    Add New Product
                </button>
            </div>
            {/* Modal Component */}
            <AddProductModal
                refetch={refetch}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <UpdateProductModal
                updateItem={updateItem}
                refetch={refetch}
                isOpen={updateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
            />

            <div className='container mx-auto'>
                <div className="overflow-x-auto overflow-y-visible">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    ID
                                </th>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Gender</th>
                                <th>Origin</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th className='flex justify-end'>Action</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {/* row 1 */}
                            {
                                products?.map((product, index) => <tr key={product._id} className="hover">
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={product?.image ? product.image : 'https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg'}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {product?.name}
                                    </td>
                                    <td>
                                        {product?.category}
                                    </td>
                                    <td>{product?.gender}</td>
                                    <td>{product?.origin}</td>
                                    <td>{product?.price}</td>
                                    <td className={product?.status === 'In Stock' ? 'text-green-600' : 'text-red-500'}>
                                        {product?.status}

                                    </td>
                                    <th className="flex items-center justify-end h-full">
                                        <Menu as="div" className="relative inline-block text-left">
                                            <MenuButton className="btn btn-sm btn-ghost">
                                                <MdOutlineMoreHoriz size={22} />
                                            </MenuButton>
                                            <MenuItems className="absolute right-0 w-48 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-40">
                                                <div className="p-1">
                                                    <MenuItem>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => handleUpdateProduct(product)}
                                                                className={`${active ? 'bg-gray-100' : 'bg-white'
                                                                    } group flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-normal text-gray-700 `}
                                                            >
                                                                 <PencilIcon className="size-4 fill-white/30" />
                                                                Update Product
                                                            </button>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => handleDelete(product._id)}
                                                                className={`${active ? 'bg-red-100' : 'bg-white'
                                                                    } group flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-normal text-red-500`}
                                                            >
                                                                <TrashIcon className="size-4 -mt-1 fill-black/60" />
                                                                Delete Product
                                                            </button>
                                                        )}
                                                    </MenuItem>
                                                </div>
                                            </MenuItems>
                                        </Menu>
                                    </th>

                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default ManageProducts;
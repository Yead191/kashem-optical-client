import React, { useState } from 'react';
import Seo from '../../../components/Seo/Seo';
import { IoMdAddCircle } from 'react-icons/io';
import AddProductModal from '../../../components/Modal/AddProductModal';
import { useQuery } from 'react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import Swal from 'sweetalert2';
import UpdateProductModal from '../../../components/Modal/UpdateProductModal';

const ManageProducts = () => {
    const axiosSecure = useAxiosSecure()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/products')
            return res.data
        }
    })

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
            <div className="flex justify-end mb-4">
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
                                        <div className="dropdown dropdown-end">
                                            <button tabIndex={0} className="btn btn-sm btn-ghost">
                                                <MdOutlineMoreHoriz size={22} />
                                            </button>
                                            <ul tabIndex={0} className="dropdown-content rounded-md menu p-2 shadow bg-base-100 w-48 z-40">
                                                <li>
                                                    <button onClick={() => handleUpdateProduct(product)} className='font-normal'>Update Product</button>
                                                </li>
                                                <li>
                                                    <button onClick={() => handleDelete(product._id)} className="text-red-500 font-normal">Delete Product</button>
                                                </li>
                                            </ul>
                                        </div>
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
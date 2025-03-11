import React, { useState } from 'react';
import Seo from '../../../components/Seo/Seo';
import { Button } from '@headlessui/react';
import { IoMdAddCircle } from 'react-icons/io';
import AddBannerModal from '../../../components/Modal/AddBannerModal';
import { useQuery } from 'react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Menu } from "@headlessui/react";
import { ChevronDownIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Ellipsis } from 'lucide-react';
import { Minus } from 'lucide-react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ManageBanners = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const axiosSecure = useAxiosSecure()
    const { data: banners = [], refetch } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosSecure.get('/banners')
            return res.data
        }
    })
    // console.log(banners);
    const handleStatus = async (id, val) => {
        // console.log(id, val);
        await toast.promise(axiosSecure.patch(`/banner/status/${id}`, { status: val }), {
            loading: "Updating Status...",
            success: "Status Updated Successfully!",
            error: "Could not Update!"
        });
        refetch();
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
                axiosSecure.delete(`/banner/delete/${id}`)
                    .then(res => {
                        // console.log(res);
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Banner has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }



    return (
        <div className='container mx-auto my-8 md:my-12 p-2'>
            <Seo title={'Banners | Kashem Optical'}></Seo>
            <div className="mb-6 text-center">
                <h2 className="text-3xl xl:text-4xl font-bold pb-3">
                    <span className="text-blue-600">Manage</span> Banners
                </h2>
            </div>
            <div className='flex justify-end'>
                <Button onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-2 rounded-md bg-black py-1.5 px-3 text-sm/6 font-normal text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white ">
                    <IoMdAddCircle />
                    Add New Banner
                </Button>
            </div>
            <div className='my-8'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    ID
                                </th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Created At</th>
                                <th>Banner Status</th>
                                <th className='flex justify-end'>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                banners?.map((banner, idx) =>
                                    <tr key={banner._id} className='hover'>
                                        <th>
                                            {idx + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center ">
                                                <div className="avatar">
                                                    <div className=" h-14 w-32">
                                                        <img
                                                            src={banner?.image}
                                                            alt="Banner" className='w-full rounded-lg' />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {banner?.title}
                                        </td>
                                        <td>{banner?.createdAt}</td>
                                        <td className={`${banner?.status === 'added' ? "text-green-500" : ""}`}>
                                            {banner?.status}
                                        </td>
                                        <td className='flex justify-end'>
                                            <Menu as="div" className="relative inline-block text-left">
                                                <Menu.Button className="inline-flex items-center gap-2 rounded-md bg-transparent border py-1.5 px-3 text-sm font-semibold text-black shadow-inner shadow-white/10 hover:bg-base-100 focus:outline-none">
                                                    <Ellipsis />
                                                    <ChevronDownIcon className="w-4 h-4 text-black/60" />
                                                </Menu.Button>

                                                <Menu.Items className="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                                    <div className="py-1">

                                                        {/* Add/Remove Banner */}
                                                        <Menu.Item>
                                                            {
                                                                banner?.status === 'added' ?
                                                                    <button
                                                                        onClick={() => handleStatus(banner._id, "removed")}
                                                                        className={` group flex items-center w-full px-4 py-2 text-sm text-gray-900 hover:bg-gray-100`}
                                                                    >
                                                                        <Minus className="w-5 h-5 mr-2 text-gray-500" />
                                                                        Remove Banner
                                                                    </button>
                                                                    :
                                                                    <button
                                                                        onClick={() => handleStatus(banner._id, "added")}
                                                                        className="group flex items-center w-full px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                                                                    >
                                                                        <IoMdAddCircle className="w-5 h-5 mr-2 text-gray-500" />
                                                                        Add Banner
                                                                    </button>
                                                            }
                                                        </Menu.Item>

                                                        {/* Update Banner */}
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    className={`${active ? "bg-gray-100" : ""
                                                                        } group flex items-center w-full px-4 py-2 text-sm text-gray-900`}
                                                                >
                                                                    <PencilIcon className="w-5 h-5 mr-2 text-gray-500" />
                                                                    Update Banner
                                                                </button>
                                                            )}
                                                        </Menu.Item>


                                                        {/* Delete Banner */}
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    onClick={() => handleDelete(banner._id)}
                                                                    className={`${active ? "bg-red-100 text-red-700" : "text-red-600"
                                                                        } group flex items-center w-full px-4 py-2 text-sm`}
                                                                >
                                                                    <TrashIcon className="w-5 h-5 mr-2" />
                                                                    Delete Banner
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </div>
                                                </Menu.Items>
                                            </Menu>

                                        </td>
                                    </tr>
                                )
                            }


                        </tbody>

                    </table>
                </div>

            </div>
            {/* Modal Component */}
            <AddBannerModal
                refetch={refetch}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default ManageBanners;
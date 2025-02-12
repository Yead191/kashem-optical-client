import React, { useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import Seo from '../../../components/Seo/Seo';
import { Helmet } from 'react-helmet-async';
import { uploadToImgbb } from '../../../components/UploadImage';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCategory from '../../../hooks/useCategory';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import UpdateCategory from '../../../components/Modal/UpdateCategory';

const ManageCategory = () => {
    const axiosSecure = useAxiosSecure()
    const [open, setOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [imageLoading, setImageLoading] = useState(false)
    const [updateId, setUpdateId] = useState(null)

    const [categories, categoriesLoading, refetch] = useCategory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newCategory = {
            name: formData.get("categoryName"),
            image: file, // Image file from state
            description: formData.get("description")
        }
        await toast.promise(axiosSecure.post("/categories", newCategory), {
            loading: "Adding category...",
            success: <b>Added Successfully!</b>,
            error: <b>Could not add.</b>,
        });
        refetch()
        // Handle form submission logic here
        setOpen(false); // Close modal after submission
    };

    const handleUpload = async (e) => {
        setImageLoading(true)
        const { url } = await toast.promise(uploadToImgbb(e), {
            loading: "Image Uploading...",
            success: <b>Image uploaded Successful!</b>,
            error: <b>Could not upload.</b>,
        });
        setFile(url);
        setImageLoading(false)
    }



    const handleCategoryUpdate = id => {
        setUpdateOpen(true)
        setUpdateId(id)
    }


    return (
        <div className='my-10 container mx-auto p-2'>
            <Helmet> <title>Category | Kashem Optical</title> </Helmet>
            <div className="mb-6 text-center">
                <h2 className="text-3xl xl:text-4xl font-bold pb-3">
                    <span className="text-blue-600">Manage</span> Category
                </h2>
            </div>
            {/* Button to open modal */}
            <div className="flex justify-end mb-4">
                <button onClick={() => setOpen(true)} className="btn  btn-neutral btn-sm rounded-md flex items-center gap-2">
                    <IoMdAddCircle className="text-lg" />
                    Add New Category
                </button>
            </div>

            {/* Modal */}
            {open && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="text-lg font-bold">Add New Category</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Enter details to create a new category. You can always edit or delete it later.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <label className="form-control w-full">
                                <span className="label-text">Category Name</span>
                                <input type="text" name="categoryName" required placeholder="Enter category name" className="input input-sm input-bordered w-full" />
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text">Upload Image</span>
                                <input
                                    type="file"
                                    id="image"
                                    className="file-input file-input-sm file-input-bordered w-full"
                                    accept="image/*"
                                    onChange={handleUpload}
                                />
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text">Description</span>
                                <textarea name="description" placeholder="Enter short description related to category" className="textarea textarea-bordered w-full" />
                            </label>

                            {/* Modal Actions */}
                            <div className="modal-action">
                                <button type="button" onClick={() => setOpen(false)} className="btn btn-sm">
                                    Close
                                </button>
                                <button disabled={imageLoading} type="submit" className="btn btn-neutral rounded-md text-white font-semibold btn-sm">
                                    {
                                        imageLoading ? "Please Wait..." : "Add Category"
                                    }

                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}

            <div className="overflow-x-auto overflow-y-visible">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>Image</th>
                            <th>Category Name</th>
                            <th className='flex justify-end'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            categories?.map((category, index) => <tr key={category._id} className="hover ">
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={category?.image ? category.image : 'https://tinasbotanicals.com/wp-content/uploads/2025/01/No-Product-Image-Available.png'}
                                                    alt="No img" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {category?.name}
                                </td>
                                <th className="flex items-center justify-end h-full">
                                    <div className="dropdown dropdown-end">
                                        <button tabIndex={0} className="btn btn-sm btn-ghost">
                                            <MdOutlineMoreHoriz size={22} />
                                        </button>
                                        <ul tabIndex={0} className="dropdown-content rounded-md menu p-2 shadow bg-base-100 w-48 z-40">
                                            <li>
                                                <button onClick={() => handleCategoryUpdate(category._id)}>Update Category</button>
                                            </li>
                                            <li>
                                                <button className="text-red-500">Delete Category</button>
                                            </li>
                                        </ul>
                                    </div>
                                </th>

                            </tr>)
                        }
                        {
                            updateOpen && <UpdateCategory updateId={updateId} updateOpen={updateOpen} setUpdateOpen={setUpdateOpen}></UpdateCategory>
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCategory;
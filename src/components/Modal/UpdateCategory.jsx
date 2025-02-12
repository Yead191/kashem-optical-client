import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCategory from '../../hooks/useCategory';
import { useQuery } from 'react-query';
import Spinner from '../Spinner/Spinner';
import { uploadToImgbb } from '../UploadImage';

const UpdateCategory = ({ updateOpen, setUpdateOpen, updateId }) => {

    const axiosSecure = useAxiosSecure()
    const [, , refetch] = useCategory()
    const [imageLoading, setImageLoading] = useState(false)
    const [category, setCategory] = useState({})
    const [loading, setLoading] = useState(false)


    // Fetch category data only when updateId changes
    useEffect(() => {
        if (updateId) {
            setLoading(true)
            axiosSecure.get(`/category/${updateId}`)
                .then(res => {
                    setCategory(res.data);
                    setLoading(false)

                })
                .catch(err => {
                    console.error("Error fetching category:", err);
                });
        }
    }, [updateId, axiosSecure]);

    const [file, setFile] = useState(category.image);



    // console.log(category, updateId);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newCategory = {
            name: formData.get("categoryName"),
            image: file ? file : category.image, // Image file from state
            description: formData.get("description")
        }
        // console.log(newCategory);
        await toast.promise(axiosSecure.patch(`/category/update/${updateId}`, newCategory), {
            loading: "Updating Category...",
            success: <b>Updated Successfully!</b>,
            error: <b>Could not Update.</b>,
        });
        refetch()
        // Handle form submission logic here
        setUpdateOpen(false); // Close modal after submission
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



    if (loading) {
        return <Spinner></Spinner>
    }
    return (
        <div>
            {updateOpen && (
                <dialog open className="modal">
                    <div className="modal-box">
                        <h3 className="text-lg md:text-2xl font-bold">Update Category</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Enter details to update category. You can always edit or delete it later.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-3">
                            <label className="form-control w-full">
                                <span className="label-text">Category Name</span>
                                <input defaultValue={category?.name} type="text" name="categoryName" required placeholder="Enter category name" className="input input-sm input-bordered w-full" />
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
                                {category?.image && (
                                    <div className="mb-2">
                                        <p className="text-sm">Current Image:</p>
                                        <img src={category.image} alt="Category" className="w-20 h-20 object-cover rounded-md" />
                                    </div>
                                )}
                            </label>

                            <label className="form-control w-full">
                                <span className="label-text">Description</span>
                                <textarea defaultValue={category?.description} name="description" placeholder="Enter short description related to category" className="textarea textarea-bordered w-full" />
                            </label>

                            {/* Modal Actions */}
                            <div className="modal-action">
                                <button type="button" onClick={() => setUpdateOpen(false)} className="btn btn-sm">
                                    Close
                                </button>
                                <button disabled={imageLoading} type="submit" className="btn btn-neutral rounded-md text-white font-semibold btn-sm">
                                    {
                                        imageLoading ? "Please Wait..." : "Update Category"
                                    }

                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default UpdateCategory;
import React, { useState } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import useCategory from "../../hooks/useCategory";
import toast from "react-hot-toast";
import { uploadToImgbb } from "../UploadImage";
import useAxiosSecure from "../../hooks/useAxiosSecure";

Modal.setAppElement("#root"); // Ensure accessibility

const AddProductModal = ({ isOpen, onClose, refetch }) => {

    const [categories, categoriesLoading,] = useCategory()
    const [imageLoading, setImageLoading] = useState(false)
    const [file, setFile] = useState(null);
    const axiosSecure = useAxiosSecure()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData.entries());
        // console.log(formValues);
        const newProduct = {
            ...formValues, image: file, status: "In Stock"
        }
        console.log(newProduct);
        await toast.promise(axiosSecure.post('/products', newProduct), {
            loading: "Adding Product...",
            success: <b>Product Added Successfully!</b>,
            error: <b>Could not add.</b>,
        })
        refetch()

        onClose()
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



    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Add New Product"
            className="bg-white w-full max-w-2xl p-6 mx-auto mt-20 rounded-lg shadow-lg"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Add New Product</h2>
                <button onClick={onClose} className="text-gray-500 text-2xl">
                    <IoMdClose />
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Product Name</label>
                    <input name="name" type="text" className="input input-sm input-bordered w-full" placeholder="Enter Product Name" required />
                </div>

                <div>
                    <label className="block text-sm font-medium">Category</label>
                    <select name="category" defaultValue={'Select Category'}
                        className="select select-bordered select-sm w-full"
                        required >
                        <option disabled>Select Category</option>
                        {
                            categories?.map(category =>
                                <option key={category._id} value={category.name}>{category.name}</option>
                            )
                        }
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Gender</label>
                    <select name="gender"
                        className="select select-bordered select-sm w-full"
                        defaultValue={`Select Gender`}
                        required >
                        <option disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Origin</label>
                    <input name="origin" type="text" className="input input-sm input-bordered w-full" placeholder="Country of origin" required />
                </div>

                <div>
                    <label className="block text-sm font-medium">Case Metal</label>
                    <input name="caseMetal" type="text" className="input input-sm input-bordered w-full" placeholder="ex. Stainless Steel" required />
                </div>

                <div>
                    <label className="block text-sm font-medium">Case Size (mm)</label>
                    <input name="caseSize" type="text" className="input input-sm input-bordered w-full" placeholder="ex. 41.5 mm" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Bracelet Material</label>
                    <input name="braceletMaterial" type="text" className="input input-sm input-bordered w-full" placeholder="ex. Leather" required />
                </div>

                <div>
                    <label className="block text-sm font-medium">Glass Type</label>
                    <input name="glassType" type="text" className="input input-sm input-bordered w-full" placeholder="ex. Sapphire" required />
                </div>

                <div>
                    <label className="block text-sm font-medium">Color</label>
                    <input name="color" type="text" className="input input-sm input-bordered w-full" placeholder="ex. Blue" required />
                </div>

                {/* <div>
                    <label className="block text-sm font-medium">Band</label>
                    <input name="band" type="text" className="input input-sm input-bordered w-full" placeholder="ex. Solid" />
                </div> */}
                <div>
                    <label className="block text-sm font-medium">WR (Water Resistance)</label>
                    <input name="wr" type="text" className="input input-sm input-bordered w-full" placeholder="ex. 5 ATM" />
                </div>
                <div>
                    <span className="label-text">Upload Image</span>
                    <input
                        type="file"
                        id="image"
                        className="file-input file-input-sm file-input-bordered w-full"
                        accept="image/*"
                        onChange={handleUpload}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Price</label>
                    <input name="price" type="number" className="input input-sm input-bordered w-full" placeholder="ex. 9000" />
                </div>
                <div className="col-span-2">
                    <label className="form-control w-full ">
                        <span className="label-text">Description</span>
                        <textarea name="description" placeholder="Enter short description related to product" className="textarea textarea-bordered w-full" />
                    </label>
                </div>

                <div className="col-span-2">
                    <button disabled={imageLoading} type="submit" className="btn btn-neutral w-full">
                        {
                            imageLoading ? "Please Wait..." : "Add Product"
                        }

                    </button>
                </div>
            </form>
        </Modal >
    );
};

export default AddProductModal;

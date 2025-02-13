import React, { useState } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import useCategory from "../../hooks/useCategory";
import toast from "react-hot-toast";
import { uploadToImgbb } from "../UploadImage";
import useAxiosSecure from "../../hooks/useAxiosSecure";

Modal.setAppElement("#root"); // Ensure accessibility

const UpdateProductModal = ({ isOpen, onClose, refetch, updateItem }) => {
    // console.log(updateItem);

    const [categories, categoriesLoading,] = useCategory()
    const [imageLoading, setImageLoading] = useState(false)
    const [file, setFile] = useState(null);
    const axiosSecure = useAxiosSecure()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData.entries());
        // console.log(formValues);
        const updateProduct = {
            ...formValues, image: file ? file : updateItem.image,
        }
        console.log(Object.keys(updateProduct));
        await toast.promise(axiosSecure.patch(`/product/update/${updateItem._id}`, updateProduct), {
            loading: "Updating Product...",
            success: <b>Product Updated Successfully!</b>,
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
            className="bg-white w-full max-w-2xl p-6 mx-auto mt-20 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Update Product</h2>
                <button onClick={onClose} className="text-gray-500 text-2xl">
                    <IoMdClose />
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Product Name</label>
                    <input defaultValue={updateItem?.name} name="name" type="text" className="input input-sm input-bordered w-full" placeholder="Enter Product Name" required />
                </div>

                <div>
                    <label className="block text-sm font-medium">Category</label>
                    <select name="category" defaultValue={updateItem?.category}
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
                        defaultValue={updateItem?.gender}
                        required >
                        <option disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Origin</label>
                    <input defaultValue={updateItem?.origin} name="origin" type="text" className="input input-sm input-bordered w-full" placeholder="Country of origin" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Warranty</label>
                    <input defaultValue={updateItem?.warranty} name="warranty" type="text" className="input input-sm input-bordered w-full" placeholder="ex. 1 Year" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Color</label>
                    <input defaultValue={updateItem?.color} name="color" type="text" className="input input-sm input-bordered w-full" placeholder="ex. Blue" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Price</label>
                    <input defaultValue={updateItem?.price} name="price" type="number" className="input input-sm input-bordered w-full" placeholder="ex. 9000" required />
                </div>




                {/* Lens Section Divider */}
                <div className="flex items-center gap-2 col-span-2">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="text-gray-500 text-sm">LENS SECTION</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>

                <div>
                    <label className="block text-sm font-medium">Frame Type</label>
                    <input defaultValue={updateItem?.frameType} name="frameType" type="text" className="input input-sm input-bordered w-full" placeholder="ex. Full Rim" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Frame Material</label>
                    <input defaultValue={updateItem?.frameMaterial} name="frameMaterial" type="text" className="input input-sm input-bordered w-full" placeholder="ex. Stainless Steel" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Frame Size</label>
                    <input defaultValue={updateItem?.frameSize} name="frameSize" type="text" className="input input-sm input-bordered w-full" placeholder="ex. medium" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Prescription Type</label>
                    <input defaultValue={updateItem?.prescription} name="prescription" type="text" className="input input-sm input-bordered w-full" placeholder="ex. Bifocal / Progressive" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Lens Material</label>
                    <input defaultValue={updateItem?.lensMaterial} name="lensMaterial" type="text" className="input input-sm input-bordered w-full" placeholder="ex. PC" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Frame Dimensions</label>
                    <input defaultValue={updateItem?.dimensions} name="dimensions" type="text" className="input input-sm input-bordered w-full" placeholder="ex. 56-17-145" />
                </div>

                {/* Watch Section Divider */}
                <div className="flex items-center gap-2 col-span-2">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="text-gray-500 text-sm">WATCH SECTION</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                </div>


                <div>
                    <label className="block text-sm font-medium">Case Metal</label>
                    <input defaultValue={updateItem?.caseMetal} name="caseMetal" type="text" className="input input-sm input-bordered w-full" placeholder="ex. Stainless Steel" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Case Size (mm)</label>
                    <input defaultValue={updateItem?.caseSize} name="caseSize" type="text" className="input input-sm input-bordered w-full" placeholder="ex. 41.5 mm" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Bracelet Material</label>
                    <input defaultValue={updateItem?.braceletMaterial} name="braceletMaterial" type="text" className="input input-sm input-bordered w-full" placeholder="ex. Leather" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Glass Type</label>
                    <input defaultValue={updateItem?.glassType} name="glassType" type="text" className="input input-sm input-bordered w-full" placeholder="ex. Sapphire" />
                </div>



                <div>
                    <label className="block text-sm font-medium">WR (Water Resistance)</label>
                    <input defaultValue={updateItem?.wr} name="wr" type="text" className="input input-sm input-bordered w-full" placeholder="ex. 5 ATM" />
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
                    <label className="block text-sm font-medium">Status</label>
                    <select name="status"
                        className="select select-bordered select-sm w-full"
                        defaultValue={updateItem?.status}
                    >
                        <option disabled>Select Status</option>
                        <option value="In Stock">In Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="form-control w-full ">
                        <span className="label-text">Description</span>
                        <textarea defaultValue={updateItem?.description} name="description" placeholder="Enter short description related to product" className="textarea textarea-bordered w-full" />
                    </label>
                </div>

                <div className="col-span-2">
                    <button disabled={imageLoading} type="submit" className="btn btn-neutral w-full">
                        {
                            imageLoading ? "Please Wait..." : "Update Product"
                        }

                    </button>
                </div>
            </form>
        </Modal >
    );
};

export default UpdateProductModal;

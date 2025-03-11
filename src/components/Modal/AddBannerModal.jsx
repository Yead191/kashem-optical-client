import React, { useState } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { uploadToImgbb } from "../UploadImage";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

Modal.setAppElement("#root"); // Ensure accessibility

const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateX: -90 },
    visible: { opacity: 1, scale: 1, rotateX: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.8, rotateX: 90, transition: { duration: 0.4, ease: "easeIn" } }
};

const AddBannerModal = ({ isOpen, onClose, refetch }) => {
    const [imageLoading, setImageLoading] = useState(false);
    const [file, setFile] = useState(null);
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData.entries());
        const newBanner = {
            ...formValues,
            image: file,
            status: "Pending",
            createdAt: new Date().toISOString().split('T')[0] 
        };
        console.log(newBanner);
        await toast.promise(axiosSecure.post('/banners', newBanner),{
            loading: "Banner Uploading...",
            success: <b>Banner Uploaded Successfully!</b>,
            error: <b>Unable to Upload. Try Again!</b>
        })
        refetch();
        e.target.reset()
        setFile(null)
        onClose();
    };


    const handleUpload = async (e) => {
        setImageLoading(true);
        const { url } = await toast.promise(uploadToImgbb(e), {
            loading: "Image Uploading...",
            success: <b>Image uploaded Successfully!</b>,
            error: <b>Could not upload.</b>,
        });
        setFile(url);
        setImageLoading(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Add New Product"
            className="fixed inset-0 flex items-center justify-center"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white w-full max-w-2xl p-6 mx-auto rounded-lg shadow-lg max-h-[80vh] overflow-y-auto"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Add New Banner</h2>
                    <button onClick={onClose} className="text-gray-500 text-2xl">
                        <IoMdClose />
                    </button>
                </div>
                <div className="w-8/12 mx-auto">
                    {
                        file &&
                        <img className="h-[150px] w-full rounded-lg mb-6 object-cover" src={file} alt="" />
                    }
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-scroll">
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-sm font-medium">Banner Title</label>
                        <input name="title" type="text" className="input input-sm input-bordered w-full" placeholder="Enter Banner Title" required />
                    </div>

                    <div className="">
                        <span className="label-text">Upload Image</span>
                        <input
                            type="file"
                            id="image"
                            className="file-input file-input-sm file-input-bordered w-full"
                            accept="image/*"
                            onChange={handleUpload}
                        />
                    </div>

                    <div className="col-span-2 mt-5">
                        <button disabled={imageLoading} type="submit" className="btn btn-neutral w-full">
                            {imageLoading ? "Please Wait..." : "Add Banner"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </Modal>
    );
};

export default AddBannerModal;

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { uploadToImgbb } from "../UploadImage";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import useCategory from "@/hooks/useCategory";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateX: -90 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    rotateX: 90,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

const AddBannerModal = ({ isOpen, onClose, refetch }) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [file, setFile] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [categories, categoriesLoading] = useCategory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    const newBanner = {
      ...formValues,
      image: file,
      status: "added",
      createdAt: new Date().toISOString().split("T")[0],
    };
    // console.log(newBanner);
    await toast.promise(axiosSecure.post("/banners", newBanner), {
      loading: "Banner Uploading...",
      success: <b>Banner Uploaded Successfully!</b>,
      error: <b>Unable to Upload. Try Again!</b>,
    });
    refetch();
    e.target.reset();
    setFile(null);
    onClose();
  };

  const handleUpload = async (e) => {
    setImageLoading(true);
    const { url } = await toast.promise(uploadToImgbb(e), {
      loading: "Image Uploading...",
      success: <b>Image Uploaded Successfully!</b>,
      error: <b>Could not upload.</b>,
    });
    setFile(url);
    setImageLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-6 bg-white rounded-lg shadow-lg">
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-2xl font-bold text-blue-700">
                Add New Banner
              </DialogTitle>
              {/* <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-500 hover:text-blue-600"
              >
                <IoMdClose size={24} />
              </Button> */}
            </div>
          </DialogHeader>
          <div className="mt-4">
            {file && (
              <img
                className="h-[150px] w-full rounded-lg mb-6 object-cover shadow-md"
                src={file}
                alt="Banner Preview"
              />
            )}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Banner Title
              </label>
              <Input
                name="title"
                type="text"
                placeholder="Enter Product Name (e.g., Ray-Ban Aviator)"
                className="w-full border-blue-200 focus:border-blue-600 focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <Select name="category" required>
                <SelectTrigger className="w-full border-blue-200 focus:border-blue-600 focus:ring focus:ring-blue-200">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category._id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <Input
                name="price"
                type="text"
                placeholder="Enter Price (e.g., ৳1200)"
                className="w-full border-blue-200 focus:border-blue-600 focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image
              </label>
              <Input
                type="file"
                id="image"
                className="w-full border-blue-200 focus:border-blue-600"
                accept="image/*"
                onChange={handleUpload}
                required
              />
            </div>

            <div className="col-span-2 mt-5">
              <Button
                disabled={imageLoading}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-teal-600 hover:to-blue-600"
              >
                {imageLoading ? "Please Wait..." : "Add Banner"}
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBannerModal;

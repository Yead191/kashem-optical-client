import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { uploadToImgbb } from "../UploadImage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaFileUpload } from "react-icons/fa";
import Spinner from "../Spinner/Spinner";

const UpdateCategoryModal = ({
  updateOpen,
  setUpdateOpen,
  updateId,
  refetch,
}) => {
  const axiosSecure = useAxiosSecure();
  const [imageLoading, setImageLoading] = useState(false);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null); // Store the uploaded image URL

  // Fetch category data only when updateId changes
  useEffect(() => {
    if (updateId && updateOpen) {
      setLoading(true);
      axiosSecure
        .get(`/category/${updateId}`)
        .then((res) => {
          setCategory(res.data);
          setFile(res.data.image); // Set initial image from fetched data
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching category:", err);
          setLoading(false);
        });
    }
  }, [updateId, axiosSecure, updateOpen]);

  // Handle file upload
  const handleUpload = async (e) => {
    setImageLoading(true);
    const { url } = await toast.promise(uploadToImgbb(e), {
      loading: "Image Uploading...",
      success: <b>Image uploaded Successful!</b>,
      error: <b>Could not upload.</b>,
    });
    setFile(url);
    setImageLoading(false);
  };

  // Trigger file input click
  const handleUploadImage = () => {
    document.getElementById("image_input").click();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCategory = {
      name: formData.get("categoryName"),
      image: file || category.image, // Use new file if uploaded, otherwise keep existing
      description: formData.get("description"),
    };

    await toast.promise(
      axiosSecure.patch(`/category/update/${updateId}`, newCategory),
      {
        loading: "Updating Category...",
        success: <b>Updated Successfully!</b>,
        error: <b>Could not Update.</b>,
      }
    );
    refetch();
    setUpdateOpen(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription>
            Enter details to update category. You can always edit or delete it
            later.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Name */}
          <div className="space-y-2">
            <Label htmlFor="categoryName">Category Name</Label>
            <Input
              id="categoryName"
              type="text"
              name="categoryName"
              defaultValue={category?.name}
              placeholder="Enter category name"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Upload Image</Label>
            <div className="w-full">
              <input
                type="file"
                name="image"
                id="image_input"
                className="hidden"
                accept="image/*"
                onChange={handleUpload}
              />
              {!file ? (
                <div
                  className="w-full flex items-center justify-center flex-col gap-4 border-gray-300 border rounded-md py-4 cursor-pointer"
                  onClick={handleUploadImage}
                >
                  <FaFileUpload className="text-[2rem] text-[#777777]" />
                  <p className="text-gray-700">
                    Browse to Upload Category Image
                  </p>
                </div>
              ) : (
                <div className="w-full">
                  <p className="text-sm mb-2">Current Image:</p>
                  <img
                    src={file}
                    alt="Category"
                    className="w-20 h-20 object-cover rounded-md mx-auto"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={category?.description}
              placeholder="Enter short description related to category"
            />
          </div>

          {/* Modal Actions */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setUpdateOpen(false)}
            >
              Close
            </Button>
            <Button type="submit" disabled={imageLoading}>
              {imageLoading ? "Please Wait..." : "Update Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategoryModal;

import { useState } from "react";
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
import toast from "react-hot-toast";
import { uploadToImgbb } from "../UploadImage"; // Assuming this is in the same directory structure

const AddCategoryModal = ({ open, setOpen, onSubmit }) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [file, setFile] = useState(null); // Store the uploaded image URL

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
      image: file, // Use uploaded URL or null if no new upload
      description: formData.get("description"),
    };

    try {
      await onSubmit(newCategory); // Pass plain object as per original functionality
      setFile(null);
      setOpen(false);
    } catch (error) {
      console.error("Error submitting category:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Enter details to create a new category. You can always edit or
            delete it later.
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
                  <img
                    src={file}
                    alt="Uploaded"
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
              placeholder="Enter short description related to category"
            />
          </div>

          {/* Modal Actions */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
            <Button type="submit" disabled={imageLoading}>
              {imageLoading ? "Please Wait..." : "Add Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;

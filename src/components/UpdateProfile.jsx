import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { uploadToImgbb } from "./UploadImage";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

const UpdateProfile = ({ isModalOpen, setIsModalOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile } = useAuth();

  const { data: loggedUser, refetch } = useQuery({
    queryKey: ["loggedUser", user?.email],
    enabled: !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (isModalOpen) {
      refetch();
    }
  }, [isModalOpen, refetch]);

  useEffect(() => {
    if (loggedUser) {
      setName(loggedUser.name);
      setMobile(loggedUser.mobile);
      setImage(loggedUser.image);
    }
  }, [loggedUser]);

  const [name, setName] = useState(loggedUser?.name);
  const [mobile, setMobile] = useState(loggedUser?.mobile);
  const [image, setImage] = useState(loggedUser?.image);
  const [imageLoading, setImageLoading] = useState(false);

  const handleUpload = async (e) => {
    setImageLoading(true);
    const { url } = await toast.promise(uploadToImgbb(e), {
      loading: "Image Uploading...",
      success: <b>Image uploaded Successfully!</b>,
      error: <b>Could not upload.</b>,
    });
    setImage(url);
    setImageLoading(false);
  };

  const handleSave = async () => {
    const updateInfo = {
      name,
      mobile,
      image,
      email: user.email,
    };

    await toast.promise(
      updateUserProfile(name, image ? image : user.photoURL),
      {
        loading: "Updating Profile...",
        success: <b>Updated Successfully!</b>,
        error: <b>Could not update.</b>,
      }
    );

    await axiosSecure.put(`/users/profile/${loggedUser._id}`, updateInfo);
    refetch();
    navigate(location.pathname);
    setIsModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {image ? (
            <div className="flex items-center justify-center">
              <Avatar className="h-24 w-24 rounded-sm">
                <AvatarImage
                  src={image || "/placeholder.svg"}
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback>
                  {name?.charAt(0) || user?.email?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={user?.photoURL || "/placeholder.svg"}
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback>
                  {name?.charAt(0) || user?.email?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Profile Image</Label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
              onClick={() => document.getElementById("image-upload").click()}
            >
              <div className="mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>
              <span className="text-sm text-gray-500">Upload Image</span>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
            </div>
            {imageLoading && (
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading image...
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="sm:justify-end">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button disabled={imageLoading} onClick={handleSave} className="ml-2">
            {imageLoading ? "Please Wait..." : "Update Profile"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;

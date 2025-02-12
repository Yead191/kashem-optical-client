import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { uploadToImgbb } from './UploadImage';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateProfile = ({ isModalOpen, setIsModalOpen }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { user, updateUserProfile, } = useAuth()
    // const [loggedUser, setLoggedUser] = useState({})
    // console.log(location);

    const { data: loggedUser, refetch } = useQuery({
        queryKey: ['loggedUser', user],
        enabled: false,
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

    // console.log(loggedUser);


    const [name, setName] = useState(loggedUser?.name);
    const [mobile, setMobile] = useState(loggedUser?.mobile);
    const [image, setImage] = useState(loggedUser?.image);

    const [imageLoading, setImageLoading] = useState(false)

    const handleUpload = async (e) => {
        setImageLoading(true)
        const { url } = await toast.promise(uploadToImgbb(e), {
            loading: "Image Uploading...",
            success: <b>Image uploaded Successful!</b>,
            error: <b>Could not upload.</b>,
        });
        setImage(url);
        setImageLoading(false)
    }

    const handleSave = async () => {
        // handleProfileUpdate({ name, mobile, image });
        const updateInfo = {
            name, mobile, image, email: user.email
        }
        setIsModalOpen(false);
        await toast.promise(
            updateUserProfile(name, image ? image : user.photoURL),
            {
                loading: "Updating Profile...",
                success: <b>Updated Successful!</b>,
                error: <b>Could not update.</b>,
            }
        );
        await axiosSecure.put(`/users/profile/${loggedUser._id}`, updateInfo)
        navigate(location.pathname)
        setIsOpen(false);
        refetch()
    };

    return (
        <div>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center text-black bg-opacity-50">
                    <div className="modal modal-open">
                        <div className="modal-box">
                            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

                            {/* Name Input */}
                            <div className="mb-4">
                                <label htmlFor="name" className="block mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="input input-sm input-bordered w-full"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                />
                            </div>

                            {/* Mobile Number Input */}
                            <div className="mb-4">
                                <label htmlFor="mobile" className="block mb-1">
                                    Mobile Number
                                </label>
                                <input
                                    type="text"
                                    id="mobile"
                                    className="input input-sm input-bordered w-full"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    placeholder="Enter your mobile number"
                                />
                            </div>

                            {/* Image Upload */}
                            <div className="mb-4">
                                <label htmlFor="image" className="block mb-1">
                                    Profile Image
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    className="file-input file-input-sm file-input-bordered w-full"
                                    accept="image/*"
                                    onChange={handleUpload}
                                />
                                {user?.photoURL && (
                                    <div className="mt-2">
                                        <img src={user.photoURL} className="w-16 h-16 rounded-full" alt="Profile Image" />
                                    </div>
                                )}
                            </div>

                            <div className="modal-action">
                                <button onClick={() => setIsModalOpen(false)} className="btn btn-sm rounded-md px-5">
                                    Cancel
                                </button>
                                <button disabled={imageLoading} onClick={handleSave} className="btn btn-sm btn-neutral rounded-md px-7">
                                    {
                                        imageLoading? 'Please Wait...' : "Update Profile"
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateProfile;
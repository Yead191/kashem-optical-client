import React, { useContext, useEffect, useState } from 'react';
import { motion } from "motion/react"
import { Link, useLocation, useNavigate, } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import Lottie from 'lottie-react';
import regAnimation from '../../assets/register.json'
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useForm } from "react-hook-form";
import { IoWarningOutline } from 'react-icons/io5';
import useAuth from '../../hooks/useAuth';
import Seo from '../Seo/Seo';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SocialLogin from '../SocialLogin/SocialLogin';





const Register = () => {

    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosPublic()

    const { creteUser, updateUserProfile } = useAuth()


    const [showPass, setShowPass] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state || '/'

    const onSubmit = async (values) => {
        // console.log(values)
        await toast.promise(creteUser(values.email, values.password), {
            loading: "Creating account...",
            success: <b>Signed up successfully!</b>,
            error: <b>Could not signup.</b>,
        });
        await updateUserProfile(values.name, values?.photo);
        const userInfo = {
            name: values.name,
            email: values.email,
            role: "User",
            createdAt: new Date().toISOString().split('T')[0]
        }
        console.log(userInfo);
        await axiosSecure.post('/users', userInfo)
        navigate('/')
        reset()
    };


    return (
        <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="flex items-center justify-center min-h-screen bg-base-100">
            <Seo title={'Register | Kashem Optical'}></Seo>
            <div className="flex flex-col lg:flex-row shadow-lg rounded-lg bg-white max-w-4xl w-full">
                {/* Left Section */}
                <div className="bg-neutral  text-white p-8 lg:w-1/2 flex flex-col justify-center items-center rounded-l-lg md:rounded-tr-[100px] md:rounded-br-[100px]">
                    <Lottie className='h-48' animationData={regAnimation}></Lottie>
                    <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                    <p className="mb-6 text-center">
                        Enter your personal details to use all of the site's features.
                    </p>
                    <Link to='/login' className="bg-white text-purple-700 hover:bg-gray-200 px-6 py-2 rounded-xl font-medium transition">
                        SIGN IN
                    </Link>
                </div>

                {/* Right Section */}
                <div className="p-8 lg:w-1/2 flex flex-col justify-center items-center">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Create Account</h2>
                    <SocialLogin></SocialLogin>

                    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                        <input

                            {...register("name", {
                                required: "Required",
                            })}
                            name='name'
                            type="text"
                            placeholder="Name"
                            className="block w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        {errors.name &&
                            <p className='text-red-500 mb-1 inline-flex items-center gap-1 text-sm'> <IoWarningOutline /> Name is Required</p>
                        }
                        <input
                            {...register("email", {
                                required: "Required",
                            })}
                            name='email'
                            type="email"
                            placeholder="Email"
                            className="block w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        {errors.email &&
                            <p className='text-red-500 mb-1 inline-flex items-center gap-1 text-sm'> <IoWarningOutline /> Invalid Email</p>
                        }
                        <div className="relative w-full mb-4">
                            <input
                                {...register("password", {
                                    required: "Required",
                                    minLength: 6,
                                })}
                                type={showPass ? 'text' : 'password'}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                                placeholder="Password"
                                name="password"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                {showPass ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.password &&
                            <p className='text-red-500 mb-1 inline-flex items-center gap-1 text-sm'> <IoWarningOutline />  Password is Required</p>
                        }
                        {errors.password?.type === 'minLength' &&
                            <p className='text-red-500 mb-1 inline-flex items-center gap-1'> <IoWarningOutline /> Password Must be more than 6 Character </p>
                        }
                        <div className='flex justify-center items-center'>

                            <button className="bg-neutral  text-white  px-6 py-2 rounded-md font-medium transition hover:scale-110">
                                SIGN UP
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </motion.div>
    );
};

export default Register;
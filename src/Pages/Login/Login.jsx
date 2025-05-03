import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Lottie from "lottie-react";
import loginLottie from "../../assets/login.json";
// import SocialLogin from '../components/SocialLogin';
import axios from "axios";

import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
// import SocialLogin from '../components/SocialLogin';
import { motion } from "framer-motion";
import Seo from "@/components/Seo/Seo";

const Login = () => {
  const { loginUser } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();
  // console.log(location, 'location');

  const navigate = useNavigate();
  const from = location.state || "/";
  // console.log('login', location.state);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
      await toast.promise(loginUser(email, password), {
        loading: "Signing in...",
        success: <b>Login Successful!</b>,
        error: (err) => err.message,
      });
      navigate(from);
      form.reset();
    } catch (err) {
      toast.error(err.message || "An unexpected error occurred");
    }
  };

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeIn" }}
      className="flex items-center justify-center min-h-screen bg-base-100"
    >
      <Seo
        title={"Login | Nabil Zone"}
        content={
          "Log in to your Kashem Optical account to manage your orders and profile."
        }
        link={"/login"}
      />
      <div className="flex flex-col lg:flex-row shadow-lg rounded-lg bg-white max-w-4xl w-full">
        {/* Left Section */}
        <div className="p-8 lg:w-1/2 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Sign In</h2>
          <SocialLogin></SocialLogin>
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
            onSubmit={handleLogin}
            className="w-full"
          >
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="block w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <div className="relative w-full mb-4">
              <input
                type={showPass ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Password"
                name="password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }}
              className="flex items-center justify-center"
            >
              <button
                className={`bg-neutral  text-white 00 px-6 py-2 rounded-md font-medium transition hover:scale-110`}
              >
                SIGN IN
              </button>
            </motion.div>
          </motion.form>
        </div>

        {/* Right Section */}
        <div className="bg-neutral  text-white p-8 lg:w-1/2 flex flex-col justify-center items-center rounded-r-lg md:rounded-tl-[100px] md:rounded-bl-[100px]">
          <Lottie className="w-full h-36 " animationData={loginLottie}></Lottie>
          <p className="my-2 text-sm text-center">
            Register with your personal details to use all of the site's
            features.
          </p>
          <Link
            to="/register"
            className="bg-white text-purple-700 hover:bg-gray-200 px-6 py-2 rounded-md font-medium transition hover:scale-110"
          >
            SIGN UP
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;

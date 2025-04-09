import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import toast from "react-hot-toast";

import { MdDashboard } from "react-icons/md";
import { Typewriter } from "react-simple-typewriter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PiSignIn, PiSignOut } from "react-icons/pi";
import useAuth from "../hooks/useAuth";
import { FaUser } from "react-icons/fa6";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import UpdateProfile from "./UpdateProfile";
import useCategory from "../hooks/useCategory";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Separator } from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import useCart from "@/hooks/useCart";
import CartDropdown from "./CartDropDown";

const Navbar = () => {
  const { user, logOut, updateUserProfile, setLoading, loading } = useAuth();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [categories, categoriesLoading] = useCategory();
  const [cart, cartLoading, refetch] = useCart();

  // Calculate the total price of items in the cart
  const totalPrice =
    cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  // const [cart] = useCart()
  // const totalPrice = cart.reduce((total, item) => total + item.price, 0)
  // console.log(cart);
  // console.log(user);
  // const [isAdmin, isAdminLoading] = useAdmin()
  const isProductsActive = () => {
    const isExactPath = location.pathname === "/products";
    const hasCategoryParam = new URLSearchParams(location.search).has(
      "products"
    );
    return isExactPath && !hasCategoryParam;
  };

  const links = (
    <div className="flex lg:items-center flex-col gap-3 lg:gap-5 lg:flex-row">
      <NavLink
        className={({ isActive }) =>
          `${
            isActive
              ? "text-blue-500 opacity-100 font-semibold border-b-2 border-blue-500 rounded-none px-2 focus:outline-none focus:ring-0"
              : "text-black opacity-80"
          }`
        }
        style={{ fontVariant: "small-caps" }}
        to="/"
      >
        Home
      </NavLink>

      {/* Products with Dropdown */}
      <div className="relative flex items-center">
        {/* Products Link (clicking this navigates to /products) */}
        <NavLink
          className={() =>
            `flex items-center ${
              isProductsActive()
                ? "text-blue-500 opacity-100 font-semibold border-b-2 border-blue-500 rounded-none px-2 focus:outline-none focus:ring-0"
                : "text-black opacity-80"
            }`
          }
          style={{ fontVariant: "small-caps" }}
          to="/products"
        >
          Products
        </NavLink>

        {/* Dropdown Trigger (clicking this opens the dropdown) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-1 p-2 focus:outline-none">
              <ChevronDown className="h-4 w-4 inline-flex" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {categoriesLoading ? (
              <DropdownMenuItem>Loading...</DropdownMenuItem>
            ) : (
              categories?.map((category) => (
                <DropdownMenuItem key={category?.name || category?.id}>
                  <Link
                    to={`/products?category=${category?.name}`}
                    className="w-full text-black opacity-80 hover:opacity-100 flex gap-4"
                  >
                    <img
                      className="w-5 rounded-full object-cover"
                      src={category?.image}
                      alt=""
                    />
                    {category?.name}
                  </Link>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  const handleLogout = () => {
    document.getElementById("my-drawer-2").checked = false;
    logOut()
      .then(() => {
        toast.success("Log Out Successful");
      })
      .catch((error) => {
        toast.error({ error });
      });
  };

  // if (isAdminLoading) {
  //     return <div className='flex justify-center items-center'>
  //         <progress className="progress w-56"></progress>
  //     </div>

  // }
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log(cart);

  return (
    <div className="navbar fixed z-50 bg-gradient-to-r from-base-100 via-sky-50 to-white bg-opacity-60 lg:px-28 xl:px-32 py-0 border-b">
      <div className="navbar-start ">
        {/* drawer for small devices */}
        <div className="drawer lg:hidden flex items-center z-20">
          <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

          {/* Drawer Toggle Button */}
          <div className="drawer-content">
            <label
              htmlFor="mobile-drawer"
              className="btn btn-ghost p-2"
              role="button"
              tabIndex={0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 stroke-current text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>

          {/* Drawer Side Panel */}
          <div className="drawer-side">
            <label
              htmlFor="mobile-drawer"
              className="drawer-overlay bg-black/40"
            ></label>
            <div className="bg-white min-h-full w-80 p-6 shadow-xl transform transition-transform duration-300 ease-in-out">
              {/* Header with Close Button */}
              <div className="flex items-center justify-between mb-6">
                <h5 className="text-lg font-bold text-gray-800">Menu</h5>
                <label
                  htmlFor="mobile-drawer"
                  className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </label>
              </div>

              {/* Menu Items */}
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      cn(
                        "block text-lg font-medium p-2 rounded-md transition-colors",
                        isActive
                          ? "text-blue-600 "
                          : "text-gray-700 hover:bg-gray-100"
                      )
                    }
                    style={{ fontVariant: "small-caps" }}
                    onClick={() =>
                      (document.getElementById("mobile-drawer").checked = false)
                    }
                  >
                    Home
                  </NavLink>
                </li>

                {/* Products with Collapsible Categories */}
                <li>
                  <Collapsible>
                    <div className="group flex items-center justify-between">
                      <NavLink
                        to="/products"
                        className={({ isActive }) =>
                          cn(
                            "text-lg font-medium p-2 rounded-md transition-colors flex-1",
                            isActive
                              ? "text-blue-600 "
                              : "text-gray-700 hover:bg-gray-100"
                          )
                        }
                        style={{ fontVariant: "small-caps" }}
                        onClick={() =>
                          (document.getElementById(
                            "mobile-drawer"
                          ).checked = false)
                        }
                      >
                        Products
                      </NavLink>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 transition-transform duration-200",
                              location.pathname.startsWith("/products")
                                ? "text-black"
                                : "text-gray-700"
                            )}
                          />
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="ml-0 mt-2 space-y-1 animate-fade-in">
                      {categoriesLoading ? (
                        <p className="text-sm text-gray-500 p-2">Loading...</p>
                      ) : (
                        categories?.map((category) => (
                          <NavLink
                            key={category?.name || category?.id}
                            to={`/products?category=${category?.name}`}
                            className="block text-sm p-2 rounded-none border-b border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() =>
                              (document.getElementById(
                                "mobile-drawer"
                              ).checked = false)
                            }
                          >
                            {category?.name}
                          </NavLink>
                        ))
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                </li>

                {/* About Us */}
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      cn(
                        "block text-lg font-medium p-2 rounded-md transition-colors",
                        isActive
                          ? "text-blue-600 "
                          : "text-gray-700 hover:bg-gray-100"
                      )
                    }
                    style={{ fontVariant: "small-caps" }}
                    onClick={() =>
                      (document.getElementById("mobile-drawer").checked = false)
                    }
                  >
                    About Us
                  </NavLink>
                </li>

                {/* Contact Us */}
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      cn(
                        "block text-lg font-medium p-2 rounded-md transition-colors",
                        isActive
                          ? "text-blue-600 "
                          : "text-gray-700 hover:bg-gray-100"
                      )
                    }
                    style={{ fontVariant: "small-caps" }}
                    onClick={() =>
                      (document.getElementById("mobile-drawer").checked = false)
                    }
                  >
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          {/* Logo at Bottom */}
          <div className=" ">
            <NavLink
              to="/"
              className="text-black text-xl font-bold"
              style={{ fontVariant: "small-caps" }}
            >
              <Typewriter
                words={["KO"]}
                loop={true}
                cursor
                cursorStyle="."
                typeSpeed={100}
                deleteSpeed={70}
                delaySpeed={1000}
              />
            </NavLink>
          </div>
        </div>

        <Link
          style={{ fontVariant: "small-caps" }}
          to={"/"}
          className="text-black text-xl lg:text-2xl xl:text-[28px] font-bold hidden lg:flex"
        >
          {/* Kashem <span className='text-blue-500 ml-1'> Optical</span> */}

          <Typewriter
            words={["Kashem Optical", "KO"]}
            loop={true}
            cursor
            cursorStyle="."
            typeSpeed={90}
            deleteSpeed={70}
            delaySpeed={1000}
          />
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-3 ">
          {links}
          {/* <li>
                        <details>
                            <summary>Products</summary>
                            <ul className="p-2 w-40">
                                {
                                    categories?.map(category =>

                                        <li><Link to={`/products?category=${category?.name}`}>{category.name}</Link></li>
                                    )
                                }

                            </ul>
                        </details>
                    </li> */}
        </ul>

        <div className="flex-none mr-5 z-0">
          {/* cart dropdown */}
          <CartDropdown cart={cart}></CartDropdown>
        </div>

        <div className="dropdown dropdown-end mr-2">
          <div className="w-12 rounded-full">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                {user?.photoURL ? (
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user?.photoURL}
                    />
                  </div>
                ) : (
                  <button className="p-2 bg-white rounded-full">
                    {" "}
                    <FaUser className="text-black text-lg"></FaUser>{" "}
                  </button>
                )}
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-md z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <p className="text-slate-800 mb-0 flex flex-col justify-start items-start space-y-0">
                    {user?.displayName || user?.name || "No User"}
                    <span className="text-xs -mt-2 text-purple-500 block">
                      {user?.email}
                    </span>
                  </p>
                </li>

                <hr className="my-2" />
                {user && (
                  <li className="">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="text-black py-1"
                    >
                      <FaUser className="text-sm w-3 h-3 inline-flex items-center" />
                      Update Profile
                    </button>
                  </li>
                )}
                <li>
                  <Link to={"/dashboard"} className="text-black py-1">
                    <MdDashboard></MdDashboard>
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {user ? (
          <Button onClick={handleLogout}>Log Out</Button>
        ) : (
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
        )}
      </div>
      {/* Modal */}

      {isModalOpen && (
        <UpdateProfile
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        ></UpdateProfile>
      )}

      <div className="navbar-end lg:hidden">
        <div className="flex-none mr-3">
          <CartDropdown cart={cart}></CartDropdown>
        </div>
        <div className="dropdown dropdown-end ">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {user?.photoURL ? (
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              ) : (
                <button className="p-2 bg-white rounded-full">
                  {" "}
                  <FaUser className="text-black text-lg"></FaUser>{" "}
                </button>
              )}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-md z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <p className="text-slate-800">{user?.displayName}</p>
              </li>

              <hr className="my-2" />
              {user && (
                <li>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-black"
                  >
                    <FaUser className="text-sm w-3 h-3 inline-flex items-center" />
                    Update Profile
                  </button>
                </li>
              )}
              <li>
                <Link to={"/dashboard"} className="text-black">
                  <MdDashboard></MdDashboard>
                  Dashboard
                </Link>
              </li>

              {user ? (
                <Button onClick={handleLogout}>Log Out</Button>
              ) : (
                <Link to={"/login"} className="">
                  <button className=" btn btn-neutral hover:bg-black btn-sm w-full text-center">
                    Login
                  </button>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

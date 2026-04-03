import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "sonner";

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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Glasses, House, Info, Phone } from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import useCart from "@/hooks/useCart";
import CartDropdown from "./CartDropDown";
import useRole from "@/hooks/useRole";

const Navbar = () => {
  const { user, logOut, updateUserProfile, setLoading, loading } = useAuth();
  const location = useLocation();
  const [categories, categoriesLoading] = useCategory();
  const [cart, cartLoading, refetch] = useCart();
  const { role, roleLoading } = useRole();

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
    <div className="flex lg:items-center flex-col gap-3 lg:gap-4 lg:flex-row">
      <NavLink
        className={({ isActive }) =>
          `flex items-center gap-1 transition hover:scale-105 hover:text-blue-500  ${isActive
            ? "text-blue-500 opacity-100 font-semibold border-b-2  border-blue-500 rounded-none px-2 focus:outline-none focus:ring-0"
            : "text-black opacity-80"
          }`
        }
        style={{ fontVariant: "small-caps" }}
        to="/"
      >
        <House size={14} />
        Home
      </NavLink>

      {/* Products with Dropdown */}
      <div className="relative flex items-center">
        {/* Products Link (clicking this navigates to /products) */}
        <NavLink
          className={() =>
            `flex items-center gap-1 transition hover:scale-105 hover:text-blue-500 ${isProductsActive()
              ? "text-blue-500 opacity-100 font-semibold border-b-2 border-blue-500 rounded-none px-2 focus:outline-none focus:ring-0"
              : "text-black opacity-80"
            }`
          }
          style={{ fontVariant: "small-caps" }}
          to="/products"
        >
          <Glasses size={14} />
          Shop
          {/* Dropdown Trigger (clicking this opens the dropdown) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ml-1  pb-0  focus:outline-none">
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
        </NavLink>
      </div>
      {/* about us page */}
      <NavLink
        className={({ isActive }) =>
          `flex items-center gap-1 transition hover:scale-105 hover:text-blue-500 ${isActive
            ? "text-blue-500 opacity-100 font-semibold border-b-2  border-blue-500 rounded-none px-2 focus:outline-none focus:ring-0"
            : "text-black opacity-80"
          }`
        }
        style={{ fontVariant: "small-caps" }}
        to="/about"
      >
        <Info size={14} />
        About Us
      </NavLink>
      {/* contact us page */}
      <NavLink
        className={({ isActive }) =>
          `flex items-center gap-1 transition hover:scale-105 hover:text-blue-500  ${isActive
            ? "text-blue-500 opacity-100 font-semibold border-b-2  border-blue-500 rounded-none px-2 focus:outline-none focus:ring-0"
            : "text-black opacity-80"
          }`
        }
        style={{ fontVariant: "small-caps" }}
        to="/contact"
      >
        <Phone size={14} />
        Contact Us
      </NavLink>
    </div>
  );

  const handleLogout = async () => {
    toast.promise(logOut(), {
      loading: "Signing Out...",
      success: () => {
        refetch();
        return <b>Logged Out Successfully!</b>;
      },
      error: (error) => error.message,
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
    <nav className="fixed z-50 bg-white w-full  border-b">
      <div className="navbar flex justify-between   md:w-11/12 lg:w-10/12  mx-auto py-0">
        <div className=" ">
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
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            {/* Logo at Bottom */}
            <div className=" ">
              <NavLink
                to="/"
                className="text-indigo-600 text-lg uppercase font-bold tracking-widest transition duration-700"
              >
                Kashem <span className="text-blue-500 ml-1">Optical</span>
              </NavLink>
            </div>
          </div>

          <Link
            to={"/"}
            className="text-indigo-600 text-xl lg:text-2xl xl:text-[28px] font-bold hidden lg:flex hover:scale-105 transition duration-700 tracking-widest uppercase"
          >
            Kashem <span className="text-blue-500 ml-2">Optical</span>
          </Link>
        </div>
        <div className=" hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-3 ">
            {links}
          </ul>

          <div className="flex-none ml-3 mr-5 z-0">
            {/* cart dropdown */}
            <CartDropdown cart={cart}></CartDropdown>
          </div>

          <div className="mr-2">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-12 w-12 rounded-full p-0"
                >
                  {user?.photoURL ? (
                    <Avatar className="lg:h-10 lg:w-10 h-8 w-8">
                      <AvatarImage
                        src={user?.photoURL}
                        alt="User profile"
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-lg">KO</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="lg:h-10 lg:w-10 h-8 w-8 bg-white border-2">
                      <AvatarImage
                        src={
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZgr9-7PZSm240VMDVsathNHVdCabXvMCxsA&s"
                        }
                        alt="User profile"
                        className="object-cover"
                      />
                    </Avatar>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-md bg-white p-2 shadow-lg"
                align="end"
              >
                <DropdownMenuLabel className="flex flex-col items-start space-y-1">
                  <span className="text-sm font-medium text-gray-900">
                    {user?.displayName || user?.name || "No User"}
                  </span>
                  <span className="text-xs text-purple-500">{user?.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user && (
                  <DropdownMenuItem asChild>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaUser className="mr-2 h-4 w-4" />
                      Update Profile
                    </button>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link
                    to={
                      role === "Admin"
                        ? "/dashboard/admin/statistics"
                        : "/dashboard/manage-cart"
                    }
                    className="flex w-full items-center text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <MdDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

        <div className="lg:hidden">
          <div className="flex-none mr-3">
            <CartDropdown cart={cart}></CartDropdown>
          </div>
          <div className="mr-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-12 w-12 rounded-full p-0"
                >
                  {user?.photoURL ? (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.photoURL} alt="User profile" />
                      <AvatarFallback className="rounded-lg">KO</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="h-10 w-10 bg-white">
                      <AvatarImage
                        src={
                          "https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_1280.png"
                        }
                        alt="User profile"
                      />
                    </Avatar>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-md bg-white p-2 shadow-lg"
                align="end"
              >
                <DropdownMenuLabel className="flex flex-col items-start space-y-1">
                  <span className="text-sm font-medium text-gray-900">
                    {user?.displayName || user?.name || "No User"}
                  </span>
                  <span className="text-xs text-purple-500">{user?.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user && (
                  <DropdownMenuItem asChild>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaUser className="mr-2 h-4 w-4" />
                      Update Profile
                    </button>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link
                    to={
                      role === "Admin"
                        ? "/dashboard/admin/statistics"
                        : "/dashboard/manage-cart"
                    }
                    className="flex w-full items-center text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <MdDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {user ? (
                    <Button className="w-full" onClick={handleLogout}>
                      Log Out
                    </Button>
                  ) : (
                    <Link to={"/login"} className="w-full">
                      <Button className="w-full">Login</Button>
                    </Link>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

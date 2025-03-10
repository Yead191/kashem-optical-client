import React, { useEffect, useState } from "react";
import {
    FaHome,
    FaCartPlus,
    FaHistory,
    FaRegCalendarAlt,
    FaEdit,
    FaConciergeBell,
    FaBars,
    FaShoppingBag,
    FaEnvelope,
} from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Link, NavLink, Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import { FaUser, FaUsers } from "react-icons/fa6";
import { ImSpoonKnife } from "react-icons/im";
import { IoMdMenu } from "react-icons/io";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { ChartNoAxesCombined, LayoutGrid, Store, UserRoundCog } from "lucide-react";
import Spinner from "../../components/Spinner/Spinner";
import useAuth from "../../hooks/useAuth";
import { ArchiveBoxXMarkIcon, ChevronDownIcon, PencilIcon, Square2StackIcon, TrashIcon } from '@heroicons/react/16/solid';
import { LogOut } from "lucide-react";
import UpdateProfile from "../../components/UpdateProfile";
import { ArrowUpDownIcon } from "lucide-react";
import toast from "react-hot-toast";
import { LogIn } from "lucide-react";



const DashboardIndex = () => {
    // const [cart] = useCart()
    const { user, logOut } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()


    const cart = 2

    const handleNavClick = () => {
        const drawerCheckbox = document.getElementById("dashboard-drawer");
        if (drawerCheckbox) {
            drawerCheckbox.checked = false;
        }
    };
    const isAdmin = true
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    const handleLogOut = () => {
        logOut()
        toast.success('LoggedOut Successfully!')
        navigate('/')

    }


    if (loading) {
        return <Spinner></Spinner>
    }

    return (
        <div className="drawer lg:drawer-open h-screen lato">
            <ScrollRestoration />
            {/* Drawer Toggle Checkbox */}
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar with Toggle Button */}
                <div className="p-4 bg-base-200  flex items-center justify-between lg:hidden fixed z-10 w-full py-1 ">
                    <label htmlFor="dashboard-drawer" className="btn btn-ghost text-black drawer-button lg:hidden">
                        <FaBars className="text-lg" />
                    </label>
                    <Link to={'/'} style={{ fontVariant: 'small-caps' }} className="text-xl font-bold text-slate-700">Kashem Optical</Link>
                </div>

                <div className="lg:ml-64 mt-12 lg:mt-0">
                    {/* Main Content */}
                    <Outlet />
                </div>

            </div>
            <div className="drawer-side ">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                {/* Sidebar */}
                <div className="bg-base-200 w-64 flex flex-col justify-between  min-h-full fixed z-10">
                    {/* Logo */}
                    <div className="p-6 text-black font-bold text-center">
                        <h1 style={{ fontVariant: 'small-caps' }} className="text-xl lg:text-2xl ">Kashem Optical</h1>

                    </div>
                    {/* Links */}
                    <div className="flex-grow">
                        <p style={{ fontVariant: "small-caps" }} className=" leading-10 pl-6 text-start text-2xl lg:hidden">
                            Menu
                        </p>
                        <hr />
                        {/* admin / user route */}
                        {
                            isAdmin ?
                                <ul
                                    style={{ fontVariant: "small-caps" }}
                                    className="space-y-4 p-4 pl-6 text-slate-800 font-light"
                                >
                                    <li>
                                        <NavLink
                                            onClick={handleNavClick}
                                            to={`/dashboard/admin/statistics`}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 ${isActive ? " rounded-md bg-neutral text-white p-2 opacity-100" : "text-slate-800 opacity-80"
                                                }`
                                            }
                                        >
                                            <ChartNoAxesCombined className="text-xs w-4 h-4"></ChartNoAxesCombined> <span>Statistics</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            onClick={handleNavClick}
                                            to={'/dashboard/admin/manage-users'}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 ${isActive ? " rounded-md bg-neutral text-white p-2 opacity-100" : "text-slate-800 opacity-80 "
                                                }`
                                            }
                                        >
                                            <UserRoundCog className="text-xs w-4 h-4"></UserRoundCog> <span>Manage Users</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            onClick={handleNavClick}
                                            to={'/dashboard/admin/manage-category'}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 ${isActive ? " rounded-md bg-neutral text-white p-2 opacity-100" : "text-slate-800 opacity-80 "
                                                }`
                                            }
                                        >
                                            <LayoutGrid className="text-xs w-4 h-4"></LayoutGrid> <span>Manage Category</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            onClick={handleNavClick}
                                            to={'/dashboard/admin/manage-products'}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 ${isActive ? " rounded-md bg-neutral text-white p-2 opacity-100" : "text-slate-800 opacity-80 "
                                                }`
                                            }
                                        >
                                            <Store className="text-xs w-4 h-4"></Store> <span>Manage Products</span>
                                        </NavLink>
                                    </li>


                                </ul>
                                :
                                <ul
                                    style={{ fontVariant: "small-caps" }}
                                    className="space-y-4 p-4 pl-6 text-slate-800 font-light text-sm md:text-md"
                                >
                                    <li>
                                        <NavLink
                                            onClick={handleNavClick}

                                            className={({ isActive }) =>
                                                `flex items-center gap-3 ${isActive ? "text-white bg-neutral rounded-md p-2 " : "text-slate-800"
                                                }`
                                            }
                                        >
                                            <FaHome /> <span>User Home</span>
                                        </NavLink>
                                    </li>

                                </ul>
                        }

                        <hr className="border-t border-white mx-4" />
                        <ul
                            style={{ fontVariant: "small-caps" }}
                            className="space-y-4 p-4 pl-6 text-slate-800  font-light"
                        >
                            <li>
                                <NavLink
                                    to={"/"}
                                    className="flex items-center gap-3"
                                >
                                    <FaHome /> <span>Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/menu"} className="flex items-center gap-3">
                                    <FaBars /> <span>Menu</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/order/salad"} className="flex items-center gap-3">
                                    <FaShoppingBag /> <span>Shop</span>
                                </NavLink>
                            </li>

                        </ul>
                    </div>
                    {/* add dropdown here */}
                    <div className="p-4">
                        <Menu as="div" className="relative inline-block text-left w-full">
                            <MenuButton className="w-full  flex items-center gap-2 bg-base-200 py-1.5 px-3 rounded-md text-sm font-semibold text-black border transition hover:scale-105 duration-200">
                                <img src={user?.photoURL || "https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png"} alt="User" className="w-8 h-8 object-cover rounded-full" />
                                <div className="text-left">
                                    <p className="mb-0">
                                        {user?.displayName?.length > 14 ? user.displayName.slice(0, 14) + "..." : user?.displayName || "No User"}
                                    </p>
                                    <p className="text-xs font-extralight ">{user?.email}</p>

                                </div>
                                <ArrowUpDownIcon className="w-4"></ArrowUpDownIcon>
                            </MenuButton>
                            <MenuItems className="absolute bottom-full mb-2 w-52 origin-bottom-right rounded-xl border border-black/10 bg-base-100 p-1 text-sm text-black">
                                <MenuItem>
                                    <button onClick={() => setIsModalOpen(true)} className="group flex items-center gap-2 font-medium w-full text-left px-4 py-2 hover:bg-base-200 hover:rounded-md">
                                        <PencilIcon className="size-4 fill-black/30" />
                                        Update Profile
                                    </button>

                                </MenuItem>
                                <MenuItem>
                                    <Link to={'/'} className="group flex items-center gap-2 font-medium w-full text-left px-4 py-2 hover:bg-base-200 hover:rounded-md">
                                        <FaHome className="size-4 fill-black/30" />
                                        Home
                                    </Link>

                                </MenuItem>
                                <hr />

                                <MenuItem>
                                    {
                                        user ?
                                            <button onClick={handleLogOut} className="group flex gap-2 items-center font-medium w-full text-left px-4 py-2 hover:bg-base-200 hover:rounded-md text-red-500">
                                                <LogOut  className="size-4 " />

                                                Logout
                                            </button>
                                            :
                                            <Link to={'/login'} className="group flex gap-2 items-center font-medium w-full text-left px-4 py-2 hover:bg-base-200 hover:rounded-md text-green-500">
                                                <LogIn className="size-4 " />
                                                Login
                                            </Link>
                                    }


                                </MenuItem>

                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>
            {/* Modal */}

            {
                isModalOpen && <UpdateProfile isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} ></UpdateProfile>
            }
        </div>
    );
};

export default DashboardIndex;

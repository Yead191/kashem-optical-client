import React from "react";
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
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaUser, FaUsers } from "react-icons/fa6";
import { ImSpoonKnife } from "react-icons/im";
import { IoMdMenu } from "react-icons/io";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { ChartNoAxesCombined, LayoutGrid, UserRoundCog } from "lucide-react";


const DashboardIndex = () => {
    // const [cart] = useCart()
    const cart = 2

    const handleNavClick = () => {
        const drawerCheckbox = document.getElementById("dashboard-drawer");
        if (drawerCheckbox) {
            drawerCheckbox.checked = false;
        }
    };
    const isAdmin = true
    return (
        <div className="drawer lg:drawer-open h-screen lato">
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
                                            to={'/dashboard/manage-users'}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 ${isActive ? " rounded-md bg-neutral text-white p-2 opacity-100" : "text-slate-800 opacity-80 "
                                                }`
                                            }
                                        >
                                            <LayoutGrid className="text-xs w-4 h-4"></LayoutGrid> <span>Manage Category</span>
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
                </div>
            </div>
        </div>
    );
};

export default DashboardIndex;

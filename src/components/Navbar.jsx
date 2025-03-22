import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import toast from 'react-hot-toast';

import { MdDashboard } from 'react-icons/md';
import { Typewriter } from 'react-simple-typewriter';

import { PiSignIn, PiSignOut } from 'react-icons/pi';
import useAuth from '../hooks/useAuth';
import { FaUser } from 'react-icons/fa6';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from 'react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import UpdateProfile from './UpdateProfile';
import useCategory from '../hooks/useCategory';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Separator } from '@radix-ui/react-select';



const Navbar = () => {
    const { user, logOut, updateUserProfile, setLoading, loading } = useAuth()
    const location = useLocation();



    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const [categories, categoriesLoading] = useCategory();

    // const [cart] = useCart()
    // const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    // console.log(cart);
    // console.log(user);
    // const [isAdmin, isAdminLoading] = useAdmin()
    const isProductsActive = () => {
        const isExactPath = location.pathname === '/products';
        const hasCategoryParam = new URLSearchParams(location.search).has('products');
        return isExactPath && !hasCategoryParam;
    };





    const links = <div className="flex lg:items-center flex-col gap-3 lg:gap-5 lg:flex-row">
        <NavLink
            className={({ isActive }) =>
                `${isActive ? 'text-black opacity-100 font-semibold border-b-2 border-black rounded-none p-2 focus:outline-none focus:ring-0' : 'text-black opacity-80'}`
            }
            style={{ fontVariant: 'small-caps' }}
            to="/"
        >
            Home
        </NavLink>

        {/* Products with Dropdown */}
        <div className="relative flex items-center">
            {/* Products Link (clicking this navigates to /products) */}
            <NavLink
                className={() =>
                    `flex items-center ${isProductsActive() ? 'text-black opacity-100 font-semibold border-b-2 border-black rounded-none p-2 focus:outline-none focus:ring-0' : 'text-black opacity-80'}`
                }
                style={{ fontVariant: 'small-caps' }}
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
                                    <img className='w-5 rounded-full object-cover' src={category?.image} alt="" />
                                    {category?.name}
                                </Link>
                            </DropdownMenuItem>
                        ))
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>

    const handleLogout = () => {
        document.getElementById("my-drawer-2").checked = false
        logOut()
            .then(() => {
                toast.success('Log Out Successful')
            })
            .catch(error => {
                toast.error({ error })
            })
    }


    // if (isAdminLoading) {
    //     return <div className='flex justify-center items-center'>
    //         <progress className="progress w-56"></progress>
    //     </div>

    // }
    const [isModalOpen, setIsModalOpen] = useState(false);





    return (
        <div className="navbar fixed z-10 bg-gradient-to-r from-base-100 via-sky-50 to-white bg-opacity-60 lg:px-28 xl:px-32 py-0 border-b">
            <div className='navbar-start '>
                <div className="drawer lg:hidden flex items-center z-10">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <label
                            htmlFor="my-drawer-2"
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-5 w-5 stroke-current text-black"
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

                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <div className="bg-base-200 text-base-content min-h-full w-80 p-4 relative z-10">
                            {/* Menu Header */}
                            <div className="flex items-center justify-between border-b pb-2 mb-4">
                                <h5
                                    id="drawer-navigation-label"
                                    className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
                                >
                                    Menu
                                </h5>
                                <label
                                    htmlFor="my-drawer-2"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-black cursor-pointer"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
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
                                    <span className="sr-only">Close menu</span>
                                </label>
                            </div>

                            {/* Menu Items */}
                            <ul className="menu space-y-2">
                                <li className="text-md">
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            `${isActive ? 'text-black opacity-100 font-semibold border-b-2 border-black rounded-none p-2' : 'text-black opacity-80 p-2'}`
                                        }
                                        style={{ fontVariant: 'small-caps' }}
                                        onClick={() => (document.getElementById('my-drawer-2').checked = false)}
                                    >
                                        Home
                                    </NavLink>
                                </li>

                                {/* Products with Accordion for Categories */}
                                <li className="text-md">
                                    <Disclosure>
                                        {({ open }) => (
                                            <>
                                                <div className="flex items-center p-2">
                                                    <NavLink
                                                        to="/products"
                                                        className={() =>
                                                            `flex items-center ${isProductsActive() ? 'text-black opacity-100 font-semibold border-b-2 border-black rounded-none ' : 'text-black opacity-80 '}`
                                                        }
                                                        style={{ fontVariant: 'small-caps' }}
                                                        onClick={() => (document.getElementById('my-drawer-2').checked = false)}
                                                    >
                                                        Products
                                                    </NavLink>
                                                    <Disclosure.Button className="p-2 focus:outline-none">
                                                        <ChevronDown
                                                            className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
                                                        />
                                                    </Disclosure.Button>
                                                </div>
                                                <Disclosure.Panel className=" p-2 flex flex-col justify-start items-start space-y-1">
                                                    {categoriesLoading ? (
                                                        <p className="text-sm text-gray-500 p-2">Loading...</p>
                                                    ) : (
                                                        categories?.map((category) => (
                                                            <NavLink
                                                                key={category?.name || category?.id}
                                                                to={`/products?category=${category?.name}`}
                                                                className={({ isActive }) =>
                                                                    `block text-sm border-b w-full ${isActive ? 'text-black opacity-100 font-semibold' : 'text-black opacity-80'}`
                                                                }
                                                                onClick={() => (document.getElementById('my-drawer-2').checked = false)}
                                                            >
                                                                {category?.name}
                                                            </NavLink>
                                                        ))
                                                    )}
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                </li>

                            </ul>
                        </div>
                    </div>

                    {/* Logo */}
                    <Link style={{ fontVariant: 'small-caps' }} to={'/'} className="text-black text-lg overflow-visible lg:text-2xl font-bold lg:hidden">
                        <Typewriter
                            words={['KO']}
                            loop={true}
                            cursor
                            cursorStyle="."
                            typeSpeed={90}
                            deleteSpeed={70}
                            delaySpeed={1000}
                        />
                    </Link>
                </div>

                <Link style={{ fontVariant: 'small-caps' }} to={'/'} className='text-black text-xl lg:text-2xl xl:text-[28px] font-bold hidden lg:flex' >
                    {/* Kashem <span className='text-blue-500 ml-1'> Optical</span> */}

                    <Typewriter
                        words={['Kashem Optical', 'KO']}
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
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="badge badge-sm indicator-item">2</span>
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="card card-compact dropdown-content bg-base-100  mt-3 w-52 shadow">
                            <div className="card-body text-slate-800">
                                {/* <span className="text-lg font-bold">{cart.length} Items</span>
                                    <span className="text-info">Subtotal: ${totalPrice.toFixed(2)}</span> */}
                                <div className="card-actions">
                                    <Link to={'/dashboard/cart'} className="btn btn-neutral btn-block btn-sm">View cart</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="dropdown dropdown-end ">
                    <div className="w-12 rounded-full">

                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                {user?.photoURL ?
                                    <div className="w-10 rounded-full">

                                        <img
                                            alt="Tailwind CSS Navbar component"
                                            src={user?.photoURL} />
                                    </div>
                                    :

                                    <button className='p-2 bg-white rounded-full'> <FaUser className='text-black text-lg'></FaUser> </button>
                                }
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-md z-[1] mt-3 w-52 p-2 shadow">
                                <li >
                                    <p className='text-slate-800 mb-0 flex flex-col justify-start items-start space-y-0'>
                                        {user?.displayName || user?.name || "No User"}
                                        <span className='text-xs -mt-2 text-purple-500 block'>{user?.email}</span>
                                    </p>
                                </li>


                                <hr className='my-2' />
                                {
                                    user && <li className=''>
                                        <button onClick={() => setIsModalOpen(true)} className="text-black py-1">
                                            <FaUser className='text-sm w-3 h-3 inline-flex items-center' />
                                            Update Profile
                                        </button>
                                    </li>
                                }
                                <li>
                                    <Link to={'/dashboard'} className='text-black py-1'>
                                        <MdDashboard>
                                        </MdDashboard>
                                        Dashboard
                                    </Link>
                                </li>


                            </ul>
                        </div>

                    </div>
                </div>

                {
                    user ?
                        <Button onClick={handleLogout}>Log Out</Button>
                        :
                        <Link to={'/login'} className="btn btn-neutral btn-sm px-5 rounded-md">Login</Link>
                }
            </div >
            {/* Modal */}

            {
                isModalOpen && <UpdateProfile isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} ></UpdateProfile>
            }

            <div className="navbar-end lg:hidden">
                <div className="flex-none ">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="badge badge-sm indicator-item">2</span>
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                            <div className="card-body text-slate-800">
                                {/* <span className="text-lg font-bold">{cart.length} Items</span>
                                <span className="text-info">Subtotal: ${totalPrice.toFixed(2)}</span> */}
                                <div className="card-actions">
                                    <Link to={'/dashboard/cart'} className="btn btn-neutral btn-block">View cart</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown dropdown-end ">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            {user?.photoURL ?
                                <div className="w-10 rounded-full">

                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src={user?.photoURL} />
                                </div>
                                :

                                <button className='p-2 bg-white rounded-full'> <FaUser className='text-black text-lg'></FaUser> </button>
                            }
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-md z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <p className='text-slate-800'>{user?.displayName}</p>
                            </li>

                            <hr className='my-2' />
                            {
                                user && <li>
                                    <button onClick={() => setIsModalOpen(true)} className="text-black">
                                        <FaUser className='text-sm w-3 h-3 inline-flex items-center' />
                                        Update Profile
                                    </button>
                                </li>
                            }
                            <li>
                                <Link to={'/dashboard'} className='text-black'>
                                    <MdDashboard>
                                    </MdDashboard>
                                    Dashboard
                                </Link>
                            </li>

                            {
                                user ?
                                    <Button onClick={handleLogout}>Log Out</Button>
                                    :

                                    <Link to={'/login'} className=''>
                                        <button className=' btn btn-neutral hover:bg-black btn-sm w-full text-center'>Login</button>
                                    </Link>
                            }



                        </ul>
                    </div>
                </div>


            </div>
        </div >
    );
};

export default Navbar;
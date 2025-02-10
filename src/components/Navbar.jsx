import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import toast from 'react-hot-toast';

import { MdDashboard } from 'react-icons/md';

import { PiSignIn, PiSignOut } from 'react-icons/pi';
import useAuth from '../hooks/useAuth';
import { FaUser } from 'react-icons/fa6';

const Navbar = () => {
    const { user, logOut } = useAuth()
    // const [cart] = useCart()
    // const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    // console.log(cart);
    // console.log(user);
    // const [isAdmin, isAdminLoading] = useAdmin()

    const links = <div className='flex lg:items-center flex-col lg:flex-row'>
        <li><NavLink style={{ fontVariant: 'small-caps' }} to={'/'}>Home</NavLink></li>
        <li><NavLink style={{ fontVariant: 'small-caps' }} to={'/menu'}>Menu</NavLink></li>
        <li><NavLink style={{ fontVariant: 'small-caps' }} to={'/order/salad'}>Products</NavLink></li>
        {/* <li><NavLink style={{ fontVariant: 'small-caps' }} to={'/secret'}>Secret</NavLink></li> */}
        {/* {
            user && isAdmin && <Link to={`dashboard/adminHome`} style={{ fontVariant: 'small-caps' }} className='btn btn-ghost'>
                <MdDashboard className='text-lg' /> Dashboard
            </Link>
        }
        {
            user && !isAdmin && <Link to={`dashboard/userHome`} style={{ fontVariant: 'small-caps' }} className='btn btn-ghost'>
                <MdDashboard className='text-lg' /> Dashboard
            </Link>
        } */}
        {/* {
            user ?
                <> </>
                :
                <li><NavLink style={{ fontVariant: 'small-caps' }} to={'/login'}>Login</NavLink></li>

        } */}

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

    return (
        <div className="navbar fixed z-10 bg-black  text-white lg:px-28 py-0">
            <div className='navbar-start '>
                <div className="drawer lg:hidden flex items-center">
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
                                className="inline-block h-5 w-5 stroke-current text-white">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
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
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
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
                            <ul className="menu">
                                <li className='text-md'>
                                    <NavLink
                                        to="/"
                                        onClick={() => (document.getElementById("my-drawer-2").checked = false)}
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li className='text-md'>
                                    <NavLink
                                        to="/menu"
                                        onClick={() => (document.getElementById("my-drawer-2").checked = false)}
                                    >
                                        Menu
                                    </NavLink>
                                </li>
                                <li className='text-md'>
                                    <NavLink
                                        to="/order/salad"
                                        onClick={() => (document.getElementById("my-drawer-2").checked = false)}
                                    >
                                        Order Food
                                    </NavLink>
                                </li>
                                {/* {
                                    user && isAdmin && <li>
                                        <NavLink onClick={() => (document.getElementById("my-drawer-2").checked = false)} to={`dashboard/adminHome`} style={{ fontVariant: 'small-caps' }} className=''>
                                            <MdDashboard className='text-lg' /> Dashboard
                                        </NavLink>
                                    </li>
                                }
                                {
                                    user && !isAdmin && <li>
                                        <NavLink onClick={() => (document.getElementById("my-drawer-2").checked = false)} to={`dashboard/userHome`} style={{ fontVariant: 'small-caps' }} className=''>
                                            <MdDashboard className='text-lg' /> Dashboard
                                        </NavLink>
                                    </li>
                                } */}

                            </ul>
                            {/* {

                                user && user?.email ?
                                    <button onClick={() => handleLogout()} className=" btn bg-base-100 btn-sm  w-full md:hidden"> Sign Out <PiSignOut className='text-lg' /></button>
                                    :
                                    <Link onClick={() => (document.getElementById("my-drawer-2").checked = false)} to='/login' className="btn btn-sm bg-base-100 w-full md:hidden"><PiSignIn className='text-lg' /> Login</Link>
                            } */}
                        </div>
                    </div>
                    <Link style={{ fontVariant: 'small-caps' }} to={'/'} className='text-white text-xl lg:text-2xl font-semibold lg:hidden' >
                        KO
                    </Link>
                </div>

                <Link style={{ fontVariant: 'small-caps' }} to={'/'} className='text-white text-xl lg:text-2xl xl:text-3xl font-semibold hidden lg:flex' >
                    Kashem Optical
                </Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-3 ">
                    {links}
                </ul>



                <div className="flex-none mr-5">
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
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <p className='text-slate-800'>{user?.displayName}</p>
                                </li>
                                <hr className='my-2' />
                                <li>
                                    <Link className='text-black'>
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
                        <button onClick={handleLogout} className="btn btn-ghost hover:bg-neutral ">Log Out</button>
                        :
                        <Link to={'/login'} className="btn btn-ghost btn-sm px-5 rounded-sm hover:bg-white hover:text-black ">Login</Link>
                }
            </div>
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
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <p className='text-slate-800'>{user?.displayName}</p>
                            </li>
                            <hr className='my-2' />
                            <li>
                                <Link className='text-black'>
                                    <MdDashboard>
                                    </MdDashboard>
                                    Dashboard
                                </Link>
                            </li>

                            {
                                user ?
                                    <button onClick={handleLogout} className="btn btn-sm btn-neutral mt-2 ">Log Out</button>
                                    :

                                    <Link to={'/login'} className=''>
                                        <button className=' btn btn-neutral hover:bg-black btn-sm w-full text-center'>Login</button>
                                    </Link>
                            }



                        </ul>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Navbar;
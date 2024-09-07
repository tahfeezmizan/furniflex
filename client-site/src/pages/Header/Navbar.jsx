import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RiMenu3Fill, RiShoppingBagLine } from 'react-icons/ri';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import useAuth from '../../hooks/useAuth';
import useCarts from '../../hooks/useCarts';
import userIcon from "../../assets/user-icon.png";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [open, setOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false); // New state for profile dropdown
    const location = useLocation();
    const { carts } = useCarts();
    const hideNavbar = location.pathname === "/singup" || location.pathname === "/singin";

    const links = <>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/products'>Products</NavLink>
        <NavLink to='/'>Categories</NavLink>
        <NavLink to='/'>Custom</NavLink>
        <NavLink to='/'>Blog</NavLink>
    </>;

    // Don't render the navbar if on signup or signin page
    if (hideNavbar) return null;

    return (
        <div className="shadow-md md:shadow-none py-4 lg:py-8 relative z-50 border-b">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <NavLink to={'/'}>
                    <img src={logo} className='w-32' alt="Logo" />
                </NavLink>

                <div className="flex-1 flex justify-center">
                    <div className={`lg:flex gap-8 lg:static absolute duration-300 ease-in-out ${open ? 'top-12' : 'top-[-230px]'} right-0 lg:right-auto lg:bg-transparent py-5 md:py-5 lg:py-0 w-full`}>
                        <div className="bg-white py-4 flex flex-col lg:flex-row gap-3 md:gap-6 font-Barlow items-center justify-center text-lg font-medium w-full">
                            {links}
                        </div>

                        {open && (
                            <div className="flex gap-4 items-center justify-center mt-4 lg:hidden">
                                <div className="text-3xl">
                                    <RiShoppingBagLine />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* For large screens */}
                <div className="hidden lg:flex items-center justify-between gap-6">
                    <NavLink to={"/checkout"} className="text-3xl flex ">
                        <span className='text-4xl relative'><RiShoppingBagLine /></span>
                        <span className='absolute bottom-10 right-[272px] bg-black text-white text-sm font-semibold font-Barlow rounded-full px-2'>{carts.length}</span>
                    </NavLink>

                    <div className="relative">
                        {user ? (
                            <>
                                {/* Profile image button with dropdown */}
                                <img
                                    className='w-10 h-10 rounded-full cursor-pointer'
                                    src={user?.photoURL || userIcon}
                                    alt="user profile"
                                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                />
                                {profileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-2 z-50">
                                        <button
                                            onClick={logOut}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <NavLink to={'/singin'}>Sign In</NavLink>
                        )}
                    </div>
                </div>

                {/* For small screens */}
                <div className="lg:hidden flex items-center gap-6">
                    {/* Menu icon */}
                    <div className="text-4xl cursor-pointer" onClick={() => setOpen(!open)}>
                        {open ? <IoMdClose /> : <RiMenu3Fill />}
                    </div>

                    {/* Cart icon */}
                    <NavLink to={"/checkout"} className="relative text-3xl">
                        <RiShoppingBagLine />
                        <span className='absolute -top-2 -right-2 bg-black text-white text-sm font-semibold font-Barlow rounded-full px-2'>{carts.length}</span>
                    </NavLink>

                    {/* Profile image */}
                    {user && (
                        <div className="relative">
                            <img
                                className='w-8 h-8 rounded-full cursor-pointer'
                                src={user?.photoURL || userIcon}
                                alt="user profile"
                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                            />
                            {profileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-2 z-50">
                                    <button
                                        onClick={logOut}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

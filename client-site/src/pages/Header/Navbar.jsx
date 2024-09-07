import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RiMenu3Fill, RiShoppingBagLine } from 'react-icons/ri';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import useAuth from '../../hooks/useAuth';
import useCarts from '../../hooks/useCarts';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const { carts } = useCarts();  // Use object destructuring
    console.log('Navbar carts', carts);

    const hideNavbar = location.pathname === "/singup" || location.pathname === "/singin"

    const links = <>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/products'>Products</NavLink>
        <NavLink to='/'>Categories</NavLink>
        <NavLink to='/'>Custom</NavLink>
        <NavLink to='/'>Blog</NavLink>
    </>

    // Don't render the navbar if on signup or signin page
    if (hideNavbar) return null;

    return (
        <div className="shadow-md md:shadow-none py-4 lg:py-8 relative z-50 border-b">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <NavLink to={'/'}>
                    <img src={logo} className='w-32' alt="" />
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

                <div className="hidden lg:flex items-center justify-between gap-6">
                    <div className="text-3xl flex ">
                        <span className='text-4xl relative'><RiShoppingBagLine /></span>
                        <span className='absolute bottom-10 right-[272px] bg-black text-white text-sm font-semibold font-Barlow rounded-full px-2'>{carts.length}</span>
                    </div>

                    <div className="">
                        {user ? (
                            <>
                                {/* profle image  */}
                                <img className='size-10 rounded-full' src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt="user profile image" />
                                <button onClick={() => { logOut() }}>Logout</button>
                            </>
                        ) :
                            (
                                <NavLink to={'/singin'}>Sing In</NavLink>
                            )
                        }
                    </div>
                </div>

                <div className="text-4xl lg:hidden cursor-pointer" onClick={() => setOpen(!open)}>
                    {open ? <IoMdClose /> : <RiMenu3Fill />}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
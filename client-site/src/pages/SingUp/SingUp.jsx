import React, { useState } from 'react';
import { FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { MdCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/favicon.svg';
import image from '../../assets/singupimage.png';
import useAuth from '../../hooks/useAuth';

const SingUp = () => {
    const { createUser, googleLogin } = useAuth()
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const navigate = useNavigate()

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const fastName = e.target.fastName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const data = { fastName, lastName, email, password };

        createUser(email, password)
            .then(resule => {
                if (resule.user) {
                    toast.success("User Register Success")
                    navigate('/')
                }
            })
            .catch(error => {
                console.error(error);
            })
    };

    return (
        <div className='h-fit'>
            <div className="flex items-center justify-center gap-10">
                {/* sign in content */}
                <div className="flex-1">
                    <div className="bg-[#FAFAFA] p-10 py-16 w-[550px] mx-auto">
                        <div className="text-center text-black">
                            <h3 className='text-2xl font-semibold font-Barlow'>Welcome To</h3>
                            <h2 className='text-4xl font-Inter font-bold'>Furni<span className='text-[#1E99F5]'>Flex</span></h2>
                            <p className="text-[#707070] font-medium text-base font-Barlow">Enter your Credentials to access your account</p>
                        </div>
                        <form className='pt-4 space-y-4' onSubmit={handleSubmit}>
                            <div className="flex items-center justify-between gap-4">
                                <div className="border w-full bg-white p-1 px-3 rounded-md">
                                    <label className="block font-normal text-[#707070] font-Barlow text-xs">
                                        <span>First name (optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="fastName"
                                        placeholder="Your First Name"
                                        className="border-none outline-none text-sm text-black w-full"
                                    />
                                </div>
                                <div className="border w-full bg-white p-1 px-3 rounded-md">
                                    <label className="block font-normal text-[#707070] font-Barlow text-xs">
                                        <span>Last name (optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Your Last Name"
                                        className="border-none outline-none text-sm text-black w-full"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="border w-full bg-white p-1 px-3 rounded-md">
                                <label className="block font-normal text-[#707070] font-Barlow text-xs">
                                    <span>Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    className="border-none outline-none text-sm text-black w-full"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="border w-full bg-white p-1 px-3 rounded-md relative">
                                <label className="block font-normal text-[#707070] font-Barlow text-xs">
                                    <span>Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter Your Password"
                                    className="border-none outline-none text-sm text-black w-full"
                                />
                                <div
                                    className="absolute right-3 bottom-3 text-xl cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>

                            <div className="">
                                {/* Terms & Policy Checkbox */}
                                <div className="flex items-center gap-2">
                                    <div
                                        onClick={() => setAgreeTerms(!agreeTerms)}
                                        className="cursor-pointer text-2xl"
                                    >
                                        {agreeTerms ? <MdCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
                                    </div>
                                    <p className="font-Barlow text-sm font-medium">
                                        I agree to the <span className='underline'>Terms & Policy</span>
                                    </p>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                disabled={!agreeTerms}
                                className={`py-3 font-Barlow text-lg font-semibold w-full ${agreeTerms ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'} rounded-md`}
                            >
                                Sign Up
                            </button>
                        </form>

                        {/* OR Divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="px-3 text-sm text-gray-500 font-Barlow">or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        <div className="flex items-center justify-center gap-4 mb-5">
                            <button
                                onClick={() => googleLogin()
                                    .then(result => {
                                        if (result?.user) {
                                            toast.success("Google Login Success")
                                            navigate('/')
                                        }
                                    })
                                }
                                className="py-3 font-Barlow text-sm font-medium w-full border text-black rounded-md flex items-center justify-center gap-2"
                            >
                                <span className='text-xl'><FcGoogle /></span> Sign in with Google
                            </button>
                            <button
                                className="py-3 font-Barlow text-sm font-medium w-full border text-black rounded-md flex items-center justify-center gap-2"
                            >
                                <span className='text-xl'><FaApple /></span> Sign in with Apple
                            </button>
                        </div>

                        <h3 className='text-base text-center font-Barlow font-medium'>Have an account?  <NavLink className={`text-[#1E99F5]`} to={'/singin'}>Sign In</NavLink></h3>
                    </div>
                </div>

                {/* Image and Logo section */}
                <div
                    className="flex-1 flex items-center justify-center"
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        height: '100vh'
                    }}
                >
                    <div className="flex flex-col items-center justify-center text-center">
                        <img src={logo} className='mb-2' alt="FurniFlex Logo" />
                        <h2 className='text-4xl font-Inter text-white font-bold'>Furni<span className='text-[#1E99F5]'>Flex</span></h2>
                        <p className='text-[#C8C4C4] px-10 lg:px-20 xl:px-60 text-center font-Barlow text-base'>
                            Discover a seamless shopping experience with our curated collection of products. From fashion to electronics, we bring quality.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingUp;
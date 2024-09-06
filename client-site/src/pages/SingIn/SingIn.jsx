import React from 'react';
import image from '../../assets/singupimage.png'
import logo from '../../assets/favicon.svg'
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';


const SingIn = () => {
    return (
        <div className='h-fit'>
            <div className="flex items-center justify-center gap-10">
                {/* sing content */}
                <div className="flex-1 ">
                    <div className="bg-[#FAFAFA] p-10 w-[500px] ml-auto">
                        <h2 className='text-3xl font-Barlow font-medium'>Welcome Back!</h2>
                        <p className="text-[#707070] font-medium text-base font-Barlow">Enter your Credentials to access your account</p>
                        <form className='pt-11 space-y-4'>
                            <div className="border bg-white p-1 px-3 rounded-md">
                                <label className="block font-normal text-[#707070] font-Barlow text-xs">
                                    <span className="">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    className="border-none outline-none text-sm text-black"
                                />
                            </div>

                            <div className="border bg-white p-1 px-3 rounded-md">
                                <label className="block font-normal text-[#707070] font-Barlow text-xs">
                                    <span className="">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    className="border-none outline-none text-sm text-black"
                                />
                            </div>

                            <div className="">
                                <p className="forget-password text-[#1E99F5] text-end text-sm font-medium font-Barlow">Forgot Password</p>
                                <div className="flex items-center gap-2">
                                    <MdOutlineCheckBoxOutlineBlank />
                                    <p className="font-Barlow text-sm font-medium">I agree to the <span className='underline'>Terms & Policy</span></p>
                                </div>
                            </div>

                            <button>Sign In</button>
                        </form>
                    </div>
                </div>
                {/* image  */}
                <div className="flex-1 " style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${image})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'container',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh'
                }}>
                    <div className="flex flex-col items-center justify-center">
                        <img src={logo} className='mb-2' alt="" />
                        <h2 className='text-4xl font-Inter text-white font-bold'>Furni<span className='text-[#1E99F5]'>Flex</span></h2>
                        <p className='text-[#C8C4C4] px-60 text-center font-Barlow text-base'>Discover a seamless shopping experience with our curated collection of products. From fashion to electronics, we bring quality.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingIn;
import { Link } from "react-router-dom";
import logo from "../../assets/Footer-Logo.png"
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import flag from "../../assets/🇺🇸.png"


const Footer = () => {
    return (
        <div className="bg-black py-20 text-white">
            <div className="w-full lg:w-4/5 mx-auto px-3 lg:px-0">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-20">
                    <div className="col-span-2">
                        <img src={logo} alt="" />
                    </div>
                    <div className="col-span-1 font-medium">
                        <div className="">
                            <h3 className="font-Barlow font-semibold text-lg mb-6">About Us</h3>
                            <div className="text-[#81859F] flex  flex-col space-y-2 font-semibold font-Barlow">
                                <Link>Master Plan</Link>
                                <Link>Jobs</Link>
                                <Link>Invest</Link>
                                <Link>Pressroom</Link>
                                <Link>Blog</Link>
                                <Link>Contact</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 font-medium">
                        <div className="">
                            <h3 className="font-Barlow font-semibold text-lg mb-6">Explore EEVE</h3>
                            <div className="text-[#81859F] flex  flex-col space-y-2 font-semibold font-Barlow">
                                <Link>Unlock my Robot Power</Link>
                                <Link>Starlight</Link>
                                <Link>Robot Platform</Link>
                                <Link>EEVE Roadmap</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 font-medium">
                        <div className="">
                            <h3 className="font-Barlow font-semibold text-lg mb-6">Community & Support</h3>
                            <div className="text-[#81859F] flex  flex-col space-y-2 font-semibold font-Barlow">
                                <Link>Willow X Community</Link>
                                <Link>Developer & Maker Access</Link>
                                <Link>Special Cases</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center  border-t border-[#252948] pt-6">
                    <div className="flex items-center gap-4 text-xl text-white mb-5">
                        <p className=" rounded-full"><FaFacebook /></p>
                        <p className=" rounded-full"><FaInstagram /></p>
                        <p className="rounded-full"><FaLinkedin /></p>
                        <p className=" rounded-full"><FaTwitter /></p>
                    </div>

                    <div className="text-[#81859F] flex flex-wrap space-x-6 font-semibold font-Barlow">
                        <Link>Master Plan</Link>
                        <Link>Jobs</Link>
                        <Link>Invest</Link>
                        <Link>Pressroom</Link>
                        <Link>Blog</Link>
                        <Link>Contact</Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <img src={flag} alt="" />
                        <p className="text-[#81859F] font-Barlow font-semibold">United States (English)</p>
                    </div>
                </div>
                <p className="text-center text-[#323544] font-Barlow mt-8 font-semibold text-lg">EEVE © 2024. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
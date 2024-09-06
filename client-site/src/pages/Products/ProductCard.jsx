import React from 'react';
import { Helmet } from 'react-helmet';
import { BsBag } from 'react-icons/bs';

const ProductCard = ({ product }) => {
    const { image, title, pricenew, priceold, description } = product;

    return (
        <div className="border hover:shadow-xl transition duration-300 rounded-xl overflow-hidden">
            <Helmet>
                <title>Home - PH Commerce</title>
            </Helmet>
            <div className="">
                <div className="w-full h-[334px] bg-white overflow-hidden border-red-600 border">
                    <img className="w-full h-full object-cover scale-75" src={image} alt="" />
                </div>
                <div className="p-5">
                    <h2 className="text-[Recliner] text-lg font-Barlow font-semibold ">{title}</h2>

                    <div className="flex items-center justify-between gap-5">
                        <p className="text-[#373737] text-base font-Poppins font-semibold">${pricenew}</p>
                        <p className="text-[#373737] text-base font-Poppins font-semibold">${priceold}</p>
                        <p className="text-[#373737] text-base font-Poppins font-semibold">${priceold}</p>
                    </div>
                    <p className="py-2 pb-7">{description}</p>
                    <button
                        className="py-3 font-Barlow text-lg font-semibold w-full bg-black text-white rounded-md flex items-center justify-center gap-2"
                    >
                        <span className='text-xl'><BsBag /> </span> Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
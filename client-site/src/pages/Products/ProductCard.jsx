import React from 'react';
import { Helmet } from 'react-helmet';
import { BsBag } from 'react-icons/bs';

const ProductCard = ({ product }) => {
    const { image, title, pricenew, priceold, description, save } = product;

    return (
        <div className="border hover:shadow-xl transition duration-300 rounded-xl overflow-hidden">
            <Helmet>
                <title></title>
            </Helmet>
            <div className="">
                <div className="w-full h-[334px] bg-white overflow-hidden border-red-600 border">
                    <img className="w-full h-full object-cover scale-75" src={image} alt="" />
                </div>
                <div className="p-6">
                    <h2 className="text-[Recliner] text-lg font-Barlow font-semibold ">{title}</h2>
                    <div className="flex items-center justify-between gap-5 mb-4">
                        <p className="text-black text-lg font-Barlow font-bold">€{pricenew}.00</p>
                        <p className="text-[#ABABAB] text-lg font-Barlow font-semibold line-through">€{priceold}.00</p>
                        <p className="text-base font-Barlow font-semibold uppercase text-[#B92E2E]">{save} off</p>
                    </div>
                    <p className="mb-8">{description}</p>
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
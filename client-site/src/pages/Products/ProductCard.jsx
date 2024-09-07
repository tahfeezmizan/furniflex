import axios from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet';
import { BsBag } from 'react-icons/bs';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import useAxios from '../../hooks/useAxios';
import useCarts from '../../hooks/useCarts';

const ProductCard = ({ product }) => {
    const { user } = useAuth();
    const axiosCommon = useAxios();
    const { refetch } = useCarts();
    const { image, title, pricenew, priceold, description, save, _id } = product;

    const handleAddToCart = () => {
        if (!user) {
            toast.warn('Please log in to add items to your cart!');
            alert('Please log in to add items to your cart!')
            return;
        }

        const cartitem = {
            customerEmail: user?.email,
            productId: _id,
            name: title,
            image: image,
            price: pricenew,
        };

        axiosCommon.post(`/carts`, cartitem)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    toast.success('Added to cart successfully!');
                    refetch();  // Refetch the carts data
                }
            })
            .catch(error => {
                console.error('Failed to add product to cart:', error);
                toast.error('Failed to add product to cart.');
            });
    };

    return (
        <div className="border hover:shadow-xl transition duration-300 rounded-xl overflow-hidden">
            <Helmet>
                <title></title>
            </Helmet>
            <div className="">
                <div className="w-full h-[334px] overflow-hidden">
                    <img className="w-full h-full bg-[#F2F2F2] p-4 rounded-md object-cover scale-75" src={image} alt={title} />
                </div>
                <div className="p-6">
                    <h2 className="text-xl font-Barlow font-semibold pb-2">{title}</h2>
                    <div className="flex items-center justify-between gap-5 mb-4">
                        <p className="text-black text-lg font-Barlow font-bold">€{pricenew}.00</p>
                        <p className="text-[#ABABAB] text-lg font-Barlow font-semibold line-through">€{priceold}.00</p>
                        <p className="text-base font-Barlow font-semibold uppercase text-[#B92E2E]">{save} off</p>
                    </div>
                    <p className="mb-8">{description}</p>

                    <button
                        onClick={handleAddToCart}
                        className="py-3 font-Barlow text-lg font-semibold w-full bg-black text-white rounded-md flex items-center justify-center gap-2"
                    >
                        <span className='text-xl'><BsBag /></span> Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const Products = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/products`)
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => console.log(err))

    }, [])

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div className="200">
            <div className="w-full lg:w-4/5 mx-auto py-20 px-3 lg:px-0">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
                    <h2 className="text-3xl md:text-5xl font-bold pl-2">All Products</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-6 gap-0 md:gap-8">
                    <div className="col-span-1 w-full sm:w-auto">
                        <div className="flex flex-col gap-6 mb-10 px-4 sm:px-0">
                            <div className="space-y-3 w-full">
                                <button className="py-2 font-Barlow text-lg font-semibold w-4/5 bg-black text-white rounded-md">Rocking chair</button>
                                <button className="py-2 font-Barlow text-lg font-semibold w-4/5 bg-black text-white rounded-md">Side chair</button>
                                <button className="py-2 font-Barlow text-lg font-semibold w-4/5 bg-black text-white rounded-md">Lounge chair</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {
                            products?.map(product => <ProductCard product={product} key={product._key}></ProductCard>)
                        }
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Products;
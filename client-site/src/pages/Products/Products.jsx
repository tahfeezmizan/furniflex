import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useLoaderData } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Products = () => {
    const [products, setProducts] = useState([]);
    const { count } = useLoaderData();
    const [category, setCategory] = useState('');
    const itemPerPage = 6;
    const numberOfPages = Math.ceil(count / itemPerPage); 
    const [currentPage, setCurrentPage] = useState(1); 
    const pages = [...Array(numberOfPages).keys()].map(i => i + 1); 

    useEffect(() => {
        const fetchUrl = `${import.meta.env.VITE_BASE_URL}/products?page=${currentPage - 1}&limit=${itemPerPage}${category ? `&category=${category}` : ''}`;

        // Fetch products based on current page and category
        axios.get(fetchUrl)
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err));
    }, [currentPage, category]); // Re-run when currentPage or category changes

    // Category filter handler
    const handleClick = (categoryType) => {
        setCategory(categoryType);
        setCurrentPage(1); // Reset to page 1 when changing category
    };


    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < numberOfPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pageButtons = [];

        // Always show the first 2 pages
        for (let i = 1; i <= 2; i++) {
            pageButtons.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-4 py-1 border-2 text-xl text-black rounded-md ${currentPage === i ? 'border-2 border-black ' : ''}`}
                >
                    {i}
                </button>
            );
        }

        // Show dots if there's a gap between page 2 and current page
        if (currentPage > 4) {
            pageButtons.push(
                <span key="dots1" className="px-3 py-2 border-2 text-[#C4CDD5] rounded-md">
                    ...
                </span>
            );
        }

        // Show the current page if it's not within the first or last 2 pages
        if (currentPage > 2 && currentPage < numberOfPages - 1) {
            pageButtons.push(
                <button
                    key={currentPage}
                    onClick={() => setCurrentPage(currentPage)}
                    className={`px-4 py-1 border-2 text-xl text-black rounded-md border-black`}
                >
                    {currentPage}
                </button>
            );
        }

        // Show dots if there's a gap between the current page and the last 2 pages
        if (currentPage < numberOfPages - 3) {
            pageButtons.push(
                <span key="dots2" className="px-3 py-2 border-2 text-[#C4CDD5] rounded-md">
                    ...
                </span>
            );
        }

        // Always show the last 2 pages
        for (let i = numberOfPages - 1; i <= numberOfPages; i++) {
            if (i > 2) { // Ensure not to duplicate pages
                pageButtons.push(
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`px-4 py-1 border-2 text-xl text-black rounded-md ${currentPage === i ? 'border-2 border-black ' : ''}`}
                    >
                        {i}
                    </button>
                );
            }
        }

        return pageButtons;
    };

    return (
        <div className="200">
            <div className="w-full lg:w-4/5 mx-auto py-20 px-3 lg:px-0">
                {/* <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
                    <h2 className="text-3xl md:text-5xl font-bold pl-2">All Products</h2>
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-6 gap-0 md:gap-8">
                    <div className="col-span-1 w-full sm:w-auto border-r">
                        <div className="space-y-3 w-full">
                            <button
                                className={`py-2 font-Barlow text-lg font-semibold w-4/5 rounded-md ${category === 'Rocking Chair' ? 'bg-black text-white' : 'border-y text-[#717171]'}`}
                                onClick={() => handleClick('Rocking Chair')}
                            >
                                Rocking chair
                            </button>
                            <button
                                className={`py-2 font-Barlow text-lg font-semibold w-4/5 rounded-md ${category === 'Side Chair' ? 'bg-black text-white' : 'border-y text-[#717171]'}`}
                                onClick={() => handleClick('Side Chair')}
                            >
                                Side chair
                            </button>
                            <button
                                className={`py-2 font-Barlow text-lg font-semibold w-4/5 rounded-md ${category === 'Lounge Chair' ? 'bg-black text-white' : 'border-y text-[#717171]'}`}
                                onClick={() => handleClick('Lounge Chair')}
                            >
                                Lounge chair
                            </button>
                        </div>

                    </div>
                    <div className="col-span-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                        {
                            products?.map(product => <ProductCard product={product} key={product._id}></ProductCard>)
                        }
                    </div>
                </div>

                <div className="pagination flex flex-col sm:flex-row items-center justify-center py-10 space-y-4 sm:space-y-0 sm:space-x-3">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`px-3 py-2 border-2 text-xl text-[#C4CDD5] rounded-md w-full sm:w-auto hover:text-black hover:border-black transition ${currentPage === 1 && 'cursor-not-allowed opacity-50'}`}>
                        <IoIosArrowBack />
                    </button>
                    <div className="flex flex-wrap justify-center space-x-2">
                        {renderPageNumbers()}
                    </div>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === numberOfPages}
                        className={`px-3 py-2 border-2 text-xl text-[#C4CDD5] rounded-md w-full sm:w-auto hover:text-black hover:border-black transition ${currentPage === numberOfPages && 'cursor-not-allowed opacity-50'}`}>
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Products;

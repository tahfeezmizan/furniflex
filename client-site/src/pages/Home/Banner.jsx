import slideImg from '../../assets/slider-1.png';

const Banner = () => {
    return (
        <div className='bg-[#f2f2f2] h-screen'>
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="flex-1 py-10">
                    <p className="font-Inter text-lg  uppercase">new arrivals</p>
                    <h2 className='font-Barlow text-5xl md:text-7xl font-medium leading-snug pr-0 md:pr-40 '>Chairs & Seating You'll Love</h2>
                    <p className="font-Inter text-base text-[#717171]">Designer chair styles for every space - Free Shipping</p>
                    <button className='text-base font-Inter font-medium uppercase pt-4 border-b border-black'>Shop Now</button>
                </div>
                <div className="flex-1 flex justify-center">
                    <img src={slideImg} alt="Slider Image" className='w-4/5 py-24' />
                </div>
            </div>
        </div>
    );
};

export default Banner;
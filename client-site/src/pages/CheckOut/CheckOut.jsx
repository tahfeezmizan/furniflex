import { RxCross1 } from "react-icons/rx";
import useCarts from "../../hooks/useCarts";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

const CheckOut = () => {
    const { refetch, carts } = useCarts();
    const axiosCommon = useAxios();
    const { user } = useAuth();

    const [consolidatedCarts, setConsolidatedCarts] = useState([]);


    useEffect(() => {
        const cartMap = carts.reduce((acc, product) => {
            if (!acc[product._id]) {
                acc[product._id] = { ...product, quantity: 1 }; 
            } else {
                acc[product._id].quantity += 1; 
            }
            return acc;
        }, {});
        setConsolidatedCarts(Object.values(cartMap)); 
    }, [carts]);

    const handleDeleteItem = (id) => {
        console.log("delete");
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosCommon.delete(`/carts/${user?.email}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Item has been deleted.",
                                icon: "success"
                            });
                        }
                        refetch();
                    })
            }
        });
    };

    const handleItemIncrement = (id) => {
        setConsolidatedCarts(prevCarts =>
            prevCarts.map(product =>
                product._id === id ? { ...product, quantity: product.quantity + 1 } : product
            )
        );
    };

    const handleItemDecrement = (id) => {
        setConsolidatedCarts(prevCarts =>
            prevCarts.map(product =>
                product._id === id && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
            )
        );
    };

    // Calculate the subtotal based on the quantity of each product
    const subtotal = consolidatedCarts.reduce((sum, product) => {
        return sum + (product.price * product.quantity);
    }, 0);

    const shipping = 'Free';

    return (
        <div className="w-full lg:w-4/5 mx-auto py-20 px-3 lg:px-0 flex flex-col lg:flex-row gap-24">
            <div className="w-full lg:w-2/3">
                <h2 className="text-3xl font-Barlow font-semibold mb-6">An overview of your order</h2>
                <div className="rounded-lg">
                    {consolidatedCarts.map(product => (
                        <div key={product._id} className="flex justify-between items-center p-6 border-b bg-[#FAFAFA]">
                            <div className="flex gap-8">
                                <div className="flex items-center gap-3">
                                    {/* Product Increment and Decrement section */}
                                    <button
                                        onClick={() => handleItemDecrement(product._id)}
                                        className="text-lg border px-2 rounded-md"
                                    >
                                        −
                                    </button>
                                    <span>{product.quantity}</span>
                                    <button
                                        onClick={() => handleItemIncrement(product._id)}
                                        className="text-lg border px-2 rounded-md"
                                    >
                                        +
                                    </button>
                                </div>
                                <img className="w-20 h-20 object-cover rounded-md bg-[#eaeaea] p-3" src={product.image} alt={product.name} />
                                <h3 className="font-Barlow text-base font-bold">{product.name}</h3>
                            </div>
                            <div className="flex justify-between items-end flex-col gap-10">
                                <button onClick={() => handleDeleteItem(product._id)} className="text-lg"><RxCross1 /></button>
                                <p className="font-Barlow text-xl font-semibold">€{(product.price * product.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right column: Order details */}
            <div className="w-full lg:w-1/3">
                <h2 className="text-3xl font-Barlow font-semibold mb-6">Order details</h2>
                <div className="p-6 bg-[#FAFAFA]  border-[#DEDEDE] rounded-lg shadow-sm">
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-[#656565] font-Barlow text-xl font-normal">
                            <span>Subtotal</span>
                            <span>€{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-[#656565] font-Barlow text-xl font-normal">
                            <span>Shipping</span>
                            <span>{shipping}</span>
                        </div>
                        <div className="flex justify-between text-[#656565] font-Barlow text-xl font-normal">
                            <span className="flex items-center">Estimated Tax</span>
                            <span>€-</span>
                        </div>
                    </div>
                    <div className="flex justify-between text-[#656565] font-Barlow text-2xl font-semibold">
                        <span>Total</span>
                        <span>€{subtotal.toFixed(2)}</span>
                    </div>
                </div>
                <button className="mt-6 w-full py-3 bg-black text-lg font-Barlow text-white rounded-lg">Go to checkout</button>
            </div>
        </div>
    );
};

export default CheckOut;

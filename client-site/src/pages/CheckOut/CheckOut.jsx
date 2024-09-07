import { RxCross1 } from "react-icons/rx";
import useCarts from "../../hooks/useCarts";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckOut = () => {
    const { refetch, carts } = useCarts();
    const axisoCommon = useAxios()
    const { user } = useAuth();

    const handleDeleteItem = () => {
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
                axisoCommon.delete(`/carts/${user?.email}`)
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
    }

    const handleItemIncrement = () => {
        console.log("handle Item Increment");
    }
    const handleItemDecrement = () => {
        console.log("handle Item decrement");
    }

    const subtotal = carts.reduce((sum, product) => sum + product.price, 0);
    const shipping = 'Free';

    return (
        <div className="w-full lg:w-4/5 mx-auto py-20 px-3 lg:px-0 flex flex-col lg:flex-row gap-24">
            <div className="w-full lg:w-2/3">
                <h2 className="text-3xl font-Barlow font-semibold mb-6">An overview of your order</h2>
                <div className="rounded-lg">
                    {carts.map(product => (
                        <div key={product._id} className="flex justify-between items-center p-6 border-b bg-[#FAFAFA]">
                            <div className="flex gap-8">
                                <div className="flex items-center gap-3">
                                    {/* product Increment and Decrement section */}
                                    <button onClick={handleItemIncrement} className="text-lg border px-2 rounded-md">−</button>
                                    <span>{product.length}</span>
                                    <button onClick={handleItemDecrement} className="text-lg border px-2 rounded-md">+</button>
                                </div>
                                <img className="w-20 h-20 object-cover rounded-md bg-[#eaeaea] p-3" src={product.image} alt={product.name} />
                                <h3 className="font-Barlow text-base font-bold">{product.name}</h3>
                            </div>
                            <div className="flex justify-between items-end flex-col gap-10">
                                <button onClick={() => handleDeleteItem(product?._id)} className="text-lg "><RxCross1 /></button>
                                <p className="font-Barlow text-xl font-semibold">€{product.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right column: Order details */}
            <div className="w-full lg:w-1/3">
                <h2 className="text-3xl font-Barlow font-semibold mb-6">Oder details</h2>
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
                            <span className="flex items-center">
                                Estimated Tax
                            </span>
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
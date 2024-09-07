import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useCarts = () => {
    const axiosCommon = useAxios();
    const { user } = useAuth()
    const { refetch, data: carts = [] } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await axiosCommon.get(`/carts?email=${user?.email}`);
            return res.data;
        }
    });
    console.log('from hook', carts);
    return { carts, refetch };  // Return carts as an object to avoid confusion
};

export default useCarts;

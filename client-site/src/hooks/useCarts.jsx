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
    return { carts, refetch };
};

export default useCarts;

import axios from "axios";

export const axisoCommon = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`
})

const useAxios = () => {
    return axisoCommon
};

export default useAxios;
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const useAuth = () => {
    const allContextData = useContext(AuthContext);
    return allContextData
};

export default useAuth;
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Header/Navbar';
import Footer from '../pages/Footer/Footer';

const Root = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Root;
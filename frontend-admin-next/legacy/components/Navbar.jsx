import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user } = useAuth();

    return (
        <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
            <div className="flex items-center gap-3">
                <span className="text-gray-600">Welcome, {user?.username}</span>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user?.username?.charAt(0).toUpperCase()}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

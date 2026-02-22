import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiPackage, FiShoppingBag, FiTag, FiImage, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout } = useAuth();

    const menuItems = [
        { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
        { path: '/products', icon: FiPackage, label: 'Products' },
        { path: '/orders', icon: FiShoppingBag, label: 'Orders' },
        { path: '/brands', icon: FiTag, label: 'Brands' },
        { path: '/sliders', icon: FiImage, label: 'Sliders' },
    ];

    return (
        <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">MAVRIC</h1>
                <p className="text-sm text-gray-400">Admin Panel</p>
            </div>

            <nav className="space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                                isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-800'
                            }`
                        }
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition w-full mt-8"
            >
                <FiLogOut size={20} />
                <span>Logout</span>
            </button>
        </div>
    );
};

export default Sidebar;

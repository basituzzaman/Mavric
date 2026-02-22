import React, { useEffect, useState } from 'react';
import { getAdminProducts, getAdminOrders } from '../services/api';
import { FiPackage, FiShoppingBag, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        pendingOrders: 0,
        revenue: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [productsRes, ordersRes] = await Promise.all([
                getAdminProducts({}),
                getAdminOrders({})
            ]);

            const products = productsRes.data.products || [];
            const orders = ordersRes.data.orders || [];
            
            const pending = orders.filter(o => o.status === 'pending').length;
            const revenue = orders
                .filter(o => o.status !== 'cancelled')
                .reduce((sum, o) => sum + parseFloat(o.total_amount), 0);

            setStats({
                totalProducts: products.length,
                totalOrders: orders.length,
                pendingOrders: pending,
                revenue: revenue
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const statCards = [
        {
            title: 'Total Products',
            value: stats.totalProducts,
            icon: FiPackage,
            color: 'bg-blue-500',
        },
        {
            title: 'Total Orders',
            value: stats.totalOrders,
            icon: FiShoppingBag,
            color: 'bg-green-500',
        },
        {
            title: 'Pending Orders',
            value: stats.pendingOrders,
            icon: FiTrendingUp,
            color: 'bg-yellow-500',
        },
        {
            title: 'Total Revenue',
            value: `BDT ${stats.revenue.toLocaleString()}`,
            icon: FiDollarSign,
            color: 'bg-purple-500',
        },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                                <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
                            </div>
                            <div className={`${stat.color} p-4 rounded-lg`}>
                                <stat.icon className="text-white" size={24} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Welcome to Mavric Admin Panel</h2>
                <p className="text-gray-600">
                    Manage your e-commerce store efficiently. Navigate using the sidebar to manage products, orders, brands, and sliders.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { FiPackage } from 'react-icons/fi';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        // Temporary solution: Get orders from localStorage
        try {
            const storedOrders = localStorage.getItem('customerOrders');
            if (storedOrders) {
                const ordersData = JSON.parse(storedOrders);
                setOrders(ordersData);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'confirmed':
                return 'bg-blue-100 text-blue-800';
            case 'processing':
                return 'bg-purple-100 text-purple-800';
            case 'shipped':
                return 'bg-indigo-100 text-indigo-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">My Orders</h1>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">No Orders Yet</h2>
                        <p className="text-gray-500 mb-6">You haven't placed any orders yet. Start shopping to see your orders here.</p>
                        <a 
                            href="/"
                            className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
                        >
                            Start Shopping
                        </a>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition">
                                <div className="p-6">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                                        <div>
                                            <h3 className="font-semibold text-lg">Order #{order.order_number}</h3>
                                            <p className="text-sm text-gray-500">
                                                Placed on {new Date(order.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="mt-2 sm:mt-0">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 mb-1">Customer</p>
                                            <p className="font-semibold">{order.customer_name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 mb-1">Contact</p>
                                            <p className="font-semibold">+880{order.customer_phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 mb-1">Delivery Address</p>
                                            <p className="text-sm">{order.delivery_address}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 mb-1">Total Amount</p>
                                            <p className="font-semibold">BDT {parseFloat(order.total_amount).toLocaleString()}</p>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="mb-4">
                                        <p className="text-sm font-medium text-gray-600 mb-2">Order Items</p>
                                        <div className="space-y-2">
                                            {order.items && order.items.map((item, index) => (
                                                <div key={index} className="bg-gray-50 rounded p-3 flex justify-between items-center">
                                                    <div>
                                                        <p className="font-medium text-sm">{item.product_name || `Product ID: ${item.product_id}`}</p>
                                                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                                                    </div>
                                                    <p className="font-bold text-sm">BDT {(parseFloat(item.price || 0) * (item.quantity || 1)).toLocaleString()}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border-t pt-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Subtotal:</span>
                                            <span>BDT {parseFloat(order.total_amount - (order.delivery_charge || 70)).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Delivery:</span>
                                            <span>BDT {order.delivery_charge || 70}</span>
                                        </div>
                                        <div className="flex justify-between font-bold text-base mt-2 pt-2 border-t">
                                            <span>Total:</span>
                                            <span>BDT {parseFloat(order.total_amount).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;

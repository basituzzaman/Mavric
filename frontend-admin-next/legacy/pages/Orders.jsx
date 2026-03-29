import React, { useEffect, useState } from 'react';
import { getAdminOrders, updateOrderStatus, getAdminProducts } from '../services/api';
import { FiX, FiMapPin, FiUser, FiPackage, FiTruck, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [products, setProducts] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 20;

    useEffect(() => {
        fetchOrders();
        fetchAllProducts();
    }, []);

    useEffect(() => {
        if (selectedOrder && selectedOrder.items && selectedOrder.items.length > 0) {
            const productIds = selectedOrder.items.map(item => item.product_id);
            fetchProductsByIds(productIds);
        }
    }, [selectedOrder]);

    const fetchAllProducts = async () => {
        try {
            const response = await getAdminProducts({});
            const productsMap = {};
            response.data.products.forEach(product => {
                productsMap[product.id] = product;
            });
            setProducts(productsMap);
        } catch (error) {
            console.error('Error fetching all products:', error);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await getAdminOrders({});
            setOrders(response.data.orders || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProductsByIds = async (ids) => {
        try {
            const response = await getAdminProducts({});
            const newProductsMap = {};
            response.data.products.forEach(product => {
                if (ids.includes(product.id)) {
                    newProductsMap[product.id] = product;
                }
            });
            // Merge with existing products instead of replacing
            setProducts(prevProducts => ({ ...prevProducts, ...newProductsMap }));
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            alert('Order status updated');
            fetchOrders();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-blue-100 text-blue-800',
            processing: 'bg-purple-100 text-purple-800',
            shipped: 'bg-indigo-100 text-indigo-800',
            delivered: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    // Pagination calculations
    const totalOrders = orders.length;
    const totalPages = Math.ceil(totalOrders / ordersPerPage);
    const startIndex = (currentPage - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    const currentOrders = orders.slice(startIndex, endIndex);
    const startItem = startIndex + 1;
    const endItem = Math.min(endIndex, totalOrders);

    // Generate page numbers array
    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders</h1>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium">{order.order_number}</td>
                                <td className="px-6 py-4">
                                    {Array.isArray(order.product_ids) && order.product_ids.length > 0
                                        ? order.product_ids.map(id => {
                                              const product = products[id];
                                              return product ? product.product_code || product.code || `ID:${id}` : `ID:${id}`;
                                          }).join(', ')
                                        : '-'
                                    }
                                </td>
                                <td className="px-6 py-4">{order.customer_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">+880{order.customer_phone}</td>
                                <td className="px-6 py-4">BDT {parseFloat(order.total_amount).toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="bg-black text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-gray-800 transition"
                                        >
                                            View Details
                                        </button>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="mt-6 space-y-4">
                        {/* Showing text */}
                        <p className="text-sm text-gray-500 text-center">
                            Showing {startItem}–{endItem} of {totalOrders} orders
                        </p>

                        {/* Pagination buttons */}
                        <div className="flex justify-center items-center gap-2">
                            {/* Previous Button */}
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                            >
                                <FiChevronLeft size={16} />
                                Previous
                            </button>

                            {/* Page Numbers */}
                            <div className="flex gap-1">
                                {getPageNumbers().map(pageNum => (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium transition ${
                                            currentPage === pageNum
                                                ? 'bg-black text-white'
                                                : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                ))}
                            </div>

                            {/* Next Button */}
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                            >
                                Next
                                <FiChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6 pb-4 border-b">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                                    <p className="text-gray-500 text-sm mt-1">{selectedOrder.order_number}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition"
                                >
                                    <FiX size={24} />
                                </button>
                            </div>

                            {/* Status */}
                            <div className="mb-6">
                                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedOrder.status)}`}>
                                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                                </span>
                            </div>

                            {/* Customer Info */}
                            <div className="mb-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <FiUser className="text-gray-600" />
                                    Customer Information
                                </h3>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="font-medium text-gray-600 w-24">Name:</span>
                                        <span className="font-semibold">{selectedOrder.customer_name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-medium text-gray-600 w-24">Phone:</span>
                                        <span className="font-semibold">+880{selectedOrder.customer_phone}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Info */}
                            <div className="mb-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <FiTruck className="text-gray-600" />
                                    Delivery Information
                                </h3>
                                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                    <div className="flex items-start gap-3">
                                        <FiMapPin className="text-gray-600 mt-1" />
                                        <div>
                                            <p className="font-medium text-gray-600">Address:</p>
                                            <p className="font-semibold mt-1">{selectedOrder.delivery_address}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-medium text-gray-600 w-24">Zone:</span>
                                        <span className="font-semibold">
                                            {selectedOrder.delivery_zone === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="mb-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <FiPackage className="text-gray-600" />
                                    Order Items
                                </h3>
                                <div className="space-y-3">
                                    {selectedOrder.items && selectedOrder.items.map((item, index) => {
                                        const product = products[item.product_id];
                                        return (
                                            <div key={index} className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                                                <div>
                                                    <p className="font-semibold">{product ? product.name : `Product ID: ${item.product_id || 'Unknown'}`}</p>
                                                    <p className="text-sm text-gray-600">Qty: {item.quantity || 1}</p>
                                                </div>
                                                <p className="font-bold">BDT {(parseFloat(product ? product.price : 0) * (item.quantity || 1)).toLocaleString()}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="border-t pt-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal:</span>
                                        <span className="font-semibold">BDT {parseFloat(selectedOrder.total_amount - (selectedOrder.delivery_charge || 70)).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Delivery:</span>
                                        <span className="font-semibold">
                                            BDT {selectedOrder.delivery_charge || (selectedOrder.delivery_zone === 'outside' ? 120 : 70)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold border-t pt-2 mt-2">
                                        <span>Total:</span>
                                        <span>BDT {parseFloat(selectedOrder.total_amount).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t text-sm text-gray-500">
                                <p>Order Date: {new Date(selectedOrder.created_at).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder, ASSET_BASE_URL } from '../services/api';
import { FiTrash2, FiMinus, FiPlus, FiChevronRight } from 'react-icons/fi';

const CheckoutForm = () => {
    const navigate = useNavigate();
    const { cart, getTotalAmount, clearCart, removeFromCart, updateQuantity } = useCart();
    const [deliveryZone, setDeliveryZone] = useState('inside');
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        delivery_address: ''
    });
    const [loading, setLoading] = useState(false);

    const deliveryCharge = deliveryZone === 'inside' ? 70 : 120;
    const totalWithDelivery = getTotalAmount() + deliveryCharge;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                ...formData,
                total_amount: totalWithDelivery,
                delivery_charge: deliveryCharge,
                delivery_zone: deliveryZone,
                payment_method: 'Cash on Delivery',
                items: cart.map(item => ({
                    product_id: item.id,
                    product_name: item.name,
                    quantity: item.quantity,
                    price: item.price
                }))
            };

            const response = await createOrder(orderData);
            
            if (response.data.success) {
                // Save order to localStorage for customer view
                const orderData = {
                    id: response.data.order_id || Date.now(),
                    order_number: response.data.order_number || `ORD-${Date.now()}`,
                    customer_name: formData.customer_name,
                    customer_phone: formData.customer_phone,
                    customer_email: formData.customer_email,
                    delivery_address: formData.delivery_address,
                    delivery_zone: deliveryZone,
                    delivery_charge: deliveryCharge,
                    total_amount: totalWithDelivery,
                    status: 'pending',
                    payment_method: 'Cash on Delivery',
                    items: cart.map(item => ({
                        product_id: item.id,
                        product_name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    created_at: new Date().toISOString()
                };

                // Get existing orders or create new array
                const existingOrders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
                existingOrders.push(orderData);
                localStorage.setItem('customerOrders', JSON.stringify(existingOrders));

                clearCart();
                navigate('/thank-you');
            }
        } catch (error) {
            console.error('Order creation error:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <button 
                    onClick={() => navigate('/')}
                    className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Link to="/" className="hover:text-black transition">Home</Link>
                <FiChevronRight size={16} />
                <span className="text-black font-medium">Checkout</span>
            </div>

            {/* Place Order Title */}
            <h1 className="text-3xl font-bold text-black mb-8">Place order</h1>

            <div className="grid lg:grid-cols-5 gap-8">
                {/* Order Form - Left Side (3 columns) */}
                <div className="lg:col-span-3">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Contact Section */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Contact</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-3 bg-white">
                                            <span className="text-lg">🇧🇩</span>
                                            <span className="text-gray-600">(+880)</span>
                                        </div>
                                        <input
                                            type="tel"
                                            name="customer_phone"
                                            placeholder="Phone number"
                                            required
                                            value={formData.customer_phone}
                                            onChange={handleChange}
                                            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Personal Info Section */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Personal Info</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="customer_name"
                                        placeholder="Full Name"
                                        required
                                        value={formData.customer_name}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address Section */}
                        <div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Address<span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="delivery_address"
                                        placeholder="Address"
                                        required
                                        rows="3"
                                        value={formData.delivery_address}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Delivery Zone Section */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">
                                Delivery Zone <span className="text-red-500">*</span>
                            </h3>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setDeliveryZone('inside')}
                                    className={`px-6 py-3 rounded-full border-2 font-medium transition ${
                                        deliveryZone === 'inside'
                                            ? 'border-black bg-black text-white'
                                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                    }`}
                                >
                                    Inside Dhaka
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDeliveryZone('outside')}
                                    className={`px-6 py-3 rounded-full border-2 font-medium transition ${
                                        deliveryZone === 'outside'
                                            ? 'border-black bg-black text-white'
                                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                    }`}
                                >
                                    Outside Dhaka
                                </button>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center gap-3">
                                <input type="radio" checked readOnly className="w-4 h-4" />
                                <label className="font-semibold">Cash on Delivery</label>
                            </div>
                            <p className="text-sm text-gray-600 mt-2 ml-7">
                                Pay when you receive your order
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400 transition"
                        >
                            {loading ? 'Processing...' : 'Place Order'}
                        </button>
                    </form>
                </div>

                {/* Order Summary - Right Side (2 columns) */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg p-6 sticky top-20">
                        <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                        
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-3 bg-gray-50 p-3 rounded-lg">
                                    <img 
                                        src={`${ASSET_BASE_URL}${item.image_url}`} 
                                        alt={item.name} 
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                                        <div className="mt-2">
                                            <p className="text-sm font-medium mb-1">Quantity</p>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
                                                >
                                                    <FiMinus size={14} />
                                                </button>
                                                <span className="text-base font-semibold w-6 text-center">{item.quantity}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
                                                >
                                                    <FiPlus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="font-bold text-sm mt-1">
                                            BDT {(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="border-t mt-4 pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Subtotal</span>
                                <span>BDT {getTotalAmount().toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Delivery</span>
                                <span>BDT {deliveryCharge}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold border-t pt-3">
                                <span>Total</span>
                                <span>BDT {totalWithDelivery.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;

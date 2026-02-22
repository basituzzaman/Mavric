import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';
import { FaWhatsapp } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';

const CheckoutForm = () => {
    const navigate = useNavigate();
    const { cart, getTotalAmount, clearCart, removeFromCart } = useCart();
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        delivery_address: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                ...formData,
                total_amount: getTotalAmount(),
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
                alert('Order placed successfully!');
                clearCart();
                
                // WhatsApp message
                const message = `New Order: ${response.data.order_number}\nName: ${formData.customer_name}\nPhone: ${formData.customer_phone}\nAddress: ${formData.delivery_address}\nTotal: ${getTotalAmount()} BDT`;
                window.open(`https://wa.me/8801890020483?text=${encodeURIComponent(message)}`, '_blank');
                
                navigate('/');
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
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold mb-6">Checkout</h2>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Order Form */}
                <div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Contact */}
                        <div>
                            <h3 className="font-semibold text-lg mb-3">Contact Information</h3>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    name="customer_name"
                                    placeholder="Your Name"
                                    required
                                    value={formData.customer_name}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                <input
                                    type="tel"
                                    name="customer_phone"
                                    placeholder="Phone Number"
                                    required
                                    value={formData.customer_phone}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                <input
                                    type="email"
                                    name="customer_email"
                                    placeholder="Email (optional)"
                                    value={formData.customer_email}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>
                        </div>

                        {/* Delivery Address */}
                        <div>
                            <h3 className="font-semibold text-lg mb-3">Delivery Address</h3>
                            <textarea
                                name="delivery_address"
                                placeholder="Full Address"
                                required
                                rows="3"
                                value={formData.delivery_address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                            />
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

                {/* Order Summary */}
                <div>
                    <div className="bg-gray-50 rounded-lg p-6 sticky top-20">
                        <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                        
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-3 bg-white p-3 rounded-lg">
                                    <img 
                                        src={`http://localhost/mavric-backend${item.image_url}`} 
                                        alt={item.name} 
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
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

                        <div className="border-t mt-4 pt-4">
                            <div className="flex justify-between text-sm mb-2">
                                <span>Subtotal</span>
                                <span>BDT {getTotalAmount().toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm mb-2">
                                <span>Delivery</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold border-t pt-3">
                                <span>Total</span>
                                <span>BDT {getTotalAmount().toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* WhatsApp Button */}
            <a
                href="https://wa.me/8801890020483"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition z-50"
            >
                <FaWhatsapp size={32} />
            </a>
        </div>
    );
};

export default CheckoutForm;

import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiShoppingBag, FiPhone, FiMail } from 'react-icons/fi';

const ThankYou = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center" style={{ padding: '1rem' }}>
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                {/* Success Icon */}
                <div className="mb-6">
                    <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <FiCheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                </div>

                {/* Thank You Message */}
                <h1 className="text-2xl font-bold text-gray-800 mb-3">
                    Thank You for Your Order!
                </h1>
                
                <p className="text-gray-600 mb-8">
                    Our representative will contact you soon to confirm your order details and delivery.
                </p>

                {/* Contact Info */}
                <div className="space-y-3 mb-8">
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                        <FiPhone className="text-gray-400" />
                        <span className="text-sm">01804753688</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                        <FiMail className="text-gray-400" />
                        <span className="text-sm">mavric.bd@gmail.com</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Link 
                        to="/"
                        className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2"
                    >
                        <FiShoppingBag className="w-4 h-4" />
                        Continue Shopping
                    </Link>
                    
                    <Link 
                        to="/"
                        className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;

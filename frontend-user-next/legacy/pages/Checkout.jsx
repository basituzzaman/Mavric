import React from 'react';
import Header from '../components/Header';
import CheckoutForm from '../components/CheckoutForm';

const Checkout = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <CheckoutForm />
        </div>
    );
};

export default Checkout;

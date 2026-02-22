import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';

const AllProductsPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response.data?.products || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white shadow-md">
                <div className="flex items-center justify-between px-4 py-3 h-16">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <FiArrowLeft size={24} />
                    </button>
                    <h1 className="text-lg font-semibold">All Products</h1>
                    <div className="w-10"></div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="px-4 py-6">
                {products.length > 0 ? (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">All Products</h2>
                            <span className="text-gray-600">
                                {products.length} {products.length === 1 ? 'product' : 'products'}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <div className="text-gray-500">
                            <div className="text-6xl mb-4">📦</div>
                            <h3 className="text-xl font-semibold mb-2">No Products Available</h3>
                            <p>There are no products available at the moment.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllProductsPage;

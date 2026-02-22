import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from './ProductCard';

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data.products || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewAll = () => {
        navigate('/featured-products');
    };

    if (loading) {
        return (
            <div className="px-4 py-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Featured Products</h2>
                <button 
                    onClick={handleViewAll}
                    className="text-sm font-semibold flex items-center gap-1 hover:underline border-2 border-black px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                    View All →
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
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
            const response = await getProducts({ featured: 1, limit: 8 });
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
            <div className="ui-container px-3 sm:px-4 py-7">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <div key={item} className="bg-gray-200 animate-pulse rounded-xl h-80 sm:h-96"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div style={{ paddingLeft: '16px', paddingRight: '16px' }} className="ui-container py-7">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-[1.5rem] sm:text-2xl leading-none font-bold tracking-tight">Featured Products</h2>
                <button
                    onClick={handleViewAll}
                    className="h-8 px-3 text-xs font-semibold inline-flex items-center gap-1 border-2 border-black rounded-lg bg-white hover:bg-gray-100 transition"
                >
                    View All
                    <FiArrowRight size={12} />
                </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;

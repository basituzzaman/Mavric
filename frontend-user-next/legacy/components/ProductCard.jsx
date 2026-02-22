import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiArrowRight } from 'react-icons/fi';
import { ASSET_BASE_URL } from '../services/api';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleDetails = () => {
        // Navigate to product details page
        navigate(`/product/${product.id}`);
    };

    const imageUrl = product.image_url 
        ? `${ASSET_BASE_URL}${product.image_url}` 
        : '/placeholder-watch.jpg';

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
            {/* Discount Badge */}
            {product.discount_percentage !== 0 && (
                <div className="absolute top-2 left-2 bg-black text-white w-10 h-10 rounded-full flex flex-col items-center justify-center text-[10px] font-bold z-10 leading-none">
                    {product.discount_text || '-11%'}
                </div>
            )}

            {/* Second Badge */}
            {product.second_badge_text && (
                <div className="absolute top-2 right-2 bg-black text-white w-10 h-10 rounded-full flex flex-col items-center justify-center text-[9px] font-bold z-10 leading-none">
                    {product.second_badge_text === 'Best Seller' ? (
                        <>
                            <span>Best</span>
                            <span>Seller</span>
                        </>
                    ) : (
                        product.second_badge_text
                    )}
                </div>
            )}
            
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-100">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Product Info */}
            <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-12">
                    {product.name}
                </h3>
                
                {/* Price */}
                <div className="mb-3">
                    <span className="text-xl font-bold text-gray-900 block">
                        BDT {parseFloat(product.price).toLocaleString()}
                    </span>
                    {parseFloat(product.original_price) > parseFloat(product.price) && (
                        <span className="text-sm text-gray-400 line-through">
                            BDT {parseFloat(product.original_price).toLocaleString()}
                        </span>
                    )}
                </div>

                {/* Details Button */}
                <div className="space-y-2">
                    <button
                        onClick={handleDetails}
                        className="w-full bg-white border-2 border-black text-black py-3 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                    >
                        Details
                        <FiArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;

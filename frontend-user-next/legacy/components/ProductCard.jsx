import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { ASSET_BASE_URL } from '../services/api';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const discountPercentage = Number(product.discount_percentage) || 0;

    const handleDetails = () => {
        // Navigate to product details page
        navigate(`/product/${product.id}`);
    };

    const imageUrl = product.image_url 
        ? `${ASSET_BASE_URL}${product.image_url}` 
        : '/placeholder-watch.jpg';

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 relative">
            {/* Discount Badge */}
            {discountPercentage > 0 && (
                <div style={{ position: 'absolute', top: '16px', left: '16px' }} className="bg-black text-white w-11 h-11 rounded-full flex flex-col items-center justify-center text-[10px] font-bold z-10 leading-none shadow">
                    -{discountPercentage}%
                </div>
            )}

            {/* Second Badge */}
            {product.second_badge_text && (
                <div style={{ position: 'absolute', top: '16px', right: '16px' }} className="bg-black text-white w-11 h-11 rounded-full flex flex-col items-center justify-center text-[9px] font-bold z-10 leading-none shadow">
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
            <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
                />
            </div>

            {/* Product Info */}
            <div className="p-3.5 sm:p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[2.9rem] leading-snug text-[1.02rem]">
                    {product.name}
                </h3>

                {/* Price */}
                <div className="mb-3 flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                    <span className="text-[2rem] sm:text-[2.2rem] leading-none font-extrabold text-gray-900 tracking-tight">
                        BDT {parseFloat(product.price).toLocaleString()}
                    </span>
                    {parseFloat(product.original_price) > parseFloat(product.price) && (
                        <span className="text-sm text-gray-400 line-through whitespace-nowrap">
                            BDT {parseFloat(product.original_price).toLocaleString()}
                        </span>
                    )}
                </div>

                {/* Details Button */}
                <button
                    onClick={handleDetails}
                    className="w-full h-10 bg-white border-2 border-black text-black rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                    Details
                    <FiArrowRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

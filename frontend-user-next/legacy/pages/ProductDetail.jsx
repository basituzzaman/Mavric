import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await getProductById(id);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        alert('Product added to cart!');
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        navigate('/checkout');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <div className="container mx-auto px-4 py-20 text-center">
                    Loading product details...
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-white">
                <div className="container mx-auto px-4 py-20 text-center">
                    <h2 className="text-2xl font-bold mb-4">Product not found</h2>
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-black text-white px-6 py-3 rounded-lg"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Product Image */}
                        <div className="relative">
                            {product.discount_percentage > 0 && (
                                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold z-10">
                                    Save {product.discount_percentage}%
                                </div>
                            )}
                            <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square">
                                <img
                                    src={`http://localhost/mavric-backend${product.image_url}`}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col">
                            <div className="mb-2">
                                <span className="text-sm text-gray-500 font-medium">
                                    {product.brand_name}
                                </span>
                            </div>
                            
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {product.name}
                            </h1>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl font-bold text-gray-900">
                                        BDT {product.price.toLocaleString()}
                                    </span>
                                    {product.original_price > product.price && (
                                        <span className="text-xl text-gray-400 line-through">
                                            BDT {product.original_price.toLocaleString()}
                                        </span>
                                    )}
                                </div>
                                {product.discount_percentage > 0 && (
                                    <p className="text-sm text-green-600 font-semibold mt-1">
                                        You save: BDT {(product.original_price - product.price).toLocaleString()} 
                                        ({product.discount_percentage}% OFF)
                                    </p>
                                )}
                            </div>

                            {/* Stock Status */}
                            <div className="mb-6">
                                {product.stock_quantity > 0 ? (
                                    <span className="text-green-600 font-semibold">
                                        ✓ In Stock ({product.stock_quantity} available)
                                    </span>
                                ) : (
                                    <span className="text-red-600 font-semibold">
                                        ✗ Out of Stock
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            {product.description && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>
                            )}

                            {/* Quantity Selector */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold mb-2">Quantity</label>
                                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-3 hover:bg-gray-100 transition"
                                    >
                                        <FiMinus />
                                    </button>
                                    <span className="px-6 py-2 font-semibold min-w-[60px] text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-3 hover:bg-gray-100 transition"
                                        disabled={quantity >= product.stock_quantity}
                                    >
                                        <FiPlus />
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleBuyNow}
                                    disabled={product.stock_quantity === 0}
                                    className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    Buy Now
                                </button>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stock_quantity === 0}
                                    className="w-full bg-white border-2 border-black text-black py-4 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2 disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed"
                                >
                                    <FiShoppingCart /> Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

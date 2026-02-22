import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById, ASSET_BASE_URL } from '../services/api';
import { FiShoppingCart, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        // Load product data
        const loadProduct = async () => {
            try {
                const response = await getProductById(id);
                console.log('📦 Product data received:', response);
                console.log('📦 Response structure:', JSON.stringify(response, null, 2));
                
                if (response.data && response.data.product) {
                    // Try to get additional fields from localStorage
                    const savedAdditionalFields = localStorage.getItem(`product_${id}_additional`);
                    const additionalFields = savedAdditionalFields ? JSON.parse(savedAdditionalFields) : {};
                    console.log('🔍 Additional fields from localStorage:', additionalFields);
                    
                    // Merge backend data with localStorage data
                    const mergedProduct = {
                        ...response.data.product,
                        product_code: response.data.product.product_code || additionalFields.product_code,
                        features: response.data.product.features || additionalFields.features,
                        additional_images: response.data.product.additional_images || additionalFields.additional_images || []
                    };
                    
                    console.log('🔍 Merged product data:', mergedProduct);
                    console.log('🔍 Product code:', mergedProduct.product_code);
                    console.log('🔍 Features:', mergedProduct.features);
                    console.log('🔍 Additional images:', mergedProduct.additional_images);
                    setProduct(mergedProduct);
                } else {
                    console.error('❌ Product not found:', response);
                    setProduct(null);
                }
            } catch (error) {
                console.error('❌ Error loading product:', error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
            alert('Product added to cart!');
        }
    };

    const handleBuyNow = () => {
        if (product) {
            addToCart(product, quantity);
            navigate('/checkout');
        }
    };

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-500">Product not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <FiArrowLeft size={24} />
                    </button>
                    <h1 className="text-lg font-semibold ml-4">Product Details</h1>
                </div>
            </div>

            {/* Product Content */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Product Image */}
                    <div className="relative">
                        {/* Main Image Display */}
                        <div className="relative h-[320px] sm:h-[460px] md:h-[620px] bg-gray-100 border-b border-gray-200 overflow-hidden">
                            <img
                                src={selectedImage === 0 
                                    ? `${ASSET_BASE_URL}${product.image_url}`
                                    : `${ASSET_BASE_URL}${product.additional_images[selectedImage - 1]}`
                                }
                                alt={product.name}
                                className="w-full h-full object-cover object-center"
                                onError={(e) => { e.target.src = '/placeholder.jpg'; }}
                            />
                        </div>

                        {/* Thumbnail Images */}
                        <div className="flex gap-2 mt-4 px-4">
                            {/* Primary Image Thumbnail */}
                            <button
                                onClick={() => setSelectedImage(0)}
                                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                    selectedImage === 0 
                                        ? 'border-black' 
                                        : 'border-gray-300 hover:border-gray-400'
                                }`}
                            >
                                <img
                                    src={`${ASSET_BASE_URL}${product.image_url}`}
                                    alt={`${product.name} - Main`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = '/placeholder.jpg'; }}
                                />
                            </button>
                            
                            {/* Additional Images Thumbnails */}
                            {product.additional_images && product.additional_images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index + 1)}
                                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                        selectedImage === index + 1 
                                            ? 'border-black' 
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                >
                                    <img
                                        src={`${ASSET_BASE_URL}${image}`}
                                        alt={`${product.name} view ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = '/placeholder.jpg'; }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                        
                        {/* Product Code */}
                        {product.product_code && (
                            <p className="text-sm text-gray-500 mb-2">Product Code: {product.product_code}</p>
                        )}
                        
                        {/* Brand Information */}
                        {product.brand_name && (
                            <p className="text-sm text-gray-600 mb-4">Brand: {product.brand_name}</p>
                        )}
                        
                        {/* Price */}
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-gray-900 block mb-2">
                                BDT {parseFloat(product.price).toLocaleString()}
                            </span>
                            {parseFloat(product.original_price) > parseFloat(product.price) && (
                                <span className="text-lg text-gray-400 line-through">
                                    BDT {parseFloat(product.original_price).toLocaleString()}
                                </span>
                            )}
                            {product.discount_percentage > 0 && (
                                <div className="mt-2">
                                    <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                                        {product.discount_percentage}% OFF
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div className="mb-6">
                            {product.stock_quantity > 0 ? (
                                <span className="text-green-600 font-semibold">✓ In Stock ({product.stock_quantity} available)</span>
                            ) : (
                                <span className="text-red-600 font-semibold">✗ Out of Stock</span>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Description</h2>
                            <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
                        </div>

                        {/* Features */}
                        {console.log('🔍 Checking features:', product.features, 'length:', product.features?.length)}
                        {product.features && Array.isArray(product.features) && product.features.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">Features</h2>
                                <ul className="list-disc list-inside text-gray-600">
                                    {product.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Best Seller Badge */}
                        {product.is_best_seller && (
                            <div className="mb-6">
                                <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                                    ⭐ Best Seller
                                </span>
                            </div>
                        )}

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-2">Quantity</h2>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={decreaseQuantity}
                                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
                                >
                                    <FiMinus size={16} />
                                </button>
                                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                                <button
                                    onClick={increaseQuantity}
                                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
                                >
                                    <FiPlus size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-white border-2 border-black text-black py-3 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                            >
                                <FiShoppingCart size={20} />
                                Add to Cart
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getProductById, ASSET_BASE_URL } from '../services/api';
import { FiArrowLeft } from 'react-icons/fi';

const normalizeFeatures = (features) => {
    if (Array.isArray(features)) {
        return features.filter((feature) => typeof feature === 'string' && feature.trim() !== '');
    }

    if (typeof features === 'string') {
        return features
            .split(/[\r\n,]+/)
            .map((feature) => feature.trim())
            .filter(Boolean);
    }

    return [];
};

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const response = await getProductById(id);

                if (response.data && response.data.product) {
                    const savedAdditionalFields = localStorage.getItem(`product_${id}_additional`);
                    const additionalFields = savedAdditionalFields ? JSON.parse(savedAdditionalFields) : {};

                    const mergedProduct = {
                        ...response.data.product,
                        product_code: response.data.product.product_code ?? additionalFields.product_code,
                        additional_images: response.data.product.additional_images ?? additionalFields.additional_images ?? [],
                        features: response.data.product.features ?? additionalFields.features ?? []
                    };

                    setProduct({
                        ...mergedProduct,
                        additional_images: Array.isArray(mergedProduct.additional_images) ? mergedProduct.additional_images : [],
                        features: normalizeFeatures(mergedProduct.features)
                    });
                } else {
                    setProduct(null);
                }
            } catch (error) {
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, 1);
            alert('Product added to cart!');
        }
    };

    const handleBuyNow = () => {
        if (product) {
            addToCart(product, 1);
            navigate('/checkout');
        }
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

    const featureList = normalizeFeatures(product.features);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm sticky top-16 z-30">
                <div className="w-full mx-auto px-4 py-4 flex items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition flex items-center gap-2"
                    >
                        <FiArrowLeft size={24} />
                        <span className="font-medium">Home</span>
                    </button>
                </div>
            </div>

            <div className="w-full mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="relative">
                        <div className="relative aspect-square bg-gray-100 border-b border-gray-200 overflow-hidden">
                            <img
                                src={
                                    selectedImage === 0
                                        ? `${ASSET_BASE_URL}${product.image_url}`
                                        : `${ASSET_BASE_URL}${product.additional_images[selectedImage - 1]}`
                                }
                                alt={product.name}
                                className="w-full h-full object-cover object-center"
                                onError={(e) => {
                                    e.target.src = '/placeholder.jpg';
                                }}
                            />
                        </div>

                        <div className="flex gap-2 mt-4 px-4">
                            <button
                                onClick={() => setSelectedImage(0)}
                                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                    selectedImage === 0 ? 'border-black' : 'border-gray-300 hover:border-gray-400'
                                }`}
                            >
                                <img
                                    src={`${ASSET_BASE_URL}${product.image_url}`}
                                    alt={`${product.name} - Main`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = '/placeholder.jpg';
                                    }}
                                />
                            </button>

                            {product.additional_images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index + 1)}
                                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                        selectedImage === index + 1 ? 'border-black' : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                >
                                    <img
                                        src={`${ASSET_BASE_URL}${image}`}
                                        alt={`${product.name} view ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = '/placeholder.jpg';
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 w-full flex flex-col items-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">{product.name}</h1>

                        {product.product_code && (
                            <p className="text-sm text-gray-500 mb-2 text-center">Product Code: {product.product_code}</p>
                        )}

                        {product.brand_name && <p className="text-sm text-gray-600 mb-2 text-center">Brand: {product.brand_name}</p>}

                        {/* Stock Status */}
                        <div className="mb-4 text-center">
                            {product.stock_quantity > 0 ? (
                                <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                    In Stock
                                </span>
                            ) : (
                                <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center justify-center flex-nowrap gap-3">
                                {parseFloat(product.original_price) > parseFloat(product.price) && (
                                    <span className="text-lg text-gray-400 line-through whitespace-nowrap">
                                        BDT {parseFloat(product.original_price).toLocaleString()}
                                    </span>
                                )}
                                <span className="text-3xl font-bold text-gray-900 whitespace-nowrap">
                                    BDT {parseFloat(product.price).toLocaleString()}
                                </span>
                            </div>
                            {product.discount_percentage > 0 && (
                                <div className="mt-2 text-center">
                                    <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                                        {product.discount_percentage}% OFF
                                    </span>
                                </div>
                            )}
                        </div>

                        {featureList.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2 text-center">Features</h2>
                                <div className="flex justify-center">
                                    <ul className="list-disc list-outside text-gray-600 text-left pl-5 inline-block">
                                        {featureList.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col items-center gap-3">
                            <button
                                onClick={handleBuyNow}
                                className="w-full max-w-lg bg-black border-2 border-black text-white py-5 rounded-xl text-xl font-semibold hover:bg-gray-800 transition"
                            >
                                Order Now
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className="w-full max-w-lg bg-white border-2 border-black text-black py-5 rounded-xl text-xl font-semibold hover:bg-gray-50 transition"
                            >
                                Add to Cart
                            </button>
                        </div>

                        {product.description && (
                            <div className="mt-6">
                                <h2 className="text-lg font-semibold mb-2">Description</h2>
                                <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

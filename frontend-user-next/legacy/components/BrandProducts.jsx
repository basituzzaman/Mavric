import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import ProductCard from './ProductCard';
import { getBrands, getProducts, ASSET_BASE_URL } from '../services/api';

const BrandProducts = () => {
    const { brandId } = useParams();
    const navigate = useNavigate();
    const [brand, setBrand] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('BrandProducts component loaded with brandId:', brandId);
        const loadBrandProducts = async () => {
            console.log('Loading brand products for brandId:', brandId);
            try {
                const [brandsResponse, productsResponse] = await Promise.all([
                    getBrands(),
                    getProducts({ brand_id: brandId, limit: 1000 }),
                ]);

                const matchedBrand = (brandsResponse.data?.brands || []).find(
                    (item) => Number(item.id) === Number(brandId)
                );
                if (matchedBrand) {
                    setBrand(matchedBrand);
                }

                setProducts(productsResponse.data?.products || []);
            } catch (error) {
                console.error('Error loading brand products:', error);
            } finally {
                setLoading(false);
            }
        };

        loadBrandProducts();
    }, [brandId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    if (!brand) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-500">Brand not found</div>
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
                    <h1 className="text-lg font-semibold">
                        {brand.display_name || brand.name} Watches
                    </h1>
                    <div className="w-10"></div>
                </div>
            </div>

            {/* Brand Info */}
            <div className="px-4 py-6">
                <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {brand.logo_url ? (
                            <img
                                src={`${ASSET_BASE_URL}${brand.logo_url}`}
                                alt={brand.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                <span className="text-xl font-bold text-gray-600">{brand.name.charAt(0)}</span>
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {brand.display_name || brand.name}
                        </h2>
                        <p className="text-gray-600">
                            {products.length} {products.length === 1 ? 'watch' : 'watches'} available
                        </p>
                    </div>
                </div>

                {/* Products Grid - Same style as featured products */}
                {products.length > 0 ? (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Watches</h2>
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
                            <div className="text-6xl mb-4">⌚</div>
                            <h3 className="text-xl font-semibold mb-2">No Watches Available</h3>
                            <p>This brand doesn't have any watches at the moment.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrandProducts;

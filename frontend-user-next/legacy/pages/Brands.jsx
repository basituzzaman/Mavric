import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { getBrands, getProducts, ASSET_BASE_URL } from '../services/api';

const Brands = () => {
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const [brandsResponse, productsResponse] = await Promise.all([
                    getBrands(),
                    getProducts({ limit: 1000 }),
                ]);
                const brandsData = brandsResponse.data?.brands || [];
                const products = productsResponse.data?.products || [];
                const withCounts = brandsData.map((brand) => ({
                    ...brand,
                    product_count: products.filter((product) => Number(product.brand_id) === Number(brand.id)).length,
                }));
                setBrands(withCounts);
            } catch (error) {
                console.error('Error fetching brands:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    const handleBrandClick = (brandId) => {
        navigate(`/brand/${brandId}`);
    };

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
            <div className="sticky top-16 z-40 bg-white shadow-md">
                <div className="flex items-center justify-between px-4 py-3 h-16">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <FiArrowLeft size={24} />
                    </button>
                    <h1 className="text-lg font-semibold">All Brands</h1>
                    <div className="w-10"></div>
                </div>
            </div>

            {/* Brands Grid */}
            <div className="px-4 py-6">
                {brands.length > 0 ? (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">All Brands</h2>
                            <span className="text-gray-600">
                                {brands.length} {brands.length === 1 ? 'brand' : 'brands'}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {brands.map(brand => (
                                <div 
                                    key={brand.id} 
                                    onClick={() => handleBrandClick(brand.id)}
                                    className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                                >
                                    <div className="h-32 flex items-center justify-center p-4">
                                        {brand.logo_url ? (
                                            <img
                                                src={`${ASSET_BASE_URL}${brand.logo_url}`}
                                                alt={brand.name}
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                                <span className="text-xl font-bold text-gray-600">{brand.name.charAt(0)}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="h-12 flex items-center justify-center border-t">
                                        <div className="text-center">
                                            <span className="text-sm font-semibold text-gray-700 block">
                                                {brand.display_name || brand.name}
                                            </span>
                                            {brand.product_count > 0 && (
                                                <span className="text-xs text-gray-500">
                                                    {brand.product_count} {brand.product_count === 1 ? 'item' : 'items'}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <div className="text-gray-500">
                            <div className="text-6xl mb-4">🏷️</div>
                            <h3 className="text-xl font-semibold mb-2">No Brands Available</h3>
                            <p>There are no brands available at the moment.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Brands;

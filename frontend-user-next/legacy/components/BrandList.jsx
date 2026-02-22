import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBrands, getProducts, ASSET_BASE_URL } from '../services/api';

const BrandList = () => {
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBrands();
    }, []);

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
        }
    };

    const handleBrandClick = (brandId) => {
        console.log('Brand clicked:', brandId);
        console.log('Navigating to:', `/brand/${brandId}`);
        navigate(`/brand/${brandId}`);
    };

    if (brands.length === 0) return null;

    return (
        <div className="px-4 py-8 bg-gray-50">
            <h2 className="text-2xl font-bold mb-6">Popular Brands</h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {brands.map(brand => (
                    <div 
                        key={brand.id} 
                        className="flex-shrink-0 w-32 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                        onClick={() => handleBrandClick(brand.id)}
                    >
                        <div className="h-24 flex items-center justify-center overflow-hidden">
                            {brand.logo_url ? (
                                <img
                                    src={`${ASSET_BASE_URL}${brand.logo_url}`}
                                    alt={brand.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span className="text-xs font-bold text-gray-600">{brand.name.charAt(0)}</span>
                                </div>
                            )}
                        </div>
                        <div className="h-8 flex items-center justify-center border-t">
                            <span className="text-xs font-semibold text-gray-700 text-center px-1">
                                {brand.display_name || brand.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrandList;

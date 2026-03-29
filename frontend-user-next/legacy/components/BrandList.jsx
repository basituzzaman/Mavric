import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBrands, getProducts, ASSET_BASE_URL } from '../services/api';

const BrandList = () => {
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();

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
            }
        };

        fetchBrands();
    }, []);

    const handleBrandClick = (brandId) => {
        console.log('Brand clicked:', brandId);
        console.log('Navigating to:', `/brand/${brandId}`);
        navigate(`/brand/${brandId}`);
    };

    if (brands.length === 0) return null;

    return (
        <div style={{ paddingLeft: '16px', paddingRight: '16px', paddingBottom: '16px' }} className="ui-container">
            <h2 style={{ marginBottom: '12px' }} className="text-[1.5rem] sm:text-2xl leading-none font-bold tracking-tight">Popular Brands</h2>
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {brands.map(brand => (
                    <div
                        key={brand.id}
                        className="flex-shrink-0 w-[138px] bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition cursor-pointer overflow-hidden"
                        onClick={() => handleBrandClick(brand.id)}
                    >
                        <div className="h-24 sm:h-28 flex items-center justify-center overflow-hidden bg-gray-50">
                            {brand.logo_url ? (
                                <img
                                    src={`${ASSET_BASE_URL}${brand.logo_url}`}
                                    alt={brand.name}
                                    className="w-full h-full object-contain p-3"
                                />
                            ) : (
                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span className="text-xs font-bold text-gray-600">{brand.name.charAt(0)}</span>
                                </div>
                            )}
                        </div>
                        <div className="min-h-[2.7rem] flex flex-col items-center justify-center border-t border-gray-200 px-2 py-1.5">
                            <span className="text-xs font-semibold text-gray-700 text-center leading-tight">
                                {brand.display_name || brand.name}
                            </span>
                            {brand.product_count > 0 && (
                                <span className="text-[10px] text-gray-500 mt-0.5">
                                    {brand.product_count} {brand.product_count === 1 ? 'item' : 'items'}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrandList;

import React from 'react';
import HeroSlider from '../components/HeroSlider';
import ProductGrid from '../components/ProductGrid';
import BrandList from '../components/BrandList';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <HeroSlider />
            <div style={{ height: '20px', background: 'transparent' }}></div>
            <ProductGrid />
            <div style={{ height: '20px', background: 'transparent' }}></div>
            <BrandList />
        </div>
    );
};

export default Home;

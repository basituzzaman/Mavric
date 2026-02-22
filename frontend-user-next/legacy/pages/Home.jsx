import React from 'react';
import Header from '../components/Header';
import HeroSlider from '../components/HeroSlider';
import ProductGrid from '../components/ProductGrid';
import BrandList from '../components/BrandList';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <HeroSlider />
            <ProductGrid />
            <BrandList />
            <Footer />
        </div>
    );
};

export default Home;

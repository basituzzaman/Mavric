import React, { useEffect, useState } from 'react';
import { getSliders, ASSET_BASE_URL } from '../services/api';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sliders, setSliders] = useState([]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => prev === 0 ? 1 : 0);
        console.log('Previous clicked:', currentIndex, '→', currentIndex === 0 ? 1 : 0);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => prev === 0 ? 1 : 0);
        console.log('Next clicked:', currentIndex, '→', currentIndex === 0 ? 1 : 0);
    };

    useEffect(() => {
        // Load slider data
        const loadSliders = async () => {
            try {
                const response = await getSliders();
                if (response.data?.success) {
                    setSliders(response.data.sliders || []);
                }
            } catch (error) {
                console.error('Error loading sliders:', error);
            }
        };
        loadSliders();
    }, []);

    useEffect(() => {
        if (sliders.length < 2) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % sliders.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [sliders.length]);

    const currentSlider = sliders[currentIndex];
    const currentImage = currentSlider?.image_url
        ? `${ASSET_BASE_URL}${currentSlider.image_url}`
        : (currentIndex === 0 ? '/uploads/sliders/hero1.jpg' : '/uploads/sliders/hero2.jpg');

    return (
        <div className="w-full">
            <div className="w-full h-64 md:h-96 relative bg-blue-500">
                <img
                    src={currentImage}
                    alt="Slider"
                    className="w-full h-full object-cover"
                    onLoad={() => console.log('Image loaded:', currentIndex === 0 ? 'hero1.jpg' : 'hero2.jpg')}
                    onError={(e) => console.log('Image failed to load:', e.target.src)}
                />
                
                {/* Left Arrow */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200"
                >
                    <FiChevronLeft size={20} className="text-gray-800" />
                </button>
                
                {/* Right Arrow */}
                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-200"
                >
                    <FiChevronRight size={20} className="text-gray-800" />
                </button>
                
                {sliders[currentIndex] && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                        <h3 className="text-2xl font-bold mb-1">{sliders[currentIndex].title}</h3>
                        {sliders[currentIndex].description && (
                            <p className="text-sm md:text-base">{sliders[currentIndex].description}</p>
                        )}
                    </div>
                )}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <button className={`w-3 h-3 rounded-full ${currentIndex === 0 ? 'bg-white' : 'bg-white/50'}`} onClick={() => setCurrentIndex(0)} />
                    <button className={`w-3 h-3 rounded-full ${currentIndex === 1 ? 'bg-white' : 'bg-white/50'}`} onClick={() => setCurrentIndex(1)} />
                </div>
            </div>
        </div>
    );
};

export default HeroSlider;

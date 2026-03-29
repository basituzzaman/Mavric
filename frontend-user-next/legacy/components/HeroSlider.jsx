import React, { useEffect, useMemo, useState } from 'react';
import { getSliders, ASSET_BASE_URL } from '../services/api';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const fallbackSlides = [
    {
        id: 'fallback-1',
        image_url: '/uploads/sliders/hero1.jpg',
        title: 'Premium Collection',
        description: 'Discover our exclusive watch collection',
    },
    {
        id: 'fallback-2',
        image_url: '/uploads/sliders/hero2.jpg',
        title: 'Luxury Watches',
        description: 'Timeless elegance for every occasion',
    },
];

const resolveImageUrl = (imageUrl) => {
    if (!imageUrl) return '/placeholder.jpg';
    if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
    if (imageUrl.startsWith('/uploads/')) return `${ASSET_BASE_URL}${imageUrl}`;
    if (imageUrl.startsWith('/')) return imageUrl;
    return `${ASSET_BASE_URL}/${imageUrl}`;
};

const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sliders, setSliders] = useState([]);

    useEffect(() => {
        const loadSliders = async () => {
            try {
                const response = await getSliders();
                if (response.data?.success) {
                    const data = Array.isArray(response.data.sliders) ? response.data.sliders : [];
                    setSliders(data.slice(0, 3));
                }
            } catch (error) {
                console.error('Error loading sliders:', error);
            }
        };

        loadSliders();
    }, []);

    const activeSlides = useMemo(
        () => (sliders.length > 0 ? sliders : fallbackSlides),
        [sliders]
    );

    useEffect(() => {
        if (activeSlides.length < 2) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [activeSlides.length]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    };

    const currentSlide = activeSlides[currentIndex] || activeSlides[0] || fallbackSlides[0];
    const currentImage = resolveImageUrl(currentSlide.image_url);

    return (
        <div className="w-full ui-container px-3 sm:px-4 pt-3">
            <div className="w-full h-[240px] sm:h-[300px] md:h-[420px] relative bg-gray-200 overflow-hidden shadow-sm">
                <img
                    src={currentImage}
                    alt={currentSlide.title || 'Slider'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = '/placeholder.jpg';
                    }}
                />

                {activeSlides.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 shadow-md"
                            aria-label="Previous slide"
                        >
                            <FiChevronLeft size={20} className="text-gray-800" />
                        </button>

                        <button
                            onClick={goToNext}
                            className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 shadow-md"
                            aria-label="Next slide"
                        >
                            <FiChevronRight size={20} className="text-gray-800" />
                        </button>
                    </>
                )}

                {(currentSlide.title || currentSlide.description) && (
                    <div style={{ paddingLeft: '12px' }} className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-4 sm:px-6 pb-5 pt-10 text-white">
                        {currentSlide.title && (
                            <h3 className="text-[2rem] sm:text-4xl leading-none font-bold mb-1 drop-shadow-sm">
                                {currentSlide.title}
                            </h3>
                        )}
                        {currentSlide.description && (
                            <p className="text-sm sm:text-base text-white/95 font-medium">
                                {currentSlide.description}
                            </p>
                        )}
                    </div>
                )}

                {activeSlides.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5">
                        {activeSlides.map((slide, idx) => (
                            <button
                                key={slide.id || `dot-${idx}`}
                                className={`h-2.5 rounded-full transition-all duration-200 ${
                                    currentIndex === idx ? 'w-5 bg-white' : 'w-2.5 bg-white/55'
                                }`}
                                onClick={() => setCurrentIndex(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroSlider;

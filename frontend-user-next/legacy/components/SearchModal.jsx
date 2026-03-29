import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, ASSET_BASE_URL } from '../services/api';

const SearchModal = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [error, setError] = useState(null);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    // Search function with debounce
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            setNoResults(false);
            setError(null);
            return;
        }

        const timeoutId = setTimeout(() => {
            performSearch();
        }, 300); // Debounce delay

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    const performSearch = async () => {
        const query = searchQuery.trim();
        
        if (query === '') {
            setSearchResults([]);
            setNoResults(false);
            return;
        }

        try {
            setLoading(true);
            setNoResults(false);
            setError(null);
            
            // Call API with search parameter
            const response = await fetch(`${API_BASE_URL}/products.php?search=${encodeURIComponent(query)}&limit=1000`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Get response as text first to check if it's valid JSON
            const responseText = await response.text();
            
            // Check if response starts with HTML (error/warning)
            if (responseText.trim().startsWith('<')) {
                console.error('❌ Backend returned HTML instead of JSON');
                setError('Backend returned HTML instead of JSON. Check for PHP errors.');
                setSearchResults([]);
                setNoResults(true);
                return;
            }
            
            // Parse JSON
            const data = JSON.parse(responseText);
            
            // Check the structure
            if (data.success && data.products) {
                const results = data.products;
                setSearchResults(results);
                setNoResults(results.length === 0);
            } else {
                console.error('❌ Invalid response structure:', data);
                setError('Invalid response structure from backend');
                setSearchResults([]);
                setNoResults(true);
            }
            
        } catch (error) {
            console.error('❌ Search error:', error);
            setError(error.message);
            setSearchResults([]);
            setNoResults(true);
        } finally {
            setLoading(false);
        }
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
        onClose();
        setSearchQuery('');
        setSearchResults([]);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        setNoResults(false);
        setError(null);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-start justify-center pt-24 px-4">
            <div 
                ref={searchRef}
                className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden"
                style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)' }}
            >
                {/* Search Header */}
                <div className="p-4">
                    <div className="flex items-center gap-3">
                        {/* Search Input Container */}
                        <div className="flex-1 relative">
                            <FiSearch 
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
                                size={20} 
                            />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by product name or brand..."
                                className="w-full outline-none text-gray-800 placeholder-gray-400"
                                style={{
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: '12px',
                                    padding: '12px 16px 12px 44px',
                                    fontSize: '16px'
                                }}
                                autoFocus
                            />
                            {searchQuery && (
                                <button
                                    onClick={handleClearSearch}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                >
                                    <FiX size={18} />
                                </button>
                            )}
                        </div>
                        
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition"
                        >
                            <FiX size={24} />
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100"></div>

                {/* Search Results Area */}
                <div className="overflow-y-auto max-h-[50vh]">
                    {/* Empty State - Placeholder */}
                    {!loading && !error && !noResults && searchResults.length === 0 && (
                        <div className="p-10 text-center">
                            <FiSearch size={40} className="mx-auto mb-4 text-gray-300" />
                            <p className="text-gray-400 text-sm" style={{ color: '#9CA3AF' }}>
                                Start typing to search for watches...
                            </p>
                        </div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-3"></div>
                            <p className="text-gray-500 text-sm">Searching...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {!loading && error && (
                        <div className="p-6 text-center">
                            <p className="text-red-500 text-sm">{error}</p>
                        </div>
                    )}

                    {/* No Results State */}
                    {!loading && noResults && searchQuery !== '' && !error && (
                        <div className="p-6 text-center">
                            <p className="text-gray-600 font-medium mb-1">
                                No results found for &quot;{searchQuery}&quot;
                            </p>
                            <p className="text-gray-400 text-sm">
                                Try searching with different keywords or brand names
                            </p>
                        </div>
                    )}

                    {/* Results List */}
                    {!loading && searchResults.length > 0 && (
                        <div className="p-2">
                            <p className="text-xs text-gray-500 px-2 py-2">
                                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                            </p>
                            <div className="space-y-1">
                                {searchResults.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleProductClick(product.id)}
                                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition text-left"
                                    >
                                        {/* Product Image */}
                                        <div className="w-14 h-14 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                            <img
                                                src={product.image_url ? `${ASSET_BASE_URL}${product.image_url}` : `https://picsum.photos/seed/watch${product.id}/150/150.jpg`}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = `https://picsum.photos/seed/watch${product.id}/150/150.jpg`;
                                                }}
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900 truncate text-sm">
                                                {product.name}
                                            </p>
                                            {product.brand_name && (
                                                <p className="text-xs text-gray-500">
                                                    {product.brand_name}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="font-bold text-gray-900 text-sm">
                                                    BDT {parseFloat(product.price).toLocaleString()}
                                                </span>
                                                {product.original_price > product.price && (
                                                    <span className="text-xs text-gray-400 line-through">
                                                        BDT {parseFloat(product.original_price).toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Discount Badge */}
                                        {product.discount_percentage > 0 && (
                                            <div className="flex-shrink-0">
                                                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
                                                    {product.discount_percentage}% OFF
                                                </span>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;

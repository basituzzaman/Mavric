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
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-20 px-4">
            <div 
                ref={searchRef}
                className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
            >
                {/* Search Input */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <FiSearch className="text-gray-400" size={24} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by product name or brand..."
                            className="flex-1 text-lg outline-none"
                            autoFocus
                        />
                        {searchQuery && (
                            <button
                                onClick={handleClearSearch}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <FiX size={20} />
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition"
                        >
                            <FiX size={24} />
                        </button>
                    </div>
                </div>

                {/* Search Results */}
                <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
                    {loading && (
                        <div className="p-8 text-center text-gray-500">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                            Searching...
                        </div>
                    )}

                    {!loading && searchQuery === '' && (
                        <div className="p-8 text-center text-gray-500">
                            <FiSearch size={48} className="mx-auto mb-3 text-gray-300" />
                            <p>Start typing to search for watches...</p>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="p-8 text-center text-red-500">
                            <p className="text-lg font-semibold mb-2">Search Error</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    {!loading && noResults && searchQuery !== '' && !error && (
                        <div className="p-8 text-center text-gray-500">
                            <p className="text-lg font-semibold mb-2">No results found for "{searchQuery}"</p>
                            <p className="text-sm">
                                Try searching with different keywords or brand names
                            </p>
                        </div>
                    )}

                    {!loading && searchResults.length > 0 && (
                        <div className="p-4">
                            <p className="text-sm text-gray-500 mb-3">
                                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found for "{searchQuery}"
                            </p>
                            <div className="space-y-2">
                                {searchResults.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleProductClick(product.id)}
                                        className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition text-left"
                                    >
                                        {/* Product Image */}
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
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
                                            <p className="font-semibold text-gray-900 truncate">
                                                {product.name}
                                            </p>
                                            {product.brand_name && (
                                                <p className="text-sm text-gray-500">
                                                    {product.brand_name}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="font-bold text-gray-900">
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
                                                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
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

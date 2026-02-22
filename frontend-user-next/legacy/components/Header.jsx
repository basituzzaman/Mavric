import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiSearch, FiShoppingCart, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import SearchModal from './SearchModal';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { getTotalItems } = useCart();

    return (
        <>
            <header className="sticky top-0 z-50 bg-white shadow-md">
                <div className="flex items-center justify-between px-4 py-3 h-16">
                    {/* Menu Button */}
                    <button 
                        onClick={() => setMenuOpen(!menuOpen)} 
                        className="p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                            <FiMenu className="text-white text-xs" />
                        </div>
                    </button>

                    {/* Logo */}
                    <Link to="/" className="flex-1 text-center flex justify-center items-center relative h-16">
                        <img src="/logo.png" alt="MAVRIC" className="absolute h-[32rem] w-auto object-contain" />
                    </Link>

                    {/* Right Icons */}
                    <div className="flex items-center gap-3">
                        {/* Search Button */}
                        <button 
                            onClick={() => setSearchOpen(true)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                        >
                            <FiSearch size={22} />
                        </button>
                        
                        {/* Cart Button */}
                        <Link to="/checkout" className="p-2 relative hover:bg-gray-100 rounded-lg transition">
                            <FiShoppingCart size={22} />
                            {getTotalItems() > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                                    {getTotalItems()}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <nav className="bg-gray-50 border-t">
                        <Link 
                            to="/" 
                            onClick={() => setMenuOpen(false)}
                            className="block py-3 px-4 hover:bg-gray-100 transition"
                        >
                            Home
                        </Link>
                        <Link 
                            to="/all-products" 
                            onClick={() => setMenuOpen(false)}
                            className="block py-3 px-4 hover:bg-gray-100 transition"
                        >
                            All Products
                        </Link>
                        <Link 
                            to="/brands" 
                            onClick={() => setMenuOpen(false)}
                            className="block py-3 px-4 hover:bg-gray-100 transition"
                        >
                            Brands
                        </Link>
                        <Link 
                            to="/about" 
                            onClick={() => setMenuOpen(false)}
                            className="block py-3 px-4 hover:bg-gray-100 transition"
                        >
                            About Us
                        </Link>
                    </nav>
                )}
            </header>

            {/* Search Modal */}
            <SearchModal 
                isOpen={searchOpen} 
                onClose={() => setSearchOpen(false)} 
            />
        </>
    );
};

export default Header;

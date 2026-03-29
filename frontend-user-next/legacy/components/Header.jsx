import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiSearch, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import SearchModal from './SearchModal';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { getTotalItems } = useCart();

    return (
        <>
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
                <div style={{ paddingLeft: '16px', paddingRight: '16px' }} className="ui-container flex items-center justify-between h-[66px]">
                    {/* Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="group p-2 rounded-xl hover:bg-gray-100 transition"
                        aria-label="Toggle menu"
                    >
                        <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center shadow-sm">
                            <FiMenu className="text-white text-[11px]" />
                        </div>
                    </button>

                    {/* Logo */}
                    <Link to="/" className="flex-1 flex justify-center items-center h-full">
                        <img
                            src="/logo.png"
                            alt="MAVRIC"
                            className="h-10 sm:h-11 w-auto object-contain pointer-events-none select-none"
                        />
                    </Link>

                    {/* Right Icons */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        {/* Search Button */}
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="h-10 w-10 inline-flex items-center justify-center rounded-xl hover:bg-gray-100 transition"
                            aria-label="Search products"
                        >
                            <FiSearch size={21} />
                        </button>

                        {/* Cart Button */}
                        <Link
                            to="/checkout"
                            className="h-10 w-10 inline-flex items-center justify-center rounded-xl hover:bg-gray-100 transition relative"
                            aria-label="Go to checkout"
                        >
                            <FiShoppingCart size={21} />
                            {getTotalItems() > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-semibold border border-white">
                                    {getTotalItems()}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <nav className="border-t border-gray-200 bg-white">
                        <div className="ui-container py-2">
                            <Link
                                to="/"
                                onClick={() => setMenuOpen(false)}
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700"
                            >
                                Home
                            </Link>
                            <Link
                                to="/all-products"
                                onClick={() => setMenuOpen(false)}
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700"
                            >
                                All Products
                            </Link>
                            <Link
                                to="/brands"
                                onClick={() => setMenuOpen(false)}
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700"
                            >
                                Brands
                            </Link>
                            <Link
                                to="/about"
                                onClick={() => setMenuOpen(false)}
                                className="block py-2.5 px-4 rounded-lg hover:bg-gray-100 transition font-medium text-gray-700"
                            >
                                About Us
                            </Link>
                        </div>
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

import React from 'react';
import { FiFacebook, FiInstagram } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// TikTok SVG Icon Component
const TikTokIcon = ({ size }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.09v10.98a3.02 3.02 0 0 1-3.02 3.02c-1.65 0-3.02-1.37-3.02-3.02s1.37-3.02 3.02-3.02c.39 0 .76.08 1.1.21V7.68A6.12 6.12 0 0 0 8.71 7.5c-3.4 0-6.15 2.75-6.15 6.15s2.75 6.15 6.15 6.15c3.4 0 6.15-2.75 6.15-6.15V9.34a7.92 7.92 0 0 0 4.68 1.51v3.09a4.83 4.83 0 0 1-4.68-4.25z"/>
    </svg>
);

const Footer = () => {
    return (
        <footer className="bg-white border-t mt-10">
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">QUICK LINKS</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li><Link to="/about" className="hover:text-black transition">About Us</Link></li>
                            <li><Link to="/privacy" className="hover:text-black transition">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-black transition">Terms And Conditions</Link></li>
                            <li><Link to="/return" className="hover:text-black transition">Return And Cancellation Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">CONTACT US</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li className="flex items-start gap-2">
                                <span>📍</span>
                                <span>Mohammadpur, Dhaka-1207</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>📞</span>
                                <a href="tel:01804753688" className="hover:text-black transition">01804753688</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span>✉️</span>
                                <a href="mailto:mavric.bd@gmail.com" className="hover:text-black transition">
                                    mavric.bd@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">FOLLOW US</h3>
                        <div className="flex gap-3">
                            <a 
                                href="https://www.facebook.com/people/Mavric/61587883515448/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition"
                            >
                                <FiFacebook size={20} />
                            </a>
                            <a 
                                href="https://www.instagram.com/mavric_bd?igsh=MWV6OXpwcnkxMWtxYQ%3D%3D" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition"
                            >
                                <FiInstagram size={20} />
                            </a>
                            <a 
                                href="https://www.tiktok.com/@mavric.bd?_r=1&_t=ZS-9401tScARK0" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition"
                            >
                                <TikTokIcon size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8 pt-6 border-t text-gray-600">
                    © Mavric 2026. All rights reserved
                </div>
            </div>
        </footer>
    );
};

export default Footer;

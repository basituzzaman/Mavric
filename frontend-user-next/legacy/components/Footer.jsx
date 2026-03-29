import React from 'react';
import { FiFacebook, FiInstagram, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const TikTokIcon = ({ size }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.09v10.98a3.02 3.02 0 0 1-3.02 3.02c-1.65 0-3.02-1.37-3.02-3.02s1.37-3.02 3.02-3.02c.39 0 .76.08 1.1.21V7.68A6.12 6.12 0 0 0 8.71 7.5c-3.4 0-6.15 2.75-6.15 6.15s2.75 6.15 6.15 6.15c3.4 0 6.15-2.75 6.15-6.15V9.34a7.92 7.92 0 0 0 4.68 1.51v3.09a4.83 4.83 0 0 1-4.68-4.25z" />
    </svg>
);

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div style={{ paddingLeft: '16px', paddingRight: '16px' }} className="ui-container py-10 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4 tracking-tight">QUICK LINKS</h3>
                        <ul className="space-y-2.5 text-gray-600">
                            <li><Link to="/about" className="hover:text-black transition">About Us</Link></li>
                            <li><Link to="/privacy" className="hover:text-black transition">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-black transition">Terms And Conditions</Link></li>
                            <li><Link to="/return" className="hover:text-black transition">Return And Cancellation Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4 tracking-tight">CONTACT US</h3>
                        <ul className="space-y-2.5 text-gray-600">
                            <li className="flex items-start gap-2">
                                <FiMapPin className="mt-1 text-black" size={16} />
                                <span>Mohammadpur, Dhaka-1207</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FiPhone className="text-black" size={16} />
                                <a href="tel:01804753688" className="hover:text-black transition">01804753688</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <FiMail className="text-black" size={16} />
                                <a href="mailto:mavric.bd@gmail.com" className="hover:text-black transition">
                                    mavric.bd@gmail.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4 tracking-tight">FOLLOW US</h3>
                        <div className="flex gap-3">
                            <a
                                href="https://www.facebook.com/people/Mavric/61587883515448/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition"
                                aria-label="Facebook"
                            >
                                <FiFacebook size={20} />
                            </a>
                            <a
                                href="https://www.instagram.com/mavric_bd?igsh=MWV6OXpwcnkxMWtxYQ%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition"
                                aria-label="Instagram"
                            >
                                <FiInstagram size={20} />
                            </a>
                            <a
                                href="https://www.tiktok.com/@mavric.bd?_r=1&_t=ZS-9401tScARK0"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition"
                                aria-label="TikTok"
                            >
                                <TikTokIcon size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8 pt-6 border-t border-gray-200 text-gray-600 text-sm sm:text-base">
                    Copyright 2026 Mavric. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

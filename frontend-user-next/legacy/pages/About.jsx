import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiShield, FiTruck, FiAward, FiHeadphones } from 'react-icons/fi';

const About = () => {
    const features = [
        {
            icon: FiShield,
            title: 'Authentic Products',
            description: 'We guarantee 100% authentic watches from verified suppliers and authorized dealers.'
        },
        {
            icon: FiTruck,
            title: 'Fast Delivery',
            description: 'Quick and reliable delivery across Bangladesh within 3-5 business days.'
        },
        {
            icon: FiAward,
            title: 'Quality Assurance',
            description: 'Every watch undergoes rigorous quality checks before reaching you.'
        },
        {
            icon: FiHeadphones,
            title: '24/7 Support',
            description: 'Our customer service team is always ready to assist you with any queries.'
        }
    ];

    const milestones = [
        { year: '2020', title: 'Company Founded', description: 'Started with a vision to bring premium watches to Bangladesh' },
        { year: '2021', title: '1000+ Customers', description: 'Reached our first thousand satisfied customers' },
        { year: '2023', title: 'Multiple Brands', description: 'Partnered with 20+ international watch brands' },
        { year: '2026', title: 'Market Leader', description: 'Became one of the most trusted watch retailers in Bangladesh' }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About Mavric</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Your trusted destination for premium and authentic timepieces
                    </p>
                </div>
            </div>

            {/* Our Story */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p>
                            Founded in 2020, <strong>Mavric</strong> began with a simple mission: to make premium and authentic 
                            watches accessible to everyone in Bangladesh. We recognized that watch enthusiasts and fashion-conscious 
                            individuals were struggling to find genuine timepieces at reasonable prices.
                        </p>
                        <p>
                            What started as a small online store has grown into one of the most trusted watch retailers in the country. 
                            We've built our reputation on three core principles: <strong>authenticity, quality, and customer satisfaction</strong>.
                        </p>
                        <p>
                            Today, Mavric offers an extensive collection of watches ranging from classic designs to modern smartwatches, 
                            catering to diverse tastes and budgets. We partner directly with authorized distributors and verified suppliers 
                            to ensure every product we sell is 100% genuine.
                        </p>
                        <p>
                            Our commitment goes beyond just selling watches. We strive to provide a seamless shopping experience with 
                            detailed product information, secure payment options, fast delivery, and responsive customer support.
                        </p>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Mavric?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                    <feature.icon className="text-blue-600" size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Our Journey */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-8">
                        {milestones.map((milestone, index) => (
                            <div key={index} className="flex gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                        {milestone.year}
                                    </div>
                                </div>
                                <div className="flex-1 pt-2">
                                    <h3 className="text-xl font-bold mb-1">{milestone.title}</h3>
                                    <p className="text-gray-600">{milestone.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Our Vision */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                        <p className="text-xl leading-relaxed mb-6">
                            To become Bangladesh's most trusted and customer-centric watch retailer, offering 
                            an unparalleled selection of authentic timepieces and exceptional service.
                        </p>
                        <p className="text-lg leading-relaxed opacity-90">
                            We envision a future where every watch enthusiast in Bangladesh can easily access 
                            genuine, high-quality watches that reflect their personal style and values.
                        </p>
                    </div>
                </div>
            </div>

            {/* Our Values */}
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="bg-white border-l-4 border-blue-600 p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-2">Authenticity</h3>
                        <p className="text-gray-600">
                            We never compromise on authenticity. Every watch is verified and comes with proper documentation.
                        </p>
                    </div>
                    <div className="bg-white border-l-4 border-green-600 p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-2">Customer First</h3>
                        <p className="text-gray-600">
                            Your satisfaction is our priority. We go above and beyond to ensure a positive experience.
                        </p>
                    </div>
                    <div className="bg-white border-l-4 border-purple-600 p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-2">Transparency</h3>
                        <p className="text-gray-600">
                            Clear pricing, honest product descriptions, and straightforward policies build trust.
                        </p>
                    </div>
                    <div className="bg-white border-l-4 border-orange-600 p-6 shadow-md">
                        <h3 className="text-xl font-bold mb-2">Innovation</h3>
                        <p className="text-gray-600">
                            We continuously improve our platform and services to provide the best shopping experience.
                        </p>
                    </div>
                </div>
            </div>

            {/* Team Section (Optional) */}
            <div className="bg-gray-50 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">Our Team</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Behind Mavric is a dedicated team of watch enthusiasts, customer service professionals, 
                        and logistics experts working together to bring you the best online shopping experience.
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                        We're passionate about watches and committed to your satisfaction.
                    </p>
                </div>
            </div>

            {/* Call to Action */}
            <div className="container mx-auto px-4 py-16 text-center">
                <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Watch?</h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Explore our collection of authentic timepieces and discover the watch that suits your style.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                        href="/" 
                        className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                    >
                        Shop Now
                    </a>
                    <a 
                        href="tel:01890020483" 
                        className="bg-white border-2 border-black text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                        Contact Us
                    </a>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default About;

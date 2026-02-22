import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-xl text-gray-300">
                        Last Updated: February 18, 2026
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto prose prose-lg">
                    
                    {/* Introduction */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">Introduction</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Welcome to Mavric. We respect your privacy and are committed to protecting your personal 
                            data. This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                            information when you visit our website <strong>www.mavric.com</strong> and purchase our products.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Please read this Privacy Policy carefully. By using our website, you agree to the collection 
                            and use of information in accordance with this policy. If you do not agree with our policies 
                            and practices, please do not use our website.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">1. Information We Collect</h2>
                        
                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">1.1 Personal Information</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            When you place an order or register on our website, we collect the following personal information:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li><strong>Name:</strong> To identify you and personalize your experience</li>
                            <li><strong>Phone Number:</strong> To contact you regarding order delivery and support</li>
                            <li><strong>Email Address:</strong> To send order confirmations and updates (optional)</li>
                            <li><strong>Delivery Address:</strong> To deliver your ordered products</li>
                            <li><strong>Payment Information:</strong> For processing transactions (we do not store credit card details)</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">1.2 Automatically Collected Information</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            When you visit our website, we automatically collect certain information about your device, including:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>IP address</li>
                            <li>Browser type and version</li>
                            <li>Operating system</li>
                            <li>Pages visited and time spent on pages</li>
                            <li>Referring website addresses</li>
                            <li>Device identifiers</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">1.3 Cookies and Tracking Technologies</h3>
                        <p className="text-gray-700 leading-relaxed">
                            We use cookies and similar tracking technologies to track activity on our website and store 
                            certain information. Cookies help us remember your preferences, understand how you use our site, 
                            and improve your experience.
                        </p>
                    </section>

                    {/* How We Use Your Information */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">2. How We Use Your Information</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We use the collected information for the following purposes:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li><strong>Order Processing:</strong> To process and fulfill your orders, including shipping and delivery</li>
                            <li><strong>Customer Service:</strong> To respond to your inquiries, provide support, and resolve issues</li>
                            <li><strong>Communication:</strong> To send order confirmations, updates, and promotional offers (with your consent)</li>
                            <li><strong>Payment Processing:</strong> To process transactions securely through our payment partners</li>
                            <li><strong>Website Improvement:</strong> To analyze usage patterns and improve our website functionality</li>
                            <li><strong>Fraud Prevention:</strong> To detect and prevent fraudulent transactions and protect our users</li>
                            <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
                            <li><strong>Marketing:</strong> To send you promotional materials about new products, special offers, and updates (you can opt-out anytime)</li>
                        </ul>
                    </section>

                    {/* How We Share Your Information */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">3. How We Share Your Information</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We do not sell, trade, or rent your personal information to third parties. However, we may 
                            share your information with:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-3 text-gray-700">
                            <li>
                                <strong>Service Providers:</strong> Third-party companies that help us operate our business 
                                (e.g., delivery partners, payment processors, hosting services). These providers are 
                                contractually obligated to protect your data.
                            </li>
                            <li>
                                <strong>Delivery Partners:</strong> Courier services that deliver your orders (they only 
                                receive necessary delivery information).
                            </li>
                            <li>
                                <strong>Payment Processors:</strong> Secure payment gateways for transaction processing 
                                (they handle payment information according to PCI-DSS standards).
                            </li>
                            <li>
                                <strong>Legal Authorities:</strong> When required by law, court order, or governmental 
                                request, or to protect our rights and safety.
                            </li>
                            <li>
                                <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of 
                                assets, your information may be transferred to the new entity.
                            </li>
                        </ul>
                    </section>

                    {/* Data Security */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">4. Data Security</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We implement appropriate technical and organizational security measures to protect your 
                            personal information against unauthorized access, alteration, disclosure, or destruction. 
                            These measures include:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>SSL/TLS encryption for data transmission</li>
                            <li>Secure servers and databases with restricted access</li>
                            <li>Regular security audits and updates</li>
                            <li>Employee training on data protection practices</li>
                            <li>Secure payment processing through trusted partners</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed">
                            However, no method of transmission over the internet or electronic storage is 100% secure. 
                            While we strive to protect your information, we cannot guarantee absolute security.
                        </p>
                    </section>

                    {/* Data Retention */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">5. Data Retention</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We retain your personal information only for as long as necessary to fulfill the purposes 
                            outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li><strong>Order Information:</strong> Retained for 5 years for accounting and legal purposes</li>
                            <li><strong>Account Information:</strong> Retained until you request deletion</li>
                            <li><strong>Marketing Data:</strong> Retained until you unsubscribe or request deletion</li>
                            <li><strong>Support Communications:</strong> Retained for 3 years for quality assurance</li>
                        </ul>
                    </section>

                    {/* Your Rights */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">6. Your Rights</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            You have the following rights regarding your personal information:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-3 text-gray-700">
                            <li>
                                <strong>Right to Access:</strong> You can request a copy of the personal information 
                                we hold about you.
                            </li>
                            <li>
                                <strong>Right to Correction:</strong> You can request that we correct any inaccurate 
                                or incomplete information.
                            </li>
                            <li>
                                <strong>Right to Deletion:</strong> You can request that we delete your personal 
                                information (subject to legal obligations).
                            </li>
                            <li>
                                <strong>Right to Object:</strong> You can object to our processing of your personal 
                                information for marketing purposes.
                            </li>
                            <li>
                                <strong>Right to Withdraw Consent:</strong> You can withdraw your consent to data 
                                processing at any time.
                            </li>
                            <li>
                                <strong>Right to Data Portability:</strong> You can request your data in a structured, 
                                machine-readable format.
                            </li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed">
                            To exercise any of these rights, please contact us at <strong>famufamu018@gmail.com</strong> or 
                            call <strong>01890020483</strong>.
                        </p>
                    </section>

                    {/* Cookies Policy */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">7. Cookies Policy</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We use cookies to enhance your browsing experience. You can control cookies through your 
                            browser settings. Types of cookies we use:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-3 text-gray-700">
                            <li>
                                <strong>Essential Cookies:</strong> Required for the website to function properly 
                                (e.g., shopping cart, login sessions).
                            </li>
                            <li>
                                <strong>Analytics Cookies:</strong> Help us understand how visitors use our website 
                                to improve performance.
                            </li>
                            <li>
                                <strong>Marketing Cookies:</strong> Track your visit across websites to display 
                                relevant advertisements (with your consent).
                            </li>
                            <li>
                                <strong>Preference Cookies:</strong> Remember your settings and preferences for a 
                                better experience.
                            </li>
                        </ul>
                    </section>

                    {/* Third-Party Links */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">8. Third-Party Links</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our website may contain links to third-party websites (e.g., payment gateways, social media). 
                            We are not responsible for the privacy practices of these external sites. We encourage you to 
                            review their privacy policies before providing any personal information.
                        </p>
                    </section>

                    {/* Children's Privacy */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">9. Children's Privacy</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Our website is not intended for children under the age of 18. We do not knowingly collect 
                            personal information from children. If you are a parent or guardian and believe your child 
                            has provided us with personal information, please contact us immediately.
                        </p>
                    </section>

                    {/* Changes to Privacy Policy */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">10. Changes to This Privacy Policy</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We may update this Privacy Policy from time to time to reflect changes in our practices or 
                            legal requirements. We will notify you of any significant changes by:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Posting the updated policy on this page</li>
                            <li>Updating the "Last Updated" date at the top</li>
                            <li>Sending you an email notification (for material changes)</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed">
                            We encourage you to review this Privacy Policy periodically for any updates.
                        </p>
                    </section>

                    {/* Contact Us */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">11. Contact Us</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            If you have any questions, concerns, or requests regarding this Privacy Policy or our data 
                            practices, please contact us:
                        </p>
                        <div className="bg-gray-50 border-l-4 border-blue-600 p-6 rounded">
                            <p className="font-semibold text-lg mb-3">Mavric - Watch Retailer</p>
                            <ul className="space-y-2 text-gray-700">
                                <li><strong>Address:</strong> 826, Nurpur, Dania, Dhaka-1236, Bangladesh</li>
                                <li><strong>Phone:</strong> <a href="tel:01890020483" className="text-blue-600 hover:underline">01890020483</a></li>
                                <li><strong>Email:</strong> <a href="mailto:famufamu018@gmail.com" className="text-blue-600 hover:underline">famufamu018@gmail.com</a></li>
                                <li><strong>Business Hours:</strong> Saturday - Thursday, 10:00 AM - 8:00 PM</li>
                            </ul>
                        </div>
                    </section>

                    {/* Consent */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">12. Your Consent</h2>
                        <p className="text-gray-700 leading-relaxed">
                            By using our website and providing your personal information, you consent to the collection, 
                            use, and disclosure of your information as described in this Privacy Policy. If you do not 
                            agree with this policy, please do not use our website or provide any personal information.
                        </p>
                    </section>

                    {/* Governing Law */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">13. Governing Law</h2>
                        <p className="text-gray-700 leading-relaxed">
                            This Privacy Policy is governed by and construed in accordance with the laws of Bangladesh. 
                            Any disputes arising from this policy will be subject to the exclusive jurisdiction of the 
                            courts of Dhaka, Bangladesh.
                        </p>
                    </section>

                    {/* Footer Note */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-12">
                        <p className="text-gray-700 text-center">
                            <strong>Note:</strong> This Privacy Policy is effective as of February 18, 2026. By continuing 
                            to use our website after this date, you acknowledge that you have read, understood, and agreed 
                            to this Privacy Policy.
                        </p>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Privacy;

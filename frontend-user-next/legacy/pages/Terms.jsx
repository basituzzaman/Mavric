import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Terms = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
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
                            Welcome to <strong>Mavric</strong>. These Terms and Conditions ("Terms") govern your use of 
                            our website <strong>www.mavric.com</strong> and the purchase of products from our online store.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            By accessing or using our website, you agree to be bound by these Terms. If you do not agree 
                            with any part of these Terms, you must not use our website or services.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Please read these Terms carefully before making any purchase or using our services.
                        </p>
                    </section>

                    {/* Definitions */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">1. Definitions</h2>
                        <ul className="list-none space-y-3 text-gray-700">
                            <li><strong>"We," "Us," "Our":</strong> Refers to Mavric, the watch retailer</li>
                            <li><strong>"You," "Your," "Customer":</strong> Refers to the user or purchaser of our products</li>
                            <li><strong>"Website":</strong> Refers to www.mavric.com</li>
                            <li><strong>"Products":</strong> Refers to watches and related items sold on our website</li>
                            <li><strong>"Order":</strong> Refers to your request to purchase products from us</li>
                            <li><strong>"Services":</strong> Refers to all services provided through our website</li>
                        </ul>
                    </section>

                    {/* General Terms */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">2. General Terms</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            By using our website, you confirm that:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>You are at least 18 years old or have parental/guardian consent</li>
                            <li>You have the legal capacity to enter into binding contracts</li>
                            <li>You will provide accurate and complete information</li>
                            <li>You will use the website only for lawful purposes</li>
                            <li>You agree to comply with all applicable laws and regulations</li>
                            <li>You accept these Terms and our Privacy Policy</li>
                        </ul>
                    </section>

                    {/* Account Registration */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">3. Account Registration</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            While registration is not mandatory for purchases, if you choose to create an account:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>You must provide accurate, current, and complete information</li>
                            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                            <li>You are responsible for all activities that occur under your account</li>
                            <li>You must notify us immediately of any unauthorized access or security breaches</li>
                            <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
                            <li>You may not transfer or share your account with others</li>
                        </ul>
                    </section>

                    {/* Product Information */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">4. Product Information and Availability</h2>
                        
                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">4.1 Product Descriptions</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We strive to provide accurate product descriptions, images, and specifications. However:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Colors may vary slightly due to screen settings and photography</li>
                            <li>We do not warrant that product descriptions are error-free or complete</li>
                            <li>Actual products may differ slightly from images displayed</li>
                            <li>Product specifications are subject to change without notice</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">4.2 Product Availability</h3>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>All products are subject to availability</li>
                            <li>We reserve the right to discontinue any product at any time</li>
                            <li>Stock levels displayed on the website may not be real-time</li>
                            <li>If a product is unavailable after order placement, we will notify you promptly</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">4.3 Authenticity Guarantee</h3>
                        <p className="text-gray-700 leading-relaxed">
                            We guarantee that all watches sold on our website are 100% authentic and sourced from 
                            authorized distributors or verified suppliers. Each product comes with proper documentation 
                            and warranty where applicable.
                        </p>
                    </section>

                    {/* Pricing and Payments */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">5. Pricing and Payment</h2>
                        
                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">5.1 Pricing</h3>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>All prices are listed in Bangladeshi Taka (BDT)</li>
                            <li>Prices include applicable taxes unless stated otherwise</li>
                            <li>We reserve the right to change prices at any time without notice</li>
                            <li>Price changes will not affect orders already placed</li>
                            <li>Promotional prices are valid for limited periods as specified</li>
                            <li>We are not liable for pricing errors; incorrect orders may be cancelled</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">5.2 Payment Methods</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We accept the following payment methods:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li><strong>Cash on Delivery (COD):</strong> Pay when you receive your order</li>
                            <li><strong>Mobile Banking:</strong> bKash, Nagad, Rocket (if applicable)</li>
                            <li><strong>Bank Transfer:</strong> Direct bank deposit or transfer</li>
                            <li><strong>Online Payment:</strong> Credit/Debit cards through secure payment gateways</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">5.3 Payment Terms</h3>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Full payment is required before order dispatch (except COD)</li>
                            <li>For COD orders, payment must be made upon delivery in cash</li>
                            <li>All payments are processed through secure channels</li>
                            <li>We do not store credit card information on our servers</li>
                            <li>You are responsible for any additional charges by your bank or payment provider</li>
                        </ul>
                    </section>

                    {/* Orders and Checkout */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">6. Orders and Checkout Process</h2>
                        
                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">6.1 Placing an Order</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            When you place an order through our website:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>You are making an offer to purchase the selected products</li>
                            <li>We will send you an order confirmation via SMS/email</li>
                            <li>Order confirmation does not constitute acceptance of your order</li>
                            <li>We may contact you to verify order details before processing</li>
                            <li>We reserve the right to refuse or cancel any order</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">6.2 Order Acceptance</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Your order is accepted when:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>We have verified payment (for prepaid orders)</li>
                            <li>We have confirmed product availability</li>
                            <li>We have dispatched your order for delivery</li>
                            <li>You receive an order acceptance notification</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">6.3 Order Cancellation by Mavric</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We may cancel your order if:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Products are unavailable or out of stock</li>
                            <li>Pricing or product information was incorrect</li>
                            <li>Payment authorization fails</li>
                            <li>We suspect fraudulent activity</li>
                            <li>Delivery address is outside our service area</li>
                            <li>You fail to respond to verification attempts</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed">
                            In case of cancellation, we will refund any payment received within 7-14 business days.
                        </p>
                    </section>

                    {/* Shipping and Delivery */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">7. Shipping and Delivery</h2>
                        
                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">7.1 Delivery Areas</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We currently deliver to the following areas:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li><strong>Inside Dhaka:</strong> 1-3 business days</li>
                            <li><strong>Outside Dhaka:</strong> 3-7 business days</li>
                            <li>Delivery times are estimates and may vary due to circumstances beyond our control</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">7.2 Shipping Costs</h3>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Shipping costs will be displayed at checkout</li>
                            <li>Free delivery may be available for orders above a certain amount</li>
                            <li>Shipping charges are non-refundable (except for defective products)</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">7.3 Delivery Process</h3>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>You must provide a complete and accurate delivery address</li>
                            <li>We will contact you before delivery via the phone number provided</li>
                            <li>A signature or OTP may be required upon delivery</li>
                            <li>If delivery is unsuccessful, we will attempt redelivery or contact you</li>
                            <li>Products will be shipped to the address specified; changes after dispatch may incur charges</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">7.4 Risk of Loss</h3>
                        <p className="text-gray-700 leading-relaxed">
                            All products purchased from Mavric are delivered pursuant to a shipping contract. The risk 
                            of loss and title for products pass to you upon delivery to the delivery address you provided.
                        </p>
                    </section>

                    {/* Returns and Refunds */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">8. Returns, Refunds, and Exchanges</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            For detailed information about returns and refunds, please refer to our 
                            <a href="/return" className="text-blue-600 hover:underline font-semibold"> Return and Cancellation Policy</a>.
                        </p>
                        
                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">8.1 Return Conditions</h3>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Products must be returned within 7 days of delivery</li>
                            <li>Products must be unused, unworn, and in original packaging</li>
                            <li>All tags, labels, and documentation must be intact</li>
                            <li>Proof of purchase (invoice/receipt) is required</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">8.2 Non-Returnable Items</h3>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Products showing signs of use or wear</li>
                            <li>Products with missing parts or accessories</li>
                            <li>Products damaged due to misuse or mishandling</li>
                            <li>Sale or clearance items (unless defective)</li>
                        </ul>
                    </section>

                    {/* Warranty */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">9. Warranty and After-Sales Service</h2>
                        
                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">9.1 Manufacturer's Warranty</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Most watches come with manufacturer's warranty as specified in product descriptions:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Warranty period varies by brand and model</li>
                            <li>Warranty covers manufacturing defects only</li>
                            <li>Warranty does not cover normal wear and tear, battery replacement, or misuse</li>
                            <li>Warranty claims must be made through us with proof of purchase</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">9.2 Mavric's Commitment</h3>
                        <p className="text-gray-700 leading-relaxed">
                            While manufacturer's warranty applies, we are committed to assisting you with any product 
                            issues. Contact our customer service for support and guidance on warranty claims.
                        </p>
                    </section>

                    {/* Intellectual Property */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">10. Intellectual Property Rights</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            All content on this website, including but not limited to:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Text, graphics, logos, images, and icons</li>
                            <li>Product images and descriptions</li>
                            <li>Website design and layout</li>
                            <li>Software and code</li>
                            <li>Trademarks and service marks</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            are the property of Mavric or our content suppliers and are protected by Bangladeshi and 
                            international copyright, trademark, and other intellectual property laws.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            You may not reproduce, distribute, modify, or create derivative works from any content 
                            without our express written permission.
                        </p>
                    </section>

                    {/* User Conduct */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">11. User Conduct and Prohibited Activities</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            You agree NOT to:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Use the website for any unlawful purpose or in violation of these Terms</li>
                            <li>Provide false, inaccurate, or misleading information</li>
                            <li>Impersonate any person or entity</li>
                            <li>Attempt to gain unauthorized access to our systems or networks</li>
                            <li>Interfere with or disrupt the website or servers</li>
                            <li>Use automated systems (bots, scrapers) to access the website</li>
                            <li>Upload viruses, malware, or harmful code</li>
                            <li>Engage in fraudulent activities or payment disputes</li>
                            <li>Reproduce, duplicate, or resell products for commercial purposes</li>
                            <li>Post or transmit spam, advertising, or promotional materials</li>
                        </ul>
                    </section>

                    {/* Limitation of Liability */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">12. Limitation of Liability</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            To the maximum extent permitted by law:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Mavric shall not be liable for any indirect, incidental, special, or consequential damages</li>
                            <li>Our total liability for any claim shall not exceed the amount you paid for the specific product</li>
                            <li>We are not responsible for delays or failures due to circumstances beyond our control (force majeure)</li>
                            <li>We do not guarantee uninterrupted or error-free website operation</li>
                            <li>We are not liable for any third-party websites linked from our site</li>
                        </ul>
                    </section>

                    {/* Indemnification */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">13. Indemnification</h2>
                        <p className="text-gray-700 leading-relaxed">
                            You agree to indemnify, defend, and hold harmless Mavric, its officers, directors, employees, 
                            and agents from any claims, liabilities, damages, losses, costs, or expenses (including legal fees) 
                            arising from:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Your violation of these Terms</li>
                            <li>Your violation of any rights of another party</li>
                            <li>Your use or misuse of the website</li>
                            <li>Your breach of any law or regulation</li>
                        </ul>
                    </section>

                    {/* Dispute Resolution */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">14. Dispute Resolution</h2>
                        
                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">14.1 Customer Service</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            If you have any concerns or disputes, please contact our customer service first. We are 
                            committed to resolving issues amicably and promptly.
                        </p>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">14.2 Governing Law</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            These Terms are governed by and construed in accordance with the laws of Bangladesh, 
                            without regard to its conflict of law provisions.
                        </p>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">14.3 Jurisdiction</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Any disputes arising from these Terms or your use of the website shall be subject to the 
                            exclusive jurisdiction of the courts located in Dhaka, Bangladesh.
                        </p>
                    </section>

                    {/* Modifications */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">15. Modifications to Terms</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We reserve the right to modify or update these Terms at any time without prior notice. Changes 
                            will be effective immediately upon posting on this page. The "Last Updated" date at the top 
                            indicates when these Terms were last revised.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Your continued use of the website after changes constitutes acceptance of the revised Terms. 
                            We encourage you to review these Terms periodically.
                        </p>
                    </section>

                    {/* Termination */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">16. Termination</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We may terminate or suspend your access to our website immediately, without prior notice or 
                            liability, for any reason, including:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Breach of these Terms</li>
                            <li>Fraudulent or illegal activities</li>
                            <li>At our sole discretion</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed">
                            Upon termination, your right to use the website will cease immediately. All provisions that 
                            should reasonably survive termination will continue to apply.
                        </p>
                    </section>

                    {/* Severability */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">17. Severability</h2>
                        <p className="text-gray-700 leading-relaxed">
                            If any provision of these Terms is found to be invalid or unenforceable by a court of law, 
                            such provision shall be severed, and the remaining provisions shall continue in full force 
                            and effect.
                        </p>
                    </section>

                    {/* Entire Agreement */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">18. Entire Agreement</h2>
                        <p className="text-gray-700 leading-relaxed">
                            These Terms, together with our Privacy Policy and Return Policy, constitute the entire 
                            agreement between you and Mavric regarding your use of the website and supersede all prior 
                            agreements and understandings.
                        </p>
                    </section>

                    {/* Contact Information */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">19. Contact Information</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            If you have any questions, concerns, or feedback regarding these Terms and Conditions, 
                            please contact us:
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

                    {/* Acknowledgment */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">20. Acknowledgment</h2>
                        <p className="text-gray-700 leading-relaxed">
                            By using our website and services, you acknowledge that you have read, understood, and agree 
                            to be bound by these Terms and Conditions.
                        </p>
                    </section>

                    {/* Footer Note */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-12">
                        <p className="text-gray-700 text-center font-semibold mb-2">
                            Thank you for choosing Mavric!
                        </p>
                        <p className="text-gray-600 text-center text-sm">
                            We are committed to providing you with authentic watches and excellent customer service. 
                            These Terms are designed to ensure a fair and transparent relationship between us and our valued customers.
                        </p>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Terms;

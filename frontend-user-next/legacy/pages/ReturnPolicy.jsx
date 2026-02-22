import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ReturnPolicy = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Return and Cancellation Policy</h1>
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
                            At <strong>Mavric</strong>, we want you to be completely satisfied with your purchase. 
                            This Return and Cancellation Policy outlines the conditions under which you can return 
                            or cancel orders for watches purchased from our website.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Please read this policy carefully before making a purchase. By placing an order with us, 
                            you agree to the terms and conditions outlined below.
                        </p>
                    </section>

                    {/* Order Cancellation */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">1. Order Cancellation</h2>
                        
                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">1.1 Before Dispatch</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            You can cancel your order before it has been dispatched:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Contact our customer service at <strong>01890020483</strong></li>
                            <li>Send an email to <strong>famufamu018@gmail.com</strong> with your order details</li>
                            <li>Provide your order number and reason for cancellation</li>
                            <li>Cancellations will be processed within 24 hours</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">1.2 After Dispatch</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Once your order has been dispatched, it cannot be cancelled. However, you can:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Reject the delivery upon arrival (if you don't want the product)</li>
                            <li>Return the product after delivery (subject to our return policy)</li>
                            <li>Contact us immediately if you need to refuse delivery</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">1.3 Refund Timeline</h3>
                        <p className="text-gray-700 leading-relaxed">
                            For cancelled orders, refunds will be processed within 7-14 business days from the 
                            cancellation date, depending on your payment method.
                        </p>
                    </section>

                    {/* Return Policy */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">2. Return Policy</h2>
                        
                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">2.1 Return Period</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            You can return products within <strong>7 days</strong> from the date of delivery:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>The 7-day period starts from the date you receive the product</li>
                            <li>Returns must be initiated within this timeframe</li>
                            <li>Products received after 7 days will not be accepted for return</li>
                            <li>Weekends and holidays are included in the 7-day count</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">2.2 Return Conditions</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            To be eligible for return, products must meet the following conditions:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li><strong>Unused and Unworn:</strong> Products must not show any signs of use</li>
                            <li><strong>Original Packaging:</strong> Must be in original box with all accessories</li>
                            <li><strong>Tags and Labels:</strong> All original tags must be intact and attached</li>
                            <li><strong>No Damage:</strong> No scratches, dents, or modifications</li>
                            <li><strong>Complete Set:</strong> All parts, manuals, and warranty cards must be included</li>
                            <li><strong>Proof of Purchase:</strong> Original invoice or receipt must be provided</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">2.3 Non-Returnable Items</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            The following items cannot be returned:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Products showing signs of wear, use, or damage</li>
                            <li>Items with missing accessories or documentation</li>
                            <li>Products with altered or removed serial numbers</li>
                            <li>Customized or engraved items</li>
                            <li>Sale items, clearance items, or special purchases (unless defective)</li>
                            <li>Products returned after the 7-day period</li>
                        </ul>
                    </section>

                    {/* Defective Products */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">3. Defective Products</h2>
                        
                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">3.1 Manufacturing Defects</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            If you receive a product with manufacturing defects:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Contact us within 48 hours of receiving the product</li>
                            <li>Provide clear photos or videos showing the defect</li>
                            <li>We will arrange for inspection and replacement</li>
                            <li>No additional cost for defective product replacement</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">3.2 Warranty Claims</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            For warranty-related issues:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Refer to the manufacturer's warranty period and terms</li>
                            <li>Contact us with your warranty card and proof of purchase</li>
                            <li>We will assist you with the warranty claim process</li>
                            <li>Warranty service may take 2-4 weeks depending on the issue</li>
                        </ul>
                    </section>

                    {/* Return Process */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">4. Return Process</h2>
                        
                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">4.1 Initiating a Return</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            To initiate a return:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Call our customer service at <strong>01890020483</strong></li>
                            <li>Email us at <strong>famufamu018@gmail.com</strong> with subject "Return Request"</li>
                            <li>Provide your order number, product details, and reason for return</li>
                            <li>Our team will review your request and respond within 24 hours</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">4.2 Packaging the Return</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            When packaging your return:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Use the original packaging if possible</li>
                            <li>Securely wrap the product to prevent damage during transit</li>
                            <li>Include all accessories, manuals, and documentation</li>
                            <li>Place a copy of your invoice inside the package</li>
                            <li>Seal the package properly with tape</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">4.3 Shipping the Return</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Return shipping options:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li><strong>Self-Ship:</strong> You can ship the product back to us at your cost</li>
                            <li><strong>Our Pickup:</strong> We can arrange pickup (charges may apply)</li>
                            <li>Shipping address: 826, Nurpur, Dania, Dhaka-1236, Bangladesh</li>
                            <li>Use a reliable courier service with tracking</li>
                            <li>Keep the tracking number until your return is processed</li>
                        </ul>
                    </section>

                    {/* Refund Policy */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">5. Refund Policy</h2>
                        
                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">5.1 Refund Processing</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Refunds are processed after we receive and inspect the returned product:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Inspection takes 1-2 business days after receipt</li>
                            <li>Refunds are processed within 7-14 business days</li>
                            <li>Refund method depends on your original payment method</li>
                            <li>You will be notified via email/SMS when refund is processed</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">5.2 Refund Methods</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Refunds are issued based on your payment method:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li><strong>Cash on Delivery:</strong> Bank transfer or mobile banking</li>
                            <li><strong>Mobile Banking:</strong> Refund to the same account (bKash, Nagad, Rocket)</li>
                            <li><strong>Bank Transfer:</strong> Refund to the same bank account</li>
                            <li><strong>Credit/Debit Card:</strong> Refund to the same card (may take 5-7 business days)</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">5.3 Partial Refunds</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Partial refunds may be applied in the following situations:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Product is returned with missing accessories or documentation</li>
                            <li>Product shows minor signs of use or handling</li>
                            <li>Original packaging is damaged or missing</li>
                            <li>Return shipping costs (if applicable)</li>
                        </ul>
                    </section>

                    {/* Exchange Policy */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">6. Exchange Policy</h2>
                        
                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">6.1 Exchange Conditions</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            You can exchange products within 7 days of delivery:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Product must meet all return conditions</li>
                            <li>Exchange is subject to product availability</li>
                            <li>Price difference will be charged or refunded</li>
                            <li>Only one exchange per order is allowed</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">6.2 Exchange Process</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            To exchange a product:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Contact customer service to check availability</li>
                            <li>Return the original product following the return process</li>
                            <li>Pay any price difference if the new product costs more</li>
                            <li>Receive refund if the new product costs less</li>
                        </ul>
                    </section>

                    {/* Special Cases */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">7. Special Cases</h2>
                        
                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">7.1 Wrong Product Delivered</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            If you receive the wrong product:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Contact us immediately within 48 hours</li>
                            <li>We will arrange for correct product delivery</li>
                            <li>Wrong product will be picked up at no additional cost</li>
                            <li>No additional charges for correct product delivery</li>
                        </ul>

                        <h3 className="text-2xl font-semibold mb-3 text-gray-800">7.2 Damaged During Transit</h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            If your product is damaged during delivery:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Reject the delivery or refuse to accept</li>
                            <li>Take photos of the damaged package and product</li>
                            <li>Contact us immediately with photos</li>
                            <li>We will arrange for replacement or refund</li>
                        </ul>
                    </section>

                    {/* Customer Responsibilities */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">8. Customer Responsibilities</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            As a customer, you are responsible for:
                        </p>
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                            <li>Inspecting products upon delivery</li>
                            <li>Reporting issues within the specified timeframes</li>
                            <li>Providing accurate information for returns and exchanges</li>
                            <li>Packaging products securely for return shipping</li>
                            <li>Paying return shipping costs (unless product is defective)</li>
                            <li>Following the proper return and cancellation procedures</li>
                        </ul>
                    </section>

                    {/* Contact Information */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">9. Contact Information</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            For any questions about returns, cancellations, or exchanges:
                        </p>
                        <div className="bg-gray-50 border-l-4 border-blue-600 p-6 rounded">
                            <p className="font-semibold text-lg mb-3">Mavric Customer Service</p>
                            <ul className="space-y-2 text-gray-700">
                                <li><strong>Phone:</strong> <a href="tel:01890020483" className="text-blue-600 hover:underline">01890020483</a></li>
                                <li><strong>Email:</strong> <a href="mailto:famufamu018@gmail.com" className="text-blue-600 hover:underline">famufamu018@gmail.com</a></li>
                                <li><strong>Address:</strong> 826, Nurpur, Dania, Dhaka-1236, Bangladesh</li>
                                <li><strong>Business Hours:</strong> Saturday - Thursday, 10:00 AM - 8:00 PM</li>
                                <li><strong>Response Time:</strong> Within 24 hours for all inquiries</li>
                            </ul>
                        </div>
                    </section>

                    {/* Policy Updates */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">10. Policy Updates</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We reserve the right to update this Return and Cancellation Policy at any time. 
                            Changes will be effective immediately upon posting on our website.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            The "Last Updated" date at the top of this page indicates when this policy was 
                            last revised. We encourage you to review this policy periodically.
                        </p>
                    </section>

                    {/* Important Notes */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-gray-900">11. Important Notes</h2>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                            <ul className="space-y-3 text-gray-700">
                                <li>• This policy applies only to purchases made directly from Mavric</li>
                                <li>• Products purchased from authorized dealers have separate return policies</li>
                                <li>• We reserve the right to refuse returns that don't meet our conditions</li>
                                <li>• Disputes will be resolved according to Bangladesh law</li>
                                <li>• This policy is subject to change without prior notice</li>
                            </ul>
                        </div>
                    </section>

                    {/* Footer Note */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-12">
                        <p className="text-gray-700 text-center font-semibold mb-2">
                            Your Satisfaction is Our Priority!
                        </p>
                        <p className="text-gray-600 text-center text-sm">
                            We are committed to providing you with authentic watches and excellent service. 
                            If you have any issues with your purchase, please don't hesitate to contact us.
                        </p>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ReturnPolicy;

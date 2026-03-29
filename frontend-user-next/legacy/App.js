import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import ProductDetails from './components/ProductDetails';
import ProductDetail from './pages/ProductDetail';
import BrandProducts from './components/BrandProducts';
import AllProductsPage from './pages/AllProductsPage';
import FeaturedProducts from './pages/AllProducts';
import Brands from './pages/Brands';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ReturnPolicy from './pages/ReturnPolicy';
import ThankYou from './pages/ThankYou';
import Orders from './pages/Orders';

function App() {
    return (
        <CartProvider>
            <Router>
                <div className="min-h-screen bg-white flex flex-col">
                    <Header />
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/product/:id" element={<ProductDetails />} />
                            <Route path="/product-detail/:id" element={<ProductDetail />} />
                            <Route path="/brand/:brandId" element={<BrandProducts />} />
                            <Route path="/all-products" element={<AllProductsPage />} />
                            <Route path="/featured-products" element={<FeaturedProducts />} />
                            <Route path="/brands" element={<Brands />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/return" element={<ReturnPolicy />} />
                            <Route path="/thank-you" element={<ThankYou />} />
                            <Route path="/orders" element={<Orders />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;

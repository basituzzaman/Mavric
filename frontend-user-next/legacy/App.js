import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
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

function App() {
    return (
        <CartProvider>
            <Router>
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
                </Routes>
            </Router>
        </CartProvider>
    );
}

export default App;

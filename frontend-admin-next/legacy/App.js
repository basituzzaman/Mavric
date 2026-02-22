import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Orders from './pages/Orders';
import Brands from './pages/Brands';
import Sliders from './pages/Sliders';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// Global instance tracking to prevent duplicates
let adminInstanceCount = 0;
let isAppMounted = false;

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }
    
    return user ? children : <Navigate to="/login" />;
};

const AdminLayout = ({ children }) => {
    const layoutRef = useRef(null);
    
    useEffect(() => {
        if (layoutRef.current && !isAppMounted) {
            isAppMounted = true;
            console.log('🏢 AdminLayout mounted - Single instance');
        }
    }, []);
    
    return (
        <div ref={layoutRef} key="single-admin-layout" className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

function App() {
    const appRef = useRef(null);
    
    useEffect(() => {
        if (appRef.current) {
            adminInstanceCount++;
            if (adminInstanceCount > 1) {
                console.warn('🚫 Multiple App instances detected - Blocking duplicate');
                return;
            }
            console.log('✅ Single App instance mounted');
        }
        
        return () => {
            if (adminInstanceCount > 0) {
                adminInstanceCount--;
            }
            isAppMounted = false;
        };
    }, []);
    
    // Prevent multiple instances
    if (adminInstanceCount > 1) {
        return null;
    }
    
    return (
        <div ref={appRef}>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route key="login" path="/login" element={<Login />} />
                        <Route 
                            key="dashboard"
                            path="/dashboard" 
                            element={
                                <ProtectedRoute>
                                    <AdminLayout>
                                        <Dashboard />
                                    </AdminLayout>
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            key="products"
                            path="/products" 
                            element={
                                <ProtectedRoute>
                                    <AdminLayout>
                                        <Products />
                                    </AdminLayout>
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            key="add-product"
                            path="/products/add" 
                            element={
                                <ProtectedRoute>
                                    <AdminLayout>
                                        <AddProduct />
                                    </AdminLayout>
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            key="edit-product"
                            path="/products/edit/:id" 
                            element={
                                <ProtectedRoute>
                                    <AdminLayout>
                                        <EditProduct />
                                    </AdminLayout>
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            key="orders"
                            path="/orders" 
                            element={
                                <ProtectedRoute>
                                    <AdminLayout>
                                        <Orders />
                                    </AdminLayout>
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            key="brands"
                            path="/brands" 
                            element={
                                <ProtectedRoute>
                                    <AdminLayout>
                                        <Brands />
                                    </AdminLayout>
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            key="sliders"
                            path="/sliders" 
                            element={
                                <ProtectedRoute>
                                    <AdminLayout>
                                        <Sliders />
                                    </AdminLayout>
                                </ProtectedRoute>
                            } 
                        />
                        <Route key="root" path="/" element={<Navigate to="/login" />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;


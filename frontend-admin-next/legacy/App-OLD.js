import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import EditProduct from './pages/EditProduct';
import Orders from './pages/Orders';
import Brands from './pages/Brands';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
    return user ? children : <Navigate to="/login" />;
};

const AdminLayout = ({ children }) => {
    return (
        <div key="admin-layout-main" className="flex h-screen bg-gray-100">
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
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route key="login-route" path="/login" element={<Login />} />
                    <Route 
                        key="dashboard-route"
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
                        key="products-route"
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
                        key="edit-products-route"
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
                        key="orders-route"
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
                        key="brands-route"
                        path="/brands" 
                        element={
                            <ProtectedRoute>
                                <AdminLayout>
                                    <Brands />
                                </AdminLayout>
                            </ProtectedRoute>
                        } 
                    />
                    <Route key="root-route" path="/" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

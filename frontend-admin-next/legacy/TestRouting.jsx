import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const TestRouting = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <h1>Routing Test</h1>
            <button onClick={() => navigate('/admin/products/edit/7')}>
                Test Edit Product 7
            </button>
            <button onClick={() => navigate('/admin/products/edit/999')}>
                Test Edit Product 999 (non-existent)
            </button>
            <button onClick={() => navigate('/admin/products/edit/abc')}>
                Test Edit Product abc (invalid)
            </button>
        </div>
    );
};

export default TestRouting;

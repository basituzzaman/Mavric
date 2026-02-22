import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';
export const ASSET_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, '');

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Admin APIs
export const adminLogin = (credentials) => api.post('/admin/login.php', credentials);

export const getAdminProducts = (params) => api.get('/admin/products.php', { params });
export const getProductById = (id) => api.get(`/admin/products.php?id=${id}`);
export const createProduct = (data) => api.post('/admin/products.php', data);
export const updateProduct = (id, data) => api.put(`/admin/products.php?id=${id}`, data);
export const deleteProduct = (id) => api.delete(`/admin/products.php?id=${id}`);

export const getAdminOrders = (params) => api.get('/admin/orders.php', { params });
export const updateOrderStatus = (id, status) => api.put(`/admin/orders.php?id=${id}`, { status });

export const getAdminBrands = () => api.get('/admin/brands.php');
export const createBrand = (data) => api.post('/admin/brands.php', data);
export const updateBrand = (id, data) => api.put(`/admin/brands.php?id=${id}`, data);
export const deleteBrand = (id) => api.delete(`/admin/brands.php?id=${id}`);

export const getAdminSliders = () => api.get('/admin/sliders.php');
export const createSlider = (data) => api.post('/admin/sliders.php', data);
export const updateSlider = (id, data) => api.put(`/admin/sliders.php?id=${id}`, data);
export const deleteSlider = (id) => api.delete(`/admin/sliders.php?id=${id}`);

export const uploadFile = (file, type) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    return api.post('/admin/upload.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

export default api;

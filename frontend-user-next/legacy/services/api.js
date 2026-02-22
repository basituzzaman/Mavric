import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api';
export const ASSET_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, '');

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Public APIs only for user website
export const getProducts = (params = {}) => api.get('/products.php', { params });
export const getProductById = (id) => api.get(`/products.php?id=${id}`);
export const getBrands = () => api.get('/brands.php');
export const getSliders = () => api.get('/sliders.php');
export const createOrder = (data) => api.post('/orders.php', data);

export default api;

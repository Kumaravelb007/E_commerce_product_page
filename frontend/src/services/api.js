import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/me'),
  verifyToken: () => api.post('/auth/verify-token'),
};

// Products API
export const productsAPI = {
  getAll: (params = {}) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getCategories: () => api.get('/products/categories'),
  getSuggestions: (query) => api.get('/products/search/suggestions', { params: { q: query } }),
  create: (productData) => {
    // Check if productData is FormData (for file uploads)
    if (productData instanceof FormData) {
      return api.post('/products', productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
    return api.post('/products', productData);
  },
  update: (id, productData) => {
    // Check if productData is FormData (for file uploads)
    if (productData instanceof FormData) {
      return api.put(`/products/${id}`, productData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
    return api.put(`/products/${id}`, productData);
  },
  delete: (id) => api.delete(`/products/${id}`),
  uploadImage: (formData) => api.post('/products/upload-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

// Cart API
export const cartAPI = {
  get: () => api.get('/cart'),
  addItem: (productId, quantity = 1) => api.post('/cart/add', { productId, quantity }),
  updateItem: (productId, quantity) => api.put('/cart/update', { productId, quantity }),
  removeItem: (productId) => api.delete(`/cart/remove/${productId}`),
  clear: () => api.delete('/cart/clear'),
  checkout: (orderData) => api.post('/cart/checkout', orderData),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  changePassword: (passwordData) => api.put('/users/change-password', passwordData),
  getOrders: () => api.get('/users/orders'),
  getOrder: (orderId) => api.get(`/users/orders/${orderId}`),
  // Admin routes
  getAllUsers: () => api.get('/users'),
  getUser: (userId) => api.get(`/users/${userId}`),
  updateUserRole: (userId, role) => api.put(`/users/${userId}/role`, { role }),
  getAllOrders: () => api.get('/users/orders/all'),
  updateOrderStatus: (orderId, status) => api.put(`/users/orders/${orderId}/status`, { status }),
};

export default api;

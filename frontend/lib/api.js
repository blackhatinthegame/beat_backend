"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserApi = exports.CheckoutApi = exports.FavoritesApi = exports.BeatApi = exports.AuthApi = void 0;
const axios_1 = __importDefault(require("axios"));
const api = axios_1.default.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
    withCredentials: true
});
api.interceptors.request.use(config => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});
exports.AuthApi = {
    signup: (data) => api.post('/auth/signup', data).then(r => r.data),
    login: (data) => api.post('/auth/login', data).then(r => r.data),
    refresh: (refreshToken) => api.post('/auth/refresh', { refreshToken }).then(r => r.data)
};
exports.BeatApi = {
    list: (params) => api.get('/beats/list', { params }).then(r => r.data),
    create: (form) => api.post('/beats/create', form, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data),
    get: (id) => api.get(`/beats/${id}`).then(r => r.data)
};
exports.FavoritesApi = {
    toggle: (beatId) => api.post(`/favorites/${beatId}`).then(r => r.data),
    list: () => api.get('/favorites').then(r => r.data)
};
exports.CheckoutApi = {
    purchase: (beatId) => api.post(`/checkout/${beatId}`).then(r => r.data)
};
exports.UserApi = {
    profile: () => api.get('/user/profile').then(r => r.data),
    myBeats: () => api.get('/user/beats').then(r => r.data)
};
//# sourceMappingURL=api.js.map
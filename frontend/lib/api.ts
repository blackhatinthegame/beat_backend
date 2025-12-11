import axios from 'axios';

const api = axios.create({
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

export const AuthApi = {
  signup: (data: any) => api.post('/auth/signup', data).then(r => r.data),
  login: (data: any) => api.post('/auth/login', data).then(r => r.data),
  refresh: (refreshToken: string) => api.post('/auth/refresh', { refreshToken }).then(r => r.data)
};

export const BeatApi = {
  list: (params?: Record<string, any>) => api.get('/beats/list', { params }).then(r => r.data),
  create: (form: FormData) => api.post('/beats/create', form, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data),
  get: (id: string) => api.get(`/beats/${id}`).then(r => r.data)
};

export const FavoritesApi = {
  toggle: (beatId: string) => api.post(`/favorites/${beatId}`).then(r => r.data),
  list: () => api.get('/favorites').then(r => r.data)
};

export const CheckoutApi = {
  purchase: (beatId: string) => api.post(`/checkout/${beatId}`).then(r => r.data)
};

export const UserApi = {
  profile: () => api.get('/user/profile').then(r => r.data),
  myBeats: () => api.get('/user/beats').then(r => r.data)
};



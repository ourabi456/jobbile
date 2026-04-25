import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://your-backend.railway.app/v1';

export const api = axios.create({ baseURL: BASE_URL, timeout: 10000 });

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  async (err) => {
    if (err.response?.status === 401) {
      await SecureStore.deleteItemAsync('access_token');
      await SecureStore.deleteItemAsync('user');
    }
    return Promise.reject(err);
  }
);

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
};

export const jobsApi = {
  list: (params?: Record<string, unknown>) => api.get('/jobs', { params }),
  get: (id: string) => api.get(`/jobs/${id}`),
  updateStatus: (id: string, status: string) =>
    api.patch(`/jobs/${id}/status`, { status }),
};

export const clientsApi = {
  list: (search?: string) => api.get('/clients', { params: { search } }),
  get: (id: string) => api.get(`/clients/${id}`),
};

export const invoicesApi = {
  list: () => api.get('/invoices'),
  get: (id: string) => api.get(`/invoices/${id}`),
  send: (id: string) => api.post(`/invoices/${id}/send`),
};

import { urls } from '@/lib/constants/Urls';
import { getTokenFromSecureStore } from '@/hooks/useToken';
import axios, { AxiosInstance } from 'axios';

// Create Axios instance with default configuration
const api: AxiosInstance = axios.create({
  baseURL: urls.API_URL, // Replace with your API base URL
  timeout: 10000, // Adjust timeout as needed
});

// Add a request interceptor to attach token to request headers
api.interceptors.request.use(
  async (config) => {
    // Get token from secure storage
    const token = await getTokenFromSecureStore();

    // If token exists, attach it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default api;

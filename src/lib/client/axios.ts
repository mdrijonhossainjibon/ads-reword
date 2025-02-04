import axios, { AxiosError } from 'axios';
import { ApiError, ApiResponse } from './types';
import { InternalAxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
const baseURL = process.env.NEXT_PUBLIC_API_URL || '/api';

export class CustomError extends Error {
  status: number;
  code: string;
  details?: Record<string, any>;
  timestamp: string;

  constructor(error: ApiError) {
    super(error.message);
    this.status = error.status;
    this.code = error.code;
    this.details = error.details;
    this.timestamp = error.timestamp;
  }
}

const formatError = (error: AxiosError): ApiError => {
  const status = error.response?.status || 500;
  const responseData = error.response?.data as any;

  return {
    status,
    code: responseData?.code || 'UNKNOWN_ERROR',
    message: responseData?.message || error.message || 'An unexpected error occurred',
    details: responseData?.details || {},
    timestamp: new Date().toISOString()
  };
};

export const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
      const token = localStorage.getItem('token');
     if (token) {
     config.headers.Authorization = `Bearer ${token}`;
     }
    return config;
  },
  (error) => {
    const formattedError = formatError(error);
    return Promise.reject(new CustomError(formattedError));
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    response.data = {
      success: true,
      data: response.data
    };
    return response;
  },
  async (error: AxiosError) => {
    if (!error.config) {
      const formattedError = formatError(error);
      return {
        success: false,
        error: formattedError
      };
    }

  const originalRequest = error.config as CustomAxiosRequestConfig;
  
  // Handle 401 Unauthorized errors
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    // Add refresh token logic here if needed
  }

    const formattedError = formatError(error);
    
    const errorResponse: ApiResponse = {
      success: false,
      error: formattedError
    };

    return Promise.reject(new CustomError(formattedError));
  }
);
 
 
export default axiosClient;

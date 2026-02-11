import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { authStore } from '../stores/auth-store';

// Interfaz de respuesta API
export interface ApiResponse<T = any> {
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
  path: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
  errors?: Array<{ field: string; message: string }>;
  timestamp: string;
  path: string;
}

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Interceptor de Request - Adjunta token automáticamente
    this.instance.interceptors.request.use(
      (config) => {
        const token = authStore.getState().token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor de Response - Manejo de errores centralizado
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => response,
      async (error: AxiosError<ApiError>) => {
        // Si es error 401, cerrar sesión
        if (error.response?.status === 401) {
          authStore.getState().logout();
          window.location.href = '/login';
        }

        // Formatear error para consistencia
        const apiError: ApiError = error.response?.data || {
          statusCode: error.response?.status || 500,
          message: error.message || 'Error de conexión',
          error: 'Network Error',
          timestamp: new Date().toISOString(),
          path: error.config?.url || '',
        };

        return Promise.reject(apiError);
      }
    );
  }

  // Métodos HTTP
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    return response.data.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.patch<ApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config);
    return response.data.data;
  }

  // Método para obtener respuesta completa (incluye message, statusCode, etc.)
  async getFullResponse<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();

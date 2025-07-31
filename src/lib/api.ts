import type { GenericDataRequest, GenericDataResponse } from './types';
import { mockApiClient } from './mockApi';

// Use proxy in development to bypass CORS, direct API in production
const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:3001/api'  // Proxy server
  : (import.meta.env.VITE_RENDER_API_URL || 'https://render-student-profile.onrender.com');

// Generic API client with error handling
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // ORBT-compliant generic data operations with mock fallback
  async getData<T>(table: string, action: string, params?: Record<string, unknown>): Promise<GenericDataResponse<T>> {
    try {
      const request: GenericDataRequest = {
        table,
        action: action as GenericDataRequest['action'],
        ...params
      };
      return await this.post<GenericDataResponse<T>>('/data', request);
    } catch (error) {
      console.log('Real API failed, using mock API:', error);
      return mockApiClient.getData<T>(table, action, params);
    }
  }

  async createData<T>(table: string, data: Record<string, unknown>): Promise<GenericDataResponse<T>> {
    try {
      const request: GenericDataRequest = {
        table,
        action: 'create',
        data
      };
      return await this.post<GenericDataResponse<T>>('/data', request);
    } catch (error) {
      console.log('Real API failed, using mock API:', error);
      return mockApiClient.createData<T>(table, data);
    }
  }

  async updateData<T>(table: string, id: string, data: Record<string, unknown>): Promise<GenericDataResponse<T>> {
    try {
      const request: GenericDataRequest = {
        table,
        action: 'update',
        id,
        data
      };
      return await this.post<GenericDataResponse<T>>('/data', request);
    } catch (error) {
      console.log('Real API failed, using mock API:', error);
      return mockApiClient.updateData<T>(table, id, data);
    }
  }

  async deleteData<T>(table: string, id: string): Promise<GenericDataResponse<T>> {
    try {
      const request: GenericDataRequest = {
        table,
        action: 'delete',
        id
      };
      return await this.post<GenericDataResponse<T>>('/data', request);
    } catch (error) {
      console.log('Real API failed, using mock API:', error);
      return mockApiClient.deleteData<T>(table, id);
    }
  }
}

export const apiClient = new ApiClient(API_BASE_URL); 
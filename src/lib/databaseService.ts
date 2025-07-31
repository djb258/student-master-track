import { apiClient } from './api';
import { 
  ApiResponse,
  PaginatedResponse
} from './types';

// Generic database service for handling multiple tables
export class DatabaseService {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  // Get all records with optional filters
  async getAll<T>(filters?: Record<string, any>): Promise<PaginatedResponse<T>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    
    const queryString = params.toString();
    const endpoint = queryString ? `/${this.tableName}?${queryString}` : `/${this.tableName}`;
    
    return apiClient.get<PaginatedResponse<T>>(endpoint);
  }

  async getById<T>(id: string): Promise<T> {
    return apiClient.get<T>(`/${this.tableName}/${id}`);
  }

  async create<T>(data: any): Promise<T> {
    return apiClient.post<T>(`/${this.tableName}`, data);
  }

  async update<T>(id: string, data: Partial<any>): Promise<T> {
    return apiClient.put<T>(`/${this.tableName}/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/${this.tableName}/${id}`);
  }

  async search<T>(query: string, fields?: string[]): Promise<T[]> {
    const params = new URLSearchParams({ q: query });
    if (fields) {
      params.append('fields', fields.join(','));
    }
    
    return apiClient.get<T[]>(`/${this.tableName}/search?${params.toString()}`);
  }

  async getByField<T>(field: string, value: string): Promise<T[]> {
    return apiClient.get<T[]>(`/${this.tableName}/${field}/${encodeURIComponent(value)}`);
  }

  async getStatistics(): Promise<Record<string, any>> {
    return apiClient.get(`/${this.tableName}/stats`);
  }

  async count(filters?: Record<string, any>): Promise<number> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });
    }
    
    const queryString = params.toString();
    const endpoint = queryString ? `/${this.tableName}/count?${queryString}` : `/${this.tableName}/count`;
    
    const response = await apiClient.get<{ count: number }>(endpoint);
    return response.count;
  }
}

// Factory function to create service instances
export function createService(tableName: string): DatabaseService {
  return new DatabaseService(tableName);
}

// Export convenience functions
export const studentService = createService('students');
export const teacherService = createService('teachers');
export const courseService = createService('courses');
import { apiClient } from './api';

// Generic database service for handling multiple tables
export class DatabaseService {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  // Generic CRUD operations
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

  async delete(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
    return apiClient.delete<ApiResponse<{ deleted: boolean }>>(`/${this.tableName}/${id}`);
  }

  async search<T>(query: string, fields?: string[]): Promise<T[]> {
    const params = new URLSearchParams({ q: query });
    if (fields) {
      params.append('fields', fields.join(','));
    }
    
    const response = await apiClient.get<PaginatedResponse<T>>(`/${this.tableName}/search?${params}`);
    return response.data;
  }

  async getByField<T>(field: string, value: string): Promise<T[]> {
    const response = await apiClient.get<PaginatedResponse<T>>(`/${this.tableName}/${field}/${encodeURIComponent(value)}`);
    return response.data;
  }

  async getStatistics(): Promise<Record<string, any>> {
    return apiClient.get(`/${this.tableName}/stats`);
  }

  // Batch operations
  async createMany<T>(data: any[]): Promise<T[]> {
    return apiClient.post<T[]>(`/${this.tableName}/batch`, { records: data });
  }

  async updateMany<T>(updates: { id: string; data: any }[]): Promise<T[]> {
    return apiClient.put<T[]>(`/${this.tableName}/batch`, { updates });
  }

  async deleteMany(ids: string[]): Promise<ApiResponse<{ deleted: number }>> {
    return apiClient.delete<ApiResponse<{ deleted: number }>>(`/${this.tableName}/batch`, {
      body: JSON.stringify({ ids })
    });
  }
}

// Factory function to create service instances
export function createService<T>(tableName: string): DatabaseService {
  return new DatabaseService(tableName);
}

// Pre-configured services for common tables
export const studentService = createService('students');
export const teacherService = createService('teachers');
export const courseService = createService('courses');
export const enrollmentService = createService('enrollments');
export const attendanceService = createService('attendance');
export const gradeService = createService('grades');
export const parentService = createService('parents');
export const schoolService = createService('schools');
export const classService = createService('classes');
export const scheduleService = createService('schedules'); 
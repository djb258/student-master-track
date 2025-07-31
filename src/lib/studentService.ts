import { apiClient } from './api';
import type { 
  Student, 
  CreateStudentRequest, 
  UpdateStudentRequest, 
  ApiResponse, 
  PaginatedResponse,
  StudentFilters 
} from './types';

export class StudentService {
  // Get all students with optional filters
  static async getStudents(filters?: StudentFilters): Promise<PaginatedResponse<Student>> {
    const params = new URLSearchParams();
    
    if (filters?.grade) params.append('grade', filters.grade);
    if (filters?.school) params.append('school', filters.school);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    
    const queryString = params.toString();
    const endpoint = queryString ? `/students?${queryString}` : '/students';
    
    return apiClient.get<PaginatedResponse<Student>>(endpoint);
  }

  // Get a single student by ID
  static async getStudent(id: string): Promise<Student> {
    return apiClient.get<Student>(`/students/${id}`);
  }

  // Create a new student
  static async createStudent(studentData: CreateStudentRequest): Promise<Student> {
    return apiClient.post<Student>('/students', studentData);
  }

  // Update an existing student
  static async updateStudent(id: string, studentData: Partial<CreateStudentRequest>): Promise<Student> {
    return apiClient.put<Student>(`/students/${id}`, studentData);
  }

  // Delete a student
  static async deleteStudent(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
    return apiClient.delete<ApiResponse<{ deleted: boolean }>>(`/students/${id}`);
  }

  // Search students by name or email
  static async searchStudents(query: string): Promise<Student[]> {
    const response = await apiClient.get<PaginatedResponse<Student>>(`/students/search?q=${encodeURIComponent(query)}`);
    return response.data;
  }

  // Get students by grade
  static async getStudentsByGrade(grade: string): Promise<Student[]> {
    const response = await apiClient.get<PaginatedResponse<Student>>(`/students/grade/${grade}`);
    return response.data;
  }

  // Get students by school
  static async getStudentsBySchool(school: string): Promise<Student[]> {
    const response = await apiClient.get<PaginatedResponse<Student>>(`/students/school/${encodeURIComponent(school)}`);
    return response.data;
  }

  // Get statistics
  static async getStatistics(): Promise<{
    totalStudents: number;
    studentsByGrade: Record<string, number>;
    studentsBySchool: Record<string, number>;
  }> {
    return apiClient.get('/students/stats');
  }
} 
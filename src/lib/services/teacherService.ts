import { DatabaseService } from '../databaseService';
import { apiClient } from '../api';
import type { 
  Teacher, 
  CreateTeacherRequest, 
  UpdateTeacherRequest, 
  TeacherFilters,
  Course,
  Student,
  PaginatedResponse
} from '../types';

export class TeacherService extends DatabaseService {
  constructor() {
    super('teachers');
  }

  // Teacher-specific methods
  async getTeachersByDepartment(department: string): Promise<Teacher[]> {
    return this.getByField<Teacher>('department', department);
  }

  async getTeachersBySubject(subject: string): Promise<Teacher[]> {
    return this.getByField<Teacher>('subject', subject);
  }

  async getTeachersBySchool(schoolId: string): Promise<Teacher[]> {
    return this.getByField<Teacher>('schoolId', schoolId);
  }

  async getTeacherCourses(teacherId: string): Promise<Course[]> {
    return apiClient.get<Course[]>(`/teachers/${teacherId}/courses`);
  }

  async getTeacherStudents(teacherId: string): Promise<Student[]> {
    return apiClient.get<Student[]>(`/teachers/${teacherId}/students`);
  }

  async getTeacherSchedule(teacherId: string, schoolYear?: string, semester?: string): Promise<any[]> {
    const params = new URLSearchParams();
    if (schoolYear) params.append('schoolYear', schoolYear);
    if (semester) params.append('semester', semester);
    
    const queryString = params.toString();
    const endpoint = queryString ? `/teachers/${teacherId}/schedule?${queryString}` : `/teachers/${teacherId}/schedule`;
    
    return apiClient.get<any[]>(endpoint);
  }

  async getTeacherStatistics(teacherId: string): Promise<{
    totalStudents: number;
    totalCourses: number;
    averageAttendance: number;
    averageGPA: number;
  }> {
    return apiClient.get(`/teachers/${teacherId}/stats`);
  }

  // Override base methods with proper typing
  async getAll(filters?: TeacherFilters): Promise<PaginatedResponse<Teacher>> {
    return super.getAll<Teacher>(filters);
  }

  async getById(id: string): Promise<Teacher> {
    return super.getById<Teacher>(id);
  }

  async create(data: CreateTeacherRequest): Promise<Teacher> {
    return super.create<Teacher>(data);
  }

  async update(id: string, data: UpdateTeacherRequest): Promise<Teacher> {
    return super.update<Teacher>(id, data);
  }
} 
import { DatabaseService } from '../databaseService';
import { apiClient } from '../api';
import type { 
  Course, 
  CreateCourseRequest, 
  UpdateCourseRequest, 
  CourseFilters,
  Student,
  Teacher,
  PaginatedResponse
} from '../types';

export class CourseService extends DatabaseService {
  constructor() {
    super('courses');
  }

  // Course-specific methods
  async getCoursesBySubject(subject: string): Promise<Course[]> {
    return this.getByField<Course>('subject', subject);
  }

  async getCoursesByGradeLevel(gradeLevel: string): Promise<Course[]> {
    return this.getByField<Course>('gradeLevel', gradeLevel);
  }

  async getCoursesByTeacher(teacherId: string): Promise<Course[]> {
    return this.getByField<Course>('teacherId', teacherId);
  }

  async getCoursesBySchool(schoolId: string): Promise<Course[]> {
    return this.getByField<Course>('schoolId', schoolId);
  }

  async getCourseStudents(courseId: string): Promise<Student[]> {
    return apiClient.get<Student[]>(`/courses/${courseId}/students`);
  }

  async getCourseTeacher(courseId: string): Promise<Teacher> {
    return apiClient.get<Teacher>(`/courses/${courseId}/teacher`);
  }

  async getCourseSchedule(courseId: string): Promise<any[]> {
    return apiClient.get<any[]>(`/courses/${courseId}/schedule`);
  }

  async getCourseStatistics(courseId: string): Promise<{
    totalStudents: number;
    averageAttendance: number;
    averageGPA: number;
    gradeDistribution: Record<string, number>;
  }> {
    return apiClient.get(`/courses/${courseId}/stats`);
  }

  async enrollStudent(courseId: string, studentId: string): Promise<any> {
    return apiClient.post(`/courses/${courseId}/enroll`, { studentId });
  }

  async unenrollStudent(courseId: string, studentId: string): Promise<any> {
    return apiClient.delete(`/courses/${courseId}/enroll/${studentId}`);
  }

  // Override base methods with proper typing
  async getAll(filters?: CourseFilters): Promise<PaginatedResponse<Course>> {
    return super.getAll<Course>(filters);
  }

  async getById(id: string): Promise<Course> {
    return super.getById<Course>(id);
  }

  async create(data: CreateCourseRequest): Promise<Course> {
    return super.create<Course>(data);
  }

  async update(id: string, data: UpdateCourseRequest): Promise<Course> {
    return super.update<Course>(id, data);
  }
} 
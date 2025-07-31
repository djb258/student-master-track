import { apiClient } from '../api';
import { mockApiClient } from '../mockApi';
import type { 
  DashboardStats, 
  SchoolStats,
  Student,
  Teacher,
  Course,
  Enrollment,
  Attendance,
  Grade
} from '../types';

export class DashboardService {
  // Get overall dashboard statistics
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      return await apiClient.get<DashboardStats>('/dashboard/stats');
    } catch (error) {
      console.log('Real API failed, using mock API for dashboard stats:', error);
      const mockResponse = await mockApiClient.getDashboardStats();
      return mockResponse.data;
    }
  }

  // Get school-specific statistics
  async getSchoolStats(schoolId?: string): Promise<SchoolStats> {
    const endpoint = schoolId ? `/dashboard/school/${schoolId}/stats` : '/dashboard/schools/stats';
    return apiClient.get<SchoolStats>(endpoint);
  }

  // Get enrollment trends
  async getEnrollmentTrends(period: 'monthly' | 'quarterly' | 'yearly' = 'monthly'): Promise<{
    period: string;
    enrollments: number;
    date: string;
  }[]> {
    return apiClient.get(`/dashboard/enrollment-trends?period=${period}`);
  }

  // Get attendance analytics
  async getAttendanceAnalytics(schoolId?: string, dateRange?: { start: string; end: string }): Promise<{
    totalDays: number;
    averageAttendance: number;
    attendanceByGrade: Record<string, number>;
    attendanceByMonth: Record<string, number>;
  }> {
    const params = new URLSearchParams();
    if (schoolId) params.append('schoolId', schoolId);
    if (dateRange) {
      params.append('startDate', dateRange.start);
      params.append('endDate', dateRange.end);
    }
    
    const queryString = params.toString();
    const endpoint = queryString ? `/dashboard/attendance?${queryString}` : '/dashboard/attendance';
    
    return apiClient.get(endpoint);
  }

  // Get grade analytics
  async getGradeAnalytics(schoolId?: string, courseId?: string): Promise<{
    averageGPA: number;
    gradeDistribution: Record<string, number>;
    topPerformers: Student[];
    improvementAreas: string[];
  }> {
    const params = new URLSearchParams();
    if (schoolId) params.append('schoolId', schoolId);
    if (courseId) params.append('courseId', courseId);
    
    const queryString = params.toString();
    const endpoint = queryString ? `/dashboard/grades?${queryString}` : '/dashboard/grades';
    
    return apiClient.get(endpoint);
  }

  // Get teacher performance analytics
  async getTeacherAnalytics(teacherId?: string): Promise<{
    totalStudents: number;
    averageAttendance: number;
    averageGPA: number;
    coursePerformance: Record<string, number>;
    studentSatisfaction: number;
  }> {
    const endpoint = teacherId ? `/dashboard/teachers/${teacherId}/analytics` : '/dashboard/teachers/analytics';
    return apiClient.get(endpoint);
  }

  // Get course performance analytics
  async getCourseAnalytics(courseId?: string): Promise<{
    enrollmentCount: number;
    averageAttendance: number;
    averageGPA: number;
    completionRate: number;
    studentFeedback: Record<string, number>;
  }> {
    const endpoint = courseId ? `/dashboard/courses/${courseId}/analytics` : '/dashboard/courses/analytics';
    return apiClient.get(endpoint);
  }

  // Get student performance analytics
  async getStudentAnalytics(studentId: string): Promise<{
    currentGPA: number;
    attendanceRate: number;
    courseProgress: Record<string, number>;
    gradeHistory: Grade[];
    attendanceHistory: Attendance[];
  }> {
    return apiClient.get(`/dashboard/students/${studentId}/analytics`);
  }

  // Get comparative analytics
  async getComparativeAnalytics(metric: 'gpa' | 'attendance' | 'enrollment', comparison: 'schools' | 'teachers' | 'courses'): Promise<{
    metric: string;
    comparison: string;
    data: Record<string, number>;
    rankings: Array<{ name: string; value: number; rank: number }>;
  }> {
    return apiClient.get(`/dashboard/comparative?metric=${metric}&comparison=${comparison}`);
  }

  // Get real-time data
  async getRealTimeData(): Promise<{
    activeStudents: number;
    activeTeachers: number;
    activeCourses: number;
    recentEnrollments: Enrollment[];
    recentAttendance: Attendance[];
  }> {
    return apiClient.get('/dashboard/realtime');
  }

  // Export data for reporting
  async exportData(type: 'students' | 'teachers' | 'courses' | 'grades' | 'attendance', format: 'csv' | 'excel' = 'csv'): Promise<Blob> {
    const response = await apiClient.get(`/dashboard/export?type=${type}&format=${format}`);
    return new Blob([JSON.stringify(response)], { type: 'application/json' });
  }

  // Get custom reports
  async getCustomReport(reportConfig: {
    type: string;
    filters: Record<string, any>;
    groupBy?: string[];
    metrics: string[];
  }): Promise<any> {
    return apiClient.post('/dashboard/custom-report', reportConfig);
  }
} 
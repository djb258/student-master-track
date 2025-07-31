// Base entity interface
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Student Profile Types
export interface Student extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  grade: string;
  schoolId: string;
  parentId: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalConditions?: string;
  allergies?: string;
  medications?: string;
  studentId: string; // Student ID number
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated' | 'transferred';
}

// Teacher Types
export interface Teacher extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  schoolId: string;
  department: string;
  subject: string;
  hireDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'on_leave';
  qualifications: string[];
  certifications: string[];
}

// Course Types
export interface Course extends BaseEntity {
  name: string;
  code: string;
  description: string;
  credits: number;
  gradeLevel: string;
  subject: string;
  teacherId: string;
  schoolId: string;
  maxStudents: number;
  prerequisites: string[];
  syllabus: string;
  status: 'active' | 'inactive' | 'archived';
}

// Enrollment Types
export interface Enrollment extends BaseEntity {
  studentId: string;
  courseId: string;
  schoolYear: string;
  semester: string;
  enrollmentDate: string;
  status: 'enrolled' | 'dropped' | 'completed' | 'withdrawn';
  grade?: string;
  gpa?: number;
}

// Attendance Types
export interface Attendance extends BaseEntity {
  studentId: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
  recordedBy: string;
}

// Grade Types
export interface Grade extends BaseEntity {
  studentId: string;
  courseId: string;
  assignmentType: 'homework' | 'quiz' | 'test' | 'project' | 'exam' | 'participation';
  assignmentName: string;
  score: number;
  maxScore: number;
  percentage: number;
  letterGrade: string;
  weight: number;
  dueDate: string;
  submittedDate: string;
  feedback?: string;
}

// Parent Types
export interface Parent extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  relationship: 'mother' | 'father' | 'guardian' | 'other';
  occupation?: string;
  employer?: string;
  emergencyContact: boolean;
  canPickup: boolean;
  communicationPreferences: string[];
}

// School Types
export interface School extends BaseEntity {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website?: string;
  principal: string;
  type: 'elementary' | 'middle' | 'high' | 'k12';
  district: string;
  enrollmentCapacity: number;
  currentEnrollment: number;
  status: 'active' | 'inactive';
}

// Class Types (Physical classroom)
export interface Class extends BaseEntity {
  name: string;
  roomNumber: string;
  building: string;
  schoolId: string;
  capacity: number;
  equipment: string[];
  features: string[];
  status: 'available' | 'occupied' | 'maintenance';
}

// Schedule Types
export interface Schedule extends BaseEntity {
  courseId: string;
  classId: string;
  teacherId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  schoolYear: string;
  semester: string;
  period: string;
  status: 'active' | 'inactive';
}

// Request Types
export interface CreateStudentRequest {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  grade: string;
  schoolId: string;
  parentId: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalConditions?: string;
  allergies?: string;
  medications?: string;
  studentId: string;
  enrollmentDate: string;
  status?: 'active' | 'inactive' | 'graduated' | 'transferred';
}

export interface CreateTeacherRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  schoolId: string;
  department: string;
  subject: string;
  hireDate: string;
  salary: number;
  qualifications: string[];
  certifications: string[];
}

export interface CreateCourseRequest {
  name: string;
  code: string;
  description: string;
  credits: number;
  gradeLevel: string;
  subject: string;
  teacherId: string;
  schoolId: string;
  maxStudents: number;
  prerequisites?: string[];
  syllabus?: string;
}

export interface CreateEnrollmentRequest {
  studentId: string;
  courseId: string;
  schoolYear: string;
  semester: string;
  status?: 'enrolled' | 'dropped' | 'completed' | 'withdrawn';
}

export interface CreateAttendanceRequest {
  studentId: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
  recordedBy: string;
}

export interface CreateGradeRequest {
  studentId: string;
  courseId: string;
  assignmentType: 'homework' | 'quiz' | 'test' | 'project' | 'exam' | 'participation';
  assignmentName: string;
  score: number;
  maxScore: number;
  weight: number;
  dueDate: string;
  feedback?: string;
}

export interface CreateParentRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  relationship: 'mother' | 'father' | 'guardian' | 'other';
  occupation?: string;
  employer?: string;
  emergencyContact: boolean;
  canPickup: boolean;
  communicationPreferences: string[];
}

export interface CreateSchoolRequest {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  website?: string;
  principal: string;
  type: 'elementary' | 'middle' | 'high' | 'k12';
  district: string;
  enrollmentCapacity: number;
}

export interface CreateClassRequest {
  name: string;
  roomNumber: string;
  building: string;
  schoolId: string;
  capacity: number;
  equipment?: string[];
  features?: string[];
}

export interface CreateScheduleRequest {
  courseId: string;
  classId: string;
  teacherId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  schoolYear: string;
  semester: string;
  period: string;
}

// Update Types (extend partial of create types)
export interface UpdateStudentRequest extends Partial<CreateStudentRequest> {
  id: string;
}

export interface UpdateTeacherRequest extends Partial<CreateTeacherRequest> {
  id: string;
}

export interface UpdateCourseRequest extends Partial<CreateCourseRequest> {
  id: string;
}

export interface UpdateEnrollmentRequest extends Partial<CreateEnrollmentRequest> {
  id: string;
}

export interface UpdateAttendanceRequest extends Partial<CreateAttendanceRequest> {
  id: string;
}

export interface UpdateGradeRequest extends Partial<CreateGradeRequest> {
  id: string;
}

export interface UpdateParentRequest extends Partial<CreateParentRequest> {
  id: string;
}

export interface UpdateSchoolRequest extends Partial<CreateSchoolRequest> {
  id: string;
}

export interface UpdateClassRequest extends Partial<CreateClassRequest> {
  id: string;
}

export interface UpdateScheduleRequest extends Partial<CreateScheduleRequest> {
  id: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp?: string;
  requestId?: string;
  version?: string;
  metadata?: {
    total?: number;
    page?: number;
    limit?: number;
    hasMore?: boolean;
  };
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
}

// Pagination Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter Types
export interface BaseFilters {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface StudentFilters extends BaseFilters {
  grade?: string;
  schoolId?: string;
  parentId?: string;
  status?: string;
  enrollmentDate?: string;
}

export interface TeacherFilters extends BaseFilters {
  department?: string;
  subject?: string;
  schoolId?: string;
  status?: string;
}

export interface CourseFilters extends BaseFilters {
  subject?: string;
  gradeLevel?: string;
  teacherId?: string;
  schoolId?: string;
  status?: string;
}

export interface EnrollmentFilters extends BaseFilters {
  studentId?: string;
  courseId?: string;
  schoolYear?: string;
  semester?: string;
  status?: string;
}

export interface AttendanceFilters extends BaseFilters {
  studentId?: string;
  courseId?: string;
  date?: string;
  status?: string;
}

export interface GradeFilters extends BaseFilters {
  studentId?: string;
  courseId?: string;
  assignmentType?: string;
  schoolYear?: string;
  semester?: string;
}

export interface ParentFilters extends BaseFilters {
  relationship?: string;
  city?: string;
  state?: string;
}

export interface SchoolFilters extends BaseFilters {
  type?: string;
  district?: string;
  status?: string;
}

export interface ClassFilters extends BaseFilters {
  schoolId?: string;
  building?: string;
  status?: string;
}

export interface ScheduleFilters extends BaseFilters {
  courseId?: string;
  teacherId?: string;
  classId?: string;
  schoolYear?: string;
  semester?: string;
  dayOfWeek?: number;
}

// Dashboard and Analytics Types
export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  totalSchools: number;
  activeEnrollments: number;
  averageAttendance: number;
  averageGPA: number;
}

export interface SchoolStats {
  enrollmentByGrade: Record<string, number>;
  enrollmentBySchool: Record<string, number>;
  attendanceByMonth: Record<string, number>;
  gpaDistribution: Record<string, number>;
  courseEnrollment: Record<string, number>;
}

// ORBT-compliant generic data request interface
export interface GenericDataRequest extends Record<string, unknown> {
  table: string;
  action: 'get_all' | 'get_by_id' | 'create' | 'update' | 'delete' | 'search' | 'count';
  id?: string;
  data?: Record<string, unknown>;
  filters?: Record<string, unknown>;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  include?: string[]; // For related data
  select?: string[]; // For specific fields
}

// ORBT-compliant generic data response interface
export interface GenericDataResponse<T = Record<string, unknown>> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
  requestId: string;
  version: string;
  metadata: {
    total?: number;
    page?: number;
    limit?: number;
    hasMore?: boolean;
    executionTime?: number;
  };
}

// All types are already exported above 
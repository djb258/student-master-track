import { apiClient } from './api';
import { DatabaseService } from './databaseService';
import { StudentService } from './studentService';
import { TeacherService } from './services/teacherService';
import { CourseService } from './services/courseService';
import { DashboardService } from './services/dashboardService';
import type { 
  Student, 
  CreateStudentRequest, 
  Teacher, 
  CreateTeacherRequest,
  Course,
  CreateCourseRequest,
  ApiResponse 
} from './types';

// Test configuration
const TEST_CONFIG = {
  timeout: 10000, // 10 seconds
  retries: 3,
  cleanupAfterTest: true, // Delete test data after tests
};

// Test data
const TEST_STUDENT: CreateStudentRequest = {
  firstName: 'Test',
  lastName: 'Student',
  email: 'test.student@example.com',
  dateOfBirth: '2005-01-15',
  grade: '10th',
  schoolId: 'test-school-1',
  parentId: 'test-parent-1',
  address: '123 Test Street',
  city: 'Test City',
  state: 'TS',
  zipCode: '12345',
  emergencyContact: 'Test Parent',
  emergencyPhone: '555-123-4567',
  medicalConditions: 'None',
  allergies: 'None',
  medications: 'None',
  studentId: 'TS001',
  enrollmentDate: '2024-01-15',
  status: 'active'
};

const TEST_TEACHER: CreateTeacherRequest = {
  firstName: 'Test',
  lastName: 'Teacher',
  email: 'test.teacher@example.com',
  phone: '555-987-6543',
  schoolId: 'test-school-1',
  department: 'Mathematics',
  subject: 'Algebra',
  hireDate: '2023-08-01',
  salary: 50000,
  qualifications: ['Bachelor of Mathematics', 'Teaching Certificate'],
  certifications: ['State Teaching License']
};

const TEST_COURSE: CreateCourseRequest = {
  name: 'Test Algebra Course',
  code: 'MATH101',
  description: 'Introduction to Algebra',
  credits: 3,
  gradeLevel: '10th',
  subject: 'Mathematics',
  teacherId: 'test-teacher-1',
  schoolId: 'test-school-1',
  maxStudents: 25,
  prerequisites: [],
  syllabus: 'Basic algebra concepts and problem solving'
};

// Test results interface
interface TestResult {
  testName: string;
  success: boolean;
  error?: string;
  data?: any;
  duration: number;
}

class DatabaseConnectionTester {
  private results: TestResult[] = [];
  private testIds: { students: string[], teachers: string[], courses: string[] } = {
    students: [],
    teachers: [],
    courses: []
  };

  // Utility function to log with timestamp
  private log(message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') {
    const timestamp = new Date().toISOString();
    const emoji = {
      info: 'ℹ️',
      success: '✅',
      error: '❌',
      warning: '⚠️'
    }[type];
    
    console.log(`${emoji} [${timestamp}] ${message}`);
  }

  // Test API connection
  async testApiConnection(): Promise<TestResult> {
    const startTime = Date.now();
    const testName = 'API Connection Test';
    
    try {
      this.log('Testing API connection...');
      
      // Test basic connectivity
      const response = await apiClient.get('/health');
      
      const duration = Date.now() - startTime;
      this.log(`API connection successful - Response: ${JSON.stringify(response)}`, 'success');
      
      return {
        testName,
        success: true,
        data: response,
        duration
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`API connection failed: ${errorMessage}`, 'error');
      
      return {
        testName,
        success: false,
        error: errorMessage,
        duration
      };
    }
  }

  // Test generic database service
  async testGenericDatabaseService(): Promise<TestResult> {
    const startTime = Date.now();
    const testName = 'Generic Database Service Test';
    
    try {
      this.log('Testing generic database service...');
      
      const dbService = new DatabaseService('students');
      
      // Test GET all
      const allStudents = await dbService.getAll<Student>();
      this.log(`Retrieved ${allStudents.data.length} students`);
      
      // Test search
      const searchResults = await dbService.search<Student>('test');
      this.log(`Search returned ${searchResults.length} results`);
      
      // Test statistics
      const stats = await dbService.getStatistics();
      this.log(`Retrieved statistics: ${JSON.stringify(stats)}`);
      
      const duration = Date.now() - startTime;
      this.log('Generic database service test successful', 'success');
      
      return {
        testName,
        success: true,
        data: { allStudents: allStudents.data.length, searchResults: searchResults.length, stats },
        duration
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Generic database service test failed: ${errorMessage}`, 'error');
      
      return {
        testName,
        success: false,
        error: errorMessage,
        duration
      };
    }
  }

  // Test student CRUD operations
  async testStudentCRUD(): Promise<TestResult> {
    const startTime = Date.now();
    const testName = 'Student CRUD Operations Test';
    
    try {
      this.log('Testing student CRUD operations...');
      
      // Test CREATE
      this.log('Creating test student...');
      const createdStudent = await StudentService.createStudent(TEST_STUDENT);
      this.testIds.students.push(createdStudent.id);
      this.log(`Created student with ID: ${createdStudent.id}`);
      
      // Test READ
      this.log('Reading created student...');
      const retrievedStudent = await StudentService.getStudent(createdStudent.id);
      this.log(`Retrieved student: ${retrievedStudent.firstName} ${retrievedStudent.lastName}`);
      
      // Test UPDATE
      this.log('Updating student...');
      const updateData = { firstName: 'Updated Test' };
      const updatedStudent = await StudentService.updateStudent(createdStudent.id, updateData);
      this.log(`Updated student first name to: ${updatedStudent.firstName}`);
      
      // Test SEARCH
      this.log('Searching for students...');
      const searchResults = await StudentService.searchStudents('Test');
      this.log(`Search found ${searchResults.length} students`);
      
      // Test GET by field
      this.log('Getting students by grade...');
      const gradeStudents = await StudentService.getStudentsByGrade('10th');
      this.log(`Found ${gradeStudents.length} 10th grade students`);
      
      const duration = Date.now() - startTime;
      this.log('Student CRUD operations test successful', 'success');
      
      return {
        testName,
        success: true,
        data: {
          createdId: createdStudent.id,
          retrievedName: retrievedStudent.firstName,
          updatedName: updatedStudent.firstName,
          searchCount: searchResults.length,
          gradeCount: gradeStudents.length
        },
        duration
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Student CRUD operations test failed: ${errorMessage}`, 'error');
      
      return {
        testName,
        success: false,
        error: errorMessage,
        duration
      };
    }
  }

  // Test teacher CRUD operations
  async testTeacherCRUD(): Promise<TestResult> {
    const startTime = Date.now();
    const testName = 'Teacher CRUD Operations Test';
    
    try {
      this.log('Testing teacher CRUD operations...');
      
      const teacherService = new TeacherService();
      
      // Test CREATE
      this.log('Creating test teacher...');
      const createdTeacher = await teacherService.create(TEST_TEACHER);
      this.testIds.teachers.push(createdTeacher.id);
      this.log(`Created teacher with ID: ${createdTeacher.id}`);
      
      // Test READ
      this.log('Reading created teacher...');
      const retrievedTeacher = await teacherService.getById(createdTeacher.id);
      this.log(`Retrieved teacher: ${retrievedTeacher.firstName} ${retrievedTeacher.lastName}`);
      
      // Test UPDATE
      this.log('Updating teacher...');
      const updateData = { department: 'Advanced Mathematics' };
      const updatedTeacher = await teacherService.update(createdTeacher.id, updateData);
      this.log(`Updated teacher department to: ${updatedTeacher.department}`);
      
      // Test GET by field
      this.log('Getting teachers by department...');
      const deptTeachers = await teacherService.getTeachersByDepartment('Mathematics');
      this.log(`Found ${deptTeachers.length} mathematics teachers`);
      
      const duration = Date.now() - startTime;
      this.log('Teacher CRUD operations test successful', 'success');
      
      return {
        testName,
        success: true,
        data: {
          createdId: createdTeacher.id,
          retrievedName: retrievedTeacher.firstName,
          updatedDept: updatedTeacher.department,
          deptCount: deptTeachers.length
        },
        duration
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Teacher CRUD operations test failed: ${errorMessage}`, 'error');
      
      return {
        testName,
        success: false,
        error: errorMessage,
        duration
      };
    }
  }

  // Test course CRUD operations
  async testCourseCRUD(): Promise<TestResult> {
    const startTime = Date.now();
    const testName = 'Course CRUD Operations Test';
    
    try {
      this.log('Testing course CRUD operations...');
      
      const courseService = new CourseService();
      
      // Test CREATE
      this.log('Creating test course...');
      const createdCourse = await courseService.create(TEST_COURSE);
      this.testIds.courses.push(createdCourse.id);
      this.log(`Created course with ID: ${createdCourse.id}`);
      
      // Test READ
      this.log('Reading created course...');
      const retrievedCourse = await courseService.getById(createdCourse.id);
      this.log(`Retrieved course: ${retrievedCourse.name}`);
      
      // Test UPDATE
      this.log('Updating course...');
      const updateData = { maxStudents: 30 };
      const updatedCourse = await courseService.update(createdCourse.id, updateData);
      this.log(`Updated course max students to: ${updatedCourse.maxStudents}`);
      
      // Test GET by field
      this.log('Getting courses by subject...');
      const subjectCourses = await courseService.getCoursesBySubject('Mathematics');
      this.log(`Found ${subjectCourses.length} mathematics courses`);
      
      const duration = Date.now() - startTime;
      this.log('Course CRUD operations test successful', 'success');
      
      return {
        testName,
        success: true,
        data: {
          createdId: createdCourse.id,
          retrievedName: retrievedCourse.name,
          updatedMaxStudents: updatedCourse.maxStudents,
          subjectCount: subjectCourses.length
        },
        duration
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Course CRUD operations test failed: ${errorMessage}`, 'error');
      
      return {
        testName,
        success: false,
        error: errorMessage,
        duration
      };
    }
  }

  // Test dashboard service
  async testDashboardService(): Promise<TestResult> {
    const startTime = Date.now();
    const testName = 'Dashboard Service Test';
    
    try {
      this.log('Testing dashboard service...');
      
      const dashboardService = new DashboardService();
      
      // Test dashboard stats
      this.log('Getting dashboard statistics...');
      const stats = await dashboardService.getDashboardStats();
      this.log(`Dashboard stats: ${JSON.stringify(stats)}`);
      
      // Test school stats
      this.log('Getting school statistics...');
      const schoolStats = await dashboardService.getSchoolStats();
      this.log(`School stats retrieved successfully`);
      
      // Test enrollment trends
      this.log('Getting enrollment trends...');
      const trends = await dashboardService.getEnrollmentTrends('monthly');
      this.log(`Enrollment trends: ${trends.length} data points`);
      
      const duration = Date.now() - startTime;
      this.log('Dashboard service test successful', 'success');
      
      return {
        testName,
        success: true,
        data: {
          statsKeys: Object.keys(stats),
          trendsCount: trends.length,
          schoolStatsRetrieved: !!schoolStats
        },
        duration
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.log(`Dashboard service test failed: ${errorMessage}`, 'error');
      
      return {
        testName,
        success: false,
        error: errorMessage,
        duration
      };
    }
  }

  // Cleanup test data
  async cleanupTestData(): Promise<void> {
    if (!TEST_CONFIG.cleanupAfterTest) {
      this.log('Skipping cleanup (disabled in config)', 'warning');
      return;
    }

    this.log('Cleaning up test data...');
    
    try {
      // Delete test students
      for (const id of this.testIds.students) {
        try {
          await StudentService.deleteStudent(id);
          this.log(`Deleted test student: ${id}`);
        } catch (error) {
          this.log(`Failed to delete test student ${id}: ${error}`, 'warning');
        }
      }
      
      // Delete test teachers
      for (const id of this.testIds.teachers) {
        try {
          await teacherService.delete(id);
          this.log(`Deleted test teacher: ${id}`);
        } catch (error) {
          this.log(`Failed to delete test teacher ${id}: ${error}`, 'warning');
        }
      }
      
      // Delete test courses
      for (const id of this.testIds.courses) {
        try {
          await courseService.delete(id);
          this.log(`Deleted test course: ${id}`);
        } catch (error) {
          this.log(`Failed to delete test course ${id}: ${error}`, 'warning');
        }
      }
      
      this.log('Cleanup completed successfully', 'success');
    } catch (error) {
      this.log(`Cleanup failed: ${error}`, 'error');
    }
  }

  // Run all tests
  async runAllTests(): Promise<void> {
    this.log('🚀 Starting Database Connection Tests...', 'info');
    this.log(`API URL: ${import.meta.env.VITE_RENDER_API_URL || 'https://render-student-profile.onrender.com'}`, 'info');
    
    const tests = [
      this.testApiConnection.bind(this),
      this.testGenericDatabaseService.bind(this),
      this.testStudentCRUD.bind(this),
      this.testTeacherCRUD.bind(this),
      this.testCourseCRUD.bind(this),
      this.testDashboardService.bind(this),
    ];
    
    for (const test of tests) {
      const result = await test();
      this.results.push(result);
      
      if (!result.success) {
        this.log(`Test failed: ${result.testName}`, 'error');
      }
    }
    
    // Cleanup
    await this.cleanupTestData();
    
    // Print summary
    this.printSummary();
  }

  // Print test summary
  printSummary(): void {
    this.log('\n📊 Test Summary:', 'info');
    this.log('=' * 50, 'info');
    
    const totalTests = this.results.length;
    const passedTests = this.results.filter(r => r.success).length;
    const failedTests = totalTests - passedTests;
    const totalDuration = this.results.reduce((sum, r) => sum + r.duration, 0);
    
    this.log(`Total Tests: ${totalTests}`, 'info');
    this.log(`Passed: ${passedTests} ✅`, 'success');
    this.log(`Failed: ${failedTests} ❌`, failedTests > 0 ? 'error' : 'info');
    this.log(`Total Duration: ${totalDuration}ms`, 'info');
    this.log(`Average Duration: ${Math.round(totalDuration / totalTests)}ms`, 'info');
    
    if (failedTests > 0) {
      this.log('\n❌ Failed Tests:', 'error');
      this.results
        .filter(r => !r.success)
        .forEach(r => {
          this.log(`  - ${r.testName}: ${r.error}`, 'error');
        });
    }
    
    this.log('\n✅ Passed Tests:', 'success');
    this.results
      .filter(r => r.success)
      .forEach(r => {
        this.log(`  - ${r.testName} (${r.duration}ms)`, 'success');
      });
    
    this.log('\n' + '=' * 50, 'info');
    
    if (failedTests === 0) {
      this.log('🎉 All tests passed! Database connection is working correctly.', 'success');
    } else {
      this.log('⚠️ Some tests failed. Please check the error messages above.', 'warning');
    }
  }
}

// Export the tester
export const databaseTester = new DatabaseConnectionTester();

// Function to run tests (can be called from browser console)
export async function runDatabaseTests(): Promise<void> {
  await databaseTester.runAllTests();
}

// Auto-run tests if this file is imported directly
if (typeof window !== 'undefined') {
  // Browser environment - expose to global scope
  (window as any).runDatabaseTests = runDatabaseTests;
  (window as any).databaseTester = databaseTester;
  
  console.log('🔧 Database tester loaded. Run "runDatabaseTests()" in console to test connection.');
} 
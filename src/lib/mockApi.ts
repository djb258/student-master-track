import type { GenericDataRequest, GenericDataResponse } from './types';

// Mock data storage
const mockData: Record<string, any[]> = {
  students: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      grade: 'A',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      grade: 'B+',
      created_at: '2024-01-16T11:00:00Z',
      updated_at: '2024-01-16T11:00:00Z'
    }
  ],
  teachers: [
    {
      id: '1',
      name: 'Dr. Johnson',
      email: 'dr.johnson@example.com',
      subject: 'Mathematics',
      created_at: '2024-01-10T09:00:00Z',
      updated_at: '2024-01-10T09:00:00Z'
    }
  ],
  courses: [
    {
      id: '1',
      title: 'Advanced Mathematics',
      description: 'Advanced mathematical concepts and applications',
      teacher_id: '1',
      created_at: '2024-01-12T08:00:00Z',
      updated_at: '2024-01-12T08:00:00Z'
    }
  ]
};

// Generate unique IDs
let nextId = 1000;
const generateId = () => (nextId++).toString();

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API response helper
const createResponse = <T>(data: T, message: string = 'Success'): GenericDataResponse<T> => ({
  success: true,
  data,
  message,
  timestamp: new Date().toISOString(),
  requestId: `mock-${Date.now()}`,
  version: '1.0.0',
  metadata: {
    executionTime: Math.random() * 100 + 50 // Random execution time between 50-150ms
  }
});

// Mock error response
const createErrorResponse = (message: string): GenericDataResponse<null> => ({
  success: false,
  data: null,
  message,
  timestamp: new Date().toISOString(),
  requestId: `mock-error-${Date.now()}`,
  version: '1.0.0',
  metadata: {}
});

export class MockApiClient {
  async getData<T>(table: string, action: string, params?: Record<string, unknown>): Promise<GenericDataResponse<T>> {
    await delay(100 + Math.random() * 200); // Simulate network delay

    const tableData = mockData[table as keyof typeof mockData];
    if (!tableData) {
      return createErrorResponse(`Table '${table}' not found`);
    }

    switch (action) {
      case 'get_all':
        return createResponse(tableData as T, `Retrieved all ${table}`);

      case 'get_by_id':
        const id = params?.id as string;
        const item = tableData.find((item: any) => item.id === id);
        if (!item) {
          return createErrorResponse(`${table} with id '${id}' not found`);
        }
        return createResponse(item as T, `Retrieved ${table} by id`);

      case 'create':
        const newItem = {
          id: generateId(),
          ...(params?.data as Record<string, unknown>),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        tableData.push(newItem);
        return createResponse(newItem as T, `Created new ${table}`);

      case 'update':
        const updateId = params?.id as string;
        const updateIndex = tableData.findIndex((item: any) => item.id === updateId);
        if (updateIndex === -1) {
          return createErrorResponse(`${table} with id '${updateId}' not found`);
        }
        const updatedItem = {
          ...tableData[updateIndex],
          ...(params?.data as Record<string, unknown>),
          updated_at: new Date().toISOString()
        };
        tableData[updateIndex] = updatedItem;
        return createResponse(updatedItem as T, `Updated ${table}`);

      case 'delete':
        const deleteId = params?.id as string;
        const deleteIndex = tableData.findIndex((item: any) => item.id === deleteId);
        if (deleteIndex === -1) {
          return createErrorResponse(`${table} with id '${deleteId}' not found`);
        }
        const deletedItem = tableData.splice(deleteIndex, 1)[0];
        return createResponse(deletedItem as T, `Deleted ${table}`);

      case 'search':
        const searchTerm = (params?.filters as Record<string, unknown>)?.search as string;
        if (searchTerm) {
          const filtered = tableData.filter((item: any) => 
            Object.values(item).some(value => 
              String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
          return createResponse(filtered as T, `Search results for '${searchTerm}'`);
        }
        return createResponse(tableData as T, `Retrieved all ${table}`);

      case 'count':
        return createResponse(tableData.length as T, `Count of ${table}`);

      default:
        return createErrorResponse(`Unknown action '${action}'`);
    }
  }

  async createData<T>(table: string, data: Record<string, unknown>): Promise<GenericDataResponse<T>> {
    return this.getData<T>(table, 'create', { data });
  }

  async updateData<T>(table: string, id: string, data: Record<string, unknown>): Promise<GenericDataResponse<T>> {
    return this.getData<T>(table, 'update', { id, data });
  }

  async deleteData<T>(table: string, id: string): Promise<GenericDataResponse<T>> {
    return this.getData<T>(table, 'delete', { id });
  }

  // Mock dashboard analytics
  async getDashboardStats(): Promise<GenericDataResponse<any>> {
    await delay(150 + Math.random() * 100);

    const stats = {
      totalStudents: mockData.students.length,
      totalTeachers: mockData.teachers.length,
      totalCourses: mockData.courses.length,
      recentActivity: [
        { type: 'student_created', data: mockData.students[0], timestamp: new Date().toISOString() },
        { type: 'course_updated', data: mockData.courses[0], timestamp: new Date().toISOString() }
      ],
      gradeDistribution: {
        'A': 1,
        'B+': 1,
        'B': 0,
        'C': 0,
        'D': 0,
        'F': 0
      }
    };

    return createResponse(stats, 'Dashboard statistics retrieved');
  }
}

export const mockApiClient = new MockApiClient(); 
# Multi-Table Database System Setup

This project is now configured to work with multiple database tables through your Render API. The system provides a scalable architecture for managing a comprehensive school management system.

## 🏗️ Architecture Overview

### Core Components

1. **Generic Database Service** (`src/lib/databaseService.ts`)
   - Handles CRUD operations for any table
   - Provides batch operations
   - Includes search and filtering capabilities

2. **Specialized Services** (`src/lib/services/`)
   - Entity-specific services with custom methods
   - Type-safe operations
   - Business logic encapsulation

3. **Type Definitions** (`src/lib/types.ts`)
   - Comprehensive TypeScript interfaces
   - Request/Response types
   - Filter and pagination types

4. **Configuration** (`src/lib/config.ts`)
   - Table configurations
   - API settings
   - Feature flags

5. **React Hooks** (`src/hooks/useDatabase.ts`)
   - Easy integration with React components
   - Built-in caching with React Query
   - Loading and error states

## 📊 Supported Tables

The system supports the following tables:

| Table | Icon | Description |
|-------|------|-------------|
| `students` | 👨‍🎓 | Student profiles and information |
| `teachers` | 👨‍🏫 | Teacher profiles and assignments |
| `courses` | 📚 | Course catalog and details |
| `enrollments` | 📋 | Student course enrollments |
| `attendance` | 📅 | Student attendance records |
| `grades` | 📊 | Student grades and assessments |
| `parents` | 👨‍👩‍👧‍👦 | Parent/guardian information |
| `schools` | 🏫 | School information |
| `classes` | 🏠 | Physical classroom details |
| `schedules` | ⏰ | Class schedules and timetables |

## 🚀 Usage Examples

### Basic Database Operations

```typescript
import { useDatabase } from '../hooks/useDatabase';
import type { Student } from '../lib/types';

function StudentList() {
  const {
    records: students,
    isLoadingRecords,
    createRecord,
    updateRecord,
    deleteRecord,
    refetchRecords
  } = useDatabase<Student>('students');

  // Use the data and functions in your component
}
```

### Using Specialized Services

```typescript
import { TeacherService } from '../lib/services/teacherService';

const teacherService = new TeacherService();

// Get teachers by department
const mathTeachers = await teacherService.getTeachersByDepartment('Mathematics');

// Get teacher's courses
const teacherCourses = await teacherService.getTeacherCourses(teacherId);

// Get teacher statistics
const stats = await teacherService.getTeacherStatistics(teacherId);
```

### Dashboard and Analytics

```typescript
import { DashboardService } from '../lib/services/dashboardService';

const dashboardService = new DashboardService();

// Get overall statistics
const stats = await dashboardService.getDashboardStats();

// Get school-specific analytics
const schoolStats = await dashboardService.getSchoolStats(schoolId);

// Get enrollment trends
const trends = await dashboardService.getEnrollmentTrends('monthly');
```

## 🔧 Configuration

### Environment Variables

The system uses the following environment variables:

```env
VITE_RENDER_API_URL=https://render-student-profile.onrender.com
VITE_DEV_MODE=true
```

### Table Configuration

Each table can be configured in `src/lib/config.ts`:

```typescript
tables: {
  students: {
    name: 'students',
    displayName: 'Students',
    icon: '👨‍🎓',
    fields: {
      primary: ['firstName', 'lastName', 'email'],
      searchable: ['firstName', 'lastName', 'email', 'studentId'],
      filterable: ['grade', 'schoolId', 'status'],
      sortable: ['firstName', 'lastName', 'enrollmentDate', 'grade'],
    },
  },
  // ... other tables
}
```

## 📝 API Endpoints

The system expects the following API endpoints on your Render service:

### Generic CRUD Endpoints
- `GET /{tableName}` - Get all records with pagination
- `GET /{tableName}/{id}` - Get single record
- `POST /{tableName}` - Create new record
- `PUT /{tableName}/{id}` - Update record
- `DELETE /{tableName}/{id}` - Delete record

### Search and Filter Endpoints
- `GET /{tableName}/search?q={query}` - Search records
- `GET /{tableName}/{field}/{value}` - Get records by field value

### Batch Operations
- `POST /{tableName}/batch` - Create multiple records
- `PUT /{tableName}/batch` - Update multiple records
- `DELETE /{tableName}/batch` - Delete multiple records

### Analytics Endpoints
- `GET /dashboard/stats` - Overall statistics
- `GET /dashboard/{tableName}/stats` - Table-specific statistics
- `GET /dashboard/export?type={type}&format={format}` - Export data

## 🔄 Adding New Tables

To add a new table:

1. **Add Type Definitions** in `src/lib/types.ts`:
```typescript
export interface NewEntity extends BaseEntity {
  // Define your entity properties
}

export interface CreateNewEntityRequest {
  // Define creation request properties
}

export interface UpdateNewEntityRequest extends Partial<CreateNewEntityRequest> {
  id: string;
}

export interface NewEntityFilters extends BaseFilters {
  // Define filter properties
}
```

2. **Create Specialized Service** in `src/lib/services/newEntityService.ts`:
```typescript
import { DatabaseService } from '../databaseService';
import type { NewEntity, CreateNewEntityRequest, UpdateNewEntityRequest, NewEntityFilters } from '../types';

export class NewEntityService extends DatabaseService {
  constructor() {
    super('newEntity');
  }

  // Add entity-specific methods here
}
```

3. **Update Configuration** in `src/lib/config.ts`:
```typescript
tables: {
  // ... existing tables
  newEntity: {
    name: 'newEntity',
    displayName: 'New Entity',
    icon: '🔧',
    fields: {
      primary: ['field1', 'field2'],
      searchable: ['field1', 'field2'],
      filterable: ['field1', 'field2'],
      sortable: ['field1', 'field2'],
    },
  },
}
```

4. **Export Service** in `src/lib/services/index.ts`:
```typescript
export { NewEntityService } from './newEntityService';
```

## 🎯 Best Practices

1. **Use TypeScript**: Always use proper types for better development experience
2. **Error Handling**: Implement proper error handling in your components
3. **Loading States**: Show loading indicators during API calls
4. **Caching**: Leverage React Query's caching capabilities
5. **Pagination**: Use pagination for large datasets
6. **Search**: Implement search functionality for better UX
7. **Validation**: Validate data before sending to API

## 🚨 Error Handling

The system includes built-in error handling:

```typescript
const {
  recordsError,
  createError,
  updateError,
  deleteError
} = useDatabase<Student>('students');

// Handle errors in your component
if (recordsError) {
  console.error('Failed to load students:', recordsError);
}
```

## 📈 Performance Optimization

1. **Caching**: Data is cached for 5-10 minutes by default
2. **Pagination**: Large datasets are paginated
3. **Debounced Search**: Search queries are debounced to reduce API calls
4. **Selective Loading**: Only load data when needed
5. **Background Updates**: Use React Query's background refetching

## 🔐 Security Considerations

1. **Input Validation**: Validate all user inputs
2. **API Security**: Ensure your Render API has proper authentication
3. **Data Sanitization**: Sanitize data before displaying
4. **Error Messages**: Don't expose sensitive information in error messages

## 🧪 Testing

The system is designed to be easily testable:

```typescript
// Mock the API client for testing
jest.mock('../lib/api', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));
```

## 📚 Additional Resources

- [React Query Documentation](https://tanstack.com/query/latest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Configuration](https://vitejs.dev/config/)

---

This system provides a solid foundation for building a comprehensive school management application with multiple interconnected tables and robust data management capabilities. 
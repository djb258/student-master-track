// Database and API Configuration
export const config = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_RENDER_API_URL || 'https://render-student-profile.onrender.com',
    timeout: 30000, // 30 seconds
    retries: 3,
  },

  // Database Tables Configuration
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
    teachers: {
      name: 'teachers',
      displayName: 'Teachers',
      icon: '👨‍🏫',
      fields: {
        primary: ['firstName', 'lastName', 'email'],
        searchable: ['firstName', 'lastName', 'email', 'subject'],
        filterable: ['department', 'subject', 'schoolId', 'status'],
        sortable: ['firstName', 'lastName', 'hireDate', 'department'],
      },
    },
    courses: {
      name: 'courses',
      displayName: 'Courses',
      icon: '📚',
      fields: {
        primary: ['name', 'code', 'subject'],
        searchable: ['name', 'code', 'description', 'subject'],
        filterable: ['subject', 'gradeLevel', 'teacherId', 'schoolId', 'status'],
        sortable: ['name', 'code', 'credits', 'subject'],
      },
    },
    enrollments: {
      name: 'enrollments',
      displayName: 'Enrollments',
      icon: '📋',
      fields: {
        primary: ['studentId', 'courseId', 'status'],
        searchable: ['studentId', 'courseId'],
        filterable: ['studentId', 'courseId', 'schoolYear', 'semester', 'status'],
        sortable: ['enrollmentDate', 'schoolYear', 'semester'],
      },
    },
    attendance: {
      name: 'attendance',
      displayName: 'Attendance',
      icon: '📅',
      fields: {
        primary: ['studentId', 'courseId', 'date', 'status'],
        searchable: ['studentId', 'courseId'],
        filterable: ['studentId', 'courseId', 'date', 'status'],
        sortable: ['date', 'studentId', 'courseId'],
      },
    },
    grades: {
      name: 'grades',
      displayName: 'Grades',
      icon: '📊',
      fields: {
        primary: ['studentId', 'courseId', 'assignmentName', 'score'],
        searchable: ['studentId', 'courseId', 'assignmentName'],
        filterable: ['studentId', 'courseId', 'assignmentType', 'schoolYear', 'semester'],
        sortable: ['dueDate', 'score', 'percentage'],
      },
    },
    parents: {
      name: 'parents',
      displayName: 'Parents',
      icon: '👨‍👩‍👧‍👦',
      fields: {
        primary: ['firstName', 'lastName', 'email', 'relationship'],
        searchable: ['firstName', 'lastName', 'email'],
        filterable: ['relationship', 'city', 'state'],
        sortable: ['firstName', 'lastName', 'relationship'],
      },
    },
    schools: {
      name: 'schools',
      displayName: 'Schools',
      icon: '🏫',
      fields: {
        primary: ['name', 'type', 'district'],
        searchable: ['name', 'district', 'city'],
        filterable: ['type', 'district', 'status'],
        sortable: ['name', 'type', 'currentEnrollment'],
      },
    },
    classes: {
      name: 'classes',
      displayName: 'Classes',
      icon: '🏠',
      fields: {
        primary: ['name', 'roomNumber', 'building'],
        searchable: ['name', 'roomNumber', 'building'],
        filterable: ['schoolId', 'building', 'status'],
        sortable: ['name', 'roomNumber', 'capacity'],
      },
    },
    schedules: {
      name: 'schedules',
      displayName: 'Schedules',
      icon: '⏰',
      fields: {
        primary: ['courseId', 'teacherId', 'dayOfWeek', 'startTime'],
        searchable: ['courseId', 'teacherId'],
        filterable: ['courseId', 'teacherId', 'classId', 'schoolYear', 'semester'],
        sortable: ['dayOfWeek', 'startTime', 'schoolYear'],
      },
    },
  },

  // Pagination Configuration
  pagination: {
    defaultPageSize: 20,
    pageSizeOptions: [10, 20, 50, 100],
    maxPageSize: 100,
  },

  // Search Configuration
  search: {
    debounceMs: 300,
    minQueryLength: 2,
    maxResults: 50,
  },

  // Cache Configuration
  cache: {
    defaultStaleTime: 5 * 60 * 1000, // 5 minutes
    defaultCacheTime: 10 * 60 * 1000, // 10 minutes
    searchStaleTime: 2 * 60 * 1000, // 2 minutes
    statsStaleTime: 10 * 60 * 1000, // 10 minutes
  },

  // UI Configuration
  ui: {
    dateFormat: 'MM/dd/yyyy',
    timeFormat: 'HH:mm',
    currency: 'USD',
    locale: 'en-US',
  },

  // Feature Flags
  features: {
    enableBatchOperations: true,
    enableExport: true,
    enableAnalytics: true,
    enableRealTimeUpdates: false,
    enableOfflineMode: false,
  },
};

// Type for table configuration
export type TableConfig = typeof config.tables[keyof typeof config.tables];

// Helper function to get table configuration
export function getTableConfig(tableName: string): TableConfig | undefined {
  return config.tables[tableName as keyof typeof config.tables];
}

// Helper function to get all table names
export function getAllTableNames(): string[] {
  return Object.keys(config.tables);
}

// Helper function to get table display name
export function getTableDisplayName(tableName: string): string {
  const tableConfig = getTableConfig(tableName);
  return tableConfig?.displayName || tableName;
}

// Helper function to get table icon
export function getTableIcon(tableName: string): string {
  const tableConfig = getTableConfig(tableName);
  return tableConfig?.icon || '📄';
} 
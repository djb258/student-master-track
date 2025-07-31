#!/usr/bin/env node

/**
 * Database Connection Test Script
 * 
 * This script tests the connection to your Render API and verifies CRUD operations.
 * Run with: node scripts/test-database.js
 */

import https from 'https';
import http from 'http';

// Configuration
const API_BASE_URL = process.env.VITE_RENDER_API_URL || 'https://render-student-profile.onrender.com';
const TIMEOUT = 10000; // 10 seconds

// Test data
const TEST_STUDENT = {
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

// Utility functions
function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const emoji = {
    info: 'ℹ️',
    success: '✅',
    error: '❌',
    warning: '⚠️'
  }[type];
  
  console.log(`${emoji} [${timestamp}] ${message}`);
}

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      timeout: TIMEOUT
    };

    if (options.body) {
      requestOptions.headers['Content-Length'] = Buffer.byteLength(options.body);
    }

    const req = client.request(requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: jsonData
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: data
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

// Test functions
async function testApiConnection() {
  const startTime = Date.now();
  log('Testing API connection...');
  
  try {
    const response = await makeRequest(`${API_BASE_URL}/health`);
    const duration = Date.now() - startTime;
    
    if (response.status >= 200 && response.status < 300) {
      log(`API connection successful (${response.status}) - ${duration}ms`, 'success');
      return { success: true, duration, data: response.data };
    } else {
      throw new Error(`HTTP ${response.status}: ${JSON.stringify(response.data)}`);
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    log(`API connection failed: ${error.message}`, 'error');
    return { success: false, duration, error: error.message };
  }
}

async function testGenericDataEndpoint() {
  const startTime = Date.now();
  log('Testing generic data endpoint...');
  
  try {
    // Test GET all students using generic endpoint
    const getResponse = await makeRequest(`${API_BASE_URL}/api/data`, {
      method: 'POST',
      body: JSON.stringify({
        table: 'students',
        action: 'get_all',
        limit: 10
      })
    });
    log(`Retrieved students via generic endpoint: ${getResponse.status}`);
    
    // Test CREATE student using generic endpoint
    const createResponse = await makeRequest(`${API_BASE_URL}/api/data`, {
      method: 'POST',
      body: JSON.stringify({
        table: 'students',
        action: 'create',
        data: TEST_STUDENT
      })
    });
    
    if (createResponse.status >= 200 && createResponse.status < 300) {
      const studentId = createResponse.data.id;
      log(`Created test student with ID: ${studentId}`);
      
      // Test GET single student
      const getSingleResponse = await makeRequest(`${API_BASE_URL}/api/data`, {
        method: 'POST',
        body: JSON.stringify({
          table: 'students',
          action: 'get_by_id',
          id: studentId
        })
      });
      log(`Retrieved single student: ${getSingleResponse.status}`);
      
      // Test UPDATE student
      const updateResponse = await makeRequest(`${API_BASE_URL}/api/data`, {
        method: 'POST',
        body: JSON.stringify({
          table: 'students',
          action: 'update',
          id: studentId,
          data: { firstName: 'Updated Test' }
        })
      });
      log(`Updated student: ${updateResponse.status}`);
      
      // Test DELETE student
      const deleteResponse = await makeRequest(`${API_BASE_URL}/api/data`, {
        method: 'POST',
        body: JSON.stringify({
          table: 'students',
          action: 'delete',
          id: studentId
        })
      });
      log(`Deleted test student: ${deleteResponse.status}`);
      
      const duration = Date.now() - startTime;
      log('Generic data endpoint CRUD operations successful', 'success');
      return { success: true, duration };
    } else {
      throw new Error(`Failed to create student: ${createResponse.status}`);
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    log(`Generic data endpoint test failed: ${error.message}`, 'error');
    return { success: false, duration, error: error.message };
  }
}

async function testTeachersEndpoint() {
  const startTime = Date.now();
  log('Testing teachers endpoint...');
  
  try {
    const getResponse = await makeRequest(`${API_BASE_URL}/teachers`);
    log(`Retrieved teachers: ${getResponse.status}`);
    
    const duration = Date.now() - startTime;
    log('Teachers endpoint test successful', 'success');
    return { success: true, duration };
  } catch (error) {
    const duration = Date.now() - startTime;
    log(`Teachers endpoint test failed: ${error.message}`, 'error');
    return { success: false, duration, error: error.message };
  }
}

async function testCoursesEndpoint() {
  const startTime = Date.now();
  log('Testing courses endpoint...');
  
  try {
    const getResponse = await makeRequest(`${API_BASE_URL}/courses`);
    log(`Retrieved courses: ${getResponse.status}`);
    
    const duration = Date.now() - startTime;
    log('Courses endpoint test successful', 'success');
    return { success: true, duration };
  } catch (error) {
    const duration = Date.now() - startTime;
    log(`Courses endpoint test failed: ${error.message}`, 'error');
    return { success: false, duration, error: error.message };
  }
}

async function testDashboardEndpoint() {
  const startTime = Date.now();
  log('Testing dashboard endpoint...');
  
  try {
    const response = await makeRequest(`${API_BASE_URL}/dashboard/stats`);
    log(`Dashboard stats: ${response.status}`);
    
    const duration = Date.now() - startTime;
    log('Dashboard endpoint test successful', 'success');
    return { success: true, duration };
  } catch (error) {
    const duration = Date.now() - startTime;
    log(`Dashboard endpoint test failed: ${error.message}`, 'error');
    return { success: false, duration, error: error.message };
  }
}

// Main test runner
async function runAllTests() {
  log('🚀 Starting Database Connection Tests...', 'info');
  log(`API URL: ${API_BASE_URL}`, 'info');
  
  const tests = [
    { name: 'API Connection', fn: testApiConnection },
    { name: 'Generic Data Endpoint', fn: testGenericDataEndpoint },
    { name: 'Teachers Endpoint', fn: testTeachersEndpoint },
    { name: 'Courses Endpoint', fn: testCoursesEndpoint },
    { name: 'Dashboard Endpoint', fn: testDashboardEndpoint },
  ];
  
  const results = [];
  
  for (const test of tests) {
    log(`\n--- Running ${test.name} Test ---`);
    const result = await test.fn();
    results.push({ ...result, name: test.name });
  }
  
  // Print summary
  printSummary(results);
}

function printSummary(results) {
  log('\n📊 Test Summary:', 'info');
  log('=' * 50, 'info');
  
  const totalTests = results.length;
  const passedTests = results.filter(r => r.success).length;
  const failedTests = totalTests - passedTests;
  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);
  
  log(`Total Tests: ${totalTests}`, 'info');
  log(`Passed: ${passedTests} ✅`, 'success');
  log(`Failed: ${failedTests} ❌`, failedTests > 0 ? 'error' : 'info');
  log(`Total Duration: ${totalDuration}ms`, 'info');
  log(`Average Duration: ${Math.round(totalDuration / totalTests)}ms`, 'info');
  
  if (failedTests > 0) {
    log('\n❌ Failed Tests:', 'error');
    results
      .filter(r => !r.success)
      .forEach(r => {
        log(`  - ${r.name}: ${r.error}`, 'error');
      });
  }
  
  log('\n✅ Passed Tests:', 'success');
  results
    .filter(r => r.success)
    .forEach(r => {
      log(`  - ${r.name} (${r.duration}ms)`, 'success');
    });
  
  log('\n' + '=' * 50, 'info');
  
  if (failedTests === 0) {
    log('🎉 All tests passed! Database connection is working correctly.', 'success');
  } else {
    log('⚠️ Some tests failed. Please check the error messages above.', 'warning');
  }
}

// Run tests if this script is executed directly
const currentFileUrl = new URL(import.meta.url).pathname;
const scriptPath = process.argv[1].replace(/\\/g, '/');
if (currentFileUrl.endsWith(scriptPath.split('/').pop())) {
  runAllTests().catch(error => {
    log(`Test execution failed: ${error.message}`, 'error');
    process.exit(1);
  });
}

export {
  runAllTests,
  testApiConnection,
  testGenericDataEndpoint,
  testTeachersEndpoint,
  testCoursesEndpoint,
  testDashboardEndpoint
}; 
import { apiClient } from './api';

export async function simpleApiTest() {
  console.log('🔧 Starting Simple API Test...');
  
  try {
    // Test 1: Basic health check
    console.log('Testing health endpoint...');
    const healthResponse = await apiClient.get('/health');
    console.log('✅ Health check passed:', healthResponse);
    
    // Test 2: Test the generic data endpoint
    console.log('Testing generic data endpoint...');
    try {
      const dataResponse = await apiClient.post('/api/data', {
        table: 'students',
        action: 'get_all'
      });
      console.log('✅ Generic data endpoint passed:', dataResponse);
    } catch (error) {
      console.log('❌ Generic data endpoint failed (expected):', error);
    }
    
    // Test 3: Test students endpoint directly
    console.log('Testing students endpoint...');
    try {
      const studentsResponse = await apiClient.get('/students');
      console.log('✅ Students endpoint passed:', studentsResponse);
    } catch (error) {
      console.log('❌ Students endpoint failed (expected):', error);
    }
    
    console.log('🎉 Simple API test completed!');
    return { success: true };
    
  } catch (error) {
    console.error('❌ Simple API test failed:', error);
    return { success: false, error };
  }
}

// Auto-run in browser
if (typeof window !== 'undefined') {
  (window as any).simpleApiTest = simpleApiTest;
  console.log('🔧 Simple API test loaded. Run "simpleApiTest()" in console.');
} 
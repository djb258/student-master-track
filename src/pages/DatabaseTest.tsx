import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react';
import { runDatabaseTests, databaseTester } from '@/lib/testConnection';
import { simpleApiTest } from '@/lib/simpleTest';

interface TestResult {
  testName: string;
  success: boolean;
  error?: string;
  data?: any;
  duration: number;
}

export default function DatabaseTest() {
  const [isRunning, setIsRunning] = useState(false);
  const [isSimpleTestRunning, setIsSimpleTestRunning] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const [summary, setSummary] = useState<{
    total: number;
    passed: number;
    failed: number;
    totalDuration: number;
  } | null>(null);

  const handleRunTests = async () => {
    setIsRunning(true);
    setResults([]);
    setSummary(null);

    try {
      // Run simple test first
      console.log('Running simple API test...');
      await simpleApiTest();
      
      // Override the printSummary method to capture results
      const originalPrintSummary = databaseTester.printSummary.bind(databaseTester);
      const testResults: TestResult[] = [];

      databaseTester.printSummary = () => {
        // This will be called after tests complete
        const allResults = (databaseTester as any).results || [];
        setResults(allResults);
        
        const total = allResults.length;
        const passed = allResults.filter((r: TestResult) => r.success).length;
        const failed = total - passed;
        const totalDuration = allResults.reduce((sum: number, r: TestResult) => sum + r.duration, 0);
        
        setSummary({ total, passed, failed, totalDuration });
        
        // Call original method for console output
        originalPrintSummary();
      };

      await runDatabaseTests();
    } catch (error) {
      console.error('Test execution failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusIcon = (success: boolean) => {
    if (success) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  const getStatusBadge = (success: boolean) => {
    if (success) {
      return <Badge variant="default" className="bg-green-100 text-green-800">Passed</Badge>;
    }
    return <Badge variant="destructive">Failed</Badge>;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Database Connection Test</h1>
          <p className="text-muted-foreground">
            Test the connection to your Render API and verify CRUD operations
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              setIsSimpleTestRunning(true);
              console.log('Running simple test...');
              
                             // Test the API using the working template approach
               console.log('🚀 Making API request to: https://render-student-profile.onrender.com/health');
               
               // Create AbortController for timeout
               const controller = new AbortController();
               const timeoutId = setTimeout(() => controller.abort(), 10000);
               
                               // Try direct API first, then proxy as fallback
                const tryDirectAPI = () => {
                  return fetch('https://render-student-profile.onrender.com/health', {
                    method: 'GET',
                    headers: { 
                      'Accept': 'application/json'
                    },
                    signal: controller.signal
                  });
                };

                const tryProxyAPI = () => {
                  return fetch('http://localhost:3001/api/health', {
                    method: 'GET',
                    headers: { 
                      'Accept': 'application/json'
                    },
                    signal: controller.signal
                  });
                };

                // Try direct API first, fallback to proxy
                tryDirectAPI()
                  .catch(() => {
                    console.log('Direct API failed, trying proxy...');
                    return tryProxyAPI();
                  })
                 .then(response => {
                   clearTimeout(timeoutId);
                   console.log(`📡 Response status: ${response.status} ${response.statusText}`);
                   console.log(`📡 Response headers:`, Object.fromEntries(response.headers.entries()));
                   
                   return response.text();
                 })
                 .then(responseText => {
                   console.log(`📥 Raw response:`, responseText);
                   
                   let result;
                   try {
                     result = JSON.parse(responseText);
                   } catch (parseError) {
                     console.error(`❌ JSON parse error:`, parseError);
                     result = { raw: responseText };
                   }
                   
                   console.log('✅ Health check passed:', result);
                   alert('Health check passed! Check console for details.');
                 })
                 .catch(error => {
                   clearTimeout(timeoutId);
                   console.error('❌ Health check failed:', error);
                   console.error('Error details:', error.message);
                   alert(`Health check failed: ${error.message}`);
                 })
                .finally(() => {
                  setIsSimpleTestRunning(false);
                });
            }}
            disabled={isSimpleTestRunning}
            variant="outline"
            className="min-w-[120px]"
          >
            {isSimpleTestRunning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing...
              </>
            ) : (
              'Simple Test'
            )}
          </Button>
          <Button 
            onClick={handleRunTests} 
            disabled={isRunning}
            className="min-w-[120px]"
          >
            {isRunning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              'Run All Tests'
            )}
          </Button>
        </div>
      </div>

      {/* API Configuration Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            API Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">API URL:</label>
              <p className="text-sm font-mono bg-muted p-2 rounded">
                {import.meta.env.VITE_RENDER_API_URL || 'https://render-student-profile.onrender.com'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Environment:</label>
              <p className="text-sm">
                {import.meta.env.DEV ? 'Development' : 'Production'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Summary */}
      {summary && (
        <Card>
          <CardHeader>
            <CardTitle>Test Summary</CardTitle>
            <CardDescription>
              Overall results of the database connection tests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{summary.total}</div>
                <div className="text-sm text-muted-foreground">Total Tests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{summary.passed}</div>
                <div className="text-sm text-muted-foreground">Passed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{summary.failed}</div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{summary.totalDuration}ms</div>
                <div className="text-sm text-muted-foreground">Total Duration</div>
              </div>
            </div>
            
            {summary.failed === 0 ? (
              <Alert className="mt-4 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  All tests passed! Your database connection is working correctly.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="mt-4 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  Some tests failed. Please check the individual test results below.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Individual Test Results */}
      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>
              Detailed results for each test case
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(result.success)}
                      <h3 className="font-medium">{result.testName}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(result.success)}
                      <span className="text-sm text-muted-foreground">
                        {result.duration}ms
                      </span>
                    </div>
                  </div>
                  
                  {result.error && (
                    <Alert variant="destructive" className="mt-2">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{result.error}</AlertDescription>
                    </Alert>
                  )}
                  
                  {result.data && (
                    <div className="mt-2">
                      <details className="text-sm">
                        <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                          View test data
                        </summary>
                        <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </details>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">What the tests check:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>API connection and basic connectivity</li>
              <li>Generic database service operations</li>
              <li>Student CRUD operations (Create, Read, Update, Delete)</li>
              <li>Teacher CRUD operations</li>
              <li>Course CRUD operations</li>
              <li>Dashboard and analytics services</li>
            </ul>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-2">Console Testing:</h4>
            <p className="text-sm text-muted-foreground mb-2">
              You can also run tests directly from the browser console:
            </p>
            <code className="block bg-muted p-2 rounded text-xs font-mono">
              runDatabaseTests()
            </code>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-2">Troubleshooting:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Check that your Render API is running and accessible</li>
              <li>Verify the API URL in your environment variables</li>
              <li>Ensure your API endpoints match the expected format</li>
              <li>Check the browser console for detailed error messages</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ClipboardList, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-slate-800 to-blue-700">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-6 py-24 mx-auto max-w-7xl lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Student Management
              <span className="block text-blue-200">System</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 max-w-2xl mx-auto">
              Streamline your student enrollment process with our comprehensive intake and management system. 
              Get started by registering new students and their guardians.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/intake">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  <Users className="mr-2 h-5 w-5" />
                  Start Student Intake
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to manage student enrollment
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for educational institutions with the tools administrators need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <ClipboardList className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Student Intake</CardTitle>
                <CardDescription>
                  Collect student and guardian information with our intuitive intake form
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/intake">
                  <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>
                  Organize and manage student profiles and enrollment information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/dashboard">
                  <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                    View Dashboard
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Reports & Analytics</CardTitle>
                <CardDescription>
                  Generate reports and track enrollment metrics and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/reports">
                  <Button variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50">
                    View Reports
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ClipboardList, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-wrestling-navy to-primary">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-6 py-24 mx-auto max-w-7xl lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-6xl">
              Wrestling Program
              <span className="block text-accent">Management</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Streamline your wrestling program with our comprehensive intake and management system. 
              Get started by registering new students and their guardians.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/intake">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
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
              Everything you need to manage your program
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Built specifically for wrestling programs with the tools coaches and administrators need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-all duration-300" style={{ boxShadow: 'var(--shadow-elegant)' }}>
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <ClipboardList className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Student Intake</CardTitle>
                <CardDescription>
                  Collect student and guardian information with our intuitive intake form
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/intake">
                  <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-all duration-300" style={{ boxShadow: 'var(--shadow-elegant)' }}>
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Roster Management</CardTitle>
                <CardDescription>
                  Organize and manage your wrestling team roster and athlete information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" disabled className="opacity-50">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0 hover:shadow-xl transition-all duration-300" style={{ boxShadow: 'var(--shadow-elegant)' }}>
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-secondary-foreground" />
                </div>
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>
                  Track athlete progress, attendance, and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" disabled className="opacity-50">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

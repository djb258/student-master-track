import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  BookOpen, 
  Trophy, 
  BarChart3, 
  FileText, 
  Settings,
  TrendingUp,
  Calendar,
  Award,
  Target,
  Brain
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // Sample dashboard statistics
  const dashboardStats = [
    {
      title: "Total Students",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Average GPA",
      value: "3.42",
      change: "+0.08",
      icon: BookOpen,
      color: "text-green-600"
    },
    {
      title: "Active Athletes",
      value: "324",
      change: "+18",
      icon: Trophy,
      color: "text-orange-600"
    },
    {
      title: "Course Completion",
      value: "94.2%",
      change: "+2.1%",
      icon: Target,
      color: "text-purple-600"
    }
  ];

  const moduleCards = [
    {
      title: "AI Analytics Dashboard",
      description: "AI-powered student insights and predictive analytics",
      route: "/ai-dashboard",
      icon: Brain,
      stats: "Smart insights enabled",
      color: "bg-violet-50 border-violet-200",
      iconColor: "text-violet-600"
    },
    {
      title: "Academic Performance",
      description: "View detailed academic records, grades, and progress tracking",
      route: "/academics",
      icon: BookOpen,
      stats: "1,247 students tracked",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600"
    },
    {
      title: "Wrestling Program",
      description: "Team statistics, individual performance, and match results",
      route: "/wrestling/team",
      icon: Trophy,
      stats: "14 active wrestlers",
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600"
    },
    {
      title: "Individual Wrestling Stats",
      description: "Detailed individual wrestler performance and analytics",
      route: "/wrestling/stats",
      icon: BarChart3,
      stats: "24-2 season record",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600"
    },
    {
      title: "Student Intake",
      description: "Register new students and manage enrollment data",
      route: "/intake",
      icon: Users,
      stats: "45 pending applications",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600"
    },
    {
      title: "Reports & Analytics",
      description: "Generate comprehensive reports and view system analytics",
      route: "/reports",
      icon: FileText,
      stats: "12 reports generated",
      color: "bg-indigo-50 border-indigo-200",
      iconColor: "text-indigo-600"
    },
    {
      title: "Student Profiles",
      description: "Access individual student records and detailed profiles",
      route: "/profile/1",
      icon: Users,
      stats: "View sample profile",
      color: "bg-teal-50 border-teal-200",
      iconColor: "text-teal-600"
    }
  ];

  const recentActivity = [
    {
      title: "Alex Johnson - Wrestling Match Win",
      description: "Won by pin in 1:47 against Mike Thompson",
      time: "2 hours ago",
      type: "athletics"
    },
    {
      title: "Sarah Davis - Honor Roll",
      description: "Achieved 3.9 GPA for the semester",
      time: "5 hours ago", 
      type: "academics"
    },
    {
      title: "Basketball Team - District Championship",
      description: "Advanced to state tournament",
      time: "1 day ago",
      type: "athletics"
    },
    {
      title: "New Student Registration",
      description: "Emma Wilson enrolled in 11th grade",
      time: "2 days ago",
      type: "enrollment"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            🎓 Student Master Track Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive student management and performance tracking system
          </p>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <Badge variant="secondary" className="mt-1">
                      {stat.change} from last month
                    </Badge>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Module Cards */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-foreground mb-6">System Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {moduleCards.map((card, index) => (
                <Card key={index} className={`${card.color} shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <card.icon className={`h-6 w-6 ${card.iconColor}`} />
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {card.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-muted-foreground">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{card.stats}</span>
                      <Button 
                        onClick={() => navigate(card.route)}
                        variant="default"
                        size="sm"
                      >
                        Access Module
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest updates across all modules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="border-l-4 border-primary/20 pl-4 py-2">
                      <h4 className="font-medium text-foreground text-sm">{activity.title}</h4>
                      <p className="text-xs text-muted-foreground mb-1">{activity.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">{activity.type}</Badge>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Award className="h-4 w-4 mr-2" />
                  View Achievements
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
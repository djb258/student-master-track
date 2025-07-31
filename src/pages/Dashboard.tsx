import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const quickAccessCards = [
    {
      title: "Student Intake",
      description: "Enter or view student profiles.",
      route: "/intake"
    },
    {
      title: "Reports & Analytics", 
      description: "Generate reports and view analytics.",
      route: "/reports"
    },
    {
      title: "Student Management",
      description: "View and manage enrolled students.",
      route: "/students"
    },
    {
      title: "Settings",
      description: "Configure system preferences.",
      route: "/settings"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            📊 Student Management Dashboard
          </h1>
          <p className="text-xl text-slate-600">
            Your central hub for managing student enrollment and information.
          </p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {quickAccessCards.map((card, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-800">
                  {card.title}
                </CardTitle>
                <CardDescription className="text-slate-600">
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate(card.route)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  variant="default"
                >
                  Go to {card.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
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
      title: "Media Uploads",
      description: "Upload and manage student media files.",
      route: "/media"
    },
    {
      title: "Settings",
      description: "Configure system preferences.",
      route: "/settings"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-wrestling-navy to-wrestling-navy/90">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-wrestling-gold mb-4">
            🏠 Wrestling Dashboard
          </h1>
          <p className="text-xl text-white/80">
            This is your central hub. Use the links below to navigate.
          </p>
        </div>

        {/* Quick Access Card Grid */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-wrestling-gold mb-6">
            Quick Access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {quickAccessCards.map((card, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-wrestling-gold">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate(card.route)}
                    className="w-full bg-wrestling-gold hover:bg-wrestling-gold/90 text-wrestling-navy font-semibold"
                  >
                    Go
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
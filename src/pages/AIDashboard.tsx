import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  Brain, 
  BookOpen, 
  Trophy, 
  TrendingUp, 
  Users,
  Lightbulb,
  Target,
  Calendar,
  Award
} from "lucide-react";

const AIDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const aiModules = [
    {
      title: "Academic Performance Analysis",
      description: "AI-powered analysis of student learning patterns and struggling areas",
      features: ["Performance trend analysis", "Learning gap identification", "Personalized study plans"],
      route: "/academics",
      icon: BookOpen,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
      stats: "92% accuracy in identifying learning challenges"
    },
    {
      title: "AI Tutoring Assistant", 
      description: "Interactive AI tutor providing personalized help and explanations",
      features: ["Subject-specific help", "Practice problem generation", "Study strategy recommendations"],
      route: "/profile/1",
      icon: Brain,
      color: "bg-purple-50 border-purple-200", 
      iconColor: "text-purple-600",
      stats: "Available 24/7 for instant help"
    },
    {
      title: "Sports Performance AI",
      description: "Analyze athletic performance and identify improvement opportunities",
      features: ["Performance tracking", "Technique analysis", "Training recommendations"],
      route: "/wrestling/stats",
      icon: Trophy,
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600",
      stats: "Track 15+ performance metrics"
    },
    {
      title: "Predictive Analytics",
      description: "Forecast student outcomes and identify at-risk students early",
      features: ["Early warning system", "Graduation probability", "Intervention recommendations"],
      route: "/reports",
      icon: TrendingUp,
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
      stats: "85% accuracy in predicting outcomes"
    }
  ];

  const aiCapabilities = [
    {
      category: "Academic Support",
      capabilities: [
        "Real-time performance analysis",
        "Personalized learning recommendations", 
        "Automatic assignment feedback",
        "Study schedule optimization"
      ]
    },
    {
      category: "Behavioral Insights",
      capabilities: [
        "Attendance pattern analysis",
        "Engagement level tracking",
        "Social interaction monitoring",
        "Mood and wellbeing assessment"
      ]
    },
    {
      category: "Predictive Modeling",
      capabilities: [
        "Academic risk assessment",
        "Career path recommendations",
        "College readiness evaluation",
        "Intervention timing optimization"
      ]
    }
  ];

  const recentAIInsights = [
    {
      student: "Alex Johnson",
      insight: "Showing difficulty with quadratic equations - suggested additional practice problems",
      type: "Academic",
      confidence: "94%",
      time: "2 hours ago"
    },
    {
      student: "Sarah Davis", 
      insight: "Perfect attendance streak may be at risk - family situation monitoring recommended",
      type: "Behavioral",
      confidence: "87%",
      time: "5 hours ago"
    },
    {
      student: "Marcus Rodriguez",
      insight: "Wrestling performance declining - recommended nutrition and sleep analysis",
      type: "Athletic",
      confidence: "91%",
      time: "1 day ago"
    },
    {
      student: "Emma Wilson",
      insight: "Strong college readiness indicators - suggested AP course enrollment",
      type: "Predictive",
      confidence: "96%",
      time: "2 days ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            🤖 AI-Powered Student Analytics
          </h1>
          <p className="text-xl text-muted-foreground">
            Intelligent insights and personalized support for every student
          </p>
        </div>

        {/* AI Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {aiModules.map((module, index) => (
            <Card key={index} className={`${module.color} shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <module.icon className={`h-6 w-6 ${module.iconColor}`} />
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {module.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-muted-foreground">
                  {module.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ul className="space-y-1">
                    {module.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-xs text-muted-foreground">{module.stats}</span>
                    <Button 
                      onClick={() => navigate(module.route)}
                      variant="default"
                      size="sm"
                    >
                      Explore
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Capabilities */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-foreground mb-6">AI Capabilities Overview</h2>
            <div className="space-y-6">
              {aiCapabilities.map((category, index) => (
                <Card key={index} className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {category.capabilities.map((capability, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                          <Lightbulb className="h-4 w-4 text-primary" />
                          <span className="text-sm text-foreground">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent AI Insights */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Recent AI Insights
                </CardTitle>
                <CardDescription>Latest AI-generated student insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAIInsights.map((insight, index) => (
                    <div key={index} className="border-l-4 border-primary/20 pl-4 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-foreground text-sm">{insight.student}</h4>
                        <Badge variant="outline" className="text-xs">{insight.type}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{insight.insight}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {insight.confidence} confidence
                        </Badge>
                        <span className="text-xs text-muted-foreground">{insight.time}</span>
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
                  <Award className="h-5 w-5" />
                  AI Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Brain className="h-4 w-4 mr-2" />
                  Run Performance Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Identify At-Risk Students
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Generate Study Plans
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Predictions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDashboard;
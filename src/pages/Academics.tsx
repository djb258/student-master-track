import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Share2, BookOpen, TrendingUp, Award, Calendar, Users, Brain, Zap, GraduationCap, Sparkles, MessageCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import StudyMode from "@/components/ai/StudyMode";

const Academics = () => {
  const academicOverview = {
    gpa: "3.92",
    classRank: "15/312",
    credits: "23.5/24",
    attendance: "97.2%"
  };

  const gradeData = [
    { semester: "Fall 2023", gpa: 3.8 },
    { semester: "Spring 2024", gpa: 3.9 },
    { semester: "Fall 2024", gpa: 3.95 },
    { semester: "Current", gpa: 3.92 }
  ];

  const subjectPerformance = [
    { subject: "Mathematics", grade: 95, credits: 4 },
    { subject: "English", grade: 92, credits: 4 },
    { subject: "Science", grade: 88, credits: 4 },
    { subject: "History", grade: 94, credits: 3 },
    { subject: "Foreign Lang", grade: 90, credits: 3 },
    { subject: "Physical Ed", grade: 98, credits: 2 }
  ];

  const skillsRadar = [
    { skill: "Critical Thinking", score: 92 },
    { skill: "Communication", score: 88 },
    { skill: "Problem Solving", score: 95 },
    { skill: "Collaboration", score: 85 },
    { skill: "Leadership", score: 90 },
    { skill: "Time Management", score: 87 }
  ];

  const currentCourses = [
    {
      course: "AP Calculus BC",
      teacher: "Dr. Sarah Mitchell",
      grade: "A-",
      assignments: { completed: 28, total: 30 },
      nextAssignment: "Unit 5 Test - March 20th"
    },
    {
      course: "AP English Literature", 
      teacher: "Ms. Jennifer Adams",
      grade: "A",
      assignments: { completed: 25, total: 26 },
      nextAssignment: "Essay Draft - March 18th"
    },
    {
      course: "AP Physics C",
      teacher: "Mr. Robert Chen",
      grade: "B+",
      assignments: { completed: 22, total: 24 },
      nextAssignment: "Lab Report - March 22nd"
    },
    {
      course: "AP US History",
      teacher: "Mrs. Lisa Rodriguez",
      grade: "A",
      assignments: { completed: 30, total: 31 },
      nextAssignment: "DBQ Essay - March 25th"
    }
  ];

  const achievements = [
    {
      title: "Honor Roll",
      description: "Maintained 3.8+ GPA for 6 consecutive semesters",
      date: "Ongoing",
      type: "academic"
    },
    {
      title: "Math Competition Winner",
      description: "1st Place - Regional Mathematics Competition",
      date: "February 2024",
      type: "competition"
    },
    {
      title: "Science Fair Finalist",
      description: "Advanced to State Science Fair",
      date: "January 2024", 
      type: "competition"
    },
    {
      title: "National Merit Semifinalist",
      description: "PSAT Score: 1480/1520",
      date: "September 2023",
      type: "recognition"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Alex Johnson - Academic Profile</h1>
          <p className="text-muted-foreground mt-2">Senior • Lincoln High School • Class of 2024</p>
        </div>
        <Button className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share Academic Profile
        </Button>
      </div>

      {/* Academic Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cumulative GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{academicOverview.gpa}</div>
            <p className="text-xs text-muted-foreground">4.0 scale</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{academicOverview.classRank}</div>
            <p className="text-xs text-muted-foreground">Top 5%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits Earned</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{academicOverview.credits}</div>
            <p className="text-xs text-muted-foreground">On track to graduate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{academicOverview.attendance}</div>
            <p className="text-xs text-muted-foreground">Excellent attendance</p>
          </CardContent>
        </Card>
      </div>

      {/* ChatGPT Study Mode Feature Highlight */}
      <Alert className="border-2 border-primary/20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="relative">
              <GraduationCap className="h-8 w-8 text-primary" />
              <Badge 
                variant="secondary" 
                className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1 py-0 h-4"
              >
                NEW
              </Badge>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg text-foreground">🎓 ChatGPT Study Mode</h3>
              <Badge variant="outline" className="text-green-600 border-green-300">July 2025</Badge>
            </div>
            <AlertDescription className="text-muted-foreground mb-4">
              <p className="mb-2">
                <strong>Revolutionary AI Learning:</strong> Unlike traditional AI that gives direct answers, Study Mode guides you through discovery using Socratic questioning.
              </p>
              <ul className="space-y-1 text-sm ml-4">
                <li>• <strong>Thought-provoking questions</strong> instead of direct answers</li>
                <li>• <strong>Step-by-step hints</strong> that guide your thinking</li>
                <li>• <strong>Interactive learning loops</strong> tailored to your skill level</li>
                <li>• <strong>Real-time adaptation</strong> based on your performance</li>
              </ul>
            </AlertDescription>
            <div className="flex items-center gap-3">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                onClick={() => {
                  const studyModeSection = document.getElementById('study-mode-section');
                  studyModeSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Zap className="h-4 w-4 mr-2" />
                Try Study Mode Now
              </Button>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                <span>Powered by GPT-4.1</span>
              </div>
            </div>
          </div>
        </div>
      </Alert>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="courses">Current Courses</TabsTrigger>
          <TabsTrigger value="skills">Skills Assessment</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="study-mode" className="text-primary font-semibold">
            <GraduationCap className="h-4 w-4 mr-1" />
            Study Mode
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>GPA Trend</CardTitle>
                <CardDescription>Academic performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={gradeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" />
                    <YAxis domain={[3.5, 4.0]} />
                    <Line type="monotone" dataKey="gpa" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Current grades by subject area</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[80, 100]} />
                    <Bar dataKey="grade" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Course Load</CardTitle>
              <CardDescription>Spring 2024 semester courses and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {currentCourses.map((course, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{course.course}</h3>
                        <p className="text-sm text-muted-foreground">{course.teacher}</p>
                      </div>
                      <Badge variant="secondary" className="text-lg font-semibold">
                        {course.grade}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Assignment Progress</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(course.assignments.completed / course.assignments.total) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-foreground">
                            {course.assignments.completed}/{course.assignments.total}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Next Assignment</p>
                        <p className="text-sm font-medium text-foreground">{course.nextAssignment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills Assessment</CardTitle>
              <CardDescription>21st century skills evaluation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={skillsRadar}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="skill" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Skills"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Academic Achievements</CardTitle>
              <CardDescription>Recognition and awards received</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                    <div className="flex-shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{achievement.date}</Badge>
                        <Badge variant="secondary">{achievement.type}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="study-mode" className="space-y-6" id="study-mode-section">
          <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-primary" />
                ChatGPT Study Mode
                <Badge variant="secondary" className="bg-green-500/20 text-green-700 border-green-300">
                  Revolutionary Learning
                </Badge>
              </CardTitle>
              <CardDescription>
                Experience the future of AI tutoring - where you discover answers through guided questioning instead of being given direct solutions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100">Socratic Method</h4>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-200">
                    Guides you with questions instead of giving direct answers
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <h4 className="font-semibold text-purple-900 dark:text-purple-100">Adaptive Learning</h4>
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-200">
                    Adjusts difficulty based on your understanding
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <h4 className="font-semibold text-green-900 dark:text-green-100">Critical Thinking</h4>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-200">
                    Builds problem-solving skills through discovery
                  </p>
                </div>
              </div>
              
              <StudyMode 
                studentName="Alex Johnson"
                studentGrade="12th Grade"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Academics;
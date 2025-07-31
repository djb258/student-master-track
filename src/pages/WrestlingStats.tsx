import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share2, TrendingUp, Award, Target, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const WrestlingStats = () => {
  const performanceData = [
    { match: "Match 1", wins: 1, points: 6 },
    { match: "Match 2", wins: 1, points: 3 },
    { match: "Match 3", wins: 1, points: 6 },
    { match: "Match 4", wins: 0, points: 0 },
    { match: "Match 5", wins: 1, points: 6 },
    { match: "Match 6", wins: 1, points: 4 },
    { match: "Match 7", wins: 1, points: 6 },
    { match: "Match 8", wins: 1, points: 2 },
  ];

  const moveBreakdown = [
    { name: "Takedowns", value: 45, color: "#8884d8" },
    { name: "Pins", value: 28, color: "#82ca9d" },
    { name: "Technical Falls", value: 15, color: "#ffc658" },
    { name: "Decisions", value: 12, color: "#ff7300" }
  ];

  const individualStats = {
    record: "24-2",
    pins: 15,
    techFalls: 8,
    majorDecisions: 3,
    decisions: 1,
    avgMatchTime: "2:34",
    winStreak: 12,
    ranking: "#1 State, #8 National"
  };

  const recentMatches = [
    {
      date: "March 8, 2024",
      opponent: "Mike Thompson (Lincoln)",
      result: "W - Pin",
      time: "1:47",
      tournament: "Regional Finals"
    },
    {
      date: "March 1, 2024",
      opponent: "David Garcia (Jefferson)",  
      result: "W - Tech Fall",
      time: "4:23",
      tournament: "Regional Semi"
    },
    {
      date: "February 24, 2024",
      opponent: "Ryan Mitchell (Washington)",
      result: "W - Pin", 
      time: "2:15",
      tournament: "District Finals"
    },
    {
      date: "February 17, 2024",
      opponent: "Carlos Ruiz (Roosevelt)",
      result: "W - Major Dec",
      time: "6:00",
      tournament: "District Semi"
    },
    {
      date: "February 10, 2024",
      opponent: "Austin Lee (Madison)",
      result: "L - Decision",
      time: "6:00", 
      tournament: "Dual Meet"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Alex Johnson - Wrestling Statistics</h1>
          <p className="text-muted-foreground mt-2">152 lbs • Senior • Lincoln High School</p>
        </div>
        <Button className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share Stats
        </Button>
      </div>

      {/* Key Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Season Record</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{individualStats.record}</div>
            <p className="text-xs text-muted-foreground">92% win rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pins</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{individualStats.pins}</div>
            <p className="text-xs text-muted-foreground">58% of wins by pin</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Match Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{individualStats.avgMatchTime}</div>
            <p className="text-xs text-muted-foreground">Fast finisher</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Ranking</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-foreground">#1 State</div>
            <p className="text-xs text-muted-foreground">#8 National</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance Trends</TabsTrigger>
          <TabsTrigger value="breakdown">Win Breakdown</TabsTrigger>
          <TabsTrigger value="matches">Match History</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Match Performance Over Time</CardTitle>
              <CardDescription>Points scored and wins in recent matches</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="match" />
                  <YAxis />
                  <Line type="monotone" dataKey="points" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Win Methods Distribution</CardTitle>
                <CardDescription>How victories are achieved</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={moveBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, value}) => `${name}: ${value}`}
                    >
                      {moveBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Win Stats</CardTitle>
                <CardDescription>Breakdown by victory type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pins</span>
                  <Badge variant="secondary">{individualStats.pins}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Technical Falls</span>
                  <Badge variant="secondary">{individualStats.techFalls}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Major Decisions</span>
                  <Badge variant="secondary">{individualStats.majorDecisions}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Decisions</span>
                  <Badge variant="secondary">{individualStats.decisions}</Badge>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-sm font-medium">Current Win Streak</span>
                  <Badge variant="default">{individualStats.winStreak}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Win Method Comparison</CardTitle>
              <CardDescription>Visual breakdown of how matches are won</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={moveBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matches" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Match History</CardTitle>
              <CardDescription>Detailed results from recent competitions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMatches.map((match, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">{match.date}</span>
                        <Badge variant="outline">{match.tournament}</Badge>
                      </div>
                      <div className="font-medium text-foreground">vs. {match.opponent}</div>
                      <div className="text-sm text-muted-foreground">Match time: {match.time}</div>
                    </div>
                    <Badge variant={match.result.startsWith('W') ? 'default' : 'destructive'}>
                      {match.result}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WrestlingStats;
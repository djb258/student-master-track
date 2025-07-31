import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Share2, Trophy, Users, Calendar } from "lucide-react";

const WrestlingTeam = () => {
  const teamStats = {
    wins: 18,
    losses: 3,
    ranking: "#2 State",
    nextMatch: "vs. Roosevelt High - March 15th"
  };

  const wrestlers = [
    {
      id: "1",
      name: "Alex Johnson",
      weightClass: "152 lbs",
      record: "24-2",
      ranking: "#1 State",
      photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=400&h=400&fit=crop"
    },
    {
      id: "2", 
      name: "Marcus Davis",
      weightClass: "160 lbs",
      record: "21-4",
      ranking: "#3 State",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      id: "3",
      name: "Tyler Rodriguez", 
      weightClass: "145 lbs",
      record: "19-5",
      ranking: "#5 State",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    },
    {
      id: "4",
      name: "Jake Wilson",
      weightClass: "170 lbs", 
      record: "22-3",
      ranking: "#2 State",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    }
  ];

  const recentMatches = [
    {
      date: "March 8, 2024",
      opponent: "Lincoln High",
      result: "W 42-18",
      location: "Home"
    },
    {
      date: "March 1, 2024", 
      opponent: "Jefferson Academy",
      result: "W 38-24",
      location: "Away"
    },
    {
      date: "February 24, 2024",
      opponent: "Washington Prep",
      result: "W 45-12", 
      location: "Home"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Lincoln High Wrestling Team</h1>
          <p className="text-muted-foreground mt-2">2023-24 Season</p>
        </div>
        <Button className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share Team Stats
        </Button>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Record</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{teamStats.wins}-{teamStats.losses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">State Ranking</CardTitle>
            <Badge variant="secondary">{teamStats.ranking}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-foreground">Division 1A</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">14</div>
            <p className="text-xs text-muted-foreground">Active wrestlers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Match</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-foreground">{teamStats.nextMatch}</div>
          </CardContent>
        </Card>
      </div>

      {/* Team Roster */}
      <Card>
        <CardHeader>
          <CardTitle>Team Roster</CardTitle>
          <CardDescription>Current wrestling team members and their records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {wrestlers.map((wrestler) => (
              <Card key={wrestler.id} className="border border-border">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <img 
                      src={wrestler.photo} 
                      alt={wrestler.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">{wrestler.name}</h3>
                      <p className="text-sm text-muted-foreground">{wrestler.weightClass}</p>
                    </div>
                    <div className="space-y-1">
                      <Badge variant="outline">{wrestler.record}</Badge>
                      <Badge variant="secondary" className="block">{wrestler.ranking}</Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Matches */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Team Matches</CardTitle>
          <CardDescription>Latest competition results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMatches.map((match, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-muted-foreground">{match.date}</div>
                  <div className="font-medium text-foreground">{match.opponent}</div>
                  <Badge variant="outline">{match.location}</Badge>
                </div>
                <Badge variant={match.result.startsWith('W') ? 'default' : 'destructive'}>
                  {match.result}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WrestlingTeam;
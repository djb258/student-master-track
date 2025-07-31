import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Share2, Copy, Mail, Brain } from "lucide-react";
import AITutor from "@/components/ai/AITutor";

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  profile_url: string;
  grade: string;
  gpa: number;
  attendance_rate: number;
  enrollment_date: string;
  sports?: {
    current_sport: string;
    team_name: string;
    position: string;
    jersey_number: number;
    season_stats: {
      games_played: number;
      wins: number;
      losses: number;
      points_scored?: number;
      assists?: number;
      rebounds?: number;
      goals?: number;
      saves?: number;
    };
    team_record: {
      wins: number;
      losses: number;
      ties?: number;
    };
  };
}

// Dummy data for demonstration
const getDummyStudent = (studentId: string): Student => {
  const students = [
    {
      id: "1",
      first_name: "Alex",
      last_name: "Johnson",
      profile_url: "https://student-master-track.lovable.app/profile/1",
      grade: "10th Grade",
      gpa: 3.8,
      attendance_rate: 92,
      enrollment_date: "2023-09-15",
      sports: {
        current_sport: "Basketball",
        team_name: "Central High Eagles",
        position: "Point Guard",
        jersey_number: 23,
        season_stats: {
          games_played: 18,
          wins: 14,
          losses: 4,
          points_scored: 267,
          assists: 89,
          rebounds: 76
        },
        team_record: {
          wins: 14,
          losses: 4
        }
      }
    },
    {
      id: "2", 
      first_name: "Maria",
      last_name: "Garcia",
      profile_url: "https://student-master-track.lovable.app/profile/2",
      grade: "11th Grade",
      gpa: 3.5,
      attendance_rate: 88,
      enrollment_date: "2022-08-20"
    },
    {
      id: "3",
      first_name: "James",
      last_name: "Smith",
      profile_url: "https://student-master-track.lovable.app/profile/3", 
      grade: "9th Grade",
      gpa: 3.2,
      attendance_rate: 95,
      enrollment_date: "2024-01-10"
    }
  ];
  
  return students.find(s => s.id === studentId) || students[0];
};

export default function StudentProfile() {
  const { student_id = "1" } = useParams<{ student_id: string }>();
  const student = getDummyStudent(student_id);
  const { toast } = useToast();

  // Generate unique shareable URL for the weekly highlight
  const generateHighlightUrl = () => {
    const currentWeek = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
    return `https://student-master-track.lovable.app/highlight/${student_id}/${currentWeek}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Shareable link copied to clipboard",
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const shareViaEmail = (url: string) => {
    const subject = `${student.first_name} ${student.last_name} - Weekly Sports Highlight`;
    const body = `Check out ${student.first_name}'s amazing sports performance this week!\n\n${url}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">
            {student.first_name} {student.last_name}
          </h1>
          <p className="text-white/70">Student Profile</p>
        </div>

        {/* Student Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 border border-white/20 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-white/70 text-sm">Grade Level</p>
            <p className="text-white font-semibold">{student.grade}</p>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-white/70 text-sm">GPA</p>
            <p className="text-white font-semibold">{student.gpa.toFixed(1)}</p>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-white/70 text-sm">Enrollment Date</p>
            <p className="text-white font-semibold">{new Date(student.enrollment_date).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Profile URL */}
        <div className="text-white/90 mb-6">
          <strong>Student Profile URL:</strong>{" "}
          <a 
            href={`https://student-master-track.lovable.app/profile/${student_id}`}
            className="text-blue-300 hover:text-blue-200 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {student.profile_url}
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Stats Card */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                📊 Academic Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Attendance Rate</span>
                  <span className="text-white">{student.attendance_rate}%</span>
                </div>
                <Progress value={student.attendance_rate} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/70">Current GPA</p>
                  <p className="text-white font-semibold text-lg">{student.gpa.toFixed(1)}</p>
                </div>
                <div>
                  <p className="text-white/70">Credits Earned</p>
                  <p className="text-white font-semibold text-lg">18/24</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                  Honor Roll
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  Perfect Attendance
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Media Card */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                📷 Student Media
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=150&h=100&fit=crop" 
                  alt="Student work" 
                  className="rounded-lg w-full h-20 object-cover"
                />
                <img 
                  src="https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=150&h=100&fit=crop" 
                  alt="Academic achievement" 
                  className="rounded-lg w-full h-20 object-cover"
                />
              </div>
              <div className="text-sm">
                <p className="text-white/70">Recent Photos:</p>
                <ul className="text-white/90 space-y-1 mt-2">
                  <li>• Science Fair Project - 1st Place</li>
                  <li>• Student Council Meeting</li>
                  <li>• Academic Awards Ceremony</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Report Card */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                📰 Weekly Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-white/90">
                <p className="font-semibold text-white mb-2">Week of {new Date().toLocaleDateString()}</p>
                <div className="space-y-2">
                  <div>
                    <span className="text-white/70">Attendance:</span>
                    <span className="ml-2 text-green-300">5/5 days present</span>
                  </div>
                  <div>
                    <span className="text-white/70">Assignments:</span>
                    <span className="ml-2 text-blue-300">8/8 completed</span>
                  </div>
                  <div>
                    <span className="text-white/70">Upcoming:</span>
                    <span className="ml-2 text-yellow-300">Math Quiz (Friday)</span>
                  </div>
                </div>
              </div>
              <div className="pt-2 border-t border-white/20">
                <p className="text-xs text-white/70">
                  <strong>Teacher Note:</strong> {student.first_name} is showing excellent progress in all subjects and maintains strong participation in class discussions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sports Section - Only show if student has sports data */}
        {student.sports && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              🏀 Sports Profile
            </h2>
            
            {/* Sports Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Team & Position Info */}
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    🏆 Team Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/70 text-sm">Sport</p>
                      <p className="text-white font-semibold">{student.sports.current_sport}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Jersey #</p>
                      <p className="text-white font-semibold">#{student.sports.jersey_number}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Position</p>
                      <p className="text-white font-semibold">{student.sports.position}</p>
                    </div>
                    <div>
                      <p className="text-white/70 text-sm">Team</p>
                      <p className="text-white font-semibold">{student.sports.team_name}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/20">
                    <p className="text-white/70 text-sm mb-2">Team Record</p>
                    <div className="flex gap-4">
                      <span className="text-green-300 font-semibold">
                        {student.sports.team_record.wins}W
                      </span>
                      <span className="text-red-300 font-semibold">
                        {student.sports.team_record.losses}L
                      </span>
                      <span className="text-white/70">
                        ({(student.sports.team_record.wins / (student.sports.team_record.wins + student.sports.team_record.losses) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Stats */}
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    📈 Season Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white/70">Games Played</p>
                      <p className="text-white font-semibold text-lg">{student.sports.season_stats.games_played}</p>
                    </div>
                    {student.sports.season_stats.points_scored && (
                      <div>
                        <p className="text-white/70">Total Points</p>
                        <p className="text-white font-semibold text-lg">{student.sports.season_stats.points_scored}</p>
                      </div>
                    )}
                    {student.sports.season_stats.assists && (
                      <div>
                        <p className="text-white/70">Assists</p>
                        <p className="text-white font-semibold text-lg">{student.sports.season_stats.assists}</p>
                      </div>
                    )}
                    {student.sports.season_stats.rebounds && (
                      <div>
                        <p className="text-white/70">Rebounds</p>
                        <p className="text-white font-semibold text-lg">{student.sports.season_stats.rebounds}</p>
                      </div>
                    )}
                  </div>
                  <div className="pt-2 border-t border-white/20">
                    <p className="text-white/70 text-sm mb-2">Averages Per Game</p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {student.sports.season_stats.points_scored && (
                        <div className="text-center">
                          <p className="text-white font-semibold">
                            {(student.sports.season_stats.points_scored / student.sports.season_stats.games_played).toFixed(1)}
                          </p>
                          <p className="text-white/70">PPG</p>
                        </div>
                      )}
                      {student.sports.season_stats.assists && (
                        <div className="text-center">
                          <p className="text-white font-semibold">
                            {(student.sports.season_stats.assists / student.sports.season_stats.games_played).toFixed(1)}
                          </p>
                          <p className="text-white/70">APG</p>
                        </div>
                      )}
                      {student.sports.season_stats.rebounds && (
                        <div className="text-center">
                          <p className="text-white font-semibold">
                            {(student.sports.season_stats.rebounds / student.sports.season_stats.games_played).toFixed(1)}
                          </p>
                          <p className="text-white/70">RPG</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* ESPN-Style Weekly Highlight */}
            <Card className="bg-white/95 border-gray-300 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">SPORTS</div>
                    <CardTitle className="text-gray-900 text-lg">Weekly Sports Highlight</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(generateHighlightUrl())}
                      className="border-gray-300 hover:bg-gray-100 text-gray-700"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy Link
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => shareViaEmail(generateHighlightUrl())}
                      className="border-gray-300 hover:bg-gray-100 text-gray-700"
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                  </div>
                </div>
                <CardDescription className="text-gray-700">
                  Week of {new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()} - {new Date().toLocaleDateString()}
                </CardDescription>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 mt-2">
                  <p className="text-blue-700 text-xs">
                    <Share2 className="h-3 w-3 inline mr-1" />
                    <strong>Shareable Link:</strong> {generateHighlightUrl()}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="text-gray-900 font-bold text-lg mb-2">
                    Alex Johnson Leads Eagles to Victory in Clutch Performance
                  </h3>
                  <p className="text-gray-800 mb-3">
                    In a thrilling 78-72 victory over the Riverside Hawks on Friday night, sophomore point guard 
                    Alex Johnson delivered when it mattered most. With the Eagles trailing by 5 points entering 
                    the fourth quarter, Johnson took control of the game.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <h4 className="text-orange-600 font-semibold mb-2">Game Stats</h4>
                      <ul className="text-gray-800 text-sm space-y-1">
                        <li>• 22 points (season high)</li>
                        <li>• 8 assists</li>
                        <li>• 5 rebounds</li>
                        <li>• 3 steals</li>
                        <li>• 67% field goal percentage</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg p-3">
                      <h4 className="text-blue-600 font-semibold mb-2">Key Moments</h4>
                      <ul className="text-gray-800 text-sm space-y-1">
                        <li>• Game-tying 3-pointer with 2:47 left</li>
                        <li>• Crucial steal leading to fast break</li>
                        <li>• Perfect 4/4 free throws in final minute</li>
                        <li>• Assist on game-winning basket</li>
                      </ul>
                    </div>
                  </div>
                  
                  <p className="text-gray-800 mb-3">
                    "Alex showed incredible poise for a sophomore," said Coach Martinez. "His court vision and 
                    decision-making in pressure situations continue to impress. The way he distributed the ball 
                    and found open teammates while also scoring when needed was exceptional."
                  </p>
                  
                  <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                    <h4 className="text-green-700 font-semibold mb-1">Season Impact</h4>
                    <p className="text-gray-800 text-sm">
                      This performance brings Alex's season averages to 14.8 PPG, 4.9 APG, and 4.2 RPG. 
                      The Eagles improve to 14-4 overall and maintain their #2 ranking in the district standings.
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-300">
                    <p className="text-gray-600 text-xs">
                      <strong>Next Game:</strong> vs. Lincoln Prep Lions - Tuesday, 7:00 PM (Home)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tagged Event Photos from Database */}
            <Card className="bg-white/95 border-gray-300 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900 flex items-center gap-2">
                    🏷️ Tagged Event Photos
                  </CardTitle>
                  <Badge className="bg-green-100 text-green-700 border-green-300">
                    8 New Photos Tagged
                  </Badge>
                </div>
                <CardDescription className="text-gray-700">
                  Photos from events where Alex Johnson has been automatically tagged
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Auto-Tagged Game Photos */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-gray-800 font-semibold flex items-center gap-2">
                      🏀 Eagles vs Hawks - Game Winner Shot
                    </h4>
                    <Badge variant="outline" className="border-blue-300 text-blue-700">
                      Photo ID: EV-2024-BB-156
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <img 
                        src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300&h=200&fit=crop" 
                        alt="Alex Johnson making game-winning shot" 
                        className="rounded-lg w-full h-32 object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-blue-600 text-white text-xs">
                          Tagged: Alex Johnson
                        </Badge>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <Badge className="bg-green-600 text-white text-xs">
                          Game Winner
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-800 text-sm font-semibold">Auto-Detection Details:</p>
                      <ul className="text-gray-700 text-xs space-y-1">
                        <li>• <strong>Confidence:</strong> 97.3%</li>
                        <li>• <strong>Jersey #:</strong> 23 (Verified)</li>
                        <li>• <strong>Action:</strong> Shooting Motion</li>
                        <li>• <strong>Timestamp:</strong> 4Q 2:47 remaining</li>
                        <li>• <strong>Photographer:</strong> School Athletics Dept</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-800 text-sm font-semibold">Share Options:</p>
                      <div className="space-y-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full text-xs"
                          onClick={() => copyToClipboard(`https://photos.school-athletics.com/event/EV-2024-BB-156/player/${student_id}`)}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy Photo Link
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full text-xs"
                          onClick={() => shareViaEmail(`https://photos.school-athletics.com/event/EV-2024-BB-156/player/${student_id}`)}
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          Email to Family
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Tagged Photos Grid */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-gray-800 font-semibold mb-3 flex items-center gap-2">
                    📷 More Tagged Photos from this Event
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="relative group">
                      <img 
                        src="https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=200&h=150&fit=crop" 
                        alt="Alex in team huddle" 
                        className="rounded-lg w-full h-24 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Badge className="bg-blue-600 text-white text-xs">
                          Tagged: Alex Johnson
                        </Badge>
                      </div>
                    </div>
                    <div className="relative group">
                      <img 
                        src="https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=200&h=150&fit=crop" 
                        alt="Alex during game action" 
                        className="rounded-lg w-full h-24 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Badge className="bg-blue-600 text-white text-xs">
                          Tagged: Alex Johnson
                        </Badge>
                      </div>
                    </div>
                    <div className="relative group">
                      <img 
                        src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=200&h=150&fit=crop" 
                        alt="Alex celebrating victory" 
                        className="rounded-lg w-full h-24 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Badge className="bg-blue-600 text-white text-xs">
                          Tagged: Alex Johnson
                        </Badge>
                      </div>
                    </div>
                    <div className="relative group">
                      <img 
                        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=150&fit=crop" 
                        alt="Alex in practice" 
                        className="rounded-lg w-full h-24 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Badge className="bg-blue-600 text-white text-xs">
                          Tagged: Alex Johnson
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Database Source Info */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-800 font-semibold text-sm">🔗 Linked from Event Database</p>
                      <p className="text-gray-600 text-xs">Auto-tagged photos from school athletics photography system</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-100"
                        onClick={() => copyToClipboard(`https://photos.school-athletics.com/tagged/alex-johnson-23`)}
                      >
                        <Share2 className="h-3 w-3 mr-1" />
                        Share All Tagged
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-100"
                        onClick={() => shareViaEmail(`https://photos.school-athletics.com/tagged/alex-johnson-23`)}
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        Email Collection
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* AI Academic Assistant Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="h-8 w-8 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">
              🤖 AI Academic Assistant
            </h2>
          </div>
          
          <AITutor 
            studentId={student_id}
            studentData={{
              name: `${student.first_name} ${student.last_name}`,
              gpa: student.gpa.toString(),
              courses: [
                { name: "AP Calculus BC", grade: "A-", teacher: "Dr. Mitchell" },
                { name: "AP English Literature", grade: "A", teacher: "Ms. Adams" },
                { name: "AP Physics C", grade: "B+", teacher: "Mr. Chen" },
                { name: "AP US History", grade: "A", teacher: "Mrs. Rodriguez" }
              ],
              recentGrades: [
                { assignment: "Calculus Unit 4 Test", grade: "B+", date: "2024-03-01" },
                { assignment: "English Essay", grade: "A", date: "2024-02-28" },
                { assignment: "Physics Lab Report", grade: "B", date: "2024-02-26" },
                { assignment: "History DBQ", grade: "A-", date: "2024-02-25" }
              ],
              assignmentCompletion: 93,
              attendance: student.attendance_rate,
              subjectPerformance: [
                { subject: "Mathematics", grade: 88 },
                { subject: "English", grade: 95 },
                { subject: "Science", grade: 85 },
                { subject: "History", grade: 92 }
              ]
            }}
          />
        </div>
      </div>
    </div>
  );
}
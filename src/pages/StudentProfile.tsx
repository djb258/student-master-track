import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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
            <Card className="bg-gradient-to-r from-red-600/20 to-blue-600/20 border-red-500/30 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">SPORTS</div>
                  <CardTitle className="text-white text-lg">Weekly Sports Highlight</CardTitle>
                </div>
                <CardDescription className="text-white/80">
                  Week of {new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()} - {new Date().toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h3 className="text-white font-bold text-lg mb-2">
                    Alex Johnson Leads Eagles to Victory in Clutch Performance
                  </h3>
                  <p className="text-white/90 mb-3">
                    In a thrilling 78-72 victory over the Riverside Hawks on Friday night, sophomore point guard 
                    Alex Johnson delivered when it mattered most. With the Eagles trailing by 5 points entering 
                    the fourth quarter, Johnson took control of the game.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-black/20 rounded-lg p-3">
                      <h4 className="text-yellow-400 font-semibold mb-2">Game Stats</h4>
                      <ul className="text-white/90 text-sm space-y-1">
                        <li>• 22 points (season high)</li>
                        <li>• 8 assists</li>
                        <li>• 5 rebounds</li>
                        <li>• 3 steals</li>
                        <li>• 67% field goal percentage</li>
                      </ul>
                    </div>
                    
                    <div className="bg-black/20 rounded-lg p-3">
                      <h4 className="text-blue-400 font-semibold mb-2">Key Moments</h4>
                      <ul className="text-white/90 text-sm space-y-1">
                        <li>• Game-tying 3-pointer with 2:47 left</li>
                        <li>• Crucial steal leading to fast break</li>
                        <li>• Perfect 4/4 free throws in final minute</li>
                        <li>• Assist on game-winning basket</li>
                      </ul>
                    </div>
                  </div>
                  
                  <p className="text-white/90 mb-3">
                    "Alex showed incredible poise for a sophomore," said Coach Martinez. "His court vision and 
                    decision-making in pressure situations continue to impress. The way he distributed the ball 
                    and found open teammates while also scoring when needed was exceptional."
                  </p>
                  
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
                    <h4 className="text-green-300 font-semibold mb-1">Season Impact</h4>
                    <p className="text-white/90 text-sm">
                      This performance brings Alex's season averages to 14.8 PPG, 4.9 APG, and 4.2 RPG. 
                      The Eagles improve to 14-4 overall and maintain their #2 ranking in the district standings.
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-white/20">
                    <p className="text-white/70 text-xs">
                      <strong>Next Game:</strong> vs. Lincoln Prep Lions - Tuesday, 7:00 PM (Home)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
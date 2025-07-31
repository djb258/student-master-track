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
      enrollment_date: "2023-09-15"
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
      </div>
    </div>
  );
}
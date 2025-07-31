import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  profile_url: string;
}

const fetchStudent = async (studentId: string): Promise<Student> => {
  const response = await fetch(`https://render-student-profile.onrender.com/student/${studentId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch student data');
  }
  return response.json();
};

export default function StudentProfile() {
  const { student_id } = useParams<{ student_id: string }>();

  const { data: student, isLoading, error } = useQuery({
    queryKey: ['student', student_id],
    queryFn: () => fetchStudent(student_id!),
    enabled: !!student_id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-6 w-96" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          <Alert variant="destructive">
            <AlertDescription>
              Failed to load student profile. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          <Alert>
            <AlertDescription>
              Student not found.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

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

        {/* Profile URL */}
        <div className="text-white/90">
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
                📊 Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/70">
                Stats for this student will display here (W/L record, pins, etc.).
              </CardDescription>
            </CardContent>
          </Card>

          {/* Media Card */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                📷 Media
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/70">
                Photos and videos linked to this athlete will display here.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Weekly Report Card */}
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm md:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                📰 Weekly Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/70">
                This area will show a generated weekly summary for the student.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
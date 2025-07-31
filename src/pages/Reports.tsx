import { useState } from 'react';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { ReportGenerator } from '@/components/reports/ReportGenerator';
import { DataTable } from '@/components/tables/DataTable';
import { ReportService } from '@/lib/services/reportService';
import { mockApiClient } from '@/lib/mockApi';
import { SimpleBarChart } from '@/components/charts/SimpleBarChart';
import { 
  Users, 
  Calendar, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  Award,
  Activity,
  Target
} from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  weight: number;
  experience: string;
  created_at: string;
}

const Reports = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);

  // Mock data for demonstration
  const mockStudents: Student[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', grade: 'A', weight: 145, experience: '3 years', created_at: '2024-01-15' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', grade: 'B+', weight: 132, experience: '2 years', created_at: '2024-01-16' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', grade: 'A-', weight: 158, experience: '4 years', created_at: '2024-01-17' },
  ];

  // Chart data
  const weightClassData = [
    { name: '120-130', value: 5 },
    { name: '131-140', value: 8 },
    { name: '141-150', value: 6 },
    { name: '151-160', value: 4 },
    { name: '161-170', value: 3 },
  ];

  const performanceData = [
    { name: 'Jan', value: 65 },
    { name: 'Feb', value: 72 },
    { name: 'Mar', value: 78 },
    { name: 'Apr', value: 75 },
    { name: 'May', value: 82 },
  ];

  // Table columns for students
  const studentColumns: ColumnDef<Student>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'grade',
      header: 'Grade',
    },
    {
      accessorKey: 'weight',
      header: 'Weight (lbs)',
    },
    {
      accessorKey: 'experience',
      header: 'Experience',
    },
    {
      accessorKey: 'created_at',
      header: 'Joined',
      cell: ({ row }) => new Date(row.getValue('created_at')).toLocaleDateString(),
    },
  ];

  const handleGenerateReport = async (config: any) => {
    setIsGenerating(true);
    try {
      // In a real app, you'd fetch data from your API
      const data = mockStudents;
      const summary = ReportService.calculateSummary(data, ['weight']);
      
      await ReportService.generateReport(
        config.type,
        config.format,
        data,
        {
          title: `${config.type.charAt(0).toUpperCase() + config.type.slice(1)} Report`,
          columns: ['name', 'email', 'grade', 'weight', 'experience', 'created_at'],
          summary,
          filters: config.filters,
        }
      );
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportData = (data: any[]) => {
    ReportService.generateReport('custom', 'excel', data, {
      title: 'Exported Data',
      columns: Object.keys(data[0] || {}),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wrestling-navy to-wrestling-navy/90">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-wrestling-gold mb-4">
            📊 Reports & Analytics
          </h1>
          <p className="text-xl text-white/80">
            Generate comprehensive reports and view analytics for your wrestling program
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Total Students"
            value="24"
            description="Active wrestlers"
            icon={Users}
            trend={{ value: 12, isPositive: true, label: "vs last month" }}
          />
          <DashboardCard
            title="Average Weight"
            value="142 lbs"
            description="Team average"
            icon={Target}
            trend={{ value: 3, isPositive: true, label: "vs last month" }}
          />
          <DashboardCard
            title="Win Rate"
            value="78%"
            description="This season"
            icon={Award}
            trend={{ value: 5, isPositive: true, label: "vs last season" }}
          />
          <DashboardCard
            title="Attendance"
            value="92%"
            description="This month"
            icon={Activity}
            trend={{ value: 2, isPositive: false, label: "vs last month" }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Generator */}
          <div className="lg:col-span-1">
            <ReportGenerator
              onGenerate={handleGenerateReport}
              isLoading={isGenerating}
            />
          </div>

          {/* Charts and Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weight Distribution Chart */}
            <ChartCard
              title="Weight Class Distribution"
              description="Current wrestlers by weight class"
              icon={BarChart3}
            >
              <div className="h-64">
                <SimpleBarChart 
                  data={weightClassData} 
                  color="#fbbf24"
                />
              </div>
            </ChartCard>

            {/* Performance Trends */}
            <ChartCard
              title="Performance Trends"
              description="Win rate over time"
              icon={TrendingUp}
            >
              <div className="h-64">
                <SimpleBarChart 
                  data={performanceData} 
                  color="#10b981"
                />
              </div>
            </ChartCard>
          </div>
        </div>

        {/* Data Table */}
        <div className="mt-8">
          <DataTable
            columns={studentColumns}
            data={mockStudents}
            title="Student Roster"
            description="Current wrestling team members"
            onExport={handleExportData}
            searchable={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Reports; 
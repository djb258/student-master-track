import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { Download, FileText, BarChart3, Users, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface ReportConfig {
  type: 'students' | 'attendance' | 'grades' | 'analytics' | 'custom';
  format: 'pdf' | 'excel' | 'csv';
  dateRange?: {
    start: Date;
    end: Date;
  };
  filters?: Record<string, any>;
}

interface ReportGeneratorProps {
  onGenerate: (config: ReportConfig) => Promise<void>;
  isLoading?: boolean;
}

const reportTypes = [
  { value: 'students', label: 'Student Report', icon: Users },
  { value: 'attendance', label: 'Attendance Report', icon: Calendar },
  { value: 'grades', label: 'Grade Report', icon: FileText },
  { value: 'analytics', label: 'Analytics Report', icon: BarChart3 },
  { value: 'custom', label: 'Custom Report', icon: FileText },
];

const exportFormats = [
  { value: 'pdf', label: 'PDF Document' },
  { value: 'excel', label: 'Excel Spreadsheet' },
  { value: 'csv', label: 'CSV File' },
];

export function ReportGenerator({ onGenerate, isLoading = false }: ReportGeneratorProps) {
  const [config, setConfig] = useState<ReportConfig>({
    type: 'students',
    format: 'pdf',
  });

  const handleGenerate = async () => {
    await onGenerate(config);
  };

  return (
    <Card className="bg-white border shadow-lg">
      <CardHeader>
        <CardTitle className="text-slate-800 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Report Generator
        </CardTitle>
        <CardDescription className="text-slate-600">
          Generate comprehensive reports for your student program
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Report Type Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Report Type</label>
          <Select
            value={config.type}
            onValueChange={(value) => setConfig(prev => ({ ...prev, type: value as ReportConfig['type'] }))}
          >
            <SelectTrigger className="bg-white border-slate-300 text-slate-800">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <SelectItem key={type.value} value={type.value} className="text-slate-800 hover:bg-slate-100">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {type.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Export Format */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Export Format</label>
          <Select
            value={config.format}
            onValueChange={(value) => setConfig(prev => ({ ...prev, format: value as ReportConfig['format'] }))}
          >
            <SelectTrigger className="bg-white border-slate-300 text-slate-800">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              {exportFormats.map((format) => (
                <SelectItem key={format.value} value={format.value} className="text-slate-800 hover:bg-slate-100">
                  {format.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Date Range (Optional)</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-slate-500">Start Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 text-sm"
                onChange={(e) => {
                  const start = e.target.value ? new Date(e.target.value) : undefined;
                  setConfig(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, start }
                  }));
                }}
              />
            </div>
            <div>
              <label className="text-xs text-slate-500">End Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-slate-800 text-sm"
                onChange={(e) => {
                  const end = e.target.value ? new Date(e.target.value) : undefined;
                  setConfig(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, end }
                  }));
                }}
              />
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Generating...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Generate Report
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
} 
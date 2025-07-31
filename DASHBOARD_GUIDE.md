# 🏠 Wrestling Dashboard & Reporting System

## Overview

Your wrestling management system now includes a powerful dashboard and reporting foundation that you can easily extend as you add more pages and features. This system provides:

- **📊 Beautiful Dashboards** - Professional data visualization
- **📈 Interactive Charts** - Real-time analytics and trends
- **📋 Data Tables** - Sortable, searchable, and exportable data
- **📄 Report Generation** - PDF, Excel, and CSV exports
- **🎨 Consistent Design** - Wrestling-themed styling throughout

## 🚀 Quick Start

### 1. Dashboard Components

The system includes reusable dashboard components:

```tsx
// Dashboard Card - Display key metrics
<DashboardCard
  title="Total Students"
  value="24"
  description="Active wrestlers"
  icon={Users}
  trend={{ value: 12, isPositive: true, label: "vs last month" }}
/>

// Chart Card - Display visualizations
<ChartCard
  title="Weight Class Distribution"
  description="Current wrestlers by weight class"
  icon={BarChart3}
>
  <SimpleBarChart data={weightClassData} />
</ChartCard>

// Data Table - Display and export data
<DataTable
  columns={studentColumns}
  data={students}
  title="Student Roster"
  onExport={handleExportData}
  searchable={true}
/>
```

### 2. Report Generation

Generate professional reports in multiple formats:

```tsx
// Report Generator Component
<ReportGenerator
  onGenerate={handleGenerateReport}
  isLoading={isGenerating}
/>

// Report Service
await ReportService.generateReport(
  'students',    // Report type
  'pdf',         // Format (pdf, excel, csv)
  data,          // Your data
  {
    title: 'Student Report',
    columns: ['name', 'email', 'grade'],
    summary: calculatedSummary
  }
);
```

## 📁 File Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── DashboardCard.tsx      # Metric cards
│   │   └── ChartCard.tsx          # Chart containers
│   ├── charts/
│   │   └── SimpleBarChart.tsx     # Recharts integration
│   ├── reports/
│   │   └── ReportGenerator.tsx    # Report creation UI
│   └── tables/
│       └── DataTable.tsx          # Sortable data tables
├── lib/
│   ├── services/
│   │   └── reportService.ts       # Report generation logic
│   └── mockApi.ts                 # Mock data for development
└── pages/
    ├── Dashboard.tsx              # Main dashboard
    └── Reports.tsx                # Reports & analytics page
```

## 🎯 Adding New Pages

### Step 1: Create Your Page

```tsx
// src/pages/YourNewPage.tsx
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { DataTable } from '@/components/tables/DataTable';
import { ReportGenerator } from '@/components/reports/ReportGenerator';

const YourNewPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wrestling-navy to-wrestling-navy/90">
      <div className="container mx-auto px-4 py-8">
        {/* Your content here */}
        <DashboardCard title="Your Metric" value="42" />
        <DataTable columns={yourColumns} data={yourData} />
      </div>
    </div>
  );
};
```

### Step 2: Add Route

```tsx
// src/App.tsx
import YourNewPage from "./pages/YourNewPage";

// In your Routes
<Route path="/your-page" element={<YourNewPage />} />
```

### Step 3: Add to Dashboard

```tsx
// src/pages/Dashboard.tsx
const quickAccessCards = [
  // ... existing cards
  {
    title: "Your New Feature",
    description: "Description of your feature.",
    route: "/your-page"
  }
];
```

## 📊 Available Components

### DashboardCard
Display key metrics with trends and icons.

**Props:**
- `title` - Card title
- `value` - Main metric value
- `description` - Optional description
- `icon` - Lucide icon component
- `trend` - Optional trend data
- `onClick` - Optional click handler

### ChartCard
Container for charts and visualizations.

**Props:**
- `title` - Chart title
- `description` - Chart description
- `icon` - Lucide icon component
- `children` - Chart component
- `actions` - Optional action buttons

### DataTable
Sortable, searchable data table with export.

**Props:**
- `columns` - Table column definitions
- `data` - Table data
- `title` - Table title
- `onExport` - Export handler
- `searchable` - Enable search
- `filterable` - Enable filters

### ReportGenerator
Generate reports in multiple formats.

**Props:**
- `onGenerate` - Report generation handler
- `isLoading` - Loading state

## 📈 Chart Types

### SimpleBarChart
Basic bar chart using Recharts.

```tsx
<SimpleBarChart
  data={[
    { name: 'Category 1', value: 10 },
    { name: 'Category 2', value: 20 }
  ]}
  color="#fbbf24"
/>
```

### Adding New Chart Types

1. Create new chart component in `src/components/charts/`
2. Use Recharts library for visualization
3. Follow the existing pattern for consistency

## 📄 Report Types

### Available Formats
- **PDF** - Professional documents with tables
- **Excel** - Spreadsheets with multiple sheets
- **CSV** - Simple data export

### Report Types
- **Students** - Student roster and information
- **Attendance** - Attendance tracking
- **Grades** - Academic performance
- **Analytics** - Performance metrics
- **Custom** - User-defined reports

## 🎨 Styling

### Color Scheme
- **Primary**: `wrestling-navy` (#1e3a8a)
- **Accent**: `wrestling-gold` (#fbbf24)
- **Background**: Gradient from navy to navy/90
- **Cards**: White/10 with backdrop blur

### CSS Classes
```css
/* Card styling */
.bg-white/10 border-white/20 backdrop-blur-sm

/* Text colors */
.text-wrestling-gold
.text-white/70
.text-white/50

/* Hover effects */
.hover:bg-white/15 transition-all duration-300
```

## 🔧 Customization

### Adding New Metrics
1. Use `DashboardCard` component
2. Connect to your data source
3. Add trend calculations if needed

### Creating Custom Reports
1. Extend `ReportService` class
2. Add new report types
3. Implement custom formatting

### Adding New Chart Types
1. Create chart component
2. Use Recharts library
3. Follow existing patterns

## 📱 Responsive Design

All components are fully responsive:
- **Mobile**: Single column layout
- **Tablet**: Two column grid
- **Desktop**: Multi-column layouts

## 🚀 Performance

- **Lazy Loading**: Components load on demand
- **Memoization**: Charts and tables are optimized
- **Virtual Scrolling**: Large datasets handled efficiently

## 🔗 Integration

### With Your API
```tsx
// Connect to your real API
const { data, isLoading } = useQuery(['students'], fetchStudents);

// Use in components
<DashboardCard value={data?.length || 0} />
<DataTable data={data || []} />
```

### With Database
```tsx
// Use your existing database service
const students = await StudentService.getAllStudents();
const summary = ReportService.calculateSummary(students, ['weight']);
```

## 📚 Next Steps

1. **Add Real Data**: Connect to your API/database
2. **Create More Charts**: Add line charts, pie charts, etc.
3. **Custom Reports**: Build specific reports for your needs
4. **Advanced Analytics**: Add trend analysis and predictions
5. **Export Templates**: Create branded report templates

## 🆘 Troubleshooting

### Charts Not Displaying
- Check if Recharts is installed
- Verify data format matches expected structure
- Check browser console for errors

### Reports Not Generating
- Ensure all dependencies are installed
- Check file permissions for downloads
- Verify data format is correct

### Styling Issues
- Check if Tailwind classes are applied
- Verify custom CSS variables are defined
- Ensure responsive breakpoints are correct

---

**🎯 You now have a professional dashboard and reporting foundation that you can easily extend as you build your wrestling management system!** 
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';

// Extend jsPDF with autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => void;
  }
}

export interface ReportData {
  title: string;
  data: any[];
  columns: string[];
  summary?: {
    total: number;
    average?: number;
    min?: number;
    max?: number;
  };
  filters?: Record<string, any>;
  generatedAt: Date;
}

export class ReportService {
  // Generate PDF Report
  static async generatePDFReport(reportData: ReportData): Promise<void> {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text(reportData.title, 20, 20);
    
    // Generated date
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated: ${format(reportData.generatedAt, 'PPP')}`, 20, 30);
    
    // Summary
    if (reportData.summary) {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Summary', 20, 45);
      
      doc.setFontSize(10);
      doc.text(`Total Records: ${reportData.summary.total}`, 20, 55);
      if (reportData.summary.average) {
        doc.text(`Average: ${reportData.summary.average.toFixed(2)}`, 20, 65);
      }
      if (reportData.summary.min !== undefined) {
        doc.text(`Min: ${reportData.summary.min}`, 20, 75);
      }
      if (reportData.summary.max !== undefined) {
        doc.text(`Max: ${reportData.summary.max}`, 20, 85);
      }
    }
    
    // Data table
    if (reportData.data.length > 0) {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Data', 20, 105);
      
      // Create table
      const tableData = [reportData.columns, ...reportData.data.map(row => 
        reportData.columns.map(col => row[col] || '')
      )];
      
      doc.autoTable({
        head: [reportData.columns],
        body: reportData.data.map(row => 
          reportData.columns.map(col => row[col] || '')
        ),
        startY: 115,
        styles: {
          fontSize: 8,
          cellPadding: 2,
        },
        headStyles: {
          fillColor: [0, 0, 0],
          textColor: [255, 255, 255],
        },
      });
    }
    
    // Save the PDF
    const filename = `${reportData.title.replace(/\s+/g, '_')}_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.pdf`;
    doc.save(filename);
  }
  
  // Generate Excel Report
  static async generateExcelReport(reportData: ReportData): Promise<void> {
    const workbook = XLSX.utils.book_new();
    
    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(reportData.data);
    
    // Add summary sheet if summary exists
    if (reportData.summary) {
      const summaryData = [
        { Metric: 'Total Records', Value: reportData.summary.total },
        ...(reportData.summary.average ? [{ Metric: 'Average', Value: reportData.summary.average.toFixed(2) }] : []),
        ...(reportData.summary.min !== undefined ? [{ Metric: 'Minimum', Value: reportData.summary.min }] : []),
        ...(reportData.summary.max !== undefined ? [{ Metric: 'Maximum', Value: reportData.summary.max }] : []),
      ];
      
      const summarySheet = XLSX.utils.json_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');
    }
    
    // Add main data sheet
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    
    // Generate and save file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const filename = `${reportData.title.replace(/\s+/g, '_')}_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.xlsx`;
    saveAs(data, filename);
  }
  
  // Generate CSV Report
  static async generateCSVReport(reportData: ReportData): Promise<void> {
    const csvContent = [
      reportData.columns.join(','),
      ...reportData.data.map(row => 
        reportData.columns.map(col => {
          const value = row[col];
          // Escape commas and quotes in CSV
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value || '';
        }).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const filename = `${reportData.title.replace(/\s+/g, '_')}_${format(new Date(), 'yyyy-MM-dd_HH-mm')}.csv`;
    saveAs(blob, filename);
  }
  
  // Generate report based on type and format
  static async generateReport(
    type: 'students' | 'attendance' | 'grades' | 'analytics' | 'custom',
    format: 'pdf' | 'excel' | 'csv',
    data: any[],
    options?: {
      title?: string;
      columns?: string[];
      summary?: ReportData['summary'];
      filters?: Record<string, any>;
    }
  ): Promise<void> {
    const reportData: ReportData = {
      title: options?.title || `${type.charAt(0).toUpperCase() + type.slice(1)} Report`,
      data,
      columns: options?.columns || Object.keys(data[0] || {}),
      summary: options?.summary,
      filters: options?.filters,
      generatedAt: new Date(),
    };
    
    switch (format) {
      case 'pdf':
        await this.generatePDFReport(reportData);
        break;
      case 'excel':
        await this.generateExcelReport(reportData);
        break;
      case 'csv':
        await this.generateCSVReport(reportData);
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }
  
  // Helper method to calculate summary statistics
  static calculateSummary(data: any[], numericColumns: string[] = []): ReportData['summary'] {
    if (data.length === 0) return { total: 0 };
    
    const summary: ReportData['summary'] = {
      total: data.length,
    };
    
    // Calculate numeric summaries
    numericColumns.forEach(col => {
      const values = data
        .map(row => parseFloat(row[col]))
        .filter(val => !isNaN(val));
      
      if (values.length > 0) {
        summary.average = values.reduce((sum, val) => sum + val, 0) / values.length;
        summary.min = Math.min(...values);
        summary.max = Math.max(...values);
      }
    });
    
    return summary;
  }
} 
import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Search, Filter } from 'lucide-react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  description?: string;
  onExport?: (data: TData[]) => void;
  searchable?: boolean;
  filterable?: boolean;
  className?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  title,
  description,
  onExport,
  searchable = true,
  filterable = true,
  className
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  const filteredData = useMemo(() => {
    return table.getFilteredRowModel().rows.map(row => row.original);
  }, [table]);

  return (
    <Card className={`bg-white/10 border-white/20 backdrop-blur-sm ${className}`}>
      {(title || description || onExport || searchable) && (
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <CardTitle className="text-wrestling-gold">{title}</CardTitle>
              )}
              {description && (
                <p className="text-sm text-white/70 mt-1">{description}</p>
              )}
            </div>
            {onExport && (
              <Button
                onClick={() => onExport(filteredData)}
                variant="outline"
                size="sm"
                className="bg-wrestling-gold hover:bg-wrestling-gold/90 text-wrestling-navy border-wrestling-gold"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            )}
          </div>
          {searchable && (
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-white/50" />
              <Input
                placeholder="Search all columns..."
                value={globalFilter ?? ''}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="max-w-sm bg-white/5 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          )}
        </CardHeader>
      )}
      <CardContent>
        <div className="rounded-md border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left text-sm font-medium text-white/70 border-b border-white/20"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white/5">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-white/10 hover:bg-white/5 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 py-3 text-sm text-white/90"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="h-24 text-center text-white/50"
                    >
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 text-sm text-white/50">
          <div>
            Showing {table.getFilteredRowModel().rows.length} of{' '}
            {table.getPreFilteredRowModel().rows.length} results
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 
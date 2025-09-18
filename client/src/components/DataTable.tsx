import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  emptyStateMessage?: string;
  emptyStateAction?: React.ReactNode;
  className?: string;
}

type SortOrder = 'asc' | 'desc' | null;

interface SortState {
  column: string | null;
  order: SortOrder;
}

function DataTableSkeleton({ columns }: { columns: Column<any>[] }) {
  return (
    <tbody className="bg-card">
      {Array.from({ length: 3 }).map((_, rowIndex) => (
        <tr key={rowIndex} data-testid={`skeleton-row-${rowIndex}`}>
          <td className="px-4 py-4">
            <div className="w-4 h-4 bg-muted rounded animate-pulse"></div>
          </td>
          {columns.map((column) => (
            <td key={column.key} className="px-4 py-4">
              <div className="h-4 bg-muted rounded animate-pulse" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

function DataTableEmpty({ 
  message = "No data available",
  action
}: { 
  message?: string;
  action?: React.ReactNode;
}) {
  return (
    <tbody>
      <tr>
        <td colSpan={100} className="px-4 py-16 text-center bg-muted/20">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <MoreHorizontal className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{message}</h3>
              <p className="text-muted-foreground mb-6">There are no items to display at the moment.</p>
              {action}
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  emptyStateMessage,
  emptyStateAction,
  className
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortState, setSortState] = useState<SortState>({ column: null, order: null });

  // Sort data based on current sort state
  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.order) {
      return data;
    }

    return [...data].sort((a, b) => {
      const column = columns.find(col => col.key === sortState.column);
      if (!column) return 0;

      const aValue = a[column.dataIndex];
      const bValue = b[column.dataIndex];

      if (aValue < bValue) {
        return sortState.order === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortState.order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortState, columns]);

  const handleSort = (columnKey: string) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column?.sortable) return;

    setSortState(prev => {
      if (prev.column === columnKey) {
        // Cycle through: asc -> desc -> null
        const newOrder = prev.order === 'asc' ? 'desc' : prev.order === 'desc' ? null : 'asc';
        return { column: newOrder ? columnKey : null, order: newOrder };
      } else {
        return { column: columnKey, order: 'asc' };
      }
    });
  };

  const handleRowSelect = (row: T, checked: boolean) => {
    const newSelectedRows = checked 
      ? [...selectedRows, row]
      : selectedRows.filter(r => r !== row);
    
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelectedRows = checked ? [...sortedData] : [];
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  const isRowSelected = (row: T) => selectedRows.includes(row);
  const isAllSelected = sortedData.length > 0 && selectedRows.length === sortedData.length;
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < sortedData.length;

  const getSortIcon = (columnKey: string) => {
    if (sortState.column !== columnKey) {
      return <ChevronUp className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />;
    }
    
    return sortState.order === 'asc' 
      ? <ChevronUp className="h-4 w-4 text-primary" />
      : <ChevronDown className="h-4 w-4 text-primary" />;
  };

  return (
    <div className={cn("border border-border rounded-lg overflow-hidden", className)}>
      <div className="overflow-x-auto">
        <table className="w-full" data-testid="data-table">
          <thead className="bg-muted/20">
            <tr>
              {selectable && (
                <th className="w-12 px-4 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isIndeterminate;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-border text-primary focus:ring-ring"
                    data-testid="checkbox-select-all"
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-4 text-left text-sm font-medium text-foreground">
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="flex items-center space-x-1 hover:text-primary transition-colors group"
                      data-testid={`button-sort-${column.key}`}
                      aria-label={`Sort by ${column.title}`}
                    >
                      <span>{column.title}</span>
                      {getSortIcon(column.key)}
                    </button>
                  ) : (
                    <span>{column.title}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {loading ? (
            <DataTableSkeleton columns={columns} />
          ) : sortedData.length === 0 ? (
            <DataTableEmpty message={emptyStateMessage} action={emptyStateAction} />
          ) : (
            <tbody className="divide-y divide-border bg-card">
              {sortedData.map((row, index) => (
                <tr 
                  key={index}
                  className="hover:bg-muted/30 transition-colors"
                  data-testid={`row-${index}`}
                >
                  {selectable && (
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={isRowSelected(row)}
                        onChange={(e) => handleRowSelect(row, e.target.checked)}
                        className="rounded border-border text-primary focus:ring-ring"
                        data-testid={`checkbox-row-${index}`}
                        aria-label={`Select row ${index + 1}`}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td 
                      key={column.key}
                      className="px-4 py-4 text-sm text-foreground"
                      data-testid={`cell-${column.key}-${index}`}
                    >
                      {column.render 
                        ? column.render(row[column.dataIndex], row, index)
                        : String(row[column.dataIndex] || '')
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* Table Footer/Pagination could be added here */}
      {!loading && sortedData.length > 0 && (
        <div className="bg-muted/20 px-4 py-3 border-t border-border flex items-center justify-between text-sm">
          <div className="text-muted-foreground">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedData.length}</span> of <span className="font-medium">{sortedData.length}</span> results
            {selectable && selectedRows.length > 0 && (
              <span className="ml-4">
                <span className="font-medium">{selectedRows.length}</span> selected
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

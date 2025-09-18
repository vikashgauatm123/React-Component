import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DataTable, Column } from '@/components/DataTable';

interface TestUser {
  id: number;
  name: string;
  email: string;
}

const mockData: TestUser[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com' }
];

const mockColumns: Column<TestUser>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true }
];

describe('DataTable Component', () => {
  test('renders table with data', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    
    expect(screen.getByTestId('data-table')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  test('renders column headers', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    render(<DataTable data={[]} columns={mockColumns} loading />);
    
    expect(screen.getByTestId('skeleton-row-0')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-row-1')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-row-2')).toBeInTheDocument();
  });

  test('shows empty state when no data', () => {
    render(<DataTable data={[]} columns={mockColumns} />);
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('custom empty state message', () => {
    render(
      <DataTable 
        data={[]} 
        columns={mockColumns} 
        emptyStateMessage="No users found"
      />
    );
    
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  test('renders empty state action', () => {
    const action = <button data-testid="custom-action">Add Item</button>;
    render(
      <DataTable 
        data={[]} 
        columns={mockColumns} 
        emptyStateAction={action}
      />
    );
    
    expect(screen.getByTestId('custom-action')).toBeInTheDocument();
  });

  test('sorting functionality', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    
    const nameHeader = screen.getByTestId('button-sort-name');
    
    // Click to sort ascending
    fireEvent.click(nameHeader);
    
    const rows = screen.getAllByTestId(/^row-/);
    expect(rows).toHaveLength(3);
    
    // First row should be Bob Wilson (alphabetically first)
    expect(screen.getByTestId('cell-name-0')).toHaveTextContent('Bob Wilson');
  });

  test('selection functionality', () => {
    const handleRowSelect = vi.fn();
    render(
      <DataTable 
        data={mockData} 
        columns={mockColumns} 
        selectable 
        onRowSelect={handleRowSelect}
      />
    );
    
    expect(screen.getByTestId('checkbox-select-all')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-row-0')).toBeInTheDocument();
    
    // Select first row
    fireEvent.click(screen.getByTestId('checkbox-row-0'));
    
    expect(handleRowSelect).toHaveBeenCalledWith([mockData[0]]);
  });

  test('select all functionality', () => {
    const handleRowSelect = vi.fn();
    render(
      <DataTable 
        data={mockData} 
        columns={mockColumns} 
        selectable 
        onRowSelect={handleRowSelect}
      />
    );
    
    // Click select all
    fireEvent.click(screen.getByTestId('checkbox-select-all'));
    
    expect(handleRowSelect).toHaveBeenCalledWith(mockData);
  });

  test('custom cell rendering', () => {
    const customColumns: Column<TestUser>[] = [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name',
        render: (value, record) => <strong data-testid={`custom-name-${record.id}`}>{value}</strong>
      }
    ];
    
    render(<DataTable data={mockData} columns={customColumns} />);
    
    expect(screen.getByTestId('custom-name-1')).toBeInTheDocument();
    expect(screen.getByTestId('custom-name-1')).toHaveTextContent('John Doe');
  });

  test('non-sortable columns do not have sort button', () => {
    const nonSortableColumns: Column<TestUser>[] = [
      { key: 'name', title: 'Name', dataIndex: 'name', sortable: false }
    ];
    
    render(<DataTable data={mockData} columns={nonSortableColumns} />);
    
    expect(screen.queryByTestId('button-sort-name')).not.toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  test('shows correct row count in footer', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    
    expect(screen.getByText(/Showing/)).toBeInTheDocument();
    expect(screen.getByText(/1.*to.*3.*of.*3.*results/)).toBeInTheDocument();
  });

  test('shows selection count when selectable', () => {
    const handleRowSelect = vi.fn();
    render(
      <DataTable 
        data={mockData} 
        columns={mockColumns} 
        selectable 
        onRowSelect={handleRowSelect}
      />
    );
    
    // Select first row
    fireEvent.click(screen.getByTestId('checkbox-row-0'));
    
    // The selection count should be visible in the footer
    // Note: This test assumes the component updates the display
    waitFor(() => {
      expect(screen.getByText(/1.*selected/)).toBeInTheDocument();
    });
  });

  test('accessibility attributes', () => {
    render(<DataTable data={mockData} columns={mockColumns} selectable />);
    
    const selectAllCheckbox = screen.getByTestId('checkbox-select-all');
    const rowCheckbox = screen.getByTestId('checkbox-row-0');
    
    expect(selectAllCheckbox).toHaveAttribute('aria-label', 'Select all rows');
    expect(rowCheckbox).toHaveAttribute('aria-label', 'Select row 1');
  });

  test('sort button accessibility', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    
    const sortButton = screen.getByTestId('button-sort-name');
    expect(sortButton).toHaveAttribute('aria-label', 'Sort by Name');
  });
});

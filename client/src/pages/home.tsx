import React, { useState } from 'react';
import { InputField } from '@/components/InputField';
import { DataTable, Column } from '@/components/DataTable';
import { Box, Github, Book, Edit, Table, Shield, AccessibilityIcon, Smartphone, FlaskConical } from 'lucide-react';

// Sample data types
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  status: 'active' | 'pending' | 'inactive';
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active'
  },
  {
    id: 2,
    name: 'Jane Smith', 
    username: 'janesmith',
    email: 'jane@example.com',
    role: 'Editor',
    status: 'active'
  },
  {
    id: 3,
    name: 'Mike Wilson',
    username: 'mikewilson', 
    email: 'mike@example.com',
    role: 'Viewer',
    status: 'pending'
  }
];

function StatusBadge({ status }: { status: User['status'] }) {
  const statusConfig = {
    active: { color: 'bg-green-100 text-green-800', dot: 'bg-green-500', label: 'Active' },
    pending: { color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500', label: 'Pending' },
    inactive: { color: 'bg-gray-100 text-gray-800', dot: 'bg-gray-500', label: 'Inactive' }
  };

  const config = statusConfig[status];
  
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center w-fit ${config.color}`}>
      <div className={`w-2 h-2 rounded-full mr-2 ${config.dot}`}></div>
      {config.label}
    </span>
  );
}

function RoleBadge({ role }: { role: string }) {
  const roleConfig: Record<string, string> = {
    'Admin': 'px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full',
    'Editor': 'px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full',
    'Viewer': 'px-2 py-1 text-xs font-medium bg-secondary/50 text-secondary-foreground rounded-full'
  };

  return (
    <span className={roleConfig[role] || roleConfig['Viewer']}>
      {role}
    </span>
  );
}

function UserAvatar({ name }: { name: string }) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  const colors = ['bg-primary', 'bg-secondary', 'bg-muted'];
  const colorIndex = name.length % colors.length;
  
  return (
    <div className={`w-8 h-8 ${colors[colorIndex]} rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium`}>
      {initials}
    </div>
  );
}

export default function Home() {
  // InputField demo states
  const [basicValue, setBasicValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [ghostValue, setGhostValue] = useState('');
  const [loadingValue, setLoadingValue] = useState('');
  
  // DataTable demo states
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(false);

  // Define table columns
  const userColumns: Column<User>[] = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      sortable: true,
      render: (value, record) => (
        <div className="flex items-center space-x-3">
          <UserAvatar name={record.name} />
          <div>
            <div className="text-sm font-medium text-foreground">{record.name}</div>
            <div className="text-xs text-muted-foreground">@{record.username}</div>
          </div>
        </div>
      )
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      sortable: true
    },
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
      render: (value) => <RoleBadge role={value} />
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (value) => <StatusBadge status={value} />
    },
    {
      key: 'actions',
      title: 'Actions',
      dataIndex: 'id',
      render: (value) => (
        <div className="flex items-center space-x-2">
          <button 
            className="p-1.5 hover:bg-muted rounded-md transition-colors"
            data-testid={`button-edit-${value}`}
            aria-label="Edit user"
          >
            <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </button>
          <button 
            className="p-1.5 hover:bg-muted rounded-md transition-colors"
            data-testid={`button-delete-${value}`}
            aria-label="Delete user"
          >
            <Table className="h-4 w-4 text-muted-foreground hover:text-destructive" />
          </button>
        </div>
      )
    }
  ];

  const displayData = showEmptyState ? [] : sampleUsers;

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Box className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Component Library</h1>
                <p className="text-sm text-muted-foreground">React · TypeScript · TailwindCSS</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                data-testid="button-github"
              >
                <Github className="h-4 w-4 mr-2 inline" />
                GitHub
              </button>
              <button 
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                data-testid="button-storybook"
              >
                <Book className="h-4 w-4 mr-2 inline" />
                Storybook
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <nav className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-8">
              <h2 className="font-semibold mb-4">Components</h2>
              <ul className="space-y-2">
                <li>
                  <a href="#inputfield" className="block px-3 py-2 rounded-md bg-primary/10 text-primary font-medium">
                    <Edit className="h-4 w-4 mr-2 inline" />
                    InputField
                  </a>
                </li>
                <li>
                  <a href="#datatable" className="block px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                    <Table className="h-4 w-4 mr-2 inline" />
                    DataTable
                  </a>
                </li>
              </ul>
              
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#installation" className="text-muted-foreground hover:text-foreground">Installation</a></li>
                  <li><a href="#usage" className="text-muted-foreground hover:text-foreground">Usage</a></li>
                  <li><a href="#testing" className="text-muted-foreground hover:text-foreground">Testing</a></li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-12">
            {/* InputField Section */}
            <section id="inputfield" className="space-y-8">
              <div className="bg-card rounded-lg border border-border p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Edit className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">InputField Component</h2>
                    <p className="text-muted-foreground">Flexible input component with validation states and multiple variants</p>
                  </div>
                </div>

                {/* Live Demo */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Interactive Demo</h3>
                  <div className="bg-muted/50 rounded-lg p-6 border border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Filled Variant */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Filled Variant</h4>
                        
                        <InputField
                          label="Small Size"
                          value={basicValue}
                          onChange={(e) => setBasicValue(e.target.value)}
                          placeholder="Enter your name"
                          size="sm"
                          variant="filled"
                          helperText="This is helper text"
                          data-testid="demo-input-small"
                        />
                        
                        <InputField
                          label="Medium Size"
                          value={emailValue}
                          onChange={(e) => setEmailValue(e.target.value)}
                          placeholder="Enter your email"
                          size="md"
                          variant="filled"
                          type="email"
                          data-testid="demo-input-medium"
                        />
                        
                        <InputField
                          label="Large Size (Error State)"
                          value={passwordValue}
                          onChange={(e) => setPasswordValue(e.target.value)}
                          placeholder="Enter password"
                          size="lg"
                          variant="filled"
                          type="password"
                          showPasswordToggle
                          invalid={passwordValue.length > 0 && passwordValue.length < 8}
                          errorMessage={passwordValue.length > 0 && passwordValue.length < 8 ? "Password must be at least 8 characters" : undefined}
                          data-testid="demo-input-large-error"
                        />
                      </div>
                      
                      {/* Outlined & Ghost Variants */}
                      <div className="space-y-4">
                        <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Outlined & Ghost</h4>
                        
                        <InputField
                          label="Outlined Variant"
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                          placeholder="Search..."
                          variant="outlined"
                          showClearButton
                          data-testid="demo-input-outlined"
                        />
                        
                        <InputField
                          label="Ghost Variant"
                          value={ghostValue}
                          onChange={(e) => setGhostValue(e.target.value)}
                          placeholder="Type something..."
                          variant="ghost"
                          data-testid="demo-input-ghost"
                        />
                        
                        <InputField
                          label="Disabled State"
                          value="Disabled input"
                          placeholder="Disabled input"
                          disabled
                          data-testid="demo-input-disabled"
                        />
                        
                        <InputField
                          label="Loading State"
                          value={loadingValue}
                          onChange={(e) => setLoadingValue(e.target.value)}
                          placeholder="Loading..."
                          loading
                          data-testid="demo-input-loading"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Props Table */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Props</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-border rounded-lg">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border">Prop</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border">Type</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border">Default</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr>
                          <td className="px-4 py-3 text-sm font-mono text-accent">value</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">string</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">undefined</td>
                          <td className="px-4 py-3 text-sm text-foreground">The input value</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-mono text-accent">onChange</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">function</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">undefined</td>
                          <td className="px-4 py-3 text-sm text-foreground">Callback fired when value changes</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-mono text-accent">variant</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">'filled' | 'outlined' | 'ghost'</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">'filled'</td>
                          <td className="px-4 py-3 text-sm text-foreground">Input visual style variant</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-mono text-accent">size</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">'sm' | 'md' | 'lg'</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">'md'</td>
                          <td className="px-4 py-3 text-sm text-foreground">Input size</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-mono text-accent">disabled</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">boolean</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">false</td>
                          <td className="px-4 py-3 text-sm text-foreground">Whether the input is disabled</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-mono text-accent">invalid</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">boolean</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">false</td>
                          <td className="px-4 py-3 text-sm text-foreground">Whether the input is in error state</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* DataTable Section */}
            <section id="datatable" className="space-y-8">
              <div className="bg-card rounded-lg border border-border p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Table className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">DataTable Component</h2>
                    <p className="text-muted-foreground">Advanced data table with sorting, selection, and loading states</p>
                  </div>
                </div>

                {/* Live Demo */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Interactive Demo</h3>
                  
                  {/* Controls */}
                  <div className="flex items-center justify-between mb-4 p-4 bg-muted/30 rounded-lg border border-border">
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          checked={isTableLoading}
                          onChange={(e) => setIsTableLoading(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-ring"
                          data-testid="checkbox-loading-state"
                        />
                        <span className="text-sm">Show Loading State</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          checked={showEmptyState}
                          onChange={(e) => setShowEmptyState(e.target.checked)}
                          className="rounded border-border text-primary focus:ring-ring"
                          data-testid="checkbox-empty-state"
                        />
                        <span className="text-sm">Show Empty State</span>
                      </label>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span data-testid="text-selected-count">{selectedUsers.length}</span> of <span data-testid="text-total-count">{displayData.length}</span> selected
                    </div>
                  </div>

                  {/* DataTable */}
                  <DataTable
                    data={displayData}
                    columns={userColumns}
                    loading={isTableLoading}
                    selectable={true}
                    onRowSelect={setSelectedUsers}
                    emptyStateMessage="No users found"
                    emptyStateAction={
                      <button 
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        onClick={() => setShowEmptyState(false)}
                        data-testid="button-add-user"
                      >
                        Add User
                      </button>
                    }
                  />
                </div>

                {/* Props Table */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Props</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-border rounded-lg">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border">Prop</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border">Type</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border">Default</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground border-b border-border">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr>
                          <td className="px-4 py-3 text-sm font-mono text-accent">data</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">T[]</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">required</td>
                          <td className="px-4 py-3 text-sm text-foreground">Array of data objects to display</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-mono text-accent">columns</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">Column&lt;T&gt;[]</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">required</td>
                          <td className="px-4 py-3 text-sm text-foreground">Column definitions</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-mono text-accent">loading</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">boolean</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">false</td>
                          <td className="px-4 py-3 text-sm text-foreground">Show loading state</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-mono text-accent">selectable</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">boolean</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">false</td>
                          <td className="px-4 py-3 text-sm text-foreground">Enable row selection</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-mono text-accent">onRowSelect</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">function</td>
                          <td className="px-4 py-3 text-sm font-mono text-muted-foreground">undefined</td>
                          <td className="px-4 py-3 text-sm text-foreground">Callback when selection changes</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Overview */}
            <section id="features" className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-border p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Component Features</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Both components are built with modern React patterns, full TypeScript support, and comprehensive accessibility features.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">TypeScript</h3>
                  <p className="text-sm text-muted-foreground">Full type safety with comprehensive interfaces</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <AccessibilityIcon className="text-accent h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Accessible</h3>
                  <p className="text-sm text-muted-foreground">ARIA labels and keyboard navigation support</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-secondary/50 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Smartphone className="text-secondary-foreground h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Responsive</h3>
                  <p className="text-sm text-muted-foreground">Mobile-first design with flexible layouts</p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FlaskConical className="text-muted-foreground h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Tested</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive test coverage and documentation</p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

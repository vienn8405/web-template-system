import React, { useState } from 'react';

/**
 * Table Component
 *
 * A flexible data table with sorting, selection, and pagination
 * Perfect for displaying tabular data
 *
 * @example
 * <Table
 *   columns={[
 *     { key: 'name', label: 'Name' },
 *     { key: 'email', label: 'Email' }
 *   ]}
 *   data={users}
 * />
 */

export function Table({
  columns = [],
  data = [],
  sortable = false,
  selectable = false,
  onRowClick,
  onSelectionChange,
  className = '',
}) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState([]);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Handle sort
  const handleSort = (key) => {
    if (!sortable) return;

    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Handle row selection
  const handleRowSelect = (index) => {
    const newSelection = selectedRows.includes(index)
      ? selectedRows.filter(i => i !== index)
      : [...selectedRows, index];

    setSelectedRows(newSelection);
    onSelectionChange?.(newSelection.map(i => data[i]));
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
      onSelectionChange?.([]);
    } else {
      const allIndices = data.map((_, i) => i);
      setSelectedRows(allIndices);
      onSelectionChange?.(data);
    }
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-neutral-200">
        {/* Header */}
        <thead className="bg-neutral-50">
          <tr>
            {selectable && (
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.length === data.length && data.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                />
              </th>
            )}

            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => column.sortable !== false && handleSort(column.key)}
                className={`
                  px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider
                  ${sortable && column.sortable !== false ? 'cursor-pointer hover:bg-neutral-100' : ''}
                `}
              >
                <div className="flex items-center gap-2">
                  {column.label}
                  {sortable && column.sortable !== false && (
                    <span className="text-neutral-400">
                      {sortConfig.key === column.key ? (
                        sortConfig.direction === 'asc' ? '↑' : '↓'
                      ) : (
                        '↕'
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="bg-white divide-y divide-neutral-200">
          {sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="px-6 py-8 text-center text-neutral-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className={`
                  ${onRowClick ? 'cursor-pointer hover:bg-neutral-50' : ''}
                  ${selectedRows.includes(rowIndex) ? 'bg-primary-50' : ''}
                `}
              >
                {selectable && (
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(rowIndex)}
                      onChange={() => handleRowSelect(rowIndex)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                    />
                  </td>
                )}

                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Simple Table (Basic styling)
 */
export function SimpleTable({ children, className = '' }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-neutral-200">
        {children}
      </table>
    </div>
  );
}

// Usage Examples:

/*
// Basic Table
<Table
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' }
  ]}
  data={[
    { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
  ]}
/>

// Sortable Table
<Table
  sortable
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'email', label: 'Email' }
  ]}
  data={users}
/>

// Selectable Table
<Table
  selectable
  onSelectionChange={(selected) => console.log('Selected:', selected)}
  columns={columns}
  data={data}
/>

// With Custom Render
<Table
  columns={[
    { key: 'name', label: 'Name' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <button onClick={() => handleEdit(row)}>Edit</button>
      )
    }
  ]}
  data={data}
/>

// Clickable Rows
<Table
  columns={columns}
  data={data}
  onRowClick={(row) => navigate(`/users/${row.id}`)}
/>

// Complete Example with All Features
const [users, setUsers] = useState([...]);

<Table
  sortable
  selectable
  columns={[
    {
      key: 'avatar',
      label: 'Avatar',
      sortable: false,
      render: (value, row) => (
        <img src={value} alt={row.name} className="w-10 h-10 rounded-full" />
      )
    },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'role',
      label: 'Role',
      render: (value) => (
        <Badge variant={value === 'admin' ? 'primary' : 'neutral'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <StatusBadge status={value} />
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div className="flex gap-2">
          <button onClick={() => handleEdit(row)}>Edit</button>
          <button onClick={() => handleDelete(row)}>Delete</button>
        </div>
      )
    }
  ]}
  data={users}
  onSelectionChange={(selected) => setSelectedUsers(selected)}
  onRowClick={(row) => console.log('Row clicked:', row)}
/>

// Simple Table (Manual)
<SimpleTable>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>john@example.com</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td>Jane Smith</td>
      <td>jane@example.com</td>
      <td>User</td>
    </tr>
  </tbody>
</SimpleTable>

// Responsive Table (Mobile)
<div className="hidden md:block">
  <Table columns={columns} data={data} />
</div>
<div className="md:hidden">
  {data.map(item => (
    <div key={item.id} className="border rounded-lg p-4 mb-4">
      <h3 className="font-semibold">{item.name}</h3>
      <p className="text-sm text-neutral-600">{item.email}</p>
      <Badge>{item.role}</Badge>
    </div>
  ))}
</div>
*/

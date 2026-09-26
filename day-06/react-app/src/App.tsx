import { useMemo, useState } from 'react';
import { DashboardStats } from './components/DashboardStats';
import { EmployeeDetails } from './components/EmployeeDetails';
import { EmployeeForm } from './components/EmployeeForm';
import { EmployeeTable } from './components/EmployeeTable';
import { SearchBar } from './components/SearchBar';
import { useEmployeeData } from './hooks/useEmployeeData';
import type { Employee, EmployeeFormData } from './types/Employee';

const defaultSort = 'name-asc';

function App() {
  const { employees, loading, error, saveEmployees } = useEmployeeData();
  const [searchText, setSearchText] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [sortValue, setSortValue] = useState(defaultSort);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  const departments = useMemo(
    () => Array.from(new Set(employees.map((employee) => employee.department))).sort(),
    [employees],
  );

  const filteredEmployees = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    const filtered = employees.filter((employee) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        employee.name.toLowerCase().includes(normalizedSearch) ||
        employee.email.toLowerCase().includes(normalizedSearch);

      const matchesDepartment =
        departmentFilter === 'All' || employee.department === departmentFilter;

      return matchesSearch && matchesDepartment;
    });

    return filtered.sort((a, b) => {
      switch (sortValue) {
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'salary-asc':
          return a.salary - b.salary;
        case 'salary-desc':
          return b.salary - a.salary;
        case 'name-asc':
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [employees, departmentFilter, searchText, sortValue]);

  const handleAddEmployee = (employee: EmployeeFormData | Employee) => {
    const newEmployee: Employee = 'id' in employee
      ? employee
      : {
          id: Date.now(),
          ...employee,
        };

    if (employeeToEdit) {
      const updatedEmployees = employees.map((entry) =>
        entry.id === employeeToEdit.id ? { ...entry, ...newEmployee } : entry,
      );

      saveEmployees(updatedEmployees);
      setEmployeeToEdit(null);
      return;
    }

    saveEmployees([newEmployee, ...employees]);
    setEmployeeToEdit(null);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEmployeeToEdit(employee);
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = (employee: Employee) => {
    const confirmed = window.confirm(`Delete ${employee.name}?`);

    if (!confirmed) {
      return;
    }

    const nextEmployees = employees.filter((entry) => entry.id !== employee.id);
    saveEmployees(nextEmployees);

    if (employeeToEdit?.id === employee.id) {
      setEmployeeToEdit(null);
    }

    if (selectedEmployee?.id === employee.id) {
      setSelectedEmployee(null);
    }
  };

  const resetForm = () => {
    setEmployeeToEdit(null);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Employee Management</p>
          <h1>Dashboard</h1>
        </div>
        <button
          type="button"
          className="btn primary-btn"
          onClick={() => {
            setEmployeeToEdit(null);
            setSelectedEmployee(null);
          }}
        >
          Add Employee
        </button>
      </header>

      <DashboardStats employees={employees} />

      <SearchBar
        searchText={searchText}
        department={departmentFilter}
        onSearchChange={setSearchText}
        onDepartmentChange={setDepartmentFilter}
        onSortChange={setSortValue}
        sortValue={sortValue}
        departments={departments}
      />

      {loading ? (
        <div className="status-box">Loading employees...</div>
      ) : error ? (
        <div className="status-box error-box">{error}</div>
      ) : (
        <>
          <EmployeeTable
            employees={filteredEmployees}
            onDetails={setSelectedEmployee}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
          />

          <EmployeeDetails employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />

          <EmployeeForm
            employeeToEdit={employeeToEdit}
            onSave={handleAddEmployee}
            onCancel={resetForm}
          />
        </>
      )}
    </div>
  );
}

export default App;

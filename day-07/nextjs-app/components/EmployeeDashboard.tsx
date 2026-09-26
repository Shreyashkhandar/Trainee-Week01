'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { deleteEmployee } from '../services/employeeService';
import type { Employee } from '../types/employee';
import { DashboardStats } from './DashboardStats';
import { EmployeeTable } from './EmployeeTable';

export function EmployeeDashboard({ employees: initialEmployees }: { employees: Employee[] }) {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [sort, setSort] = useState('name-asc');
  const [message, setMessage] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const departments = [...new Set(employees.map((employee) => employee.department))].sort();
  const visibleEmployees = useMemo(() => employees.filter((employee) => (department === 'All' || employee.department === department) && `${employee.name} ${employee.email}`.toLowerCase().includes(search.toLowerCase())).sort((first, second) => { const [key, direction] = sort.split('-'); const result = key === 'salary' ? first.salary - second.salary : first.name.localeCompare(second.name); return direction === 'desc' ? -result : result; }), [employees, search, department, sort]);
  async function handleDelete(id: number) { if (!window.confirm('Delete this employee?')) return; setDeletingId(id); setMessage(''); try { await deleteEmployee(id); setEmployees((current) => current.filter((employee) => employee.id !== id)); setMessage('Employee deleted successfully.'); } catch (error) { setMessage(error instanceof Error ? error.message : 'Delete failed.'); } finally { setDeletingId(null); } }
  return <main className="page-shell"><header className="topbar"><div><p className="eyebrow">Day 7 / Employee Management</p><h1>People directory</h1><p className="intro">A Next.js dashboard connected to a separate Express API.</p></div><Link className="button primary" href="/employees/create">+ Add employee</Link></header><DashboardStats employees={employees} /><section className="toolbar"><input aria-label="Search employees" placeholder="Search by name or email" value={search} onChange={(event) => setSearch(event.target.value)} /><select aria-label="Filter by department" value={department} onChange={(event) => setDepartment(event.target.value)}><option>All</option>{departments.map((item) => <option key={item}>{item}</option>)}</select><select aria-label="Sort employees" value={sort} onChange={(event) => setSort(event.target.value)}><option value="name-asc">Name: A-Z</option><option value="name-desc">Name: Z-A</option><option value="salary-asc">Salary: Low to high</option><option value="salary-desc">Salary: High to low</option></select></section>{message && <p className="message" role="status">{message}</p>}<EmployeeTable employees={visibleEmployees} onDelete={handleDelete} deletingId={deletingId} /></main>;
}

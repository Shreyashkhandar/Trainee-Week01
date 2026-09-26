import type { Employee } from '../types/employee';

export function DashboardStats({ employees }: { employees: Employee[] }) {
  const average = employees.length ? Math.round(employees.reduce((sum, employee) => sum + employee.salary, 0) / employees.length) : 0;
  const stats = [['Total employees', employees.length.toString()], ['Average salary', `₹${average.toLocaleString('en-IN')}`], ['Departments', new Set(employees.map((employee) => employee.department)).size.toString()]];
  return <section className="stats">{stats.map(([label, value]) => <div className="stat-card" key={label}><span>{label}</span><strong>{value}</strong></div>)}</section>;
}

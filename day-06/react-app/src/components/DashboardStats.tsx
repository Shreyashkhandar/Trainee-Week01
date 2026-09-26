import type { Employee } from '../types/Employee';

type DashboardStatsProps = {
  employees: Employee[];
};

export function DashboardStats({ employees }: DashboardStatsProps) {
  const totalEmployees = employees.length;
  const averageSalary = totalEmployees
    ? Math.round(
        employees.reduce((sum, employee) => sum + employee.salary, 0) / totalEmployees,
      )
    : 0;

  const departmentCount = new Set(employees.map((employee) => employee.department)).size;

  return (
    <section className="stats-grid">
      <div className="stat-card">
        <span>Total Employees</span>
        <strong>{totalEmployees}</strong>
      </div>
      <div className="stat-card">
        <span>Average Salary</span>
        <strong>₹{averageSalary.toLocaleString()}</strong>
      </div>
      <div className="stat-card">
        <span>Departments</span>
        <strong>{departmentCount}</strong>
      </div>
    </section>
  );
}

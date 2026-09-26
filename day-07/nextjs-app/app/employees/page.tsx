import { EmployeeDashboard } from '../../components/EmployeeDashboard';
import { getEmployees } from '../../services/employeeService';

export const dynamic = 'force-dynamic';

export default async function EmployeesPage() { const employees = await getEmployees(); return <EmployeeDashboard employees={employees} />; }

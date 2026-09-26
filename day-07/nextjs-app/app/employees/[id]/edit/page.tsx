import { notFound } from 'next/navigation';
import { EmployeeForm } from '../../../../components/EmployeeForm';
import { getEmployee } from '../../../../services/employeeService';

export const dynamic = 'force-dynamic';

export default async function EditEmployeePage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; let employee; try { employee = await getEmployee(Number(id)); } catch { notFound(); } return <EmployeeForm employee={employee} />; }

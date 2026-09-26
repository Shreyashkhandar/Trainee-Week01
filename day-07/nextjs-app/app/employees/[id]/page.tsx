import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEmployee } from '../../../services/employeeService';

export const dynamic = 'force-dynamic';

export default async function EmployeeDetailsPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const employeeId = Number(id); if (!Number.isInteger(employeeId)) notFound(); let employee; try { employee = await getEmployee(employeeId); } catch { notFound(); } return <main className="page-shell narrow"><Link className="back-link" href="/employees">← Back to employees</Link><section className="panel"><div className="detail-heading"><div><p className="eyebrow">Employee details</p><h1>{employee.name}</h1></div><Link className="button edit" href={`/employees/${employee.id}/edit`}>Edit</Link></div><dl className="details-grid">{[['Email', employee.email], ['Department', employee.department], ['Position', employee.position], ['Salary', `₹${employee.salary.toLocaleString('en-IN')}`], ['Location', employee.location]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section></main>; }

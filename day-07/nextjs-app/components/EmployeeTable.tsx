import Link from 'next/link';
import type { Employee } from '../types/employee';

type Props = { employees: Employee[]; onDelete: (id: number) => void; deletingId: number | null };

export function EmployeeTable({ employees, onDelete, deletingId }: Props) {
  if (!employees.length) return <div className="empty-state">No employees match the current search or filter.</div>;
  return <div className="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Department</th><th>Position</th><th>Salary</th><th>Location</th><th>Actions</th></tr></thead><tbody>{employees.map((employee) => <tr key={employee.id}><td><Link className="name-link" href={`/employees/${employee.id}`}>{employee.name}</Link></td><td>{employee.email}</td><td>{employee.department}</td><td>{employee.position}</td><td>₹{employee.salary.toLocaleString('en-IN')}</td><td>{employee.location}</td><td><div className="action-group"><Link className="button small" href={`/employees/${employee.id}`}>Details</Link><Link className="button small edit" href={`/employees/${employee.id}/edit`}>Edit</Link><button className="button small danger" disabled={deletingId === employee.id} onClick={() => onDelete(employee.id)}>{deletingId === employee.id ? 'Deleting...' : 'Delete'}</button></div></td></tr>)}</tbody></table></div>;
}

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createEmployee, updateEmployee } from '../services/employeeService';
import type { Employee, EmployeeInput } from '../types/employee';

const emptyEmployee: EmployeeInput = { name: '', email: '', department: '', position: '', salary: 0, location: '' };

export function EmployeeForm({ employee }: { employee?: Employee }) {
  const router = useRouter();
  const [form, setForm] = useState<EmployeeInput>(employee ? { name: employee.name, email: employee.email, department: employee.department, position: employee.position, salary: employee.salary, location: employee.location } : emptyEmployee);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  function change(field: keyof EmployeeInput, value: string) { setForm((current) => ({ ...current, [field]: field === 'salary' ? Number(value) : value })); }
  async function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setError(''); setSaving(true); try { if (employee) await updateEmployee(employee.id, form); else await createEmployee(form); router.push('/employees'); router.refresh(); } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'Could not save employee.'); } finally { setSaving(false); } }
  return <main className="page-shell narrow"><Link className="back-link" href="/employees">← Back to employees</Link><section className="panel"><p className="eyebrow">Employee record</p><h1>{employee ? 'Edit employee' : 'Add employee'}</h1><form className="form-grid" onSubmit={submit}>{(['name', 'email', 'department', 'position', 'salary', 'location'] as const).map((field) => <label key={field}>{field[0].toUpperCase() + field.slice(1)}<input required type={field === 'email' ? 'email' : field === 'salary' ? 'number' : 'text'} min={field === 'salary' ? '1' : undefined} value={form[field] || ''} onChange={(event) => change(field, event.target.value)} /></label>)}{error && <p className="form-error" role="alert">{error}</p>}<div className="form-actions"><button className="button primary" disabled={saving}>{saving ? 'Saving...' : employee ? 'Save changes' : 'Create employee'}</button><Link className="button" href="/employees">Cancel</Link></div></form></section></main>;
}

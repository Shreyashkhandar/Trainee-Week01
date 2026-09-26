import type { Employee, EmployeeInput } from '../types/employee';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

type ApiResponse<T> = { success: boolean; data?: T; message?: string };

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response;
  try { response = await fetch(`${apiUrl}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...options?.headers }, cache: 'no-store' }); }
  catch { throw new Error('The employee API is unavailable. Start the backend and try again.'); }
  const body = await response.json() as ApiResponse<T>;
  if (!response.ok || !body.success || body.data === undefined) throw new Error(body.message || 'The API request failed.');
  return body.data;
}

export function getEmployees(): Promise<Employee[]> { return request<Employee[]>('/employees'); }
export function getEmployee(id: number): Promise<Employee> { return request<Employee>(`/employees/${id}`); }
export function createEmployee(input: EmployeeInput): Promise<Employee> { return request<Employee>('/employees', { method: 'POST', body: JSON.stringify(input) }); }
export function updateEmployee(id: number, input: EmployeeInput): Promise<Employee> { return request<Employee>(`/employees/${id}`, { method: 'PUT', body: JSON.stringify(input) }); }
export async function deleteEmployee(id: number): Promise<void> { await request<unknown>(`/employees/${id}`, { method: 'DELETE' }); }

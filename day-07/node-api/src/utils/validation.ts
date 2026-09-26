import type { EmployeeInput } from '../models/employee.js';

export function validateEmployeeInput(value: unknown): string[] {
  if (!value || typeof value !== 'object') return ['Request body must be an object.'];
  const input = value as Partial<EmployeeInput>;
  const errors: string[] = [];
  for (const field of ['name', 'email', 'department', 'position', 'location'] as const) {
    if (typeof input[field] !== 'string' || !input[field]?.trim()) errors.push(`${field} is required.`);
  }
  if (typeof input.email === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) errors.push('email must be valid.');
  if (typeof input.salary !== 'number' || !Number.isFinite(input.salary) || input.salary <= 0) errors.push('salary must be a positive number.');
  return errors;
}

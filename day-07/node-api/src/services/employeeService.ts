import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Employee, EmployeeInput } from '../models/employee.js';
import { HttpError } from '../utils/httpError.js';

const dataPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../data/employees.json');

async function readEmployees(): Promise<Employee[]> {
  return JSON.parse(await fs.readFile(dataPath, 'utf8')) as Employee[];
}

async function writeEmployees(employees: Employee[]): Promise<void> {
  await fs.writeFile(dataPath, `${JSON.stringify(employees, null, 2)}\n`);
}

export async function getEmployees(): Promise<Employee[]> { return readEmployees(); }

export async function getEmployeeById(id: number): Promise<Employee> {
  const employee = (await readEmployees()).find((item) => item.id === id);
  if (!employee) throw new HttpError(404, 'Employee not found.');
  return employee;
}

export async function createEmployee(input: EmployeeInput): Promise<Employee> {
  const employees = await readEmployees();
  const employee = { id: employees.length ? Math.max(...employees.map((item) => item.id)) + 1 : 1, ...input };
  employees.push(employee);
  await writeEmployees(employees);
  return employee;
}

export async function updateEmployee(id: number, input: EmployeeInput): Promise<Employee> {
  const employees = await readEmployees();
  const index = employees.findIndex((item) => item.id === id);
  if (index === -1) throw new HttpError(404, 'Employee not found.');
  employees[index] = { id, ...input };
  await writeEmployees(employees);
  return employees[index];
}

export async function deleteEmployee(id: number): Promise<void> {
  const employees = await readEmployees();
  if (!employees.some((item) => item.id === id)) throw new HttpError(404, 'Employee not found.');
  await writeEmployees(employees.filter((item) => item.id !== id));
}

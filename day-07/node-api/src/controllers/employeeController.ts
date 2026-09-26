import type { RequestHandler } from 'express';
import * as employeeService from '../services/employeeService.js';
import { validateEmployeeInput } from '../utils/validation.js';
import type { EmployeeInput } from '../models/employee.js';

function parseId(value: string): number {
  const id = Number(value);
  if (!Number.isInteger(id) || id < 1) throw Object.assign(new Error('Employee ID must be a positive integer.'), { statusCode: 400 });
  return id;
}

function routeId(value: string | string[]): string {
  return Array.isArray(value) ? value[0] : value;
}

export const getEmployees: RequestHandler = async (_request, response, next) => { try { response.json({ success: true, data: await employeeService.getEmployees() }); } catch (error) { next(error); } };
export const getEmployee: RequestHandler = async (request, response, next) => { try { response.json({ success: true, data: await employeeService.getEmployeeById(parseId(routeId(request.params.id))) }); } catch (error) { next(error); } };

async function validateBody(request: Parameters<RequestHandler>[0]): Promise<EmployeeInput> {
  const errors = validateEmployeeInput(request.body);
  if (errors.length) throw Object.assign(new Error(errors.join(' ')), { statusCode: 400 });
  return request.body as EmployeeInput;
}

export const createEmployee: RequestHandler = async (request, response, next) => { try { response.status(201).json({ success: true, data: await employeeService.createEmployee(await validateBody(request)) }); } catch (error) { next(error); } };
export const updateEmployee: RequestHandler = async (request, response, next) => { try { response.json({ success: true, data: await employeeService.updateEmployee(parseId(routeId(request.params.id)), await validateBody(request)) }); } catch (error) { next(error); } };
export const deleteEmployee: RequestHandler = async (request, response, next) => { try { await employeeService.deleteEmployee(parseId(routeId(request.params.id))); response.json({ success: true, message: 'Employee deleted successfully.' }); } catch (error) { next(error); } };

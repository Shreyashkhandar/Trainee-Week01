import { Router } from 'express';
import * as employeeController from '../controllers/employeeController.js';

export const employeeRoutes = Router();
employeeRoutes.get('/', employeeController.getEmployees);
employeeRoutes.get('/:id', employeeController.getEmployee);
employeeRoutes.post('/', employeeController.createEmployee);
employeeRoutes.put('/:id', employeeController.updateEmployee);
employeeRoutes.delete('/:id', employeeController.deleteEmployee);

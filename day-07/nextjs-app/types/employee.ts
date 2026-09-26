export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  location: string;
}

export type EmployeeInput = Omit<Employee, 'id'>;

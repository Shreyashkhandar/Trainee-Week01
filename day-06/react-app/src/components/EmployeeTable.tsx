import type { Employee } from '../types/Employee';

type EmployeeTableProps = {
  employees: Employee[];
  onDetails: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
};

export function EmployeeTable({ employees, onDetails, onEdit, onDelete }: EmployeeTableProps) {
  return (
    <section className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan={7} className="empty-state">No employees match the current search or filter.</td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
                <td>₹{employee.salary.toLocaleString()}</td>
                <td>{employee.location}</td>
                <td>
                  <div className="action-group">
                    <button type="button" className="btn details-btn" onClick={() => onDetails(employee)}>
                      Details
                    </button>
                    <button type="button" className="btn edit-btn" onClick={() => onEdit(employee)}>
                      Edit
                    </button>
                    <button type="button" className="btn delete-btn" onClick={() => onDelete(employee)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}

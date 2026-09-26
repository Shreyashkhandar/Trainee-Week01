import type { Employee } from '../types/Employee';

type EmployeeDetailsProps = {
  employee: Employee | null;
  onClose: () => void;
};

export function EmployeeDetails({ employee, onClose }: EmployeeDetailsProps) {
  if (!employee) {
    return null;
  }

  return (
    <section className="details-card">
      <div className="details-header">
        <h3>{employee.name}</h3>
        <button type="button" className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="details-grid">
        <p>
          <span>Email:</span> {employee.email}
        </p>
        <p>
          <span>Department:</span> {employee.department}
        </p>
        <p>
          <span>Position:</span> {employee.position}
        </p>
        <p>
          <span>Salary:</span> ₹{employee.salary.toLocaleString()}
        </p>
        <p>
          <span>Location:</span> {employee.location}
        </p>
      </div>
    </section>
  );
}

import { useEffect, useState } from 'react';
import type { Employee, EmployeeFormData } from '../types/Employee';

type EmployeeFormProps = {
  employeeToEdit?: Employee | null;
  onSave: (employee: EmployeeFormData | Employee) => void;
  onCancel: () => void;
};

const emptyForm: EmployeeFormData = {
  name: '',
  email: '',
  department: '',
  position: '',
  salary: 0,
  location: '',
};

export function EmployeeForm({ employeeToEdit, onSave, onCancel }: EmployeeFormProps) {
  const [formData, setFormData] = useState<EmployeeFormData>(emptyForm);

  useEffect(() => {
    if (employeeToEdit) {
      setFormData({
        name: employeeToEdit.name,
        email: employeeToEdit.email,
        department: employeeToEdit.department,
        position: employeeToEdit.position,
        salary: employeeToEdit.salary,
        location: employeeToEdit.location,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [employeeToEdit]);

  const handleChange = (field: keyof EmployeeFormData, value: string | number) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmployee = {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      department: formData.department.trim(),
      position: formData.position.trim(),
      location: formData.location.trim(),
      salary: Number(formData.salary),
    };

    if (
      !normalizedEmployee.name ||
      !normalizedEmployee.email ||
      !normalizedEmployee.department ||
      !normalizedEmployee.position ||
      !normalizedEmployee.location ||
      Number(normalizedEmployee.salary) <= 0
    ) {
      alert('Please fill in all fields with valid information.');
      return;
    }

    onSave({
      ...normalizedEmployee,
      id: employeeToEdit?.id ?? 0,
    });
  };

  return (
    <section className="form-card">
      <h3>{employeeToEdit ? 'Edit Employee' : 'Add Employee'}</h3>
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="field-grid">
          <label>
            Name
            <input
              type="text"
              value={formData.name}
              onChange={(event) => handleChange('name', event.target.value)}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={formData.email}
              onChange={(event) => handleChange('email', event.target.value)}
            />
          </label>

          <label>
            Department
            <input
              type="text"
              value={formData.department}
              onChange={(event) => handleChange('department', event.target.value)}
            />
          </label>

          <label>
            Position
            <input
              type="text"
              value={formData.position}
              onChange={(event) => handleChange('position', event.target.value)}
            />
          </label>

          <label>
            Salary
            <input
              type="number"
              min="1"
              value={formData.salary}
              onChange={(event) => handleChange('salary', Number(event.target.value))}
            />
          </label>

          <label>
            Location
            <input
              type="text"
              value={formData.location}
              onChange={(event) => handleChange('location', event.target.value)}
            />
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn primary-btn">
            {employeeToEdit ? 'Save Changes' : 'Add Employee'}
          </button>
          <button type="button" className="btn secondary-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
